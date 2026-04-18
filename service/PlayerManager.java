/*
 -> PlayerManager.java
 -> Author: Muhammad Talha Asif (576751)
 
 -> This class manages all player accounts in the matchmaking system.
    It handles registering new players, logging in, logging out,
    and looking up player profiles.
 */

package service;

import model.Player;

public class PlayerManager {

    // Simple arrays to store players and their passwords
    private Player[] players;
    private String[] passwords; // array parallel to "Player" array. players[0]'s password is always at passwords[0]
    private int playerCount;

    // The player who is currently logged in.
    private Player loggedInPlayer;

    // Constructor - sets up empty storage for up to 100 players
    public PlayerManager() {
        players = new Player[100];
        passwords = new String[100];
        playerCount = 0;
        loggedInPlayer = null;
    }

    // this method registers a new player into the system
    public boolean registerPlayer(String username, String pwd, String region, String language) {

        // Checking if username is empty
        if (username == null || username.trim().isEmpty()) {
            System.out.println("ERROR: Username cannot be empty.");
            return false;
        }

        // Checking if username is already taken
        if (playerExists(username)) {
            System.out.println("ERROR: Username '" + username + "' is already taken.");
            return false;
        }

        // Add new player to the array
        players[playerCount] = new Player(username, pwd, region, language);
        passwords[playerCount] = pwd;
        playerCount++;

        System.out.println("==>> Registration complete! Welcome, " + username+ "  <<==");
        return true;
    }

    // Logs in a player by checking username and password
    public boolean loginPlayer(String username, String pwd) {

        // Search for the player, continue with the code ONLY IF the user exists.
        for (int i = 0; i < playerCount; i++) {
            if (players[i].getUsername().equals(username)) {

                // Found the player, now check password
                if (passwords[i].equals(pwd)) {
                    loggedInPlayer = players[i];
                    System.out.println("Login Succesful! Welcome back, " + username + "!");
                    return true;
                } else {
                    System.out.println("ERROR: Incorrect password for: " + username);
                    return false;
                }
            }
        }

        // Player not found
        System.out.println("ERROR: No account found for: " + username);
        return false;
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

    // this method returns a player by username, it returns null if player is not found
    public Player getPlayer(String username) {
        for (int i = 0; i < playerCount; i++) {
            if (players[i].getUsername().equals(username)) {
                return players[i];
            }
        }
        return null;
    }

    // it returns the currently logged in player
    public Player getLoggedInPlayer() {
        return loggedInPlayer;
    }

    // Checking if a player with the given username exists
    public boolean playerExists(String username) {
        for (int i = 0; i < playerCount; i++) {
            if (players[i].getUsername().equals(username)) {
                return true;
            }
        }
        return false;
    }

    // Returning the total number of registered players
    public int getPlayerCount() {
        return playerCount;
    }

    // mehtod to print all registered players to the console
    public void listAllPlayers() {
        if (playerCount == 0) {
            System.out.println("INFO: No players registered yet.");
            return;
        }

        System.out.println("\n|===================================================|");
        System.out.println("|           ALL REGISTERED PLAYERS                  |");
        System.out.println("|===================================================|");
        for (int i = 0; i < playerCount; i++) {
            System.out.println("  -> " + players[i].toString());
        }
        System.out.println("<====================================================>\n");
    }
}