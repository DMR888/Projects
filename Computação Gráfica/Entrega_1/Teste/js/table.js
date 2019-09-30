var camera, scene, renderer;

var geometry, material, mesh;

var table;

function addTableLeg(obj, x, y, z) {
	'use strict';

	material = new THREE.MeshBasicMaterial({
		color: 0x00ff00,
		wireframe: true
	});

	geometry = new THREE.CylinderGeometry(1, 1, 6, 8);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y - 3, z);
	obj.add(mesh);
}

function addTableTop(obj, x, y, z) {
	'use strict';

	material = new THREE.MeshBasicMaterial({
		color: 0x00ff00,
		wireframe: true
	});

	geometry = new THREE.BoxGeometry(50, 2, 20);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);
	obj.add(mesh);
}



function createTable(x, y, z) {
	'use strict';

	table = new THREE.Object3D();


	addTableTop(table, 0, 0, 0);
	addTableLeg(table, -20, 0, -8);
	addTableLeg(table, -20, 0, 8);
	addTableLeg(table, 20, 0, 8);
	addTableLeg(table, 20, 0, -8);

	scene.add(table);

	table.position.x = x;
	table.position.y = y;
	table.position.z = z;
}