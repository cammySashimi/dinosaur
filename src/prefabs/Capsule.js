// Capsule prefab
class Capsule extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, texture, frame, pointValue) {
		super(scene, x, y, texture, frame);
		// add object to scene
		scene.add.existing(this);
		this.points = pointValue;
	}
	
	update() {
		// move capsule left
		this.x -= 3;
		// wrap edges
		if (this.x <= 0-this.width) {
			this.x = game.config.width;
		}
	}
	
	reset() {
		this.x = game.config.width;
	}
} 
