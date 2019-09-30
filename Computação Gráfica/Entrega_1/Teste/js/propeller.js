'use strict';

class Propeller extends THREE.Object3D{

	constructor(x, y, z){
                super();		


                this.geometry = new THREE.ConeGeometry(7, 3, 32);

                this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

                this.mesh1 = new THREE.Mesh(this.geometry, this.material);
                this.mesh1.position.set(50, 16, z);		

                this.mesh1.rotation.y = Math.PI/2;
                this.mesh1.rotation.z = -Math.PI/4;
                this.mesh1.rotation.x = -Math.PI/4;
                scene.add(this.mesh1);
	}
}