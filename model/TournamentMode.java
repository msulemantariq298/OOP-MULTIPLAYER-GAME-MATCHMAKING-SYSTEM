/*
 -> TournamentMode.java
 -> Author: Muhammad Suleman Tariq (543505)
 
 -> This class implements tournament game mode for competitive play.
    Tournament mode manages bracket-based matches with power-of-2
    player requirements, strict skill balancing, and higher
    reputation thresholds for tournament eligibility.
 */

package model;

public class TournamentMode extends GameMode {
    private int bracketSize;
    private int currentRound;
    
    public TournamentMode(int bracketSize) {
        super("Tournament", 2, bracketSize);
        this.bracketSize = bracketSize;
        this.currentRound = 1;
    }
    
    @Override
    public boolean applyMatchRules(Player... players) {
        // Tournament mode has specific bracket requirements
        if (players == null || players.length < 2) {
            return false;
        }
        
        // Check if player count matches bracket requirements
        int playerCount = players.length;
        if (playerCount < 2 || playerCount > bracketSize) {
            return false;
        }
        
        // For tournaments, we need power of 2 players for proper brackets
        // Check if current round requires specific player count
        int expectedPlayers = (int) Math.pow(2, currentRound);
        if (playerCount != expectedPlayers && playerCount != bracketSize) {
            return false;
        }
        
        // Check all players meet minimum requirements
        for (Player player : players) {
            // Minimum reputation for tournament play (50/100)
            if (player.getReputationScore() < 50) {
                return false;
            }
            
            // Rating must be within tournament range
            if (player.getRating().getValue() < 1100 || player.getRating().getValue() > 2400) {
                return false;
            }
        }
        
        // Check skill balance - tournaments require tighter skill matching
        double minRating = Double.MAX_VALUE;
        double maxRating = Double.NEGATIVE_INFINITY;
        
        for (Player player : players) {
            double rating = player.getRating().getValue();
            minRating = Math.min(minRating, rating);
            maxRating = Math.max(maxRating, rating);
        }
        
        // Skill difference should be within reasonable tournament range
        double skillDifference = maxRating - minRating;
        if (skillDifference > getSkillTolerance() * 1.5) {
            return false;
        }
        
        return true;
    }
    
    public void advanceRound() {
        this.currentRound++;
    }
    
    public int getBracketSize() {
        return bracketSize;
    }
}