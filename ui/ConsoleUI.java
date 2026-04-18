package ui;

import model.*;
import service.*;
import java.util.Scanner;
import java.util.List;
import java.util.ArrayList;

public class ConsoleUI {
    private Scanner scanner;
    private PlayerManager playerManager;
    private MatchmakingEngine matchmakingEngine;
    private MatchQueue matchQueue;
    private Player currentPlayer;

    public ConsoleUI() {
        this.scanner = new Scanner(System.in);
        this.playerManager = new PlayerManager();
        this.matchmakingEngine = new MatchmakingEngine();
        this.matchQueue = new MatchQueue();
        this.currentPlayer = null;
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
        System.out.println("\n=== Login Menu ===");
        System.out.println("1. Login");
        System.out.println("2. Register");
        System.out.println("3. Exit");
        System.out.print("Choose an option: ");

        int choice = scanner.nextInt();
        scanner.nextLine();

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
            default:
                System.out.println("Invalid option. Please try again.");
        }
    }

    private void showMainMenu() throws InterruptedException {
        System.out.println("\n=== Main Menu ===");
        System.out.println("Welcome, " + currentPlayer.getUsername() + "!");
        System.out.println("1. Find Match");
        System.out.println("2. View Stats");
        System.out.println("3. View Match History");
        System.out.println("4. Settings");
        System.out.println("5. Logout");
        System.out.print("Choose an option: ");

        int choice = scanner.nextInt();
        scanner.nextLine();

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
            default:
                System.out.println("Invalid option. Please try again.");
        }
    }

    private void login() {
        System.out.print("Enter username: ");
        String username = scanner.nextLine();
        System.out.print("Enter password: ");
        String password = scanner.nextLine();

        currentPlayer = new Player(username, password, "US", "English");
        System.out.println("Login successful!");
    }

    private void register() {
        System.out.print("Enter username: ");
        String username = scanner.nextLine();
        System.out.print("Enter password: ");
        String password = scanner.nextLine();
        System.out.print("Enter region: ");
        String region = scanner.nextLine();
        System.out.print("Enter language: ");
        String language = scanner.nextLine();

        currentPlayer = new Player(username, password, region, language);
        System.out.println("Registration successful!");
    }

    private void findMatch() throws InterruptedException {
        System.out.println("\n=== Find Match ===");
        System.out.println("1. Casual Mode");
        System.out.println("2. Ranked Mode");
        System.out.println("3. Tournament Mode");
        System.out.print("Choose game mode: ");

        int modeChoice = scanner.nextInt();
        scanner.nextLine();

        GameMode selectedMode = null;
        switch (modeChoice) {
            case 1:
                selectedMode = new CasualMode();
                break;
            case 2:
                selectedMode = new RankedMode();
                break;
            case 3:
                System.out.print("Enter tournament bracket size: ");
                int bracketSize = scanner.nextInt();
                scanner.nextLine();
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
        System.out.println("No match history available yet.");
    }

    private void settings() {
        System.out.println("\n=== Settings ===");
        System.out.println("1. Change Preferred Mode");
        System.out.println("2. Change Region");
        System.out.println("3. Change Language");
        System.out.print("Choose an option: ");

        int choice = scanner.nextInt();
        scanner.nextLine();

        switch (choice) {
            case 1:
                System.out.println("Current preferred mode: " + currentPlayer.getPreferredMode());
                System.out.println("Available modes: Casual, Ranked, Tournament");
                System.out.print("Enter new preferred mode: ");
                String newMode = scanner.nextLine();
                currentPlayer.setPreferredMode(newMode);
                System.out.println("Preferred mode updated!");
                break;
            case 2:
                System.out.println("Current region: " + currentPlayer.getRegion());
                System.out.print("Enter new region: ");
                String newRegion = scanner.nextLine();
                System.out.println("Region updated!");
                break;
            case 3:
                System.out.println("Current language: " + currentPlayer.getLanguage());
                System.out.print("Enter new language: ");
                String newLanguage = scanner.nextLine();
                System.out.println("Language updated!");
                break;
            default:
                System.out.println("Invalid option.");
        }
    }

    private void logout() {
        System.out.println("Logging out...");
        currentPlayer = null;
    }
}
