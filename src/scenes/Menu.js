class Menu extends Phaser.Scene {
	
	constructor() {
		super("menuScene");
	}
	
	preload() {
		//this.load.audio("sfx_select", "assets/blip_select12.wav");
		//this.load.audio("sfx_explosion", "assets/explosion38.wav");
		//this.load.audio("sfx_rocket", "assets/rocket_shot.wav");
	}
	
	create() {
		// styles
		let menuHeader = {
			fontFamily: "Courier",
			fontSize: "24px",
			fontStyle: "bold",
			color: "#30d80a",
			align: "right",
			padding: {
				top: 5,
				bottom: 5,
			},
			fixedWidth: 0
		}
		
		let menuBody = {
			fontFamily: "Courier",
			fontSize: "18px",
			color: "#eee",
			fontStyle: "bold",
			align: "right",
			padding: {
				top: 5,
				bottom: 5,
			},
			fixedWidth: 0
		}
		
		let menuSettings = {
			fontFamily: "Courier",
			fontSize: "20px",
			color: "#d84c0a",
			fontStyle: "bold",
			align: "right",
			padding: {
				top: 5,
				bottom: 5,
			},
			fixedWidth: 0
		}		
		
		let mode = "Free-for-all";
		let playerNum = 1;
		
		// show menu text
		let centerX = game.config.width/2;
		let centerY = 48;
		let textSpacer = 29;
		
		this.add.text(centerX, centerY, "SUPER DINOSAUR REHYDRATOR 3000", menuHeader).setOrigin(0.5);

		this.add.text(centerX, centerY+textSpacer*2, "P1: Turn with [←] and [→], fire with [↑]", menuBody).setOrigin(0.5);
		this.add.text(centerX, centerY+textSpacer*3, "P2: Turn with [Q] and [E], fire with [W]", menuBody).setOrigin(0.5);
		this.add.text(centerX, centerY+textSpacer*4, "P3: Turn with [C] and [B], fire with [V]", menuBody).setOrigin(0.5);
		this.add.text(centerX, centerY+textSpacer*5, "P4: Turn with [U] and [O], fire with [I]", menuBody).setOrigin(0.5);

		this.add.text(centerX, centerY+textSpacer*7, "Press [1], [2], [3], or [4] to set player number", menuBody).setOrigin(0.5);
		this.add.text(centerX, centerY+textSpacer*8, "Press [←] for team co-op or [→] for free-for-all", menuBody).setOrigin(0.5);

		this.pNumText = this.add.text(centerX, centerY+textSpacer*10, "Players: "+playerNum, menuSettings).setOrigin(0.5);
		this.modeText = this.add.text(centerX, centerY+textSpacer*11, "Mode: "+mode, menuSettings).setOrigin(0.5);

		this.add.text(centerX, centerY+textSpacer*13, "Press [ENTER] to start!", menuHeader).setOrigin(0.5);

		// define menu keys
		key1P = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
		key2P = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
		key3P = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
		key4P = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);		
		keyCoop = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		keyComp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
		keyStart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		
	}
	
	update() {
		
		if (Phaser.Input.Keyboard.JustDown(key1P)) {
			this.playerNum = 1;
			this.pNumText.text = "Players: "+this.playerNum;
		}
		if (Phaser.Input.Keyboard.JustDown(key2P)) {
			this.playerNum = 2;
			this.pNumText.text = "Players: "+this.playerNum;
		}
		if (Phaser.Input.Keyboard.JustDown(key3P)) {
			this.playerNum = 3;
			this.pNumText.text = "Players: "+this.playerNum;
		}
		if (Phaser.Input.Keyboard.JustDown(key4P)) {
			this.playerNum = 4;
			this.pNumText.text = "Players: "+this.playerNum;
		}
		
		if (Phaser.Input.Keyboard.JustDown(keyCoop)) {
			this.mode = "Team co-op";
			this.modeText.text = "Mode: "+this.mode;
		}
		if (Phaser.Input.Keyboard.JustDown(keyComp)) {
			this.mode = "Free-for-all";
			this.modeText.text = "Mode: "+this.mode;
		}
		
		if (this.playerNum != 2 && this.playerNum != 4) {
			this.mode = "Free-for-all";
			this.modeText.text = "Mode: "+this.mode;
		}
		
		if (Phaser.Input.Keyboard.JustDown(keyStart)) {
			// start game with chosen settings
			game.settings = {
				numPlayers: this.playerNum,
				gameMode: this.mode,
				gameTimer: 60000  
			}
			//this.sound.play("sfx_select");
			this.scene.start("playScene");    
		}
		
	}

} 
