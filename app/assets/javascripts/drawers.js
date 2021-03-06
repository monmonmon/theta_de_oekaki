// Drawer
var Drawer = function (theta) {
	this.theta = theta;
};
Drawer.prototype.plot = function (point, object) {
	object.position.set(point.x, point.y, point.z);
	object.lookAt(theta.sphere.position);
	this.theta.scene.add(object);
	this.theta.plotted_objects.push(object);
};

// 赤
var RedDrawer = function () {
	Drawer.apply(this, arguments);
};
RedDrawer.prototype = new Drawer;
RedDrawer.prototype.draw = function (point) {
	// console.log(point);
	var object = new THREE.Mesh(
		new THREE.SphereGeometry(theta.strokeSize),
		new THREE.MeshBasicMaterial({
			color: 0xff0000
		})
	);
	this.plot(point, object);
};

// 緑
var GreenDrawer = function () {
	Drawer.apply(this, arguments);
};
GreenDrawer.prototype = new Drawer;
GreenDrawer.prototype.draw = function (point) {
	var object = new THREE.Mesh(
		new THREE.SphereGeometry(theta.strokeSize),
		new THREE.MeshBasicMaterial({
			color: 0x00ff00
		})
	);
	this.plot(point, object);
};

// 水色
var CyanDrawer = function () {
	Drawer.apply(this, arguments);
};
CyanDrawer.prototype = new Drawer;
CyanDrawer.prototype.draw = function (point) {
	var object = new THREE.Mesh(
		new THREE.SphereGeometry(theta.strokeSize),
		new THREE.MeshBasicMaterial({
			color: 0x00ffff
		})
	);
	this.plot(point, object);
};

// Yellow
var YellowDrawer = function () {
	Drawer.apply(this, arguments);
};
YellowDrawer.prototype = new Drawer;
YellowDrawer.prototype.draw = function (point) {
	var object = new THREE.Mesh(
		new THREE.SphereGeometry(theta.strokeSize),
		new THREE.MeshBasicMaterial({
			color: 0xffff00
		})
	);
	this.plot(point, object);
};

// 虹色
var RainbowParticleDrawer = function () {
	this.colors = [
		0xff0000,
		0xff00ff,
		0xffff00,
		0x00ff00,
		0x0000ff,
		0x00ffff,
	];
	this.colorIndex = 0;
	Drawer.apply(this, arguments);
};
RainbowParticleDrawer.prototype = new Drawer;
RainbowParticleDrawer.prototype.draw = function (point) {
	var object = new THREE.Mesh(
		new THREE.SphereGeometry(theta.strokeSize),
		new THREE.MeshBasicMaterial({
			color: this.colors[this.colorIndex]
		})
	);
	this.colorIndex = (this.colorIndex + 1) % this.colors.length;
	this.plot(point, object);
};

// 画像
var ImageDrawer = function () {
	this.waiting = true;
	Drawer.apply(this, arguments);
};
ImageDrawer.prototype = new Drawer;
ImageDrawer.prototype.draw = function (point) {
	if (this.waiting) {
		var object = new THREE.Mesh(
			// new THREE.PlaneBufferGeometry(3, 3),
			new THREE.PlaneGeometry(3, 3),
			// new THREE.SphereGeometry(5),
			new THREE.MeshBasicMaterial({
				map: THREE.ImageUtils.loadTexture('/stickers/01.png', {}, function() {
					theta.renderer.render(theta.scene, theta.camera);
				})
			})
		);
		this.plot(point, object);
		this.waiting = false;
		var that = this;
		setTimeout(function () {
			that.waiting = true;
		}, 200);
	}
};
