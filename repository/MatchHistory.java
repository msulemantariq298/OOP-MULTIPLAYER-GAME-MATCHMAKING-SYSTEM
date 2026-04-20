package repository;

import model.*;
import java.util.*;

public class MatchHistory {
    private List<Match> allMatches;
    private Map<String, List<Match>> playerMatchHistory;
    private FileStorageManager storageManager;

    public MatchHistory() {
        this.allMatches = new ArrayList<>();
        this.playerMatchHistory = new HashMap<>();
        this.storageManager = new FileStorageManager();
    }

    public MatchHistory(FileStorageManager storageManager) {
        this.allMatches = new ArrayList<>();
        this.playerMatchHistory = new HashMap<>();
        this.storageManager = storageManager != null ? storageManager : new FileStorageManager();
    }

    public void recordMatch(Match match) throws IllegalArgumentException {
        if (match == null) {
            throw new IllegalArgumentException("Match cannot be null");
        }
        try {
            allMatches.add(match);
            List<Player> players = match.getPlayers();
            if (players != null) {
                for (Player player : players) {
                    if (player != null) {
                        String username = player.getUsername();
                        playerMatchHistory.putIfAbsent(username, new ArrayList<>());
                        playerMatchHistory.get(username).add(match);
                    }
                }
            }
            if (storageManager != null) {
                storageManager.saveMatch(match);
            }
        } catch (Exception e) {
            System.err.println("Error recording match: " + e.getMessage());
            throw new RuntimeException("Failed to record match", e);
        }
    }

    public List<Match> getPlayerMatchHistory(String username) throws IllegalArgumentException {
        if (username == null || username.trim().isEmpty()) {
            throw new IllegalArgumentException("Username cannot be null or empty");
        }
        return playerMatchHistory.getOrDefault(username, new ArrayList<>());
    }

    public List<Match> getAllMatches() {
        return new ArrayList<>(allMatches);
    }

    public int getTotalMatchesCount() {
        return allMatches.size();
    }

    public int getPlayerMatchCount(String username) throws IllegalArgumentException {
        if (username == null || username.trim().isEmpty()) {
            throw new IllegalArgumentException("Username cannot be null or empty");
        }
        List<Match> matches = playerMatchHistory.getOrDefault(username, new ArrayList<>());
        return matches.size();
    }

    public int getPlayerWinsCount(String username) throws IllegalArgumentException {
        if (username == null || username.trim().isEmpty()) {
            throw new IllegalArgumentException("Username cannot be null or empty");
        }
        List<Match> matches = playerMatchHistory.getOrDefault(username, new ArrayList<>());
        int wins = 0;
        for (Match match : matches) {
            if (match != null && match.getWinnerId() != null && match.getWinnerId().equals(username)) {
                wins++;
            }
        }
        return wins;
    }

    public int getPlayerLossesCount(String username) throws IllegalArgumentException {
        if (username == null || username.trim().isEmpty()) {
            throw new IllegalArgumentException("Username cannot be null or empty");
        }
        List<Match> matches = playerMatchHistory.getOrDefault(username, new ArrayList<>());
        return matches.size() - getPlayerWinsCount(username);
    }

    public List<Match> getMatchesByMode(GameMode mode) throws IllegalArgumentException {
        if (mode == null) {
            throw new IllegalArgumentException("Game mode cannot be null");
        }
        List<Match> modeMatches = new ArrayList<>();
        try {
            for (Match match : allMatches) {
                if (match != null && match.getMode() != null && match.getMode().equals(mode)) {
                    modeMatches.add(match);
                }
            }
        } catch (Exception e) {
            System.err.println("Error filtering matches by mode: " + e.getMessage());
        }
        return modeMatches;
    }

    public List<Match> getRecentMatches(int count) throws IllegalArgumentException {
        if (count < 0) {
            throw new IllegalArgumentException("Count cannot be negative");
        }
        List<Match> recent = new ArrayList<>(allMatches);
        if (recent.size() > count) {
            return recent.subList(recent.size() - count, recent.size());
        }
        return recent;
    }

    public List<Match> getPlayerRecentMatches(String username, int count) throws IllegalArgumentException {
        if (username == null || username.trim().isEmpty()) {
            throw new IllegalArgumentException("Username cannot be null or empty");
        }
        if (count < 0) {
            throw new IllegalArgumentException("Count cannot be negative");
        }
        List<Match> playerMatches = getPlayerMatchHistory(username);
        if (playerMatches.size() > count) {
            return playerMatches.subList(playerMatches.size() - count, playerMatches.size());
        }
        return playerMatches;
    }

    public void clearHistory() {
        try {
            allMatches.clear();
            playerMatchHistory.clear();
            if (storageManager != null) {
                storageManager.clearAllData();
            }
        } catch (Exception e) {
            System.err.println("Error clearing history: " + e.getMessage());
        }
    }

    public void loadHistoryFromStorage() {
        try {
            if (storageManager != null) {
                List<Match> storedMatches = storageManager.loadAllMatches();
                if (storedMatches != null) {
                    allMatches.clear();
                    playerMatchHistory.clear();
                    for (Match match : storedMatches) {
                        if (match != null) {
                            allMatches.add(match);
                            List<Player> players = match.getPlayers();
                            if (players != null) {
                                for (Player player : players) {
                                    if (player != null) {
                                        String username = player.getUsername();
                                        playerMatchHistory.putIfAbsent(username, new ArrayList<>());
                                        playerMatchHistory.get(username).add(match);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("Error loading history from storage: " + e.getMessage());
        }
    }

    public double getAverageMatchDuration(String username) throws IllegalArgumentException {
        if (username == null || username.trim().isEmpty()) {
            throw new IllegalArgumentException("Username cannot be null or empty");
        }
        List<Match> matches = getPlayerMatchHistory(username);
        if (matches.isEmpty()) {
            return 0;
        }
        
        long totalDuration = 0;
        try {
            for (Match match : matches) {
                if (match != null) {
                    totalDuration += match.getDurationSeconds();
                }
            }
            return (double) totalDuration / matches.size();
        } catch (Exception e) {
            System.err.println("Error calculating average duration: " + e.getMessage());
            return 0;
        }
    }

    @Override
    public String toString() {
        return "MatchHistory{" +
                "totalMatches=" + allMatches.size() +
                ", playersTracked=" + playerMatchHistory.size() +
                '}';
    }
}
