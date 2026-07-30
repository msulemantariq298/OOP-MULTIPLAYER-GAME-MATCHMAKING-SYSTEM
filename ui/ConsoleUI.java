package ui;

import model.*;
import service.*;
import config.MatchmakingConfig;
import util.InputValidator;
import repository.FileStorageManager;
import repository.MatchHistory;
import java.util.Scanner;
import java.util.List;
import java.util.ArrayList;

public class ConsoleUI {
    private Scanner scanner;
    private IPlayerManager playerManager;
    private MatchMakingEngine matchmakingEngine;
    private MatchQueue matchQueue;
    private Player currentPlayer;
    private FileStorageManager fileStorageManager;
    private MatchHistory matchHistory;
    private IReputationManager reputationManager;

    public ConsoleUI() {
        this.scanner = new Scanner(System.in);
        this.fileStorageManager = new FileStorageManager();
        this.playerManager = new PlayerManager(fileStorageManager);
        this.matchHistory = new MatchHistory(fileStorageManager);
        this.reputationManager = new ReputationManager(30); // Minimum reputation score 30
        
        MatchQueue rankedQueue = new MatchQueue("Ranked");
        MatchQueue casualQueue = new MatchQueue("Casual");
        MatchQueue tournamentQueue = new MatchQueue("Tournament");
        
        MatchmakingConfig config = new MatchmakingConfig(false, false);
        
        this.matchmakingEngine = new MatchMakingEngine(rankedQueue, casualQueue, tournamentQueue, config, playerManager);
        this.matchQueue = casualQueue;
        this.currentPlayer = null;
        
        matchHistory.loadHistoryFromStorage();
    }

    public void start() throws InterruptedException {
        System.out.println("=== Game Matchmaking System ===");

        while (true) {
            if (currentPlayer == null) {
                showLoginMenu();
            } else {
                showMainMenu();
            }
        }
    }

    private void showLoginMenu() {
        try {
            System.out.println("\n=== Login Menu ===");
            System.out.println("1. Login");
            System.out.println("2. Register");
            System.out.println("3. Exit");
            
            int choice = InputValidator.getValidatedInt(scanner, "Choose an option: ", 1, 3);

            switch (choice) {
                case 1:
                    login();
                    break;
                case 2:
                    register();
                    break;
                case 3:
                    System.out.println("Goodbye!");
                    System.exit(0);
                    break;
            }
        } catch (Exception e) {
            System.out.println("ERROR: An unexpected error occurred. Please try again.");
        }
    }

    private void showMainMenu() throws InterruptedException {
        try {
            if (currentPlayer == null) {
                System.out.println("ERROR: No player logged in. Redirecting to login...");
                return;
            }
            
            System.out.println("\n=== Main Menu ===");
            System.out.println("Welcome, " + currentPlayer.getUsername() + "!");
            System.out.println("1. Find Match");
            System.out.println("2. View Stats");
            System.out.println("3. View Match History");
            System.out.println("4. Settings");
            System.out.println("5. Logout");
            
            int choice = InputValidator.getValidatedInt(scanner, "Choose an option: ", 1, 5);

            switch (choice) {
                case 1:
                    findMatch();
                    break;
                case 2:
                    viewStats();
                    break;
                case 3:
                    viewMatchHistory();
                    break;
                case 4:
                    settings();
                    break;
                case 5:
                    logout();
                    break;
            }
        } catch (Exception e) {
            System.out.println("ERROR: An unexpected error occurred. Please try again.");
        }
    }

    /**
     * Handles user login with input validation.
     */
    private void login() {
        try {
            String username = InputValidator.getValidUsername(scanner);
            String password = InputValidator.getValidatedString(scanner, "Enter password: ",
                pwd -> pwd != null && pwd.length() >= 8, "Password must be at least 8 characters");
            
            if (playerManager.loginPlayer(username, password)) {
                currentPlayer = playerManager.getPlayer(username);
            }
        } catch (Exception e) {
            System.out.println("ERROR: Login failed. Please try again.");
        }
    }

    /**
     * Handles user registration with comprehensive input validation.
     */
    private void register() {
        try {
            String username = InputValidator.getValidUsername(scanner);
            String password = InputValidator.getValidPassword(scanner);
            String region = InputValidator.getValidRegion(scanner);
            String language = InputValidator.getValidLanguage(scanner);
            
            if (playerManager.registerPlayer(username, password, region, language)) {
                currentPlayer = playerManager.getPlayer(username);
                fileStorageManager.savePlayer(currentPlayer);
                System.out.println("Registration successful!");
            }
        } catch (Exception e) {
            System.out.println("ERROR: Registration failed. Please try again.");
        }
    }

