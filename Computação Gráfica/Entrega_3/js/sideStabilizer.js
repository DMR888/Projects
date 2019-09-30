'use strict';

class SideStabilizer extends AirplaneComponent{

	constructor(x, y, z){
                super();
        this.geometry = new THREE.Geometry();

        this.geometry.vertices.push(new THREE.Vector3(-48, -5, 0));
        this.geometry.vertices.push(new THREE.Vector3(-48, -5, 30));
        this.geometry.vertices.push(new THREE.Vector3(-44, -5, 30));
        this.geometry.vertices.push(new THREE.Vector3(-44, -5, 0));
        this.geometry.vertices.push(new THREE.Vector3(-40, -5, 0));
        this.geometry.vertices.push(new THREE.Vector3(-48, -5, -30));
        this.geometry.vertices.push(new THREE.Vector3(-44, -5, -30));

        this.geometry.vertices.push(new THREE.Vector3(-48, -3, 30));
        this.geometry.vertices.push(new THREE.Vector3(-44, -3, 30));
        this.geometry.vertices.push(new THREE.Vector3(-48, -3, 0));
        this.geometry.vertices.push(new THREE.Vector3(-44, -3, 0));
        this.geometry.vertices.push(new THREE.Vector3(-48, -3, -30));
        this.geometry.vertices.push(new THREE.Vector3(-44, -3, -30));

        this.geometry.faces.push(new THREE.Face3(2, 1, 0));
        this.geometry.faces.push(new THREE.Face3(3, 2, 0));
        this.geometry.faces.push(new THREE.Face3(3, 4, 2));
        this.geometry.faces.push(new THREE.Face3(5, 6, 0));
        this.geometry.faces.push(new THREE.Face3(3, 0, 6));
        this.geometry.faces.push(new THREE.Face3(3, 6, 4));

        this.geometry.faces.push(new THREE.Face3(1, 2, 7));
        this.geometry.faces.push(new THREE.Face3(2, 8, 7));
        this.geometry.faces.push(new THREE.Face3(9, 0, 7));
        this.geometry.faces.push(new THREE.Face3(0, 1, 7));
        this.geometry.faces.push(new THREE.Face3(7, 8, 9));
        this.geometry.faces.push(new THREE.Face3(8, 10, 9));
        this.geometry.faces.push(new THREE.Face3(10, 8, 4));
        this.geometry.faces.push(new THREE.Face3(8, 2, 4));
        this.geometry.faces.push(new THREE.Face3(6, 5, 11));
        this.geometry.faces.push(new THREE.Face3(12, 6, 11));
        this.geometry.faces.push(new THREE.Face3(11, 5, 0));
        this.geometry.faces.push(new THREE.Face3(9, 11, 0));
        this.geometry.faces.push(new THREE.Face3(11, 9, 12));
        this.geometry.faces.push(new THREE.Face3(9, 10, 12));
        this.geometry.faces.push(new THREE.Face3(10, 4, 12));
        this.geometry.faces.push(new THREE.Face3(4, 6, 12));

        this.geometry.computeFaceNormals();

        var lambMaterial = new THREE.MeshLambertMaterial({color: 0xbbc9e8});
        lambMaterial.shading = THREE.FlatShading;
        lambMaterial.shading = THREE.SmoothShading;
        this.geometry.normalsNeedUpdate = true;

        this.mesh1 = new THREE.Mesh(this.geometry, lambMaterial);
        this.mesh1.position.set(x + 10, y + 5, z);
        this.mesh1.rotation.y = Math.PI;
	}
}