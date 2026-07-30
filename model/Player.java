/*
 -> Player.java
 -> Author: Muhammad Suleman Tariq (543505)
 
 -> This class represents a player in the matchmaking system.
    It stores player information including username, region, language,
    statistics (wins/losses), reputation score, and skill rating.
    Players can update their stats after matches and report other players.
 */

package model;

import util.PasswordHasher;
import java.io.Serializable;

public class Player implements Serializable {
    private String username;
    private String passwordHash; // Now actually stores hashed password
    private String region;
    private int wins;
    private int losses;
    private int gamesPlayed;
    private String preferredMode;
    private String language;
    private int reputationScore;
    private SkillRating rating;

    /**
     * Creates a new player with secure password hashing.
     * 
     * @param username The player's username (must not be null/empty)
     * @param pwd The player's password (must be at least 8 characters)
     * @param region The player's region
     * @param language The player's preferred language
     * @throws IllegalArgumentException if username is null/empty or password is too weak
     */
    public Player(String username, String pwd, String region, String language) {
        if (username == null || username.trim().isEmpty()) {
            throw new IllegalArgumentException("Username cannot be null or empty");
        }
        if (!PasswordHasher.isPasswordStrong(pwd)) {
            throw new IllegalArgumentException("Password must be at least 8 characters with uppercase, lowercase, and digit");
        }
        
        this.username = username.trim();
        this.passwordHash = PasswordHasher.hashPassword(pwd);
        this.region = region != null ? region.trim() : "Unknown";
        this.language = language != null ? language.trim() : "English";
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

    public boolean verifyPassword(String password) {
        return PasswordHasher.verifyPassword(password, this.passwordHash);
    }

    public boolean updatePassword(String newPassword) {
        if (!PasswordHasher.isPasswordStrong(newPassword)) {
            throw new IllegalArgumentException("Password must be at least 8 characters with uppercase, lowercase, and digit");
        }
        this.passwordHash = PasswordHasher.hashPassword(newPassword);
        return true;
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
    
    public void setRegion(String region) { 
        if (region != null && !region.trim().isEmpty()) {
            this.region = region.trim(); 
        }
    }
    
    public void setLanguage(String language) { 
        if (language != null && !language.trim().isEmpty()) {
            this.language = language.trim(); 
        }
    }

    /**
     * Returns a string representation of the player (excluding sensitive data).
     * 
     * @return Player summary string
     */
    public String toString() {
        return String.format("Player[%s, Rating=%.0f, Region=%s, Language=%s, Wins=%d, Losses=%d, Reputation=%d]", 
                username, rating.getValue(), region, language, wins, losses, reputationScore);
    }
    
    /**
     * Returns a detailed player profile.
     * 
     * @return Detailed player information
     */
    public String getProfile() {
        return String.format("=== Player Profile ===\n" +
                "Username: %s\n" +
                "Region: %s\n" +
                "Language: %s\n" +
                "Rating: %.0f\n" +
                "Games Played: %d\n" +
                "Wins: %d\n" +
                "Losses: %d\n" +
                "Win Rate: %.1f%%\n" +
                "Reputation: %d/100\n" +
                "Preferred Mode: %s",
                username, region, language, rating.getValue(), gamesPlayed, wins, losses,
                gamesPlayed > 0 ? (wins * 100.0 / gamesPlayed) : 0.0,
                reputationScore, preferredMode);
    }
}