    private void findMatch() throws InterruptedException {
        System.out.println("\n=== Find Match ===");
        System.out.println("1. Casual Mode");
        System.out.println("2. Ranked Mode");
        System.out.println("3. Tournament Mode");

        int modeChoice = InputValidator.getValidatedInt(scanner, "Choose game mode: ", 1, 3);

        GameMode selectedMode = null;
        switch (modeChoice) {
            case 1:
                selectedMode = new CasualMode();
                break;
            case 2:
                selectedMode = new RankedMode();
                break;
            case 3:
                int bracketSize = InputValidator.getValidatedInt(scanner, "Enter tournament bracket size (power of 2): ", 2, 64);
                // Validate power of 2
                if ((bracketSize & (bracketSize - 1)) != 0) {
                    System.out.println("ERROR: Bracket size must be a power of 2 (2, 4, 8, 16, 32, 64)");
                    return;
                }
                selectedMode = new TournamentMode(bracketSize);
                break;
            default:
                System.out.println("Invalid mode selected.");
                return;
        }

        System.out.println("Searching for match in " + selectedMode.getModeName() + " mode...");

        Thread.sleep(2000);

        System.out.println("Match found!");
        simulateMatch(selectedMode);
    }

    private void simulateMatch(GameMode mode) throws InterruptedException {
        System.out.println("\n=== Match Started ===");
        System.out.println("Mode: " + mode.getModeName());
        System.out.println("Playing against AI opponent...");

        // Create a mock opponent player for match simulation
        Player aiOpponent = new Player("AI_Opponent", "TempPass123!", "Global", "English");
        aiOpponent.updateStats(false); // AI always loses for simplicity

        boolean won = Math.random() > 0.4;
        String matchId = "MATCH_" + System.currentTimeMillis();

        // Create match object
        List<Player> players = new ArrayList<>();
        players.add(currentPlayer);
        players.add(aiOpponent);
        
        Match match = new Match(matchId, players, mode);
        match.start();

        // Calculate match duration based on game mode (for display purposes only)
        long matchDurationMs;
        if (mode.getModeName().equals("Casual")) {
            matchDurationMs = 10 * 60 * 1000; // 10 minutes in milliseconds
        } else if (mode.getModeName().equals("Ranked")) {
            matchDurationMs = 15 * 60 * 1000; // 15 minutes in milliseconds
        } else if (mode instanceof TournamentMode) {
            // Tournament duration depends on bracket size
            TournamentMode tournamentMode = (TournamentMode) mode;
            int bracketSize = tournamentMode.getBracketSize();
            // Duration = 5 minutes * number of rounds (log2 of bracket size)
            int rounds = (int) (Math.log(bracketSize) / Math.log(2));
            matchDurationMs = rounds * 5 * 60 * 1000; // 5 minutes per round
        } else {
            matchDurationMs = 3000; // Default 3 seconds
        }

        // Simulate short delay for realism (3 seconds)
        Thread.sleep(3000);

        if (won) {
            System.out.println("Victory! You won the match!");
            currentPlayer.updateStats(true);
            match.end(currentPlayer.getUsername());
        } else {
            System.out.println("Defeat! Better luck next time!");
            currentPlayer.updateStats(false);
            match.end(aiOpponent.getUsername());
        }

        // Update rating only for Ranked and Tournament modes
        if (mode.isRatingEnabled()) {
            currentPlayer.getRating().updateRating(won, aiOpponent.getRating());
            System.out.println("Rating updated: " + String.format("%.3f", currentPlayer.getRating().getValue()));
        }

        // Set the endTime to reflect the calculated duration for accurate display
        match.setEndTime(match.getStartTime() + matchDurationMs);

        // Record the match in history
        try {
            matchHistory.recordMatch(match);
            System.out.println("Match recorded in history.");
        } catch (Exception e) {
            System.err.println("Failed to record match: " + e.getMessage());
        }

        System.out.println("Match completed.");

        // Ask if user wants to report opponent
        System.out.print("\nWould you like to report your opponent? (1=Yes, 2=No): ");
        int reportChoice = InputValidator.getValidatedInt(scanner, "", 1, 2);
        
        if (reportChoice == 1) {
            System.out.print("Enter reason for report: ");
            String reason = scanner.nextLine().trim();
            if (!reason.isEmpty()) {
                reputationManager.reportPlayer(aiOpponent, currentPlayer, reason);
                System.out.println("Report filed successfully.");
            } else {
                System.out.println("Report cancelled - reason cannot be empty.");
            }
        }

        // Random chance for opponent to report player (20% chance)
        if (Math.random() < 0.2) {
            String[] aiReasons = {
                "Toxic behavior",
                "Unsportsmanlike conduct",
                "Intentional feeding",
                "Verbal abuse",
                "Cheating suspected",
                "AFK during match",
                "Team killing",
                "Exploiting glitches"
            };
            String randomReason = aiReasons[(int)(Math.random() * aiReasons.length)];
            
            System.out.println("\n*** OPPONENT REPORTED YOU ***");
            System.out.println("Your opponent reported you for: " + randomReason);
            reputationManager.reportPlayer(currentPlayer, aiOpponent, randomReason);
        }
    }

