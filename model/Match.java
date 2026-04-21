/*
 -> Match.java
 -> Author: Muhammad Suleman Tariq (543505)
 
 -> This class represents a match between players in the matchmaking system.
    It stores match information including players, game mode, status,
    timestamps, and winner. Matches can be started, ended, and
    their duration can be calculated.
 */

package model;

import java.util.List;
import java.io.Serializable;

public class Match implements Serializable {
    private String matchId;
    private List<Player> players;
    private GameMode mode;
    private String status;
    private long startTime;
    private long endTime;
    private String winnerId;
    
    public Match(String id, List<Player> players, GameMode mode) {
        this.matchId = id;
        this.players = players;
        this.mode = mode;
        this.status = "pending";
        this.startTime = System.currentTimeMillis();
    }
    
    public String getMatchId() {
        return matchId;
    }
    
    public void start() {
        this.status = "in_progress";
    }

    public void end(String winnerId) {
        this.status = "completed";
        this.endTime = System.currentTimeMillis();
        this.winnerId = winnerId;
    }

    public String getStatus() {
        return status;
    }
    
    public List<Player> getPlayers() {
        return players;
    }
    
    public String getWinnerId() {
        return winnerId;
    }
    
    public GameMode getMode() {
        return mode;
    }
    
    public long getStartTime() {
        return startTime;
    }
    
    public long getDurationSeconds() {
        return (endTime - startTime) / 1000;
    }
    
    public void setEndTime(long endTime) {
        this.endTime = endTime;
    }
    
    public String toString() {
        return "Match " + matchId + " - " + status;
    }
}
