'use strict';

class Body extends AirplaneComponent{

	constructor(x, y, z){
            super();

            var points = [];
            for ( var i = 0; i < 10; i ++ ) {
                points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 2, ( i - 5 ) * 8 ) );
            }
            this.geometry = new THREE.LatheGeometry( points, 20 );

            var lambMaterial = new THREE.MeshLambertMaterial({color: 0xbbc9e8, emissive:0x0});
            lambMaterial.shading = THREE.FlatShading;
            lambMaterial.shading = THREE.SmoothShading;
            this.geometry.normalsNeedUpdate = true;
            this.geometry2 = new THREE.SphereGeometry( 2.8, 32, 2, 0, Math.PI * 4,1,2.2 );
            this.mesh2 = new THREE.Mesh(this.geometry2, lambMaterial);
            this.mesh2.position.set(x + 37, y, z);
            this.mesh2.rotation.z = Math.PI/2;

            this.mesh1 = new THREE.Mesh(this.geometry, lambMaterial);
            this.mesh1.position.set(x,y,z);
            this.mesh1.rotation.z = Math.PI/2;

            // var axis = new THREE.AxisHelper(50);
            // this.mesh1.add(axis);
            // scene.add(this.mesh1);
	}

}