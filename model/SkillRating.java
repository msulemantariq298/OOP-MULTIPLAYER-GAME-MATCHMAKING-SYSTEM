/*
 -> SkillRating.java
 -> Author: Muhammad Suleman Tariq (543505)
 
 -> This class implements the Elo rating system for player skill ratings.
    It handles rating updates based on match outcomes, bounds checking,
    and skill range validation for matchmaking. Uses standard Elo formula
    with configurable k-factor and rating limits.
 */

package model;

import java.io.Serializable;

public class SkillRating implements Serializable {
    private double ratingValue;
    private double minRating;
    private double maxRating;
    private double kFactor;

    public SkillRating(double initial) {
        this.ratingValue = initial;
        this.minRating = 1000;
        this.maxRating = 2500;
        this.kFactor = 32;
    }
    
    public double getValue() {
        return ratingValue;
    }
    
    public void updateRating(boolean won, SkillRating oppRating) {
        // Calculate expected score using Elo formula
        double expectedScore = 1.0 / (1.0 + Math.pow(10.0, (oppRating.getValue() - this.ratingValue) / 400.0));
        
        // Actual score (1 for win, 0 for loss)
        double actualScore = won ? 1.0 : 0.0;
        
        // Calculate new rating using Elo formula
        double ratingChange = kFactor * (actualScore - expectedScore);
        this.ratingValue += ratingChange;
        
        // Ensure rating stays within bounds
        this.ratingValue = Math.max(minRating, Math.min(maxRating, ratingValue));
    }
    
    public boolean isWithinRange(SkillRating other, double tol) {
        return Math.abs(ratingValue - other.ratingValue) <= tol;
    }
    
    public String toString() {
        return String.valueOf(ratingValue);
    }
}
