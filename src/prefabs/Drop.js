// Drop prefab
class Drop extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, texture, frame, parent, dir, spd) {
		super(scene, x, y, texture, frame);
		// add object to scene
		scene.add.existing(this);
		this.scene = scene;
		this.parent = parent;
		this.spd = spd;
		this.angle = dir;
	}
	
	update() {
		// move drop in fired direction
		// thank god i remember a little trig
		let adjDir = (this.angle-90) * (Math.PI/180);
		this.x += this.spd*Math.cos(adjDir);
		this.y += this.spd*Math.sin(adjDir);

		// handle collisions with capsules
		let capArr = this.scene.caps.getChildren();
		for (let index=0; index<capArr.length; ++index) {
			if (this.checkCollision(this, capArr[index])) {
				if (capArr[index].alpha === 1) {
					this.parent.points += capArr[index].points;
					this.scene.capExpand(capArr[index]);
				}
				this.parent.reset();
				this.destroy();
			}
		}

		// destroy if outside room
		if (
			this.x <= 0-this.width || this.x >= game.config.width+this.width ||
			this.y <= 100-this.height || this.y >= game.config.height+this.height
		) {
			this.parent.reset();
			this.destroy();
		}

	}
	
	checkCollision(drop, cap) {
		// simple AABB checking
		if (
			drop.x < cap.x + cap.width && 
			drop.x + drop.width > cap.x && 
			drop.y < cap.y + cap.height &&
			drop.height + drop.y > cap.y
		) {
			return true;
		} else {
			return false;
		}
	}
} 
