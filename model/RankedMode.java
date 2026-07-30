/*
 -> RankedMode.java
 -> Author: Muhammad Suleman Tariq (543505)
 
 -> This class implements ranked game mode for competitive matchmaking.
    Ranked mode enforces strict 1v1 matches, requires minimum
    reputation scores, and uses skill-based matching. Players must
    complete placement matches and maintain good reputation.
 */

package model;

public class RankedMode extends GameMode {
    private int placementMatches;
    private String divisionName;
    
    public RankedMode() {
        super("Ranked", 2, 2);
        this.placementMatches = 5;
        this.divisionName = "Bronze";
    }
    
    @Override
    public boolean applyMatchRules(Player... players) {
        // Ranked mode has stricter rules - 1v1 matches
        if (players == null || players.length != 2) {
            return false;
        }
        
        // Check both players meet requirements
        for (Player player : players) {
            // Check if player has completed placement matches
            if (Math.abs(player.getRating().getValue() - 1200.0) < 0.001 && placementMatches > 0) {
                // Player is still in placement phase
                continue;
            }
            
            // Check minimum reputation score for ranked play (30/100)
            if (player.getReputationScore() < 30) {
                return false;
            }
            
            // Check rating is within valid range
            if (player.getRating().getValue() < 1000 || player.getRating().getValue() > 2500) {
                return false;
            }
        }
        
        // Check skill compatibility between the two players
        if (!players[0].getRating().isWithinRange(players[1].getRating(), getSkillTolerance())) {
            return false;
        }
        
        return true;
    }
    
    public String getDivision() {
        return divisionName;
    }
}
