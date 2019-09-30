var geometry, mesh;

function createSkyBox() {	
    
    var skyBoxGeometry = new THREE.CubeGeometry( 3*window.innerWidth/2, 3*window.innerHeight/2, 500 );
    var texture = new THREE.ImageUtils.loadTexture("js/textures/background.jpg");
    var skyBoxMaterial = new THREE.MeshBasicMaterial({map: texture, side: THREE.BackSide});
    var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    skyBox.name = "Campo";
    scene.add(skyBox);
    skyBox.position.set(window.innerWidth/2, window.innerHeight/2, 300);

    return skyBox;
}
