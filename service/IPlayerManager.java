/*
 -> IPlayerManager.java
 -> Author: Muhammad Suleman Tariq (543505)
 
 -> Interface defining the contract for player management operations.
    This follows the Interface Segregation Principle and allows for
    different implementations of player management functionality.
 */

package service;

import model.Player;

/**
 * Interface for player management operations.
 * Defines the contract that all PlayerManager implementations must follow.
 */
public interface IPlayerManager {
    
    /**
     * Registers a new player in the system.
     * 
     * @param username The player's username
     * @param password The player's password
     * @param region The player's region
     * @param language The player's preferred language
     * @return true if registration successful, false otherwise
     */
    boolean registerPlayer(String username, String password, String region, String language);
    
    /**
     * Logs in a player with username and password verification.
     * 
     * @param username The player's username
     * @param password The player's password
     * @return true if login successful, false otherwise
     */
    boolean loginPlayer(String username, String password);
    
    /**
     * Logs out the currently logged in player.
     */
    void logoutPlayer();
    
    /**
     * Retrieves a player by username.
     * 
     * @param username The username to search for
     * @return Player object if found, null otherwise
     */
    Player getPlayer(String username);
    
    /**
     * Returns the currently logged in player.
     * 
     * @return Currently logged in player, null if none
     */
    Player getLoggedInPlayer();
    
    /**
     * Checks if a player with the given username exists.
     * 
     * @param username The username to check
     * @return true if player exists, false otherwise
     */
    boolean playerExists(String username);
    
    /**
     * Returns the total number of registered players.
     * 
     * @return Number of registered players
     */
    int getPlayerCount();
    
    /**
     * Lists all registered players in a formatted display.
     */
    void listAllPlayers();
}
