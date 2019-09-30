'use strict';

class Nose extends AirplaneComponent{

	constructor(x, y, z){
            super();

            var points = [];
            for ( var i = 0; i < 10; i ++ ) {
                points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 2, ( i - 4 ) * 3 ) );
            }
            this.geometry = new THREE.LatheGeometry( points, 20 );

            var lambMaterial = new THREE.MeshLambertMaterial({color: 0xbbc9e8, emissive:0x0});
            lambMaterial.shading = THREE.FlatShading;
            lambMaterial.shading = THREE.SmoothShading;
            this.geometry.normalsNeedUpdate = true;

            this.geometry2 = new THREE.SphereGeometry( 2.2, 32, 32, 0, Math.PI );
            this.mesh1 = new THREE.Mesh(this.geometry, lambMaterial);
            this.mesh2 = new THREE.Mesh(this.geometry2, lambMaterial);
            this.mesh1.position.set(x - 1.8,y,z);
            this.mesh1.rotation.z = - Math.PI/2;
            this.mesh2.position.set(x - 13.2, y, z);
            this.mesh2.rotation.y = - Math.PI/2;

            // var axis = new THREE.AxisHelper(50);
            // this.mesh1.add(axis);
            // scene.add(this.mesh1);
	}

}