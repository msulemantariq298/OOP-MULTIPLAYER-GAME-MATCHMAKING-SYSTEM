package model;

public abstract class GameMode {
    private String modeName;
    private int minPlayers;
    private int maxPlayers;
    private double skillTolerance;
    private boolean ratingEnabled;


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
