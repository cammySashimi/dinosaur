// pipette prefab
class Pipette extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame, emptyTex, leftBtn, rightBtn, shootBtn) {
		
		super(scene, x, y, texture, frame);
		// add object to scene
		scene.add.existing(this);

		this.scene = scene;
		this.isFiring = false;
		this.fullTex = frame;
		this.emptyTex = emptyTex;
		this.leftBtn = leftBtn;
		this.rightBtn = rightBtn;
		this.shootBtn = shootBtn;
	}
	
	update() {
		
		// left/right aiming
		// Nahan used if and else if, but I'm using 2 if's because i think
		// it feels better if the controls "lock" when you press both vs
		// moving in a "preferred" direction.
		if (this.rightBtn.isDown && this.angle <= 80) {
			this.angle += 2;
		}
		if (this.leftBtn.isDown && this.angle >= -80) {
			this.angle -= 2;
		}
		
		// fire button
		if (Phaser.Input.Keyboard.JustDown(this.shootBtn) && !this.isFiring) {
			this.isFiring = true;
			this.setFrame(this.emptyTex);
			this.drop = new Drop(this.scene, this.x, this.y, "spritesheet", "drop", this, this.angle, 3).setOrigin(0.5, 4.25);
		}
		
	}
	
	// refill pipette
	reset() {
		this.isFiring = false;
		this.setFrame(this.fullTex);
	}
} 
