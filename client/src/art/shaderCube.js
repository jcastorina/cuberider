export default class shaderCube {
    constructor(pos, scale, spin, name, material){
        let geometry = new THREE.BoxGeometry(1,1,1);
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.shot = false;
        this.mesh.startingHeight = pos.y;
        this.mesh.startingPos = pos;
        this.mesh.position.set(pos.x,pos.y,pos.z);
        this.mesh.lastPos = null;
        this.mesh.name = this.name = name;
        this.mesh.launchVec = null;
        this.mesh.force = null;
        this.mesh.weight = 6;
        this.spin = spin;
        this.toggle = true;
        this.mesh.scale.set(scale.x,scale.y,scale.z);
        this.mesh.next = (delta) => {
            if(this.mesh.shot){
                this.mesh.position.add(this.mesh.launchVec);
                this.mesh.force += delta;
                this.mesh.position.y -= this.mesh.force * GRAVITY * this.mesh.weight;
                if(this.mesh.position.y < this.mesh.startingHeight){
                    this.mesh.position.set(this.mesh.startingPos.x,this.mesh.startingPos.y,this.mesh.startingPos.z);
                    this.mesh.shot = false;
                    this.mesh.force = 0;
                }
            }
           /* if(this.name === 'mover'){
                console.log('pre', movingCube.mesh.position);   
               if(this.mesh.position.z < 5 && this.toggle){
                    this.mesh.position.z += (0.05);
                    this.mesh.position.x += (0.025);
                } else {
                    this.toggle = false
                    this.mesh.position.z -= 0.05;
                    this.mesh.position.x -= 0.025;
                }
                if(this.mesh.position.z < -5){
                    this.toggle = true;
                }
                console.log('post', movingCube.mesh.position);   
            }*/
            this.mesh.rotation.x += this.spin.x;
            this.mesh.rotation.y += this.spin.y;
            this.mesh.rotation.z += this.spin.z;
        }
    }
}
