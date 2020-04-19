// rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture, frame);
		// add object to scene
		scene.add.existing(this);
		this.isFiring = false;
		this.sfxRocket = scene.sound.add("sfx_rocket"); // add rocket sfx
	}
	
	update() {
		// left/right movement
		if (!this.isFiring) {
			// Nahan used if and else if, but I'm using 2 if's because i think
			// it feels better if the controls "lock" when you press both vs
			// moving in a "preferred" direction.
			if (keyLEFT.isDown && this.x >= 47) {
				this.x -= 2;
			}
			if (keyRIGHT.isDown && this.x <= 578) {
				this.x += 2;
			}
		}
		
		// fire button
		if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
			this.isFiring = true;
			this.sfxRocket.play();  // play sfx
		}

		
		// if fired, move up
		if (this.isFiring && this.y >= 108) {
			this.y -= 2;
		}
		
		// reset on miss
		if (this.y <= 108) {
			this.isFiring = false;
			this.y = 431;
		}
	}
	
	// reset rocket to ground
	reset() {
		this.isFiring = false;
		this.y = 431;
	}
} 
