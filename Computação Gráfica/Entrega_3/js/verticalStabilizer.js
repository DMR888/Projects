'use strict';

class VerticalStabilizer extends AirplaneComponent{

	constructor(x, y, z){
                super();		


		this.geometry = new THREE.Geometry();

        this.geometry.vertices.push(new THREE.Vector3(-48, 10, -1));
        this.geometry.vertices.push(new THREE.Vector3(-48, 32, -1));
        this.geometry.vertices.push(new THREE.Vector3(-44, 10, -1));
        this.geometry.vertices.push(new THREE.Vector3(-44, 32, -1));

        this.geometry.vertices.push(new THREE.Vector3(-48, 10, 1));
        this.geometry.vertices.push(new THREE.Vector3(-48, 32, 1));
        this.geometry.vertices.push(new THREE.Vector3(-44, 10, 1));
        this.geometry.vertices.push(new THREE.Vector3(-44, 32, 1));

        this.geometry.vertices.push(new THREE.Vector3(-37, 10, 0));

        //LEFT AND RIGHT SIDES OF STABILIZER
        this.geometry.faces.push(new THREE.Face3(0,1,2));
        this.geometry.faces.push(new THREE.Face3(1,3,2));
        this.geometry.faces.push(new THREE.Face3(4,6,5));
        this.geometry.faces.push(new THREE.Face3(5,6,7));

        //JOIN TWO SIDES
        this.geometry.faces.push(new THREE.Face3(0,4,1));
        this.geometry.faces.push(new THREE.Face3(5,1,4));
        this.geometry.faces.push(new THREE.Face3(1,5,3));
        this.geometry.faces.push(new THREE.Face3(7,3,5));

        //FRONTAL PART OF STABILIZER
        this.geometry.faces.push(new THREE.Face3(7,6,8));
        this.geometry.faces.push(new THREE.Face3(3,8,2));
        this.geometry.faces.push(new THREE.Face3(3,7,8));

        this.geometry.computeFaceNormals();

        this.material = new THREE.MeshLambertMaterial({ color: 0xbbc9e8});

        this.mesh1 = new THREE.Mesh(this.geometry, this.material);
        this.mesh1.position.set(x + 10, y , z);
        this.mesh1.rotation.y = Math.PI;
        this.mesh1.rotation.z = 0.2;
	}
}