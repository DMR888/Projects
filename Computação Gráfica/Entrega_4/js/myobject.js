'use strict'

class MyObject extends THREE.Object3D{
    constructor(){
        super();

    }

    toggleWireframe(){
        this.originalMaterial.wireframe = !this.originalMaterial.wireframe;
        this.material.wireframe = !this.material.wireframe;
    }

    toggleLight(){
        if(this.mesh.material === this.material){
            this.mesh.material = this.originalMaterial;
        }else{
            this.mesh.material = this.material;
        }
    }
}