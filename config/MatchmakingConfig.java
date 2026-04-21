package config;

/**
 * MatchmakingConfig — The Rulebook of the Entire Matchmaking System.
 *
 * All rules live here. If any rule needs to change in the future,
 * this is the ONLY file that needs to be touched.
 *
 * Rules are divided into:
 *   1. Player Preferences  — set by player when joining queue
 *   2. System Defaults     — hardcoded, player has no control
 *   3. Per-Mode Rules      — different rules for each game mode
 */
public class MatchmakingConfig {

    // =====================================================================
    // PLAYER PREFERENCES — Set by player when selecting match options
    // =====================================================================
    private boolean isSameRegion;     // true = only match players from same region
    private boolean isSameLanguage;   // true = only match players with same language

    // =====================================================================
    // SYSTEM DEFAULTS — Hardcoded rules, player cannot change these
    // =====================================================================

    private int queueTimeout;         // Max seconds a player waits before removed from queue
    private int banDurationHours;     // Hours a player is banned when reputation is too low

    // =====================================================================
    // REPUTATION RULES — Minimum reputation score required per game mode
    // =====================================================================

    private int minReputationCasual;      // Casual mode minimum reputation (relaxed)
    private int minReputationRanked;      // Ranked mode minimum reputation (strict)
    private int minReputationTournament;  // Tournament mode minimum reputation (strictest)

    // =====================================================================
    // PER-MODE SKILL TOLERANCE — How strict skill matching is per mode
    // =====================================================================

    private double rankedSkillTolerance;      // Strict  — tight skill gap only
    private double tournamentSkillTolerance;  // Medium  — balanced skill gap

    // =====================================================================
    // CONSTRUCTOR
    // Player passes their preferences, system defaults are hardcoded below
    // =====================================================================

    public MatchmakingConfig(boolean isSameRegion, boolean isSameLanguage) {

        // Player preferences
        this.isSameRegion       = isSameRegion;
        this.isSameLanguage     = isSameLanguage;

        // System defaults — never changed by player
        this.queueTimeout       = 60;   // 60 seconds max wait
        this.banDurationHours   = 24;   // 24 hour ban for low reputation

        // Reputation minimums per mode
        this.minReputationCasual     = 0;   // No minimum for casual
        this.minReputationRanked     = 30;  // Must have 30+ to play ranked
        this.minReputationTournament = 50;  // Must have 50+ to play tournament

        // Skill tolerance per mode
        this.rankedSkillTolerance     = 100.0; // Strict  — 100 point gap only
        this.tournamentSkillTolerance = 150.0; // Medium  — 150 point gap
    }

    // =====================================================================
    // GETTERS — Used by MatchmakingEngine to read the rules
    // =====================================================================

    public boolean isSameRegion()            { return isSameRegion; }
    public boolean isSameLanguage()          { return isSameLanguage; }
    public int getQueueTimeout()             { return queueTimeout; }
    public int getBanDurationHours()         { return banDurationHours; }
    public int getMinReputationCasual()      { return minReputationCasual; }
    public int getMinReputationRanked()      { return minReputationRanked; }
    public int getMinReputationTournament()  { return minReputationTournament; }
    public double getRankedSkillTolerance()      { return rankedSkillTolerance; }
    public double getTournamentSkillTolerance()  { return tournamentSkillTolerance; }

    // =====================================================================
    // SETTERS — Used to update rules safely with validation
    // [CONFIG] prefix in error messages helps us identify
    // which class threw the error during debugging
    // =====================================================================


    public void setSameRegion(boolean sameRegion)     { this.isSameRegion = sameRegion; }
    public void setSameLanguage(boolean sameLanguage) { this.isSameLanguage = sameLanguage; }

    public void setMinReputationRanked(int score) {
        // Reputation must be between 0 and 100
        if (score >= 0 && score <= 100) {
            this.minReputationRanked = score;
        } else {
            System.out.println("[CONFIG] Reputation score must be between 0 and 100.");
        }
    }

    public void setMinReputationTournament(int score) {
        if (score >= 0 && score <= 100) {
            this.minReputationTournament = score;
        } else {
            System.out.println("[CONFIG] Reputation score must be between 0 and 100.");
        }
    }

    public void setQueueTimeout(int queueTimeout){
        if(queueTimeout > 0){
            this.queueTimeout = queueTimeout;
        } else {
            System.out.println("[CONFIG] Queue timeout must be greater than 0");
        }
    }
    public void setBanDurationHours(int hours) {
        if (hours > 0) {
            this.banDurationHours = hours;
        } else {
            System.out.println("[CONFIG] Ban duration must be greater than 0.");
        }
    }

    // =====================================================================
    // DISPLAY — Print all current rules (useful for debugging)
    // =====================================================================

    @Override
    public String toString() {
        return  "========== MATCHMAKING CONFIG ==========\n" +
                "Same Region Required    : " + isSameRegion + "\n" +
                "Same Language Required  : " + isSameLanguage + "\n" +
                "Queue Timeout           : " + queueTimeout + " seconds\n" +
                "Ban Duration            : " + banDurationHours + " hours\n" +
                "Min Reputation (Casual) : " + minReputationCasual + "\n" +
                "Min Reputation (Ranked) : " + minReputationRanked + "\n" +
                "Min Reputation (Tourn.) : " + minReputationTournament + "\n" +
                "Skill Tolerance Ranked  : " + rankedSkillTolerance + "\n" +
                "Skill Tolerance Tourn.  : " + tournamentSkillTolerance + "\n" +
                "========================================";
    }
}