    private void viewStats() {
        System.out.println("\n=== Player Statistics ===");
        System.out.println("Username: " + currentPlayer.getUsername());
        System.out.println("Rating: " + String.format("%.3f", currentPlayer.getRating().getValue()));
        
        // Use match history as single source of truth for stats
        int gamesPlayed = matchHistory.getPlayerMatchCount(currentPlayer.getUsername());
        int wins = matchHistory.getPlayerWinsCount(currentPlayer.getUsername());
        int losses = matchHistory.getPlayerLossesCount(currentPlayer.getUsername());
        
        System.out.println("Games Played: " + gamesPlayed);
        System.out.println("Wins: " + wins);
        System.out.println("Losses: " + losses);
        System.out.println("Win Rate: " +
            String.format("%.3f%%", gamesPlayed > 0 ?
                (wins * 100.0 / gamesPlayed) : 0.0));
        System.out.println("Reputation Score: " + currentPlayer.getReputationScore());
        System.out.println("Region: " + currentPlayer.getRegion());
        System.out.println("Preferred Mode: " + currentPlayer.getPreferredMode());
    }

    private void viewMatchHistory() {
        System.out.println("\n=== Match History ===");
        List<Match> history = matchHistory.getPlayerMatchHistory(currentPlayer.getUsername());
        
        if (history == null || history.isEmpty()) {
            System.out.println("No match history available yet.");
        } else {
            System.out.println("Total Matches: " + history.size());
            System.out.println("Wins: " + matchHistory.getPlayerWinsCount(currentPlayer.getUsername()));
            System.out.println("Losses: " + matchHistory.getPlayerLossesCount(currentPlayer.getUsername()));
            System.out.println("Average Match Duration: " + String.format("%.2f", matchHistory.getAverageMatchDuration(currentPlayer.getUsername()) / 60.0) + " minutes");
            
            for (Match match : history) {
                if (match != null) {
                    double durationMinutes = match.getDurationSeconds() / 60.0;
                    System.out.println("  Match ID: " + match.getMatchId() + " | Mode: " + match.getMode() + " | Duration: " + String.format("%.2f", durationMinutes) + " min | Winner: " + (match.getWinnerId() != null ? match.getWinnerId() : "N/A"));
                }
            }
        }
    }

    /**
     * Handles user settings with input validation.
     */
    private void settings() {
        try {
            if (currentPlayer == null) {
                System.out.println("ERROR: No player logged in.");
                return;
            }
            
            System.out.println("\n=== Settings ===");
            System.out.println("1. Change Preferred Mode");
            System.out.println("2. Change Region");
            System.out.println("3. Change Language");
            
            int choice = InputValidator.getValidatedInt(scanner, "Choose an option: ", 1, 3);

            switch (choice) {
                case 1:
                    System.out.println("Current preferred mode: " + currentPlayer.getPreferredMode());
                    System.out.println("Available modes: Casual, Ranked, Tournament");
                    String newMode = InputValidator.getValidatedString(scanner, "Enter new preferred mode: ",
                        mode -> InputValidator.isValidGameMode(mode), "Invalid mode name (Casual, Ranked, Tournament)");
                    currentPlayer.setPreferredMode(newMode);
                    fileStorageManager.updatePlayer(currentPlayer);
                    System.out.println("Preferred mode updated and saved!");
                    break;
                case 2:
                    System.out.println("Current region: " + currentPlayer.getRegion());
                    String newRegion = InputValidator.getValidRegion(scanner);
                    updatePlayerRegion(newRegion);
                    fileStorageManager.updatePlayer(currentPlayer);
                    System.out.println("Region updated and saved!");
                    break;
                case 3:
                    System.out.println("Current language: " + currentPlayer.getLanguage());
                    String newLanguage = InputValidator.getValidLanguage(scanner);
                    updatePlayerLanguage(newLanguage);
                    fileStorageManager.updatePlayer(currentPlayer);
                    System.out.println("Language updated and saved!");
                    break;
            }
        } catch (Exception e) {
            System.out.println("ERROR: Settings update failed. Please try again.");
        }
    }

    private void updatePlayerRegion(String newRegion) {
        try {
            currentPlayer.setRegion(newRegion);
            System.out.println("Region updated to: " + newRegion);
        } catch (Exception e) {
            System.err.println("Error updating region: " + e.getMessage());
        }
    }

    private void updatePlayerLanguage(String newLanguage) {
        try {
            currentPlayer.setLanguage(newLanguage);
            System.out.println("Language updated to: " + newLanguage);
        } catch (Exception e) {
            System.err.println("Error updating language: " + e.getMessage());
        }
    }

    private void logout() {
        if (currentPlayer != null) {
            fileStorageManager.updatePlayer(currentPlayer);
            System.out.println("Logging out...");
        }
        currentPlayer = null;
    }
}
