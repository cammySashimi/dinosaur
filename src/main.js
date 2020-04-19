/*
 * ROCKET PATROL MOD:
 * SUPER DINOSAUR REHYDRATOR 3000
 * 
 * Changes:
 * + Rethemed to be a game about shooting water at dinosaur sponges to rehydrate
 *   them (50 pts)
 * + Simultaneous play for 1-4 players (50 pts)
 * + Bullets added instead of rocket moving
 * + Sprite rendering method replaced with texture atlas
 * 
 * */


let config = {
	type: Phaser.CANVAS,
	width: 640,
	height: 480,
	scene: [Menu, Play]
}

let game = new Phaser.Game(config);

// define game settings
game.settings = {
    numPlayers: 1,
    gameMode: "Free-for-all",
    gameTimer: 60000    
}

// menu control variables
let key1P, key2P, key3P, key4P;
let keyCoop, keyComp;
let keyStart;

// control variables for 4 players
// 4-player game on one keyboard? that's right baby
let key1F, key1L, key1R;
let key2F, key2L, key2R;
let key3F, key3L, key3R;
let key4F, key4L, key4R;
