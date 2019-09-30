var cameraPerspective, scene, renderer;

var geometry, material, mesh;

var nose, body, wing, verticalStabilizer, sideStabilizer, cockpit, sun;

var angle = 0;

var pointlight1, pointlight2, pointlight3, pointlight4;

var airplane = [];

var directionAxis = new THREE.Vector3(1,0,0);

function createScene() {
	'use strict';


	scene = new THREE.Scene();

    nose = new Nose(-18, 0, 0);
    body = new Body(19, 0, 0);
    airplane = new THREE.Group();
    scene.add(airplane);

	wing = new Wing(0, 0, 0);

    verticalStabilizer = new VerticalStabilizer(0, 0, 0);

    sideStabilizer = new SideStabilizer(0, 0, 0);

    cockpit = new Cockpit(0, 0, 0);

    airplane.add(body.mesh2,body.mesh1, nose.mesh1, nose.mesh2, wing.mesh1, sideStabilizer.mesh1, verticalStabilizer.mesh1, cockpit.mesh1, cockpit.mesh2);

}

function createSun(){
	//Creates a directionalLight with color 0xffffee and intensity 1
    var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
    hemiLight.color.setHex(0xfcf0c7);
    hemiLight.groundColor.setHex( 0x804040);
    hemiLight.position.set( 0, 500, 0 );
    scene.add( hemiLight );

    var dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
    dirLight.position.set( -1, 0.75, 1 );
    dirLight.position.multiplyScalar( 50);
    dirLight.name = "dirlight";
    // dirLight.shadowCameraVisible = true;

    scene.add( dirLight );

    dirLight.castShadow = true;
    dirLight.shadowMapWidth = dirLight.shadowMapHeight = 1024*2;

    var d = 300;

    dirLight.shadowCameraLeft = -d;
    dirLight.shadowCameraRight = d;
    dirLight.shadowCameraTop = d;
    dirLight.shadowCameraBottom = -d;

    dirLight.shadowCameraFar = 3500;
    dirLight.shadowBias = -0.0001;
    dirLight.shadowDarkness = 0.35;
}

/*
	Function to turn On or Off the Sun. Key "N"
 */
function toggleSun(){
	if(sun.intensity === 1)
		sun.intensity = 0;
	else
		sun.intensity = 1;
}

function createCameraPerspective() {
	'use strict';

	cameraPerspective = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 3 * window.innerHeight);
	cameraPerspective.position.set(10,75,-200);
	cameraPerspective.lookAt(scene.position);
}


function onResize() {
	'use strict';

    if (window.innerHeight > window.innerWidth) {
        var aspectRatio = window.innerHeight / window.innerWidth;
        cameraPerspective.left = -200 / 2;
        cameraPerspective.right = 200 / 2;
        cameraPerspective.top = 100 * aspectRatio;
        cameraPerspective.bottom = -100 * aspectRatio;
    } else {
        var aspectRatio = window.innerWidth / window.innerHeight;
        cameraPerspective.left = -200 * aspectRatio / 2;
        cameraPerspective.right = 200 * aspectRatio / 2;
        cameraPerspective.top = 100;
        cameraPerspective.bottom = -100;
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
    cameraPerspective.aspect = aspectRatio;
    cameraPerspective.updateProjectionMatrix();
}


function onKeyDown(e) {
	'use strict';

	switch (e.keyCode) {
		case 65: //A
		case 97: //a
			scene.traverse(function (node) {
				if (node instanceof THREE.Mesh) {
					node.material.wireframe = !node.material.wireframe;
				}
			});
			break;

		case 39: // Right Arrow
            airplane.rotateOnAxis(directionAxis, 0.1 );
            break;

		case 37: // Left Arrow
            airplane.rotateOnAxis(directionAxis, -0.1 );
            break;

		case 38: // Up Arrow
			airplane.rotation.z -= 0.1;
            break;

		case 40: // Down Arrow
            airplane.rotation.z += 0.1;
            break;

		case 78: //N - Sun On/Off
			toggleSun();
			break;

		case 76: //L - Lighting Calculus On/Off
			airplane.forEach(function e(element){
				element.toggleLighting();
			});
			break;

		case 71: //G - Phong vs Lambert Material
			airplane.forEach(function e(element){
				element.toggleShadow();
			});
			break;

		//LightBulbs On/Off
		case 49: //1
			pointlight1.toggleLight();
			break;

		case 50: //2
			pointlight2.toggleLight();
			break;

		case 51: //3
			pointlight3.toggleLight();
			break;

		case 52: //4
			pointlight4.toggleLight();
			break;

	}
}

function render() {
    'use strict';
    renderer.render(scene, cameraPerspective);
}

function init() {
	'use strict';

	renderer = new THREE.WebGLRenderer();

	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	createScene();
	createCameraPerspective();
    createSun();

	pointlight1 = new Pointlight(50,90,-80);
	pointlight2 = new Pointlight(-50,90,-80);
	pointlight3 = new Pointlight(50,90,80);
	pointlight4 = new Pointlight(-50,90,80);

	render();

	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("resize", onResize);

}

function animate() {
	'use strict';

	render();

	requestAnimationFrame(animate);
}
