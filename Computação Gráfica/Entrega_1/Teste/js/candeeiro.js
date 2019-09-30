var camera, scene, renderer;

var geometry, material, mesh;

var candeeiro;

function addHat(obj, x, y, z) {
    'use strict';

    material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

    geometry = new THREE.CylinderGeometry(3, 6, 8, 20, 1, true);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addLamp(obj, x, y, z) {
    'use strict';

    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

    geometry = new THREE.SphereGeometry(1.5, 10, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addPole(obj, x, y, z) {
    'use strict';

    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

    geometry = new THREE.CylinderGeometry(0.5, 0.5, 40, 20);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}


function addBase(obj, x, y, z) {
    'use strict';

    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

    geometry = new THREE.ConeGeometry(7, 3, 32);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createCandeeiro(x, y, z) {
    'use strict';
    
    candeeiro = new THREE.Object3D();
    
    addBase(candeeiro, 0, 0, 0);
    addPole(candeeiro, 0, 20, 0);
    addLamp(candeeiro, 0, 41, 0);
    addHat(candeeiro, 0, 41, 0);


    
    scene.add(candeeiro);
    
    candeeiro.position.x = x;
    candeeiro.position.y = y;
    candeeiro.position.z = z;
}