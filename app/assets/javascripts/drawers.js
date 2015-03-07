// Drawer
var Drawer = function (theta) {
	this.theta = theta;
};
Drawer.prototype.plot = function (point, object) {
	object.position.x = point.x;
	object.position.y = point.y;
	object.position.z = point.z;
	this.theta.scene.add(object);
	this.theta.list.push(object);
};

// 赤いパーティクル
var RedParticleDrawer = function () {
	Drawer.apply(this, arguments);
};
RedParticleDrawer.prototype = new Drawer;
RedParticleDrawer.prototype.draw = function (point) {
	// console.log(point);
	var particle = new THREE.Mesh(
		new THREE.SphereGeometry(1),
		new THREE.MeshBasicMaterial({
			color: 0xff0000
		})
	);
	this.plot(point, particle);
};

// 緑のパーティクル
var GreenParticleDrawer = function () {
	Drawer.apply(this, arguments);
};
GreenParticleDrawer.prototype = new Drawer;
GreenParticleDrawer.prototype.draw = function (point) {
	var particle = new THREE.Mesh(
		new THREE.SphereGeometry(1),
		new THREE.MeshBasicMaterial({
			color: 0x00ff00
		})
	);
	this.plot(point, particle);
};

// 虹色パーティクル
var RainbowParticleDrawer = function () {
	Drawer.apply(this, arguments);
};
RainbowParticleDrawer.prototype = new Drawer;
RainbowParticleDrawer.prototype.draw = function (point) {
	var particle = new THREE.Mesh(
		new THREE.SphereGeometry(1)
	);
	this.plot(point, particle);
};

// 遅延パーティクル
var DelayedParticleDrawer = function () {
	this.plotable = true;
	Drawer.apply(this, arguments);
};
DelayedParticleDrawer.prototype = new Drawer;
DelayedParticleDrawer.prototype.draw = function (point) {
	if (this.plotable) {
		var particle = new THREE.Mesh(
			new THREE.SphereGeometry(1),
			new THREE.MeshBasicMaterial({
				color: 0x00ffff
			})
		);
		this.plot(point, particle);

		this.plotable = false;
		var that = this;
		setTimeout(function () {
			that.plotable = true;
		}, 100);
	}
};
