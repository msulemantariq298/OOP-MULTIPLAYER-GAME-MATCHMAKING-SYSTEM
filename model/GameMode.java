/*
 -> GameMode.java
 -> Author: Muhammad Suleman Tariq (543505)
 
 -> This abstract class defines the structure for different game modes
    in the matchmaking system. It provides common properties like
    mode name, player limits, skill tolerance, and rating settings.
    Each concrete mode must implement applyMatchRules() method.
 */

package model;

import java.io.Serializable;

public abstract class GameMode implements Serializable {
    protected String modeName;
    protected int minPlayers;
    protected int maxPlayers;
    protected double skillTolerance;
    protected boolean ratingEnabled;


    public GameMode(String name, int minP, int maxP) {
        this.modeName = name;
        this.minPlayers = minP;
        this.maxPlayers = maxP;
        this.skillTolerance = 100;
        this.ratingEnabled = true;
    }
        
    public String getModeName() {
        return modeName;
    }
        
    public double getSkillTolerance() {
        return skillTolerance;
    }
        
    public boolean isRatingEnabled() {
        return ratingEnabled;
    }
        
    public abstract boolean applyMatchRules(Player... players);

    public String toString() {
        return modeName;
    }
}
