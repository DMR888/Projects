'use strict'

var renderer, scene, scene2, camera1, cameraOrthographic, camera, controls, clock;

var directionalLight, pointLight;

var cue, rubix, board;

var group = [];

var moveBall;

var menu, gamePaused;

var width, height;

function init(){

    renderer = new THREE.WebGLRenderer( {
        antialias : true
    });

    moveBall = false;
    gamePaused = false;

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.autoClear = false;

    createScene();
    createScene2();
    createLights();
    createCameras();

    clock = new THREE.Clock();

    render();

    width = window.innerWidth;
    height = window.innerHeight;

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

}

function animate() {
    'use strict';

    // required if controls.enableDamping or controls.autoRotate are set to true
    var delta = clock.getDelta();

    if(!gamePaused){
        cue.moveBall(delta);
    }

    render();

    requestAnimationFrame(animate);
}

function render() {
    'use strict';
    if(gamePaused){
        renderer.render(scene2, cameraOrthographic);
    }
    else{
        controls.update();
        renderer.render(scene, camera1);
    }
}

function createScene(){
    scene = new THREE.Scene();

    rubix = new Rubix(0,0,0);
    cue = new Cue(0,0,0);
    board = new Board();

    group.push(cue, rubix, board);

}

function createScene2(){
    scene2 = new THREE.Scene();

    scene2.add(menu = new Menu());
}

function createLights(){
    directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    directionalLight.position.set(50,50,50);
    scene.add( directionalLight );

    pointLight = new THREE.PointLight( 0xffffff, 1, 100 );
    pointLight.position.set( 0, 25, 0 );
    scene.add( pointLight );
}

function createCameras(){
    camera1 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 3 * window.innerHeight);
    camera1.lookAt(scene.position);
    camera1.position.set(100,104,80);

    var aspectRatio;

    if (window.innerHeight > window.innerWidth) {
        aspectRatio = window.innerHeight / window.innerWidth;
        cameraOrthographic = new THREE.OrthographicCamera( -100, 100, 100 * aspectRatio, -100 * aspectRatio, 1, 1000);
    } else {
        aspectRatio = window.innerWidth / window.innerHeight;
        cameraOrthographic = new THREE.OrthographicCamera(-100 * aspectRatio, 100 * aspectRatio, 100, -100, 1, 1000);
    }
    cameraOrthographic.position.set(0,100,0);
    cameraOrthographic.lookAt(scene.position);

    controls = new THREE.OrbitControls(camera1);
    controls.autoRotate = true;

    //controls.update() must be called after any manual changes to the camera's transform

    controls.update();
}

function onKeyDown(e){
    switch (e.keyCode) {
        case 66: //B
            moveBall = !moveBall;
            break;
        case 68: //D
            directionalLight.visible = !directionalLight.visible;
            break;
        case 80: //P
            pointLight.visible = !pointLight.visible;
            break;
        case 87: //W
            group.forEach(function(element){
                element.toggleWireframe();
            });
            break;
        case 76: //L
            group.forEach(function(element){
                element.toggleLight();
            });
            break;
        case 83: //S
            gamePaused = !gamePaused;
            break;
        case 82: //R
            if(gamePaused){
                gamePaused = !gamePaused;
                clearScene();
            }
            break;
    }
}

function clearScene(){
    createScene();
    createScene2();
    createLights();
    createCameras();
}

function onResize(){
    renderer.setSize(window.innerWidth, window.innerHeight);

    var aspectRatio = window.innerWidth / window.innerHeight;

    if(window.innerHeight > 0 && window.innerWidth > 0){
        camera1.aspect = aspectRatio;
        camera1.updateProjectionMatrix();
    }

    if (window.innerHeight > window.innerWidth) {
        cameraOrthographic.left = -100;
        cameraOrthographic.right = 100 ;
        cameraOrthographic.top = 100 / aspectRatio;
        cameraOrthographic.bottom = -100 / aspectRatio;
    } else {
        cameraOrthographic.left = -100 * aspectRatio;
        cameraOrthographic.right = 100 * aspectRatio;
        cameraOrthographic.top = 100;
        cameraOrthographic.bottom = -100;
    }

    cameraOrthographic.aspect = aspectRatio;
    cameraOrthographic.updateProjectionMatrix();

}