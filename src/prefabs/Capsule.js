// Capsule prefab
class Capsule extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, texture, frame, spd, dir, pointValue, color) {
		super(scene, x, y, texture, frame);
		// add object to scene
		scene.add.existing(this);
		this.color = color;
		this.spd = spd;		
		this.dir = dir;
		this.points = pointValue;
	}
	
	update() {
		// move capsule in direction
		let adjDir = (this.dir) * (Math.PI/180);
		this.x += this.spd*Math.cos(adjDir);
		this.y += this.spd*Math.sin(adjDir);

		// destroy if outside room
		if (
			this.x <= 0-this.width || this.x >= game.config.width+this.width ||
			this.y <= 100-this.height || this.y >= game.config.height+this.height
		){
			this.destroy();
		}
	}
} 
