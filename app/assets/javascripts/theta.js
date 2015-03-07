var theta = {
	channel: null,
	scene: null,
	sphere: null,
	width: null,
	height: null,
	controls: null,
	camera: null,
	renderer: null,
	drawer: null,
	editing: false,
	drawing: false,
	plotted_objects: [],
	init: function (channel) {
		theta.channel = channel;
		var $area = $('#sphere');
		var imageUrl = $area.data('image');
		theta.width = $area.data('width');
		theta.height = $area.data('height');
		theta.scene = new THREE.Scene();
		theta.camera = new THREE.PerspectiveCamera(75, theta.width / theta.height, 1, 1000);
        theta.client = new Yanoo.Client(location.hostname + ':3001/websocket', this.channel);
		theta.camera.position.x = 0.1;  // カメラは球体の内側
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
		$area.append(theta.renderer.domElement);
		render();
		function render() {
			theta.controls.update();
			requestAnimationFrame(render);
			theta.renderer.render(theta.scene, theta.camera);
		}

		// set event handlers
		document.addEventListener('mousewheel', theta.onMouseWheel, false);
		document.addEventListener('DOMMouseScroll', theta.onMouseWheel, false);
		$('#toggle-edit-button').on('click', theta.onToggleEdit);
		$('.mode-button').on('click', theta.onChangeMode)
		// select a default drawer
		$('.mode-button:first').trigger('click');

		theta.onLoad();
	},
	onLoad: function (data) {
		$.getJSON('http://' + location.hostname + ':' + location.port + '/m/' + theta.channel + '.json', function(d) {
			for (var i = 0; i < d.data.strokes.length; i++) {
				theta.renderStroke(d.data.strokes[i]);
			}
		});
	},
	renderStroke: function (stroke) {
		for (var i = 0; i < stroke.pos.length; i++) {
			var p = stroke.pos[i];
			var object = new THREE.Mesh(
				new THREE.SphereGeometry(1),
				new THREE.MeshBasicMaterial({
					color: p.color
				})
			);
			object.position.x = p.x;
			object.position.y = p.y;
			object.position.z = p.z;
			theta.scene.add(object);
		}
	},
	onMouseWheel: function (event) {
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
	},
	onChangeMode: function () {
		var drawerName = $(this).data('drawer');
		var drawerClass = eval(drawerName);
		theta.drawer = new drawerClass(theta);
		// change the style of the clicked button
		$('.mode-button').removeClass('selected-mode');
		$(this).addClass('selected-mode');
	},
	onToggleEdit: function () {
		theta.editing = theta.editing ? false : true;
		// prevent rotation / zoom / pan by the user
		theta.controls.noZoom
			= theta.controls.noRotate
			= theta.controls.noPan = theta.editing;
		console.log("editing: " + theta.editing);
		// show controll buttons
		if (theta.editing) {
			$('#toggle-edit-button').text('Move');
			theta.buttons.show();
			theta.enableDrawing();
		} else {
			$('#toggle-edit-button').text('Edit');
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
		$(theta.renderer.domElement)
			.off('mousedown', theta.startDrawing)
			.off('mouseup', theta.finishDrawing)
			.off('mousemove', theta.draw);
	},
	startDrawing: function () {
		theta.drawing = true;
		console.log("start drawing");
	},
	finishDrawing: function () {
		theta.drawing = false;
		theta.upload();
		console.log("finish drawing");
	},
	draw: function (e) {
		if (theta.drawing) {
			// スクリーン上のマウス位置を取得する
			var rect = e.target.getBoundingClientRect();
			var mouseX = e.clientX - rect.left;
			var mouseY = e.clientY - rect.top;
			// 取得したスクリーン座標を-1〜1に正規化する（WebGLは-1〜1で座標が表現される）
			mouseX =  (mouseX / theta.width)  * 2 - 1;
			mouseY = -(mouseY / theta.height) * 2 + 1;
			// マウスの位置ベクトル
			var pos = new THREE.Vector3(mouseX, mouseY, 1);
			// pos はスクリーン座標系なので、オブジェクトの座標系に変換
			// オブジェクト座標系は今表示しているカメラからの視点なので、第二引数にカメラオブジェクトを渡す
			pos.unproject(theta.camera);
			// 始点、向きベクトルを渡してレイを作成
			var ppp = theta.camera.position.clone();
			var ray = new THREE.Raycaster(pos, ppp.sub(pos).normalize());
			// 交差判定。引数として取得対象となるMeshの配列を渡す
			var intersects = ray.intersectObjects([theta.sphere]);
			if (intersects.length > 0) {
				// 1つ以上のオブジェクトと交差
				var point = intersects[0].point;
				theta.drawer.draw(point);
				// theta.hoehoe(point);
			}
		}
	},
	jsonize: function (objects) {
		var pos = [], color;
		for (var i = 0; i < objects.length; i++) {
			try {
				color = objects[i].material.color;
				color = 0xff0000 * color.r + 0x00ff00 * color.g + 0x0000ff * color.b;
			} catch (e) {
				color = null;
			}
			pos.push({
				color: color,
				x: objects[i].position.x,
				y: objects[i].position.y,
				z: objects[i].position.z
			});
		}
		return {
			"theta_id": theta.channel,
			"type_id": 1,
			"image_id": 1,
			"shape_id": 1,
			"pos": pos,
		};
	},
	upload: function () {
		var json_object = theta.jsonize(theta.plotted_objects);
		theta.client.append(json_object);
		theta.plotted_objects = [];
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
	theta.init($('#sphere').data('id'));
});
