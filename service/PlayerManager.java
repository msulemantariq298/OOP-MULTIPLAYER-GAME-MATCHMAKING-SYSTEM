package service;

import model.Player;
import java.util.HashMap;
import java.util.Map;

public class PlayerManager {
    private Map<String, Player> players;

    public PlayerManager() {
        this.players = new HashMap<>();
    }

    public Player login(String username, String password) {
       
        return players.get(username);
    }

    public boolean register(Player player) {
        if (players.containsKey(player.getUsername())) {
            return false; // Username already exists
        }
        players.put(player.getUsername(), player);
        return true;
    }

    public Player getPlayer(String username) {
        return players.get(username);
    }
}
