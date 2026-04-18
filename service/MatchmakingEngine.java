package service;

import model.*;
import java.util.List;
import java.util.ArrayList;

public class MatchmakingEngine {
    private MatchQueue matchQueue;

    public MatchmakingEngine() {
        this.matchQueue = new MatchQueue();
    }

    public Match findMatch(Player player, GameMode mode) {
        // TODO: Implement actual matchmaking algorithm
        List<Player> players = new ArrayList<>();
        players.add(player);
        // Add dummy opponent
        players.add(new Player("AI_Opponent", "pwd", "US", "English"));

        String matchId = "MATCH_" + System.currentTimeMillis();
        return new Match(matchId, players, mode);
    }
}
