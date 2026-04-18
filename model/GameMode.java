package model;

public abstract class GameMode {
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
