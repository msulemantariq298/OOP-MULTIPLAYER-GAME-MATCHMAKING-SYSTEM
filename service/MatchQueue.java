package service;

import java.util.HashMap;
import java.util.LinkedList;

/**
 * MatchQueue - Waiting room for players searching for a match.
 * Each queue belongs to one game mode only (Ranked, Casual, Tournament).
 * Players join from the back and engine picks from the front.
 * Stores usernames only — full player details fetched when needed.
 */
public class MatchQueue {

    // LinkedList used because we dont know how many players will join
    // it grows and shrinks automatically as players join and leave
    private LinkedList<String> queue;

    // Tracks when each player joined the queue
    // Key = username, Value = join time in milliseconds
    // Used to kick players who waited longer than allowed timeout
    private HashMap<String, Long> joinTimes;

    // Each queue belongs to one game mode only
    private String gameMode;

    // =====================================================================
    // CONSTRUCTOR
    // =====================================================================

    public MatchQueue(String gameMode) {
        this.gameMode = gameMode;
        this.queue = new LinkedList<>();
        this.joinTimes = new HashMap<>();
        System.out.println("[QUEUE] " + gameMode + " queue is ready.");
    }

    // =====================================================================
    // CORE QUEUE OPERATIONS
    // =====================================================================

    /**
     * Player joins the waiting queue.
     * Records join time so we can track how long they have been waiting.
     * Same player cannot join the same queue twice.
     */
    public boolean enqueue(String username) {
        if (contains(username)) {
            System.out.println("[QUEUE] " + username + " is already in " + gameMode + " queue.");
            return false;
        }
        queue.add(username);

        // Record the exact time this player joined
        // System.currentTimeMillis() gives current time in milliseconds
        // We use this later to calculate how long they have been waiting
        joinTimes.put(username, System.currentTimeMillis());

        System.out.println("[QUEUE] " + username + " joined " + gameMode + " queue. Position: " + queue.size());
        return true;
    }

    /**
     * Removes and returns the first player in queue.
     * Called by MatchmakingEngine when forming a match.
     * Cleans up their join time record as they are leaving queue.
     * Returns null if queue is empty.
     */
    public String dequeue() {
        if (isEmpty()) {
            System.out.println("[QUEUE] " + gameMode + " queue is empty.");
            return null;
        }
        String username = queue.poll(); // poll() removes from front of chain
        joinTimes.remove(username);     // clean up their timestamp
        System.out.println("[QUEUE] " + username + " removed from " + gameMode + " queue.");
        return username;
    }

    /**
     * Player voluntarily leaves queue before being matched.
     * Also used by engine to forcefully remove banned players.
     * Removes player from both queue and joinTimes to avoid ghost entries.
     */
    public boolean removePlayer(String username) {
        if (!contains(username)) {
            System.out.println("[QUEUE] " + username + " is not in " + gameMode + " queue.");
            return false;
        }
        queue.remove(username);
        joinTimes.remove(username); // must remove from both — no ghost entries!
        System.out.println("[QUEUE] " + username + " left " + gameMode + " queue.");
        return true;
    }

    /**
     * Scans the queue and removes players who waited longer than allowed.
     * Called regularly by MatchmakingEngine using timeout from MatchmakingConfig.
     * Engine passes the timeout value — MatchQueue doesnt need to know config rules.
     */
    public void removeExpiredPlayers(int queueTimeoutSeconds) {
        long currentTime = System.currentTimeMillis();

        // Convert timeout from seconds to milliseconds for comparison
        // because joinTimes stores time in milliseconds
        long timeoutMillis = queueTimeoutSeconds * 1000L;

        // We use a separate LinkedList to collect expired players first
        // We cant remove from a list while looping through it — causes errors
        LinkedList<String> expiredPlayers = new LinkedList<>();

        for (String username : queue) {
            long waitTime = currentTime - joinTimes.get(username);
            if (waitTime >= timeoutMillis) {
                expiredPlayers.add(username);
            }
        }

        // Now safely remove expired players
        for (String username : expiredPlayers) {
            removePlayer(username);
            System.out.println("[QUEUE] " + username + " removed from " + gameMode + " queue — wait time exceeded.");
        }
    }

    /**
     * Returns the first player without removing them.
     * Engine uses this to check whos next before deciding.
     */
    public String peek() {
        if (isEmpty()) {
            System.out.println("[QUEUE] " + gameMode + " queue is empty, nothing to peek.");
            return null;
        }
        return queue.peek(); // just looks, doesnt remove
    }

    /**
     * Returns all players currently waiting.
     * Engine uses this to scan and find compatible pairs.
     */
    public LinkedList<String> getQueue() {
        return queue;
    }

    // =====================================================================
    // HELPER METHODS — Used by engine to check queue status
    // =====================================================================

    // Returns true if no players are waiting
    public boolean isEmpty() {
        return queue.isEmpty();
    }

    // Returns how many players are currently waiting
    // Engine uses this to check if enough players available for a match
    public int size() {
        return queue.size();
    }

    // Returns true if this player is already in the queue
    public boolean contains(String username) {
        return queue.contains(username);
    }

    // Returns which game mode this queue belongs to
    public String getGameMode() {
        return gameMode;
    }

    // Removes all players — used when engine stops or resets
    public void clearQueue() {
        queue.clear();
        joinTimes.clear(); // clear timestamps too — no ghost entries!
        System.out.println("[QUEUE] " + gameMode + " queue has been cleared.");
    }

    // =====================================================================
    // DISPLAY — Print current queue status
    // =====================================================================

    public void printQueue() {
        if (isEmpty()) {
            System.out.println("[QUEUE] No players waiting in " + gameMode + " queue.");
            return;
        }
        System.out.println("[QUEUE] " + gameMode + " queue (" + queue.size() + " waiting): " + queue);
    }
}
