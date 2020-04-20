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
		this.points = 0;

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
			this.scene.sound.play("sfx_drop", {volume: 0.1})
			this.isFiring = true;
			this.setFrame(this.emptyTex);
			let adjDir = (this.angle-90) * (Math.PI/180);
			let dropX = this.x + 45*Math.cos(adjDir);
			let dropY = this.y + 45*Math.sin(adjDir);
			this.drop = new Drop(this.scene, dropX, dropY, "spritesheet", "drop", this, this.angle, 3).setOrigin(0, 0);
		}
		
	}
	
	// refill pipette
	reset() {
		this.isFiring = false;
		this.setFrame(this.fullTex);
	}
} 
