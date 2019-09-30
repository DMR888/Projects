'use strict';

class Cockpit extends AirplaneComponent{

	constructor(x, y, z){
	    super();


        var points = [];
        for ( var i = 0; i < 10; i ++ ) {
            points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 1.6, ( i - 5 ) * 2 ) );
        }
        this.geometry = new THREE.LatheGeometry( points, 30, 6, 3.6 );
        var lambMaterial = new THREE.MeshLambertMaterial({color: 0x8888ff, emissive:0x0});
        lambMaterial.shading = THREE.FlatShading;
        lambMaterial.shading = THREE.SmoothShading;

        this.mesh1 = new THREE.Mesh(this.geometry, lambMaterial);
        this.mesh1.position.set(x - 11,y +3,z);
        this.mesh1.rotation.y = Math.PI;
        this.mesh1.rotation.z = Math.PI / 2;

        var lambMaterial = new THREE.MeshLambertMaterial({color: 0xbbc9e8, emissive:0x0});
        lambMaterial.shading = THREE.FlatShading;
        lambMaterial.shading = THREE.SmoothShading;

        var points2 = [];
        for ( i = 0; i < 10; i ++ ) {
            points2.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 2, ( i - 5 ) * 6 ) );
        }
        this.geometry2 = new THREE.LatheGeometry( points2, 30, 6 );

        this.mesh2 = new THREE.Mesh(this.geometry2, lambMaterial);
        this.mesh2.position.set(x + 19,y + 2,z);
        this.mesh2.rotation.z =  Math.PI / 2;
        this.mesh2.rotation.z -= 0.02;
	}

}