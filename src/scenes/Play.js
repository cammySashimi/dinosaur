class Play extends Phaser.Scene {
	
	constructor() {
		super("playScene");
	}
	
	preload() {
		// load images
		this.load.atlas("spritesheet", "assets/spritesheet.png", "assets/spritesheet.json");
		this.load.image("sinkbg", "assets/sinkbg.png");

		// load audio
		//this.load.audio("sfx_select", "assets/blip_select12.wav");
		//this.load.audio("sfx_explosion", "./assets/explosion38.wav");
		//this.load.audio("sfx_rocket", "./assets/rocket_shot.wav");
	}
	
	create() {		
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
		
		// add spaceships (x3)
		//this.ship1 = new Spaceship(this, game.config.width + 192, 132, "spaceship", 0, 30).setOrigin(0,0);
		//this.ship2 = new Spaceship(this, game.config.width + 96, 196, "spaceship", 0, 20).setOrigin(0,0);
		//this.ship3 = new Spaceship(this, game.config.width, 260, "spaceship", 0, 10).setOrigin(0,0);

		
		// animation config
		//this.anims.create({
		//	key: 'stego-expand',
		//	frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
		//	frameRate: 30
		//});
		
		// score
		this.p1Score = 0;
		this.p2Score = 0;
		this.p3Score = 0;
		this.p4Score = 0;
		
		// score display
		let scoreConfig = {
			fontFamily: 'Courier',
			fontSize: '28px',
			backgroundColor: '#F3B141',
			color: '#843605',
			align: 'right',
			padding: {
				top: 5,
				bottom: 5,
			},
			fixedWidth: 100
		}
		this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);

		this.gameOver = false;
		
		// 60-second play clock
		scoreConfig.fixedWidth = 0;
		this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
			this.add.text (
				game.config.width/2, game.config.height/2,
				"GAME OVER", scoreConfig
			).setOrigin(0.5);
			this.add.text (
				game.config.width/2, game.config.height/2 + 64,
				"[F]ire to Restart or ← for Menu", scoreConfig
			).setOrigin(0.5);
			this.gameOver = true;
		}, null, this);
	}
	
	update() {

		if (!this.gameOver) {
			// update players
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
		if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
			this.scene.restart(this.p1Score);
		}
		if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
		
		/*
		// check collisions
		if (this.checkCollision(this.p1Rocket, this.ship3)) {
			this.p1Rocket.reset();
			this.shipExplode(this.ship3);   
		}
		if (this.checkCollision(this.p1Rocket, this.ship2)) {
			this.p1Rocket.reset();
			this.shipExplode(this.ship2);   
		}
		if (this.checkCollision(this.p1Rocket, this.ship1)) {
			this.p1Rocket.reset();
			this.shipExplode(this.ship1);   
		}	
		*/

	}
	
	checkCollision(drop, cap) {
		// simple AABB checking
		if (
			drop.x < cap.x + cap.width && 
			drop.x + drop.width > cap.x && 
			drop.y < cap.y + cap.height &&
			drop.height + drop.y > cap. y
		) {
			return true;
		} else {
			return false;
		}
	}
	
	capExpand(cap) {
		cap.alpha = 0;						// temporarily hide capsule
		
		// create dino sprite at capsules's position
		/*
		let expand = this.add.sprite(cap.x, cap.y, "expand").setOrigin(0, 0);
		expand.anims.play("expand");				// play expand animation
		expand.on('animationcomplete', () => {		// callback after animation completes
			cap.reset();							// reset ship position
			cap.alpha = 1;							// make ship visible again
			expand.destroy();						// remove dino sprite
		});       
		
		// score increment and repaint
		this.p1Score += ship.points;
		this.scoreLeft.text = this.p1Score;   
		
		this.sound.play('sfx_explosion');
		*/
	}
	
} 
