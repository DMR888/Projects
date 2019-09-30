'use strict';

var temp;

class Ball extends Movable{
    constructor(x, y, z, playerBall) {
        super();

        this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
        this.name = "Non Player Ball";
        this.geometry = new THREE.SphereGeometry(Math.sqrt(50000)/20, 15, 15);
        if(playerBall){
            this.name = 'Player Ball';
            this.material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
        }
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(x, y, z);
        this.axisHelper = new THREE.AxisHelper(20);
        this.add(this.mesh);

        this.deltaTime = 0;

        this.direction = new THREE.Vector3(1, 0, 0);
        this.direction.applyAxisAngle(new THREE.Vector3(0, 1, 0).normalize(), (Math.random() * 4*Math.PI) - 2*Math.PI);

        this.speed = Math.random();
        scene.add(this);

        this.setRandom();

    }

    moveBall(){
        this.position.x += this.speed * this.direction.x;
        this.position.z += this.speed * this.direction.z;
        // this.rotateOnAxis(new THREE.Vector3(1,0,0).normalize(),
        //     this.direction.x * this.speed / 8);

        this.rotateOnAxis(new THREE.Vector3(this.direction.z, 0, this.direction.x).normalize(),
            Math.sqrt(Math.pow(this.direction.x * this.speed, 2) + Math.pow(this.direction.z * this.speed, 2)) / 8);
    }


    hasCollidedWall(){
        if(this.position.x >= 100 - Math.sqrt(50000)/20 || this.position.x <= -100 + Math.sqrt(50000)/20){
            this.direction.x = -this.direction.x;
        }
        if(this.position.z >= 50 - Math.sqrt(50000)/20 || this.position.z <= -50 + Math.sqrt(50000)/20 ){
            this.direction.z = -this.direction.z;
        }
    }

    hasCollidedAnotherBall(){
        let x = this.position.x;
        let z = this.position.z;
        let i;
        for(i = 0; i < balls.length ; i++){
            if(balls[i].position.x === x && balls[i].position.z === z){
                continue;
            }
            if(this.getDistance(balls[i]) <= (22.7)){
                return i;
            }

        }
        return 10;
    }

    getDistance(obj){
        return Math.sqrt(Math.pow(this.position.x - obj.position.x, 2) + Math.pow(this.position.z - obj.position.z, 2));
    }


    treatCollision(obj){
        var phi   = Math.atan((obj.position.z - this.position.z) / (obj.position.x - this.position.x));
        var teta1 = Math.atan((this.position.z) / (this.position.x));
        var teta2 = Math.atan((obj.position.z) / (obj.position.x));

        var speedx = (obj.mass * obj.speed * Math.cos(teta2 - phi)) * Math.cos(phi) + this.speed*Math.sin(teta1 - phi)*Math.cos(teta2 + Math.PI/2);
        var speedz = (obj.mass * obj.speed * Math.cos(teta2 - phi)) * Math.sin(phi) + this.speed*Math.sin(teta1 - phi)*Math.sin(teta2 + Math.PI/2);

        this.speed = Math.sqrt(Math.pow(speedx, 2) + Math.pow(speedz, 2));
        this.direction = new THREE.Vector3(speedx, 0, speedz).normalize();

    }

    increaseBallSpeed(){
        this.speed = this.speed * 1.2;
    }


}