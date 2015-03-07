var theta = {
	scene: null,
	sphere: null,
	width: null,
	height: null,
	controls: null,
	camera: null,
	renderer: null,
	editing: false,
	drawing: false,
	list: [],
	init: function () {
		var $area = $('#sphere');
		var imageUrl = $area.data('image');
		theta.width = $area.data('width')
		theta.height = $area.data('height');
		theta.scene = new THREE.Scene();
		theta.camera = new THREE.PerspectiveCamera(75, theta.width / theta.height, 1, 1000);
		// theta.camera.position.x = 0.1;
		theta.camera.position.x = 150;	// get outside of the sphere
		theta.renderer = Detector.webgl ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
		theta.renderer.setSize(theta.width, theta.height);
		theta.sphere = new THREE.Mesh(
			new THREE.SphereGeometry(100, 20, 20),
			new THREE.MeshBasicMaterial({
				map: THREE.ImageUtils.loadTexture(imageUrl)
			})
		);
		theta.sphere.scale.x = -1;
		theta.scene.add(theta.sphere);

		theta.controls = new THREE.OrbitControls(theta.camera);

		theta.toggleEdit();

		$area.append(theta.renderer.domElement);
		render();
		function render() {
			theta.controls.update();
			requestAnimationFrame(render);
			theta.renderer.render(theta.scene, theta.camera);
		}
		function onMouseWheel(event) {
			event.preventDefault();
			if (event.wheelDeltaY) { // WebKit
				theta.camera.fov -= event.wheelDeltaY * 0.05;
			} else if (event.wheelDelta) { // Opera / IE9
				theta.camera.fov -= event.wheelDelta * 0.05;
			} else if (event.detail) { // Firefox
				theta.camera.fov += event.detail * 1.0;
			}
			theta.camera.fov = Math.max(40, Math.min(100, theta.camera.fov));
			theta.camera.updateProjectionMatrix();
		}
		document.addEventListener('mousewheel', onMouseWheel, false);
		document.addEventListener('DOMMouseScroll', onMouseWheel, false);

		$('#toggle-edit-button').on('click', theta.toggleEdit);

	},
	toggleEdit: function () {
		theta.editing = theta.editing ? false : true;
		// prevent rotation / zoom / pan by the user
		theta.controls.noZoom
			= theta.controls.noRotate
			= theta.controls.noPan = theta.editing;
		console.log("editing: " + theta.editing);
		// show controll buttons
		if (theta.editing) {
			theta.buttons.show();
			theta.enableDrawing();
		} else {
			theta.buttons.hide();
			theta.disableDrawing();
		}
	},
	enableDrawing: function () {
		$(theta.renderer.domElement)
			.on('mousedown', theta.startDrawing)
			.on('mouseup', theta.finishDrawing)
			.on('mousemove', theta.draw);
	},
	disableDrawing: function () {
	},
	startDrawing: function () {
		theta.drawing = true;
		console.log("start drawing");
	},
	finishDrawing: function () {
		theta.drawing = false;
		console.log("finish drawing");
	},
	draw: function (e) {
		if (theta.drawing) {
			// スクリーン上のマウス位置を取得する
			var rect = e.target.getBoundingClientRect();
			var mouseX = e.clientX - rect.left;
			var mouseY = e.clientY - rect.top;
			// console.log(mouseX + ', ' + mouseY)
			// 取得したスクリーン座標を-1〜1に正規化する（WebGLは-1〜1で座標が表現される）
			mouseX =  (mouseX / theta.width)  * 2 - 1;
			mouseY = -(mouseY / theta.height) * 2 + 1;
			// console.log(mouseX + ', ' + mouseY)
			// マウスの位置ベクトル
			var pos = new THREE.Vector3(mouseX, mouseY, 1);
			// pos はスクリーン座標系なので、オブジェクトの座標系に変換
			// オブジェクト座標系は今表示しているカメラからの視点なので、第二引数にカメラオブジェクトを渡す
			pos.unproject(theta.camera);
			// 始点、向きベクトルを渡してレイを作成
			var ray = new THREE.Raycaster(theta.camera.position, pos.sub(theta.camera.position).normalize());
			// 交差判定
			// 引数は取得対象となるMeshの配列を渡す。以下はシーン内のすべてのオブジェクトを対象に。
			// var intersects = ray.intersectObjects(theta.scene.children);
			var intersects = ray.intersectObjects([theta.sphere]);
			if (intersects.length > 0) {
				// 1つ以上のオブジェクトと交差
				console.log("colided!");
				var point = intersects[0].point;
				theta.hoehoe(point);
			}
		}
	},
	plotable: true,
	hoehoe: function (point) {
		if (theta.plotable) {
			console.log('plot!');
			theta.plotParticle(point);
			theta.plotable = false;
			setTimeout(function () {
				theta.plotable = true;
			}, 1000);
		}
	},
	plotParticle: function (point) {
		console.log(point);
		var particle = new THREE.Mesh(
			new THREE.SphereGeometry(20),
			new THREE.MeshBasicMaterial({
				color: "0xf00"
			})
		);
		theta.scene.add(particle);
		theta.list.push(particle);
	},
	buttons: {
		show: function () {
			$('.mode-button').removeClass('hidden');
		},
		hide: function () {
			$('.mode-button').addClass('hidden');
		},
	},
};

$(function () {
	theta.init();
});
