/*
 -> PlayerManager.java
 -> Author: Muhammad Talha Asif (576751)
 
 -> This class manages all player accounts in the matchmaking system.
    It handles registering new players, logging in, logging out,
    and looking up player profiles.
 */

package service;

import model.Player;
import java.util.Map;
import java.util.HashMap;

public class PlayerManager implements IPlayerManager {

    // HashMap for efficient O(1) player lookup and management
    private Map<String, Player> players;
    private int playerCount;

    // The player who is currently logged in.
    private Player loggedInPlayer;

    /**
     * Constructor - initializes storage for players with unlimited capacity.
     * Uses HashMap for O(1) lookup performance.
     */
    public PlayerManager() {
        this.players = new HashMap<>();
        this.playerCount = 0;
        this.loggedInPlayer = null;
    }

    // this method registers a new player into the system
    public boolean registerPlayer(String username, String pwd, String region, String language) {

        // Checking if username is empty
        if (username == null || username.trim().isEmpty()) {
            System.out.println("ERROR: Username cannot be empty.");
            return false;
        }

        // Check if player already exists
        if (playerExists(username)) {
            System.out.println("ERROR: Username '" + username + "' is already taken.");
            return false;
        }

        // Add new player to the HashMaps
        try {
            Player newPlayer = new Player(username, pwd, region, language);
            players.put(username, newPlayer);
            // Password is already hashed in Player constructor, no need to store separately
            playerCount++;
        } catch (IllegalArgumentException e) {
            System.out.println("ERROR: " + e.getMessage());
            return false;
        }

        System.out.println("Registration complete! Welcome, " + username + "!");
        return true;
    }

    // Logs in a player by checking username and password
    public boolean loginPlayer(String username, String pwd) {

        // Check if player exists and verify password
        Player player = players.get(username);
        if (player == null) {
            System.out.println("ERROR: No account found for: " + username);
            return false;
        }

        // Verify password using secure hashing
        if (player.verifyPassword(pwd)) {
            loggedInPlayer = player;
            System.out.println("Login Successful! Welcome back, " + username + "!");
            return true;
        } else {
            System.out.println("ERROR: Incorrect password for: " + username);
            return false;
        }
    }

    // it logs out the currently logged in player
    public void logoutPlayer() {
        if (loggedInPlayer == null) {
            System.out.println("INFO: No player is currently logged in.");
            return;
        }
        System.out.println("INFO: Goodbye, " + loggedInPlayer.getUsername() + "!");
        loggedInPlayer = null;
    }

    /**
     * Returns a player by username using O(1) HashMap lookup.
     * 
     * @param username The username to search for
     * @return Player object if found, null otherwise
     */
    public Player getPlayer(String username) {
        return players.get(username);
    }

    // it returns the currently logged in player
    public Player getLoggedInPlayer() {
        return loggedInPlayer;
    }

    /**
     * Checks if a player with the given username exists.
     * Uses O(1) HashMap lookup for efficiency.
     * 
     * @param username The username to check
     * @return true if player exists, false otherwise
     */
    public boolean playerExists(String username) {
        return players.containsKey(username);
    }

    // Returning the total number of registered players
    public int getPlayerCount() {
        return playerCount;
    }

    /**
     * Method to print all registered players to the console.
     * Uses StringBuilder for efficient string concatenation.
     */
    public void listAllPlayers() {
        if (playerCount == 0) {
            System.out.println("INFO: No players registered yet.");
            return;
        }

        StringBuilder output = new StringBuilder();
        output.append("\n|===================================================|\n");
        output.append("|           ALL REGISTERED PLAYERS                  |\n");
        output.append("|===================================================|\n");
        
        for (Player player : players.values()) {
            output.append("  -> ").append(player.toString()).append("\n");
        }
        
        output.append("<===================================================>\n");
        System.out.print(output.toString());
    }
}