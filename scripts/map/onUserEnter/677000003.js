importPackage(Packages.server.life);

function start(ms) {

	var mobId = 9400610;
	var player = ms.getPlayer();
	var map = player.getMap();

	if(map.getMonsterById(mobId) != null){
		return;   	       
	}

	map.spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(mobId), new java.awt.Point(461, 61));
	player.message("Amdusias has appeared!");
}