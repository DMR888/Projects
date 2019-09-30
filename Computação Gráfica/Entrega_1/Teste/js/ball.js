var camera, scene, renderer;

var geometry, material, mesh;

var ball;


function createBall(x, y, z){
	'use strict';

	ball = new THREE.Object3D();

	material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

    geometry = new THREE.SphereGeometry(1.5, 10, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    ball.add(mesh);

    scene.add(ball)

    ball.position.x = x;
    ball.position.y = y;
    ball.position.z = z;
}

