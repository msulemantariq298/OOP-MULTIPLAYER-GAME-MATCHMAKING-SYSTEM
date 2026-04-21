package service;

import model.GameMode;
import model.Match;
import model.Player;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import config.MatchmakingConfig;

/**
 * MatchmakingEngine - The brain of the entire matchmaking system.
 * Continuously watches all 3 queues, finds compatible players,
 * and creates matches based on rules defined in MatchmakingConfig.
 */
public class MatchMakingEngine {

    // =====================================================================
    // VARIABLES — Everything engine needs to do its job
    // =====================================================================

    // The 3 waiting rooms — one for each game mode
    private MatchQueue rankedQueue;
    private MatchQueue casualQueue;
    private MatchQueue tournamentQueue;

    // The rulebook — engine reads all rules from here
    private MatchmakingConfig config;

    // PlayerManager — engine asks this to get full player details by username
    private IPlayerManager playerManager;

    // Controls the engine loop — true = running, false = stopped
    private boolean running;

    // =====================================================================
    // CONSTRUCTOR
    // Everything is passed from outside — engine doesnt create anything itself
    // =====================================================================

    public MatchMakingEngine(MatchQueue rankedQueue,
                             MatchQueue casualQueue,
                             MatchQueue tournamentQueue,
                             MatchmakingConfig config,
                             IPlayerManager playerManager) {

        this.rankedQueue      = rankedQueue;
        this.casualQueue      = casualQueue;
        this.tournamentQueue  = tournamentQueue;
        this.config           = config;
        this.playerManager    = playerManager;
        this.running          = false;
    }

    // =====================================================================
    // ENGINE CONTROL — Start and stop the engine
    // =====================================================================

    public void startEngine() {
        running = true;
        System.out.println("[ENGINE] Matchmaking engine started. Watching all queues...");
    }

    public void stopEngine() {
        running = false;

        // Clear all queues when engine stops — no ghost players left behind
        rankedQueue.clearQueue();
        casualQueue.clearQueue();
        tournamentQueue.clearQueue();

        System.out.println("[ENGINE] Matchmaking engine stopped. All queues cleared.");
    }

    public boolean isRunning() {
        return running;
    }

    // =====================================================================
    // MAIN ENGINE LOOP — Continuously scans all queues and finds matches
    // Called repeatedly as long as engine is running
    // =====================================================================

    public void runMatchmaking() {
        if (!running) {
            System.out.println("[ENGINE] Engine is not running. Call startEngine() first.");
            return;
        }

        // Step 1 — Remove expired players from all queues first
        // Uses queueTimeout from config — players waiting too long get kicked
        removeExpiredPlayers();

        // Step 2 — Try to find matches in each queue
        // Each queue is independent — Ranked doesnt affect Casual and so on
        findMatch(rankedQueue);
        findMatch(casualQueue);
        findMatch(tournamentQueue);
    }

    // =====================================================================
    // FIND MATCH — Scans one queue and tries to create a match
    // =====================================================================

    /**
     * Scans the given queue and tries to pair compatible players.
     * Keeps matching until no compatible pairs left in this queue.
     * Engine reads gameMode from the queue itself — no need to pass it separately.
     */
    private void findMatch(MatchQueue queue) {

        // Need at least 2 players to form any match
        if (queue.size() < 2) {
            return;
        }

        // Get current game mode from this queue
        String gameMode = queue.getGameMode();

        // Get all players currently waiting in this queue
        List<String> waitingPlayers = new ArrayList<>(queue.getQueue());

        // Loop through all players and try to find compatible pairs
        // i = -1 trick — when match found, restart from beginning with updated list
        for (int i = 0; i < waitingPlayers.size() - 1; i++) {

            String username1 = waitingPlayers.get(i);

            for (int j = i + 1; j < waitingPlayers.size(); j++) {

                String username2 = waitingPlayers.get(j);

                // Fetch full player details from PlayerManager
                // Queue only stores username — we need full object for compatibility check
                Player p1 = playerManager.getPlayer(username1);
                Player p2 = playerManager.getPlayer(username2);

                // Safety check — skip if player not found in system
                if (p1 == null || p2 == null) {
                    continue;
                }

                // Check if these two players are compatible
                if (isCompatible(p1, p2, gameMode)) {

                    // Compatible! Remove both from queue
                    queue.removePlayer(username1);
                    queue.removePlayer(username2);

                    // Create their match
                    createMatch(p1, p2, gameMode);

                    // Update our local list to reflect queue changes
                    waitingPlayers.remove(username1);
                    waitingPlayers.remove(username2);

                    // Restart scanning from beginning with updated list
                    // i = -1 because loop does i++ at end → becomes i = 0
                    i = -1;
                    break;
                }
            }
        }

        System.out.println("[ENGINE] No more compatible pairs in " + gameMode + " queue this round.");
    }

    // =====================================================================
    // COMPATIBILITY CHECK — Checks if two players can be matched together
    // Reads all rules from MatchmakingConfig — single source of truth
    // =====================================================================

