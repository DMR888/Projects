'use strict'

class Board extends MyObject{
    constructor(){
        super();
        this.name = "board";
        this.geometry = new THREE.PlaneGeometry( 120, 120, 1, 1 );
        this.texture = new THREE.TextureLoader().load( "textures/board.jpg" );
        this.texture.wrapS = THREE.RepeatWrapping;
        this.texture.wrapT = THREE.RepeatWrapping;
        this.texture.repeat.set(2,2);
        this.originalMaterial = new THREE.MeshPhongMaterial( { map: this.texture } );
        this.material = new THREE.MeshBasicMaterial( { map: this.texture } );
        this.mesh = new THREE.Mesh( this.geometry, this.originalMaterial );
        // this.plane.position.y = -50;
        // this.plane.position.z = -60;
        // this.plane.position.x = -60;
        this.mesh.position.set(0,0,0);
        this.mesh.rotateX(-Math.PI/2);
        scene.add( this.mesh );
    }
}