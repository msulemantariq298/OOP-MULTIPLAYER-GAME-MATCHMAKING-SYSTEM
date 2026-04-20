package repository;

import model.*;
import java.io.*;
import java.util.*;

public class FileStorageManager {
    private String dataDirectory;
    private String playersFile;
    private String matchesFile;
    private String reputationFile;

    public FileStorageManager() {
        this.dataDirectory = "data/";
        this.playersFile = dataDirectory + "players.dat";
        this.matchesFile = dataDirectory + "matches.dat";
        this.reputationFile = dataDirectory + "reputation.dat";
        initializeDirectory();
    }

    public FileStorageManager(String directory) {
        this.dataDirectory = directory.endsWith("/") ? directory : directory + "/";
        this.playersFile = dataDirectory + "players.dat";
        this.matchesFile = dataDirectory + "matches.dat";
        this.reputationFile = dataDirectory + "reputation.dat";
        initializeDirectory();
    }

    private void initializeDirectory() {
        try {
            File dir = new File(dataDirectory);
            if (!dir.exists()) {
                if (dir.mkdirs()) {
                    System.out.println("Data directory created: " + dataDirectory);
                }
            }
        } catch (Exception e) {
            System.err.println("Error initializing directory: " + e.getMessage());
        }
    }

    public boolean savePlayer(Player player) {
        if (player == null) {
            System.err.println("Cannot save null player");
            return false;
        }
        try {
            FileOutputStream fos = new FileOutputStream(playersFile, true);
            ObjectOutputStream oos = new ObjectOutputStream(fos);
            oos.writeObject(player);
            oos.close();
            fos.close();
            return true;
        } catch (IOException e) {
            System.err.println("Error saving player: " + e.getMessage());
            return false;
        }
    }

    public boolean saveMatch(Match match) {
        if (match == null) {
            System.err.println("Cannot save null match");
            return false;
        }
        try {
            FileOutputStream fos = new FileOutputStream(matchesFile, true);
            ObjectOutputStream oos = new ObjectOutputStream(fos);
            oos.writeObject(match);
            oos.close();
            fos.close();
            return true;
        } catch (IOException e) {
            System.err.println("Error saving match: " + e.getMessage());
            return false;
        }
    }

    public List<Player> loadAllPlayers() {
        List<Player> players = new ArrayList<>();
        try {
            File file = new File(playersFile);
            if (!file.exists()) {
                return players;
            }
            
            FileInputStream fis = new FileInputStream(file);
            ObjectInputStream ois = new ObjectInputStream(fis);
            
            try {
                while (true) {
                    Object obj = ois.readObject();
                    if (obj instanceof Player) {
                        players.add((Player) obj);
                    }
                }
            } catch (EOFException e) {
                // End of file reached
            } finally {
                ois.close();
                fis.close();
            }
        } catch (IOException | ClassNotFoundException e) {
            System.err.println("Error loading players: " + e.getMessage());
        }
        return players;
    }

    public List<Match> loadAllMatches() {
        List<Match> matches = new ArrayList<>();
        try {
            File file = new File(matchesFile);
            if (!file.exists()) {
                return matches;
            }
            
            FileInputStream fis = new FileInputStream(file);
            ObjectInputStream ois = new ObjectInputStream(fis);
            
            try {
                while (true) {
                    Object obj = ois.readObject();
                    if (obj instanceof Match) {
                        matches.add((Match) obj);
                    }
                }
            } catch (EOFException e) {
                // End of file reached
            } finally {
                ois.close();
                fis.close();
            }
        } catch (IOException | ClassNotFoundException e) {
            System.err.println("Error loading matches: " + e.getMessage());
        }
        return matches;
    }

    public Player loadPlayer(String username) {
        if (username == null || username.trim().isEmpty()) {
            System.err.println("Username cannot be null or empty");
            return null;
        }
        try {
            List<Player> players = loadAllPlayers();
            for (Player player : players) {
                if (player != null && player.getUsername().equals(username)) {
                    return player;
                }
            }
        } catch (Exception e) {
            System.err.println("Error loading player: " + e.getMessage());
        }
        return null;
    }