    /**
     * Checks all config rules between two players.
     * Returns true only if ALL checks pass — one fail means no match.
     * gameMode is needed to apply correct skill tolerance and reputation minimum.
     */
    private boolean isCompatible(Player p1, Player p2, String gameMode) {

        // ── CHECK 1: REGION ──────────────────────────────────────────────
        // Only check region if config says same region is required
        if (config.isSameRegion()) {
            if (!p1.getRegion().equals(p2.getRegion())) {
                System.out.println("[ENGINE] Region mismatch: " + p1.getUsername() + " vs " + p2.getUsername());
                return false;
            }
        }

        // ── CHECK 2: LANGUAGE ────────────────────────────────────────────
        // Only check language if config says same language is required
        if (config.isSameLanguage()) {
            if (!p1.getLanguage().equals(p2.getLanguage())) {
                System.out.println("[ENGINE] Language mismatch: " + p1.getUsername() + " vs " + p2.getUsername());
                return false;
            }
        }

        // ── CHECK 3: REPUTATION ──────────────────────────────────────────
        // Each mode has different minimum reputation — read from config
        int minReputation = getMinReputationForMode(gameMode);

        if (p1.getReputationScore() < minReputation) {
            System.out.println("[ENGINE] " + p1.getUsername() + " reputation too low for " + gameMode);

            // Ban this player for x hours — they need to improve behaviour first
            System.out.println("[ENGINE] " + p1.getUsername() + " banned for " + config.getBanDurationHours() + " hours.");
            return false;
        }

        if (p2.getReputationScore() < minReputation) {
            System.out.println("[ENGINE] " + p2.getUsername() + " reputation too low for " + gameMode);
            System.out.println("[ENGINE] " + p2.getUsername() + " banned for " + config.getBanDurationHours() + " hours.");
            return false;
        }

        // ── CHECK 4: SKILL GAP ───────────────────────────────────────────
        // Casual mode = no skill check, anyone can play with anyone
        // Ranked and Tournament = strict skill check using tolerance from config
        if (!gameMode.equals("Casual")) {

            double skillTolerance = getSkillToleranceForMode(gameMode);

            // isWithinRange() is Suleman's method in SkillRating class
            // checks if skill gap between two players is within allowed tolerance
            if (!p1.getRating().isWithinRange(p2.getRating(), skillTolerance)) {
                System.out.println("[ENGINE] Skill gap too high: " +
                        p1.getUsername() + "(" + p1.getRating().getValue() + ")" +
                        " vs " +
                        p2.getUsername() + "(" + p2.getRating().getValue() + ")");
                return false;
            }
        }

        // All checks passed — these two players are compatible!
        return true;
    }

    // =====================================================================
    // CREATE MATCH — Forms a match between two compatible players
    // =====================================================================

    /**
     * Creates a Match object using Suleman's Match class.
     * Match is started immediately after creation.
     */
    private void createMatch(Player p1, Player p2, String gameMode) {

        // Build the player list for this match
        List<Player> players = new ArrayList<>();
        players.add(p1);
        players.add(p2);

        // Generate a unique ID for this match
        // UUID.randomUUID() creates a unique string every time — no two matches same ID
        String matchId = UUID.randomUUID().toString();

        // Get the correct GameMode object based on mode name
        GameMode mode = getModeObject(gameMode);

        // Create the match using Suleman's Match class
        Match match = new Match(matchId, players, mode);

        // Start the match immediately
        match.start();

        System.out.println("[ENGINE] Match created! " +
                p1.getUsername() + " vs " + p2.getUsername() +
                " | Mode: " + gameMode +
                " | Match ID: " + matchId);
    }

    // =====================================================================
    // HELPER METHODS — Small utilities used by engine internally
    // =====================================================================

    /**
     * Returns correct minimum reputation for the given game mode.
     * Reads from config — single source of truth.
     */
    private int getMinReputationForMode(String gameMode) {
        switch (gameMode) {
            case "Ranked":     return config.getMinReputationRanked();
            case "Tournament": return config.getMinReputationTournament();
            default:           return config.getMinReputationCasual(); // Casual = 0
        }
    }

    /**
     * Returns correct skill tolerance for the given game mode.
     * Reads from config — single source of truth.
     */
    private double getSkillToleranceForMode(String gameMode) {
        switch (gameMode) {
            case "Ranked":     return config.getRankedSkillTolerance();
            case "Tournament": return config.getTournamentSkillTolerance();
            default:           return Double.MAX_VALUE; // Casual = no limit
        }
    }

    /**
     * Returns the correct GameMode object based on mode name.
     * Uses Suleman's GameMode subclasses.
     */
    private GameMode getModeObject(String gameMode) {
        switch (gameMode) {
            case "Ranked":     return new model.RankedMode();
            case "Tournament": return new model.TournamentMode(8);
            default:           return new model.CasualMode();
        }
    }

    /**
     * Removes expired players from all 3 queues.
     * Reads queueTimeout from config and passes it to each queue.
     */
    private void removeExpiredPlayers() {
        int timeout = config.getQueueTimeout();
        rankedQueue.removeExpiredPlayers(timeout);
        casualQueue.removeExpiredPlayers(timeout);
        tournamentQueue.removeExpiredPlayers(timeout);
    }

    // =====================================================================
    // GETTERS — Used by other classes to check engine status
    // =====================================================================

    public MatchQueue getRankedQueue()     { return rankedQueue; }
    public MatchQueue getCasualQueue()     { return casualQueue; }
    public MatchQueue getTournamentQueue() { return tournamentQueue; }
}
