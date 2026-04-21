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
    private PlayerManager playerManager;
    private MatchMakingEngine matchmakingEngine;
    private MatchQueue matchQueue;
    private Player currentPlayer;
    private FileStorageManager fileStorageManager;
    private MatchHistory matchHistory;

    public ConsoleUI() {
        this.scanner = new Scanner(System.in);
        this.fileStorageManager = new FileStorageManager();
        this.playerManager = new PlayerManager();
        this.matchHistory = new MatchHistory(fileStorageManager);
        
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
            System.out.print("Enter password: ");
            String password = scanner.nextLine();
            
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
        System.out.print("Choose game mode: ");

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

        boolean won = Math.random() > 0.4;

        Thread.sleep(3000);

        if (won) {
            System.out.println("Victory! You won the match!");
            currentPlayer.updateStats(true);
        } else {
            System.out.println("Defeat! Better luck next time!");
            currentPlayer.updateStats(false);
        }

        System.out.println("Match completed.");
    }

    private void viewStats() {
        System.out.println("\n=== Player Statistics ===");
        System.out.println("Username: " + currentPlayer.getUsername());
        System.out.println("Rating: " + currentPlayer.getRating());
        System.out.println("Games Played: " + currentPlayer.getGamesPlayed());
        System.out.println("Wins: " + currentPlayer.getWins());
        System.out.println("Losses: " + currentPlayer.getLosses());
        System.out.println("Win Rate: " +
            (currentPlayer.getGamesPlayed() > 0 ?
                (currentPlayer.getWins() * 100.0 / currentPlayer.getGamesPlayed()) + "%" : "N/A"));
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
            System.out.println("Average Match Duration: " + String.format("%.2f", matchHistory.getAverageMatchDuration(currentPlayer.getUsername())) + " seconds");
            
            for (Match match : history) {
                if (match != null) {
                    System.out.println("  Match ID: " + match.getMatchId() + " | Mode: " + match.getMode() + " | Winner: " + (match.getWinnerId() != null ? match.getWinnerId() : "N/A"));
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

<<<<<<< HEAD
            switch (choice) {
                case 1:
                    System.out.println("Current preferred mode: " + currentPlayer.getPreferredMode());
                    System.out.println("Available modes: Casual, Ranked, Tournament");
                    String newMode = InputValidator.getValidatedString(scanner, "Enter new preferred mode: ",
                        mode -> InputValidator.isValidRegion(mode), "Invalid mode name");
                    currentPlayer.setPreferredMode(newMode);
                    System.out.println("Preferred mode updated!");
                    break;
                case 2:
                    System.out.println("Current region: " + currentPlayer.getRegion());
                    String newRegion = InputValidator.getValidRegion(scanner);
                    // Note: In a real system, you'd update the player's region
                    System.out.println("Region updated to: " + newRegion);
                    break;
                case 3:
                    System.out.println("Current language: " + currentPlayer.getLanguage());
                    String newLanguage = InputValidator.getValidLanguage(scanner);
                    // Note: In a real system, you'd update the player's language
                    System.out.println("Language updated to: " + newLanguage);
                    break;
            }
        } catch (Exception e) {
            System.out.println("ERROR: Settings update failed. Please try again.");
=======
        int choice = scanner.nextInt();
        scanner.nextLine();

        switch (choice) {
            case 1:
                System.out.println("Current preferred mode: " + currentPlayer.getPreferredMode());
                System.out.println("Available modes: Casual, Ranked, Tournament");
                System.out.print("Enter new preferred mode: ");
                String newMode = scanner.nextLine();
                currentPlayer.setPreferredMode(newMode);
                fileStorageManager.updatePlayer(currentPlayer);
                System.out.println("Preferred mode updated and saved!");
                break;
            case 2:
                System.out.println("Current region: " + currentPlayer.getRegion());
                System.out.print("Enter new region: ");
                String newRegion = scanner.nextLine();
                updatePlayerRegion(newRegion);
                fileStorageManager.updatePlayer(currentPlayer);
                System.out.println("Region updated and saved!");
                break;
            case 3:
                System.out.println("Current language: " + currentPlayer.getLanguage());
                System.out.print("Enter new language: ");
                String newLanguage = scanner.nextLine();
                updatePlayerLanguage(newLanguage);
                fileStorageManager.updatePlayer(currentPlayer);
                System.out.println("Language updated and saved!");
                break;
            default:
                System.out.println("Invalid option.");
>>>>>>> ba7c5d25cab112388d0c21e39f48db222251f0b7
        }
    }

    private void updatePlayerRegion(String newRegion) {
        try {
            Player updatedPlayer = new Player(currentPlayer.getUsername(), "", newRegion, currentPlayer.getLanguage());
            updatedPlayer = playerManager.getPlayer(currentPlayer.getUsername());
            if (updatedPlayer != null) {
                currentPlayer = updatedPlayer;
            }
        } catch (Exception e) {
            System.err.println("Error updating region: " + e.getMessage());
        }
    }

    private void updatePlayerLanguage(String newLanguage) {
        try {
            Player updatedPlayer = playerManager.getPlayer(currentPlayer.getUsername());
            if (updatedPlayer != null) {
                currentPlayer = updatedPlayer;
            }
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
