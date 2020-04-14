var grass;

export default () => {
    var groundGeo = new THREE.PlaneBufferGeometry( 100, 100 );
    var material;
   // var text = () => {
        textureLoader.load('ground.png',function(texture){
            material = new THREE.MeshBasicMaterial({ map: texture });
            grass = new THREE.Mesh(groundGeo, material);
            grass.rotation.reorder("YXZ");
            grass.rotation.x = -1.57079;
            grass.position.y = -5;
            grass.name = "grass";
            scene.add(grass);
        })
  //  }
    //return text();
}
