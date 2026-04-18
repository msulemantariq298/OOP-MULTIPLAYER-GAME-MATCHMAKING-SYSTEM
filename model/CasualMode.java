package model;

public class CasualMode extends GameMode {
    private boolean quickMatchEnabled;
    
    public CasualMode() {
        super("Casual", 1, 10);
        this.quickMatchEnabled = true;
    }
    
    @Override
    public boolean applyMatchRules(Player... players) {
        // Implementation for casual match rules
        return true;
    }
    
    public void enableQuickMatch() {
        this.quickMatchEnabled = true;
    }
}
