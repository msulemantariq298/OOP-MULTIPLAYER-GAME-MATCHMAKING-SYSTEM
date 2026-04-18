package service;

import model.Player;
import model.GameMode;
import java.util.Queue;
import java.util.LinkedList;

public class MatchQueue {
    private Queue<Player> casualQueue;
    private Queue<Player> rankedQueue;
    private Queue<Player> tournamentQueue;

    public MatchQueue() {
        this.casualQueue = new LinkedList<>();
        this.rankedQueue = new LinkedList<>();
        this.tournamentQueue = new LinkedList<>();
    }

    public void addToQueue(Player player, GameMode mode) {
        // TODO: Implement queue logic based on mode
        if (mode instanceof model.CasualMode) {
            casualQueue.add(player);
        } else if (mode instanceof model.RankedMode) {
            rankedQueue.add(player);
        } else if (mode instanceof model.TournamentMode) {
            tournamentQueue.add(player);
        }
    }

    public Player removeFromQueue(GameMode mode) {
        if (mode instanceof model.CasualMode) {
            return casualQueue.poll();
        } else if (mode instanceof model.RankedMode) {
            return rankedQueue.poll();
        } else if (mode instanceof model.TournamentMode) {
            return tournamentQueue.poll();
        }
        return null;
    }
}
