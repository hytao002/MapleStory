import(Packages.constants);
function enter(pi) {
    try {
        var eim = pi.getEventInstance();
        if (eim != null && eim.getProperty("stage2").equals("3")) {
            pi.giveExp(eim.getClearStageExp(2) * pi.getPlayer().getExpRate() * ServerConstants.PQ_EXP_MOD);
            pi.warp(925100200,0); //next
            return(true);
        } else {
            pi.playerMessage(5, "The portal is not opened yet.");
            return(false);
        }
    } catch(e) {
        pi.playerMessage(5, "Error: " + e);
    }
 
    return(false);
}