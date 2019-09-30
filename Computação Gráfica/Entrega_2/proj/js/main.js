var cameraOrthographic, cameraPerspective, cameraMovable, scene, renderer, cameraValue = 1;

var geometry, material, mesh, active = true;

var clock, n = 40;

var ball, auxBall = 10, delta;

var balls = [];

var angle = 0,
	keys = [];

function createScene() {
	'use strict';

	scene = new THREE.Scene();

	createField(0, 0, 0);

	for(var i = 0; i < 9; i++){
		ball = new Ball(0,0,0,false);
		balls.push(ball);
	}

	ball = new Ball(0,0,0,true);
    balls.push(ball);
}

function createCameraOrthographic() {
    if (window.innerHeight > window.innerWidth) {
        var aspectRatio = window.innerHeight / window.innerWidth;
        cameraOrthographic = new THREE.OrthographicCamera( -100, 100, 100 * aspectRatio, -100 * aspectRatio, 1, 1000);
    } else {
        var aspectRatio = window.innerWidth / window.innerHeight;
        cameraOrthographic = new THREE.OrthographicCamera(-100 * aspectRatio, 100 * aspectRatio, 100, -100, 1, 1000);
    }

	cameraOrthographic.position.set(0,100,0);
	cameraOrthographic.lookAt(scene.position);
}

function createCameraPerspective() {
	'use strict';

	cameraPerspective = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 3 * window.innerHeight);
	cameraPerspective.position.set(250,150,250);
	cameraPerspective.lookAt(scene.position);
}

function createCameraMovable() {
    'use strict';

    var baller;

    balls.forEach(function(element){
    	if(element.name == 'Player Ball'){
    		baller = element;
    	}
	});

    cameraMovable = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 2, 10 * window.innerHeight);
    cameraMovable.position.x = baller.position.x + 100;
    cameraMovable.position.y = 0;
    cameraMovable.position.z = baller.position.z + 100;
    cameraMovable.lookAt(new THREE.Vector3(baller.position.x, baller.position.y, baller.position.z));
    baller.add(cameraMovable);
}

function onResize() {
	// 'use strict';
	//
    // if (window.innerHeight > window.innerWidth) {
    //     var aspectRatio = window.innerHeight / window.innerWidth;
    //     camera.left = -200 / 2;
    //     camera.right = 200 / 2;
    //     camera.top = 100 * aspectRatio;
    //     camera.bottom = -100 * aspectRatio;
	//
    // } else {
    //     var aspectRatio = window.innerWidth / window.innerHeight;
    //     camera.left = -200 * aspectRatio / 2;
    //     camera.right = 200 * aspectRatio / 2;
    //     camera.top = 100;
    //     camera.bottom = -100;
    // }
	//
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // camera.aspect = aspectRatio;
    // camera.updateProjectionMatrix();
}


function onKeyDown(e) {
	'use strict';

	switch (e.keyCode) {
		case 49: //1
			cameraValue = 1;
			break;
		case 50: //2
			cameraValue = 2;
			break;
		case 51: //3
			cameraValue = 3;
			break;
		case 65: //A
		case 97: //a
			scene.traverse(function (node) {
				if (node instanceof THREE.Mesh) {
					node.material.wireframe = !node.material.wireframe;
				}
			});
			break;
		case 69:
            balls.forEach(function(element){
            	if(active){
                    element.add(element.axisHelper);
                }else{
                    element.remove(element.axisHelper);
                }
            });
            active = !active;
            break;

	}

}

function render() {
    'use strict';
    switch (cameraValue) {
        case 1:
            renderer.render(scene, cameraOrthographic);
            break;
        case 2:
            renderer.render(scene, cameraPerspective);
            break;
        case 3:
            renderer.render(scene, cameraMovable);
            break;
    }
}

function init() {
	'use strict';

	renderer = new THREE.WebGLRenderer();

	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	createScene();
	createCameraOrthographic();
	createCameraPerspective();
	createCameraMovable();

	clock = new THREE.Clock();
	clock.start();


	render();

	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("resize", onResize);

}

function animate() {
	'use strict';

	var cnt = 0;
	var collisions = [];

	if(clock.getElapsedTime() > n){
		balls.forEach(function(element){
			element.increaseBallSpeed();
		});
		n += 40;

	}
	balls.forEach(function(element){
		// auxBall = element.hasCollidedAnotherBall();
		// if(auxBall !== 10 && !collisions.includes(cnt)){
		// 	element.treatCollision(balls[auxBall]);
		// 	balls[auxBall].treatCollision(element);
		// 	collisions.push(auxBall, cnt);
		// }
        element.hasCollidedWall();
        element.moveBall();
        // cnt++;
	});

	render();

	requestAnimationFrame(animate);
}
