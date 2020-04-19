// Drop prefab
class Drop extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, texture, frame, parent, dir, spd) {
		super(scene, x, y, texture, frame);
		// add object to scene
		scene.add.existing(this);
		this.parent = parent;
		this.dir = dir;
		this.spd = spd;
		
		this.angle = this.dir;
	}
	
	update() {
		// move drop in fired direction
		// thank god i remember a little trig
		let adjDir = (this.dir-90) * (Math.PI/180);
		this.x += this.spd*Math.cos(adjDir);
		this.y += this.spd*Math.sin(adjDir);

		// destroy if outside room
		if (
			this.x <= 0-this.width || this.x >= game.config.width+this.width ||
			this.y <= 0-this.height || this.y >= game.config.height+this.height
		) {
			this.parent.reset();
			this.destroy();
		}
	}
} 
