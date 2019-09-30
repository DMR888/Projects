'use strict'

class Rubix extends MyObject{
    constructor(x,y,z){
        super();
        this.geometry = new THREE.CubeGeometry(8, 8, 8);
        this.name = "rubix";
        let textureLoader = new THREE.TextureLoader();
        let texture1 = textureLoader.load( 'textures/rubix/face1.jpg' );
        let texture2 = textureLoader.load( 'textures/rubix/face2.jpg' );
        let texture3 = textureLoader.load( 'textures/rubix/face3.jpg' );
        let texture4 = textureLoader.load( 'textures/rubix/face4.jpg' );
        let texture5 = textureLoader.load( 'textures/rubix/face5.jpg' );
        let texture6 = textureLoader.load( 'textures/rubix/face6.jpg' );

        let bumpTexture = textureLoader.load('textures/base.jpg');

        this.materials = [
            new THREE.MeshPhongMaterial( { map: texture1 , bumpMap: bumpTexture } ),
            new THREE.MeshPhongMaterial( { map: texture2 , bumpMap: bumpTexture } ),
            new THREE.MeshPhongMaterial( { map: texture3 , bumpMap: bumpTexture } ),
            new THREE.MeshPhongMaterial( { map: texture4 , bumpMap: bumpTexture } ),
            new THREE.MeshPhongMaterial( { map: texture5 , bumpMap: bumpTexture } ),
            new THREE.MeshPhongMaterial( { map: texture6 , bumpMap: bumpTexture } )
        ];

        this.materials2 = [
            new THREE.MeshBasicMaterial( { map: texture1 , bumpMap: bumpTexture } ),
            new THREE.MeshBasicMaterial( { map: texture2 , bumpMap: bumpTexture } ),
            new THREE.MeshBasicMaterial( { map: texture3 , bumpMap: bumpTexture } ),
            new THREE.MeshBasicMaterial( { map: texture4 , bumpMap: bumpTexture } ),
            new THREE.MeshBasicMaterial( { map: texture5 , bumpMap: bumpTexture } ),
            new THREE.MeshBasicMaterial( { map: texture6 , bumpMap: bumpTexture } )
        ];
        this.originalMaterial = new THREE.MeshFaceMaterial( this.materials );
        this.material = new THREE.MeshFaceMaterial(this.materials2);
        this.mesh = new THREE.Mesh( this.geometry, this.originalMaterial );
        this.mesh.position.set(x,y + 6,z);
        scene.add( this.mesh );

        var axesHelper = new THREE.AxisHelper( 25 );
        scene.add( axesHelper );
        // var material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );
    }

    toggleWireframe(){
        for (var i = 0; i < 6; i++) {
            this.materials[i].wireframe = !this.materials[i].wireframe;
            this.materials2[i].wireframe = !this.materials2[i].wireframe;
        }
    }
}