/*
 -> IReputationManager.java
 -> Author: Muhammad Suleman Tariq (543505)
 
 -> Interface defining the contract for reputation management operations.
    This follows the Interface Segregation Principle and allows for
    different implementations of reputation management functionality.
 */

package service;

import model.Player;

/**
 * Interface for reputation management operations.
 * Defines the contract that all ReputationManager implementations must follow.
 */
public interface IReputationManager {
    
    /**
     * Processes a report against a player and deducts reputation points.
     * 
     * @param reported The player being reported
     * @param reporter The player making the report
     * @param reason The reason for the report
     */
    void reportPlayer(Player reported, Player reporter, String reason);
    
    /**
     * Checks if a player has reputation score below the minimum threshold.
     * 
     * @param player The player to check
     * @return true if player is below threshold, false otherwise
     */
    boolean isBelowThreshold(Player player);
    
    /**
     * Checks if two players are compatible for matchmaking based on reputation and language.
     * 
     * @param player1 First player
     * @param player2 Second player
     * @return true if players are compatible, false otherwise
     */
    boolean areCompatible(Player player1, Player player2);
    
    /**
     * Gets the minimum reputation score required.
     * 
     * @return Minimum reputation score
     */
    int getMinimumReputationScore();
    
    /**
     * Sets the minimum reputation score required.
     * 
     * @param score The new minimum reputation score
     */
    void setMinimumReputationScore(int score);
}
