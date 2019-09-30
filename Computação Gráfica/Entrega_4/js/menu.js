'use strict'

class Menu extends THREE.Object3D{
    constructor(){
        super();
        this.name = "menu";
        this.geometry = new THREE.PlaneGeometry( 160, 120, 1, 1 );
        this.texture = new THREE.TextureLoader().load( "textures/paused.png" );
        this.material = new THREE.MeshBasicMaterial( { map: this.texture } );
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        // this.plane.position.y = -50;
        // this.plane.position.z = -60;
        // this.plane.position.x = -60;
        this.mesh.position.set(0,10,0);
        this.mesh.rotateX(-Math.PI/2);
        return this.mesh;

    }
}