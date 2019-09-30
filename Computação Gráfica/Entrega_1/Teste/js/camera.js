var camera, scene, renderer;

var geometry, material, mesh;

var clock;

var angle = 0,
	keys = [];


function createScene() {
	'use strict';

	scene = new THREE.Scene();

	createTable(0, 8, 0);
	createChair(50, 14, 0);
	createCandeeiro(-50, 3.5, 0);
}

function createCamera() {
    if (window.innerHeight > window.innerWidth) {
        var aspectRatio = window.innerHeight / window.innerWidth;
        camera = new THREE.OrthographicCamera( -100, 100, 100 * aspectRatio, -100 * aspectRatio, 1, 1000);
    } else {
        var aspectRatio = window.innerWidth / window.innerHeight;
        camera = new THREE.OrthographicCamera(-100 * aspectRatio, 100 * aspectRatio, 100, -100, 1, 1000);
    }

	camera.position.x = 0;
	camera.position.y = 50;
	camera.position.z = 50;
	camera.lookAt(scene.position);
}

function onResize() {
	'use strict';

    if (window.innerHeight > window.innerWidth) {
        var aspectRatio = window.innerHeight / window.innerWidth;
        camera.left = -200 / 2;
        camera.right = 200 / 2;
        camera.top = 100 * aspectRatio;
        camera.bottom = -100 * aspectRatio;

    } else {
        var aspectRatio = window.innerWidth / window.innerHeight;
        camera.left = -200 * aspectRatio / 2;
        camera.right = 200 * aspectRatio / 2;
        camera.top = 100;
        camera.bottom = -100;
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();
}

function onKeyUp(e) {
	'use strict';
	// mark keys that were released
	switch (e.keyCode) {
		case 38:
			chair.moveForward = false;
			break;
		case 40:
			chair.moveBackwards = false;
			break;
		case 37:
			chair.rotateLeft = false;
			break;
		case 39:
			chair.rotateRight = false;
			break;
	}

}

function onKeyDown(e) {
	'use strict';

	switch (e.keyCode) {
		case 38: //Arrow Up
			chair.moveForward = true;
			break;
		case 40: //Arrow Down
			chair.moveBackwards = true;
			break;
		case 37: //Arrow Left
			chair.rotateLeft = true;
			break;
		case 39: //Arrow Right
			chair.rotateRight = true;
			break;
		case 49: //1
			camera.position.x = 0;
			camera.position.y = 50;
			camera.position.z = 0;
			camera.lookAt(scene.position);
			break;
		case 50: //2
			camera.position.x = 0;
			camera.position.y = 0;
			camera.position.z = 50;
			camera.lookAt(scene.position);
			break;
		case 51: //3
			camera.position.x = 50;
			camera.position.y = 0;
			camera.position.z = 0;
			camera.lookAt(scene.position);
			break;
		case 65: //A
		case 97: //a
			scene.traverse(function (node) {
				if (node instanceof THREE.Mesh) {
					node.material.wireframe = !node.material.wireframe;
				}
			});
			break;
	}

}


function render() {
	'use strict';
	renderer.render(scene, camera);
}


function init() {
	'use strict';

	renderer = new THREE.WebGLRenderer();

	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	createScene();
	createCamera();

	clock = new THREE.Clock();

	render();

	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
	window.addEventListener("resize", onResize);

}


function animate() {
	'use strict';

	var delta = clock.getDelta();

	moveChair(chair, delta);

	render();

	requestAnimationFrame(animate);
}
