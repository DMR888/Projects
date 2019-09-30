'use strict';

class Movable extends THREE.Object3D {
    constructor() {
        super();
    }

    setRandom(){
        var xx = this.getRandomInt(-90, 90);
        var zz = this.getRandomInt(-45, 45);

        this.position.x = this.limits(xx, 90, -90);
        this.position.y = Math.sqrt(50000)/20;
        this.position.z = this.limits(zz, 45, -45);
        for(var i = 0; i < balls.length; i++){
          if(this.hasCollided(balls[i])){
              this.setRandom();
          }
        }
    }

    hasCollided(obj){
        return Math.pow(this.position.x - obj.position.x, 2) + Math.pow(this.position.z - obj.position.z, 2) <= Math.pow((Math.sqrt(50000)/10), 2) ;
    }

    getPosition(){
        return [this.position.x, this.position.y, this.position.z];
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    limits(lim, max, min){
        'use strict';

        if(lim > 0){
            if(lim > max - Math.sqrt(50000)/20){
                lim = max - Math.sqrt(50000)/20;
            }
        }
        else{
            if(lim < min + Math.sqrt(50000)/20){
                lim = min + Math.sqrt(50000)/20;
            }
        }

        return lim;
    }
}