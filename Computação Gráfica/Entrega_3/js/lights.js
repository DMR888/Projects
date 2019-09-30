'use strict'

class Pointlight extends THREE.SpotLight{
    /*
        Creates a a LightBulb and a Pointlight for each
     */
    constructor(x,y,z){
        super();

        this.createLightBulb(x,y,z);

        this.light = new THREE.PointLight( 0xffffff, 1, 200);
        this.light.position.set(x, y/2, z);
        scene.add(this.light);
    }

    /*
        For each LightBulb with Keys "1", "2", "3" or "4" turns on/off the light
     */
    toggleLight(){
        this.light.visible = !this.light.visible;
        if(!this.light.visible)
            this.sphere.material.color.setHex(0x000000);
        else
            this.sphere.material.color.setHex(0xffff66);
    }

    /*
        Each LightBulb has a poll, a cone and the light. The light is a parameter of the class so that it can be
        turned on/off for each instance.
    */
    createLightBulb(x,y,z){
        var body = new THREE.BoxGeometry(2,90,2);
        var material = new THREE.MeshBasicMaterial( {color: 0x111111} );
        var cube = new THREE.Mesh( body, material );
        cube.position.set(x,0,z);
        scene.add(cube);

        var geometry1 = new THREE.ConeGeometry( 10, 20, 32, 8, 1, true);
        var material1 = new THREE.MeshBasicMaterial( {color: 0x111111, side: THREE.DoubleSide} );
        geometry1.openEnded = true;
        var cone = new THREE.Mesh( geometry1, material1 );
        cone.position.set(x,y/2,z);

        if(z > 0){
            cone.rotation.x = Math.PI / 4;
        }else{
            cone.rotation.x = - Math.PI / 4;
        }
        if(x < 0) {
            cone.rotation.z = Math.PI / 6;
        }else{
            cone.rotation.z = - Math.PI / 6;
        }
        scene.add( cone );

        var geometry2 = new THREE.SphereGeometry( 4, 32, 32 );
        var material2 = new THREE.MeshBasicMaterial( {color: 0xffff66} );
        this.sphere = new THREE.Mesh( geometry2, material2 );
        this.sphere.position.set(x,y/2,z);
        scene.add( this.sphere );
    }
}
