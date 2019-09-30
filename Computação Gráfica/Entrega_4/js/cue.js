'use strict'

class Cue extends MyObject{
    constructor(x,y,z){
        super();
        this.name = "cue";
        this.geometry = new THREE.SphereGeometry( 3, 10, 10 );
        this.texture = new THREE.TextureLoader().load('textures/ball.jpg');
        this.originalMaterial = new THREE.MeshPhongMaterial( {map: this.texture, specular: 0x888888, shininess: 5} );
        this.material = new THREE.MeshBasicMaterial( {map: this.texture, specular: 0x888888, shininess: 5} );
        this.mesh = new THREE.Mesh( this.geometry, this.originalMaterial );
        this.mesh.position.set(x,y + 6,z + 15);
        scene.add( this.mesh );

        this.mesh.rotation.y = Math.PI;

        this.directionAxis = new THREE.Vector3(0,1,0);
        this.theta = 0;


        this.direction = new THREE.Vector3(1,0,0);

    }

    moveBall(delta){

        if(moveBall && this.theta < 0.05){
            this.theta += delta/15;
        }if(!moveBall && this.theta > 0){
            this.theta -= delta/15;
        }

        if(!moveBall && this.theta < 0.01 && this.theta > -0.01)
            this.theta = 0;

        this.mesh.rotation.y += this.theta;
        this.direction.applyAxisAngle(this.directionAxis, this.theta);
        this.mesh.position.x += this.theta * 15 * this.direction.x;
        this.mesh.position.z += this.theta * 15 * this.direction.z;
        this.roleBall();
    }

    roleBall(){
        this.mesh.rotation.z += this.theta * 2;
    }
}