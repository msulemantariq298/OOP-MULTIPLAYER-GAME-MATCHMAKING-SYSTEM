/*
 -> CasualMode.java
 -> Author: Muhammad Suleman Tariq (543505)
 
 -> This class implements casual game mode for matchmaking.
    Casual mode has relaxed skill matching, supports quick match,
    and does not affect player ratings. Allows 1-10 players
    with wider skill tolerance than other modes.
 */

package model;

public class CasualMode extends GameMode {
    private boolean quickMatchEnabled;
    
    public CasualMode() {
        super("Casual", 1, 10);
        this.quickMatchEnabled = true;
        this.ratingEnabled = false;
    }
    
    @Override
    public boolean applyMatchRules(Player... players) {
        // Casual mode is more relaxed - only basic checks
        if (players == null || players.length == 0) {
            return false;
        }
        
        // Check player count is within limits
        int playerCount = players.length;
        if (playerCount < 1 || playerCount > 10) {
            return false;
        }
        
        // In casual mode, skill differences are more tolerated
        // Check if players are within reasonable skill range (wider tolerance)
        for (int i = 0; i < players.length - 1; i++) {
            for (int j = i + 1; j < players.length; j++) {
                if (!players[i].getRating().isWithinRange(players[j].getRating(), getSkillTolerance() * 2)) {
                    return false;
                }
            }
        }
        
        return true;
    }
    
    public void enableQuickMatch() {
        this.quickMatchEnabled = true;
    }
}
