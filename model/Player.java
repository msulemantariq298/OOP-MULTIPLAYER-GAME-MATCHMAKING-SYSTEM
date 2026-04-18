/*
 -> Player.java
 -> Author: Muhammad Suleman Tariq (543505)
 
 -> This class represents a player in the matchmaking system.
    It stores player information including username, region, language,
    statistics (wins/losses), reputation score, and skill rating.
    Players can update their stats after matches and report other players.
 */

package model;

public class Player {
    private String username;
    private String passwordHash;
    private String region;
    private int wins;
    private int losses;
    private int gamesPlayed;
    private String preferredMode;
    private String language;
    private int reputationScore;
    private SkillRating rating;

    public Player(String username, String pwd, String region, String language) {
        this.username = username;
        this.passwordHash = pwd;
        this.region = region;
        this.language = language;
        this.wins = 0;
        this.losses = 0;
        this.gamesPlayed = 0;
        this.preferredMode = "Casual";
        this.reputationScore = 100;
        this.rating = new SkillRating(1200.0);
    }

    public String getUsername() {
        return username;
    }

    public SkillRating getRating() {
        return rating;
    }

    public String getRegion() {
        return region;
    }

    public void updateStats(boolean won) {
        gamesPlayed++;
        if (won) {
            wins++;
        } else {
            losses++;
        }
    }

    public String getLanguage() {
        return language;
    }

    public int getReputationScore() {
        return reputationScore;
    }

    public void deductReputation(int points) {
        reputationScore = Math.max(0, reputationScore - points);
    }

    public void reportPlayer(String reason) {
        // Just store/log the report - ReputationManager handles penalties
        System.out.println("[REPORT] " + username + " | Reason: " + reason);
    }
    
    public int getWins() { return wins; }
    
    public int getLosses() { return losses; }
    
    public int getGamesPlayed() { return gamesPlayed; }
    
    public String getPreferredMode() { return preferredMode; }
    
    public void setPreferredMode(String mode) { this.preferredMode = mode; }

    public String toString() {
        return username + " - " + rating + " - " + region + " - " + language;
    }
}

