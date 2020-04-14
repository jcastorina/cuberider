import GLTFLoader from 'three-gltf-loader';
export default function loadGLTF() {
    var loader = new GLTFLoader();    
    loader.load(
        'test.gltf',
            function( gltf ) {
            //gltf.scene.children[0].position.y = -3.5;
            gltf.scene.children[0].material.wireframe = false;
            gltf.scene.children[0].position.y = -3.8;
        /*    gltf.scene.children[0].next = () => {
                    if(this.shot){
                        this.position.add(this.launchVec);
                        this.mesh.duration += DURATION;
                        this.mesh.position.y -= this.mesh.duration * GRAVITY * this.mesh.weight;
                        if(this.mesh.position.y < this.mesh.startingHeight){
                            this.mesh.position.set(this.mesh.startingPos.x,this.mesh.startingPos.y,this.mesh.startingPos.z);
                            this.mesh.shot = false;
                            this.mesh.duration = 0;
                        }
                    }
                    this.mesh.rotation.x += this.spin.x;
                    this.mesh.rotation.y += this.spin.y;
                    this.mesh.rotation.z += this.spin.z;
                }*/
            shitBoxes.push(gltf.scene.children[0]); 
            scene.add( gltf.scene.children[0] );
            gltf.animations;
            gltf.scenes;
            gltf.cameras;
            gltf.asset;
        },
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded');
            if((xhr.loaded/xhr.total) === 1){
                   }
        },
        function ( error ) {
            console.log( 'An error occurred with the loader');
        },
    );
   
}
