class Play extends Phaser.Scene {
	
	constructor() {
		super("playScene");
	}
	
	preload() {
		// load images
		this.load.atlas("spritesheet", "assets/spritesheet.png", "assets/spritesheet.json");
		this.load.image("sinkbg", "assets/sinkbg.png");

		// load audio
		this.load.audio("sfx_drop", "assets/drop.mp3");
		this.load.audio("sfx_grow", "assets/grow.mp3");
		this.load.audio("mus_bgm", "assets/bgm.mp3");
	}
	
	create() {	
		
		// lets get rock n rolling
		this.music = this.sound.add("mus_bgm");
		this.music.play();
		this.music.setLoop(true);
		
		// temp variables to make referring to the game width + height easier
		let gw = game.config.width;
		let gh = game.config.height;
		
		// place bg
		this.sinkbg = this.add.tileSprite(0, 1, 640, 480, "sinkbg").setOrigin(0, 0);

		// add keyboard controls
		// player 1
		key1L = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		key1R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
		key1F = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
		// player 2
		key2L = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
		key2R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
		key2F = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		// player 3
		key3L = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
		key3R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
		key3F = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
		// player 4
		key4L = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);
		key4R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
		key4F = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
		// menu
		keyRestart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		keyMenu = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);

		// add players based on player count
		if (game.settings.numPlayers === 4) {
			this.p1Pipette = new Pipette(this, ((gw/5)*1)+8, gh-8, "spritesheet", "pipette-1-f", "pipette-1-e", key1L, key1R, key1F).setOrigin(0.5, 0.9);
			this.p2Pipette = new Pipette(this, ((gw/5)*2)+8, gh-8, "spritesheet", "pipette-2-f", "pipette-2-e", key2L, key2R, key2F).setOrigin(0.5, 0.9);
			this.p3Pipette = new Pipette(this, ((gw/5)*3)+8, gh-8, "spritesheet", "pipette-3-f", "pipette-3-e", key3L, key3R, key3F).setOrigin(0.5, 0.9);
			this.p4Pipette = new Pipette(this, ((gw/5)*4)+8, gh-8, "spritesheet", "pipette-4-f", "pipette-4-e", key4L, key4R, key4F).setOrigin(0.5, 0.9);
		} else if (game.settings.numPlayers === 3) {
			this.p1Pipette = new Pipette(this, ((gw/4)*1)+8, gh-8, "spritesheet", "pipette-1-f", "pipette-1-e", key1L, key1R, key1F).setOrigin(0.5, 0.9);
			this.p2Pipette = new Pipette(this, ((gw/4)*2)+8, gh-8, "spritesheet", "pipette-2-f", "pipette-2-e", key2L, key2R, key2F).setOrigin(0.5, 0.9);
			this.p3Pipette = new Pipette(this, ((gw/4)*3)+8, gh-8, "spritesheet", "pipette-3-f", "pipette-3-e", key3L, key3R, key3F).setOrigin(0.5, 0.9);
		} else if (game.settings.numPlayers === 2) {
			this.p1Pipette = new Pipette(this, ((gw/3)*1)+8, gh-8, "spritesheet", "pipette-1-f", "pipette-1-e", key1L, key1R, key1F).setOrigin(0.5, 0.9);
			this.p2Pipette = new Pipette(this, ((gw/3)*2)+8, gh-8, "spritesheet", "pipette-2-f", "pipette-2-e", key2L, key2R, key2F).setOrigin(0.5, 0.9);
		} else {
			this.p1Pipette = new Pipette(this, (gw/2)+8, gh-8, "spritesheet", "pipette-1-f", "pipette-1-e", key1L, key1R, key1F).setOrigin(0.5, 0.9);
		}
		
		// create animations
		this.anims.create({
			key: "stego-expand",
			frames: this.anims.generateFrameNames("spritesheet", {
				prefix: "stego-",
				start: 0,
				end: 2,
				zeroPad: 0
			}),
			frameRate: 5
		});
		this.anims.create({
			key: "ptera-expand",
			frames: this.anims.generateFrameNames("spritesheet", {
				prefix: "ptera-",
				start: 0,
				end: 2,
				zeroPad: 0
			}),
			frameRate: 5
		});
		this.anims.create({
			key: "tricera-expand",
			frames: this.anims.generateFrameNames("spritesheet", {
				prefix: "tricera-",
				start: 0,
				end: 2,
				zeroPad: 0
			}),
			frameRate: 5
		});
		
		// init score bg
		this.scoreBg = this.add.rectangle(0, 0, gw, 100, 0x666666).setOrigin(0, 0);
		this.scoreBg.setDepth(1);

		// p1 score display
		let scoreConfig1 = {
			fontFamily: "Sniglet",
			fontSize: "24px",
			backgroundColor: "#800",
			color: "#F99",
			align: "center",
			padding: {
				top: 5,
				bottom: 5,
				left: 5,
				right: 5
			},
			fixedWidth: 200
		}
		
		// p2 score display
		let scoreConfig2 = {
			fontFamily: "Sniglet",
			fontSize: "24px",
			backgroundColor: "#093502",
			color: "#21c607",
			align: "center",
			padding: {
				top: 5,
				bottom: 5,
				left: 5,
				right: 5
			},
			fixedWidth: 200
		}
		
		// p3 score display
		let scoreConfig3 = {
			fontFamily: "Sniglet",
			fontSize: "24px",
			backgroundColor: "#1c1a56",
			color: "#4640ef",
			align: "center",
			padding: {
				top: 5,
				bottom: 5,
				left: 5,
				right: 5
			},
			fixedWidth: 200
		}
		
		// p4 score display
		let scoreConfig4 = {
			fontFamily: "Sniglet",
			fontSize: "24px",
			backgroundColor: "#753c54",
			color: "#FACADE",
			align: "center",
			padding: {
				top: 5,
				bottom: 5,
				left: 5,
				right: 5
			},
			fixedWidth: 200
		}
		
		// clock display
		let clockConfig = {
			fontFamily: "Sniglet",
			fontSize: "24px",
			backgroundColor: "#F3B141",
			color: "#843605",
			align: "center",
			padding: {
				top: 5,
				bottom: 5,
				left: 5,
				right: 5
			},
			fixedWidth: 50
		}
		
		// setup score text
		switch (game.settings.numPlayers) {
			case 4:
				this.p4ScoreText = this.add.text(gw-250, 54, "P4: "+this.p4Pipette.points, scoreConfig4).setDepth(2);
			case 3:
				this.p3ScoreText = this.add.text(gw-250, 10, "P3: "+this.p3Pipette.points, scoreConfig3).setDepth(2);
			case 2:
				this.p2ScoreText = this.add.text(50, 54, "P2: "+this.p2Pipette.points, scoreConfig2).setDepth(2);
			default:
				this.p1ScoreText = this.add.text(50, 10, "P1: "+this.p1Pipette.points, scoreConfig1).setDepth(2);
				break;
		}
			
		// init gameOver variable;
		this.gameOver = false;
		
		// capsule pool
		this.caps = this.add.group({
			classType: Capsule,
			maxSize: 20,
			runChildUpdate: true
		});

		// 60-second play clock
		this.clock = this.time.delayedCall(game.settings.gameTimer, () => {

			// determine winner
			let gameOverText;
			let gameOverConfig;
			if (game.settings.gameMode === "Free-for-all") {
				if (game.settings.numPlayers === 4) {

					if (
						this.p1Pipette.points > this.p2Pipette.points &&
						this.p1Pipette.points > this.p3Pipette.points &&
						this.p1Pipette.points > this.p4Pipette.points
					){
						gameOverText = "Player 1 Wins!";
						gameOverConfig = scoreConfig1;
					} else if (
						this.p2Pipette.points > this.p1Pipette.points &&
						this.p2Pipette.points > this.p3Pipette.points &&
						this.p2Pipette.points > this.p4Pipette.points
					){
						gameOverText = "Player 2 Wins!";
						gameOverConfig = scoreConfig2;
					} else if (
						this.p3Pipette.points > this.p1Pipette.points &&
						this.p3Pipette.points > this.p2Pipette.points &&
						this.p3Pipette.points > this.p4Pipette.points
					){
						gameOverText = "Player 3 Wins!";
						gameOverConfig = scoreConfig3;
					} else if (
						this.p4Pipette.points > this.p1Pipette.points &&
						this.p4Pipette.points > this.p2Pipette.points &&
						this.p4Pipette.points > this.p3Pipette.points
					){
						gameOverText = "Player 4 Wins!";
						gameOverConfig = scoreConfig4;
					} else {
						gameOverText = "It's a draw!";
						gameOverConfig = clockConfig;
					}

				} else if (game.settings.numPlayers === 3) {
					
					if (
						this.p1Pipette.points > this.p2Pipette.points &&
						this.p1Pipette.points > this.p3Pipette.points
					){
						gameOverText = "Player 1 Wins!";
						gameOverConfig = scoreConfig1;
					} else if (
						this.p2Pipette.points > this.p1Pipette.points &&
						this.p2Pipette.points > this.p3Pipette.points
					){
						gameOverText = "Player 2 Wins!";
						gameOverConfig = scoreConfig2;
					} else if (
						this.p3Pipette.points > this.p1Pipette.points &&
						this.p3Pipette.points > this.p2Pipette.points
					){
						gameOverText = "Player 3 Wins!";
						gameOverConfig = scoreConfig3;
					} else {
						gameOverText = "It's a draw!";
						gameOverConfig = clockConfig;
					}
					
				} else if (game.settings.numPlayers === 2) {
					
					if (this.p1Pipette.points > this.p2Pipette.points) {
						gameOverText = "Player 1 Wins!";
						gameOverConfig = scoreConfig1;
					} else if (this.p2Pipette.points > this.p1Pipette.points) {
						gameOverText = "Player 2 Wins!";
						gameOverConfig = scoreConfig2;
					} else {
						gameOverText = "It's a draw!";
						gameOverConfig = clockConfig;
					}
					
				} else {
					
					gameOverText = "You scored "+this.p1Pipette.points+" points!";
					gameOverConfig = clockConfig;
					
				}
	
			} else if (game.settings.gameMode === "Team co-op") {
				
				if (this.p1Pipette.points+this.p2Pipette.points > this.p3Pipette.points+this.p4Pipette.points) {
					gameOverText = "Players 1+2 Win!";
					gameOverConfig = clockConfig;
				} else if (this.p1Pipette.points+this.p2Pipette.points < this.p3Pipette.points+this.p4Pipette.points) {
					gameOverText = "Players 3+4 Win!";
					gameOverConfig = clockConfig;
				} else {
					gameOverText = "It's a draw!";
					gameOverConfig = clockConfig;
				}
				
			}

			gameOverConfig.fixedWidth = 0;
			this.add.text (
				game.config.width/2, game.config.height/2,
				gameOverText, gameOverConfig
			).setDepth(4).setOrigin(0.5);
			this.add.text (
				game.config.width/2, game.config.height/2 + 64,
				"Press [ENTER] to restart", gameOverConfig
			).setDepth(4).setOrigin(0.5);
			this.add.text (
				game.config.width/2, game.config.height/2 + 96,
				"or [BACKSPACE] to return to menu", gameOverConfig
			).setDepth(4).setOrigin(0.5);
			
			this.gameOver = true;

		}, null, this);
		
		// setup timer text
		this.clockTime = Math.floor(game.settings.gameTimer/1000);
		this.clockText = this.add.text(gw/2-25, 30, this.clockTime, clockConfig).setDepth(2);
		
		// Clock to make capsules
		for (let i=0; i<60; i++) {
			this.time.delayedCall(i*1000, () => {
				
				let cap = this.caps.get();
				
				if (cap) {
					
					cap.setOrigin(0, 0);
					cap.setTexture("spritesheet");
					
					let type = Math.random();
					if (type < 0.5) {
						cap.points = 10;
						cap.color = "blue";
						cap.setFrame("bluecap");
					} else if (type >= 0.5 && type < 0.8) {
						cap.points = 25;
						cap.color = "green";
						cap.setFrame("greencap");
					} else {
						cap.points = 50;
						cap.color = "red";
						cap.setFrame("redcap");
					}
					
					cap.spd = Math.random() * (3 - 0.5) + 0.5;
					cap.y = Math.random() * (375 - 100) + 100;


					let side = Math.random();
					if (side < 0.5) {
						cap.dir = Math.random() * (10 + 10) - 10;
						cap.x = (-cap.width)+1
					} else {
						cap.dir = Math.random() * (190 - 170) + 170;
						cap.setOrigin(0, 0);
						cap.x = gw+(cap.width-1);
					}
					
				}
				
				this.clockTime--;
				
			}, null, this);
		}
		
	}
	
	update() {
		

		if (!this.gameOver) {
			// update clock
			this.clockText.text = this.clockTime;
			// update players + drops
			switch (game.settings.numPlayers) {
				case 4:
					this.p4Pipette.update();
					if (this.p4Pipette.isFiring) {
						this.p4Pipette.drop.update();
					}
				case 3:
					this.p3Pipette.update();
					if (this.p3Pipette.isFiring) {
						this.p3Pipette.drop.update();
					}
				case 2:
					this.p2Pipette.update();
					if (this.p2Pipette.isFiring) {
						this.p2Pipette.drop.update();
					}
				default:
					this.p1Pipette.update();
					if (this.p1Pipette.isFiring) {
						this.p1Pipette.drop.update();
					}
					break;
			}

		}

		// check key input for restart
		if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyRestart)) {
			this.music.stop();
			this.scene.restart();
		}
		if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyMenu)) {
			this.music.stop();
            this.scene.start("menuScene");
        }

	}
	
	capExpand(cap) {
		
		// repaint scores
		switch (game.settings.numPlayers) {
			case 4:
				this.p4ScoreText.text = "P4: "+this.p4Pipette.points;
			case 3:
				this.p3ScoreText.text = "P3: "+this.p3Pipette.points;
			case 2:
				this.p2ScoreText.text = "P2: "+this.p2Pipette.points;
			default:
				this.p1ScoreText.text = "P1: "+this.p1Pipette.points;
				break;
		}
		
		// make cap invisible
		cap.alpha = 0;
		
		// play sound
		this.sound.play("sfx_grow", {volume: 0.25});

		// create dino sprite at capsules"s position
		let expand;
		if (cap.color === "red") {
			expand = this.add.sprite(cap.x, cap.y-20, "spritesheet", "ptera-0").setOrigin(0, 0);
			expand.anims.play("ptera-expand");
		} else if (cap.color === "green") {
			expand = this.add.sprite(cap.x, cap.y-20, "spritesheet", "stego-0").setOrigin(0, 0);
			expand.anims.play("stego-expand");
		} else if (cap.color === "blue") {
			expand = this.add.sprite(cap.x, cap.y-20, "spritesheet", "tricera-0").setOrigin(0, 0);
			expand.anims.play("tricera-expand");
		}
		
		expand.on("animationcomplete", () => {		// callback after animation completes
			expand.destroy();						// remove dino sprite
			cap.destroy();							// destroy capsule
		});
		

	}
	
} 
