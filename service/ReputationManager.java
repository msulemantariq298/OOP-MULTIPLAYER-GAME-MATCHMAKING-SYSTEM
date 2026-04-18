/*
 -> ReputationManager.java
 -> Author: Muhammad Talha Asif (576751)
 
 -> This class is responsible for managing player reputation in the
    matchmaking system. It processes reports, deducts reputation points,
    flags restricted players, and checks if two players are compatible
    based on reputation and language.
 */

package service;

import model.Player;

public class ReputationManager {

    // minimum score needed to play normally
    private int minimumReputationScore;

    // points deducted from a player each time they are reported
    private int deductionPerReport;

    // Constructor, gets the minimum reputation score   
    public ReputationManager(int minimumReputationScore) {
        this.minimumReputationScore = minimumReputationScore;
        this.deductionPerReport = 10;
    }

    // Processes a report against a player and deducts their reputation
    public void reportPlayer(Player reported, Player reporter, String reason) {

        System.out.println("\n REPORT FILED ");
        System.out.println("  Reporter : " + reporter.getUsername());
        System.out.println("  Reported : " + reported.getUsername());
        System.out.println("  Reason   : " + reason);

        // Deduct reputation points
        reported.deductReputation(deductionPerReport);

        System.out.println("  Reputation after report: "
                + reported.getReputationScore() + "/100");

        // Flag the player if they dropped below the minimum
        if (isBelowThreshold(reported)) {
            flagPlayer(reported);
        }
    }

    // Checks if a player has too low reputation score to play in normal matches
    // Returns true if they are restricted, returns false if they are fine
    public boolean isBelowThreshold(Player p) {
        return p.getReputationScore() < minimumReputationScore;
    }

    // Checks if two players can be matched together
    // Rule 1: Both must be above minimum reputation
    // Rule 2: Both must speak the same language
    public boolean areCompatible(Player p1, Player p2) {

        // Step 1: Check if the first player has acceptable reputation
        if (isBelowThreshold(p1)) {
            System.out.println("WARNING: " + p1.getUsername()
                    + " has low reputation (" + p1.getReputationScore()
                    + "/" + minimumReputationScore + " min). Cannot be matched.");
            return false;
        }

        // Step 2: Check if the second player has acceptable reputation
        if (isBelowThreshold(p2)) {
            System.out.println("WARNING: " + p2.getUsername()
                    + " has low reputation (" + p2.getReputationScore()
                    + "/" + minimumReputationScore + " min). Cannot be matched.");
            return false;
        }

        // Step 3: Make sure both players speak the same language
        if (!p1.getLanguage().equalsIgnoreCase(p2.getLanguage())) {
            System.out.println("WARNING! Language mismatch: "
                    + p1.getUsername() + " speaks " + p1.getLanguage()
                    + ", " + p2.getUsername() + " speaks " + p2.getLanguage());
            return false;
        }

        // All checks passed - these players are compatible and can be matched
        return true;
    }

    // Prints a warning when a player gets flagged for low reputation
    private void flagPlayer(Player p) {
        System.out.println("\n*** WARNING! *** : " + p.getUsername() + " has been restricted due to low reputation!");
        System.out.println("  Current Score : " + p.getReputationScore());
        System.out.println("  Minimum Score : " + minimumReputationScore);
        System.out.println("  Status        : Restricted from normal matchmaking.");
    }

    // Getter and setter for minimum reputation score
    public int getMinimumReputationScore() {
        return minimumReputationScore;
    }

    public void setMinimumReputationScore(int score) {
        this.minimumReputationScore = score;
    }
}