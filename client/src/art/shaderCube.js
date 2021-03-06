export default class shaderCube {
    constructor(pos, scale, spin, name, material){
        let geometry = new THREE.BoxGeometry(1,1,1);
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.shot = false;
        this.mesh.startingHeight = GROUND;
        //this.mesh.startingHeight = pos.y;
        this.mesh.startingPos = pos;
        this.mesh.position.set(pos.x,pos.y,pos.z);
        this.mesh.lastPos = null;
        this.mesh.name = this.name = name;
        this.mesh.launchVec = null;
        this.mesh.force = null;
        this.mesh.weight = 8;
        this.spin = spin;
        this.toggle = true;
        this.launched = false;
        this.mesh.hit = false;
        this.mesh.scale.set(scale.x,scale.y,scale.z);
        this.mesh.next = (delta) => {
            if(this.mesh.shot){
                this.mesh.material.wireframe = true;
                this.mesh.position.add(this.mesh.launchVec);
                this.mesh.force += delta;
                this.mesh.position.y -= this.mesh.force * GRAVITY * this.mesh.weight;
                if(this.mesh.position.y < this.mesh.startingHeight){
                    //this.mesh.position.set(this.mesh.startingPos.x,this.mesh.startingPos.y,this.mesh.startingPos.z);
                    this.mesh.shot = false;
                    this.mesh.force = 0;
                }
            }

            this.mesh.rotation.x += this.spin.x;
            this.mesh.rotation.y += this.spin.y;
            this.mesh.rotation.z += this.spin.z;
        }
        
    }
}
