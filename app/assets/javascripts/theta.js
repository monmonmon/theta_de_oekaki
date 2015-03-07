var theta = {
	controls: null,
	camera: null,
	editing: false,
	init: function () {
		var $webglEl = $('#sphere');
		var imageUrl = $webglEl.data('image');
		var width = $webglEl.data('width'), height = $webglEl.data('height');
		var scene = new THREE.Scene();
		theta.camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
		theta.camera.position.x = 0.1;
		var renderer = Detector.webgl ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
		renderer.setSize(width, height);
		var sphere = new THREE.Mesh(
			new THREE.SphereGeometry(100, 20, 20),
			new THREE.MeshBasicMaterial({
				map: THREE.ImageUtils.loadTexture(imageUrl)
			})
		);
		sphere.scale.x = -1;
		scene.add(sphere);

		theta.controls = new THREE.OrbitControls(theta.camera);
		// theta.controls.noPan = true;
		// theta.controls.noZoom = true;
		// theta.controls.autoRotate = false;
		// theta.controls.autoRotateSpeed = 0.5;
		$webglEl.append(renderer.domElement);
		render();
		function render() {
			theta.controls.update();
			requestAnimationFrame(render);
			renderer.render(scene, theta.camera);
		}
		function onMouseWheel(event) {
			console.log('mousewheel')
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
		} else {
			theta.buttons.hide();
		}
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
