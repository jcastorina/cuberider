import makePolyGeo from './makePolyGeo';

export default class gameObj {
    constructor( pos, scale, spin, name, material ){
        this.mesh = new THREE.Mesh( makePolyGeo(), material);
        this.mesh.shot = false;
        this.mesh.startingHeight = pos.y;
        this.mesh.startingPos = pos;
        this.mesh.position.set(pos.x,pos.y,pos.z);
        this.mesh.name = this.name = name;
        this.mesh.launchVec = null;
        this.mesh.force = null;
        this.mesh.weight = 15;
        this.spin = spin;
        this.mesh.scale.set(scale.x,scale.y,scale.z)
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
            this.mesh.rotation.x += this.spin.x;
            this.mesh.rotation.y += this.spin.y;
            this.mesh.rotation.z += this.spin.z;
        }
    }
}