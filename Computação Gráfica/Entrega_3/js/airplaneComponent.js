'use strict'

class AirplaneComponent extends THREE.Object3D {
    constructor(x, y, z) {
        super();

        //The directionAxis is used to rotate the airplane in it's x axis and not in the world's axis.
        this.directionAxis = new THREE.Vector3(1,0,0);
        this.lightingOn = true;
        this.lamb = true;
    }
    /*
        In case key "L" is pressed change the lighting calculus on/off.
        We use a flag to check if is on or off.
        If it's off and we want to turn it on we use the flag lamb to recall if the previous state was with Lambert or
        Phong material, and reassign the respective material.
     */
    toggleLighting(){
        let thiscolor = this.mesh1.material.color;
        if(this.lightingOn)
            this.mesh1.material = new THREE.MeshBasicMaterial({color: thiscolor, side: THREE.DoubleSide});
        else{
            if(this.lamb){
                var lambMaterial = new THREE.MeshLambertMaterial({color: thiscolor});
                lambMaterial.shading = THREE.FlatShading;
                lambMaterial.shading = THREE.SmoothShading;
                this.geometry.normalsNeedUpdate = true;
                this.mesh1.material = lambMaterial;
                this.lamb = true;
            }else{
                var matPhong = new THREE.MeshPhongMaterial({color: thiscolor, side:THREE.DoubleSide});
                matPhong.specular = new THREE.Color(0x111111);
                matPhong.shininess = 30;
                matPhong.shading = THREE.FlatShading;
                matPhong.shading = THREE.SmoothShading;
                matPhong.needsUpdate = true;
                this.mesh1.normalsNeedUpdate = true;
                this.mesh1.material = matPhong;            }
        }
        this.lightingOn = !this.lightingOn;
    }

    /*
        In case the key "G" is pressed we change from a LambertMaterial to a PhongMaterial.
     */
    toggleShadow(){
        let thiscolor = this.mesh1.material.color;
        if(!this.lamb) {
            var lambMaterial = new THREE.MeshLambertMaterial({color: thiscolor});
            lambMaterial.shading = THREE.FlatShading;
            lambMaterial.shading = THREE.SmoothShading;
            this.geometry.normalsNeedUpdate = true;
            this.mesh1.material = lambMaterial;
            this.lamb = true;
        }
        else{
            var matPhong = new THREE.MeshPhongMaterial({color: thiscolor, side:THREE.DoubleSide});
            matPhong.specular = new THREE.Color(0x111111);
            matPhong.shininess = 30;
            matPhong.shading = THREE.FlatShading;
            matPhong.shading = THREE.SmoothShading;
            matPhong.needsUpdate = true;
            this.mesh1.normalsNeedUpdate = true;
            this.mesh1.material = matPhong;
            this.lamb = false;
        }
    }
}