    public boolean deletePlayer(String username) {
        if (username == null || username.trim().isEmpty()) {
            System.err.println("Username cannot be null or empty");
            return false;
        }
        try {
            List<Player> players = loadAllPlayers();
            players.removeIf(p -> p != null && p.getUsername().equals(username));
            
            File file = new File(playersFile);
            if (file.exists() && !file.delete()) {
                System.err.println("Failed to delete existing players file");
                return false;
            }
            
            FileOutputStream fos = new FileOutputStream(playersFile);
            ObjectOutputStream oos = new ObjectOutputStream(fos);
            for (Player player : players) {
                if (player != null) {
                    oos.writeObject(player);
                }
            }
            oos.close();
            fos.close();
            return true;
        } catch (IOException e) {
            System.err.println("Error deleting player: " + e.getMessage());
            return false;
        }
    }

    public boolean updatePlayer(Player player) {
        if (player == null) {
            System.err.println("Cannot update null player");
            return false;
        }
        try {
            List<Player> players = loadAllPlayers();
            boolean found = false;
            for (int i = 0; i < players.size(); i++) {
                if (players.get(i) != null && players.get(i).getUsername().equals(player.getUsername())) {
                    players.set(i, player);
                    found = true;
                    break;
                }
            }
            
            if (!found) {
                players.add(player);
            }
            
            File file = new File(playersFile);
            if (file.exists() && !file.delete()) {
                System.err.println("Failed to delete existing players file");
                return false;
            }
            
            FileOutputStream fos = new FileOutputStream(playersFile);
            ObjectOutputStream oos = new ObjectOutputStream(fos);
            for (Player p : players) {
                if (p != null) {
                    oos.writeObject(p);
                }
            }
            oos.close();
            fos.close();
            return true;
        } catch (IOException e) {
            System.err.println("Error updating player: " + e.getMessage());
            return false;
        }
    }

    public boolean clearAllData() {
        try {
            File playersData = new File(playersFile);
            File matchesData = new File(matchesFile);
            File reputationData = new File(reputationFile);
            
            boolean playersDeleted = !playersData.exists() || playersData.delete();
            boolean matchesDeleted = !matchesData.exists() || matchesData.delete();
            boolean reputationDeleted = !reputationData.exists() || reputationData.delete();
            
            return playersDeleted && matchesDeleted && reputationDeleted;
        } catch (Exception e) {
            System.err.println("Error clearing data: " + e.getMessage());
            return false;
        }
    }

    public long getFileSize(String fileType) {
        try {
            String filepath = fileType.equalsIgnoreCase("players") ? playersFile :
                            fileType.equalsIgnoreCase("matches") ? matchesFile :
                            fileType.equalsIgnoreCase("reputation") ? reputationFile : "";
            
            if (filepath.isEmpty()) {
                throw new IllegalArgumentException("Invalid file type");
            }
            
            File file = new File(filepath);
            if (file.exists()) {
                return file.length();
            }
            return 0;
        } catch (Exception e) {
            System.err.println("Error getting file size: " + e.getMessage());
            return -1;
        }
    }

    public boolean fileExists(String fileType) {
        try {
            String filepath = fileType.equalsIgnoreCase("players") ? playersFile :
                            fileType.equalsIgnoreCase("matches") ? matchesFile :
                            fileType.equalsIgnoreCase("reputation") ? reputationFile : "";
            
            if (filepath.isEmpty()) {
                throw new IllegalArgumentException("Invalid file type");
            }
            
            return new File(filepath).exists();
        } catch (Exception e) {
            System.err.println("Error checking file existence: " + e.getMessage());
            return false;
        }
    }

    public int getPlayerCount() {
        try {
            return loadAllPlayers().size();
        } catch (Exception e) {
            System.err.println("Error getting player count: " + e.getMessage());
            return 0;
        }
    }

    public int getMatchCount() {
        try {
            return loadAllMatches().size();
        } catch (Exception e) {
            System.err.println("Error getting match count: " + e.getMessage());
            return 0;
        }
    }

    public String getDataDirectory() {
        return dataDirectory;
    }

    @Override
    public String toString() {
        return "FileStorageManager{" +
                "dataDirectory='" + dataDirectory + '\'' +
                ", playersFile='" + playersFile + '\'' +
                ", matchesFile='" + matchesFile + '\'' +
                ", reputationFile='" + reputationFile + '\'' +
                '}';
    }
}
