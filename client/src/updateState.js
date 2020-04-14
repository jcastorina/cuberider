import raycast from './tools/raycast';

global.launchVec = new THREE.Vector3();
var ray = new THREE.Raycaster();

var i;
var clock = new THREE.Clock();
var delta;
var force = GRAVITY;
var lastPos = new THREE.Vector3();
var newPos = new THREE.Vector3();
//let lastIndex = [];
let index0 = new THREE.Vector3();
let index1 = new THREE.Vector3();
let index2 = new THREE.Vector3();
let index3 = new THREE.Vector3();
var DOINK = false;

export default function updateState(){

    delta = clock.getDelta() * DELTAFACTOR;


    if(lockedMouse){
        if(player.falling){
            force += GRAVITY * delta;
            player.position.y -= force;
            if(player.jumping){
                player.position.y += JUMPFORCE * delta * 1.2;
            }
        }
        if(player.position.y < -4.8){
            player.position.y = -4.8;
            player.jumping = false;
            player.falling = false;
            force = GRAVITY;
        }
        if(movingCube.falling){
            movingCube.force += GRAVITY * delta;
            movingCube.mesh.position.y -= movingCube.force;
            if(movingCube.jumping){
                movingCube.mesh.position.y += JUMPFORCE * delta * 1.2;
            }
        }
        if(movingCube.mesh.position.y < -3.8){
            movingCube.mesh.position.y = -3.8;
            movingCube.jumping = false;
            movingCube.falling = false;
            movingCube.force = GRAVITY;
        }
        lastPos.set(newPos.x,newPos.y,newPos.z);
        index3.set(index2.x,index2.y,index2.z);
        index2.set(index1.x,index1.y,index1.z);
        index1.set(index0.x,index0.y,index0.z);
        index0.set(lastPos.x,lastPos.y,lastPos.z);
        if(devMode){
            player.rotation.y = -me.mouse.curr.x;// * Math.PI;
            player.rotation.x = -me.mouse.curr.y;// * Math.PI; 
            if(player.move === true){
                if(!me.keyboard[16]){
                    if(me.keyboard[32]){//space
                        if((!player.jumping) && (!player.falling)){
                            player.jumping = true;
                            player.falling = true;
                        }
                    }    
                    if(me.keyboard[87]){//w
                        player.position.z -= DEV_CAM_SPEED * Math.sin(-player.rotation.y  + Math.PI/2);
                        player.position.x += DEV_CAM_SPEED * Math.sin(-player.rotation.y);
                    }
                    if(me.keyboard[65]){//a
                        player.position.z += DEV_CAM_SPEED * Math.sin(player.rotation.y);
                        player.position.x -= DEV_CAM_SPEED * Math.sin(player.rotation.y + Math.PI/2);
                    }
                    if(me.keyboard[83]){//s
                        player.position.z += DEV_CAM_SPEED * Math.sin(-player.rotation.y + Math.PI/2);
                        player.position.x -= DEV_CAM_SPEED * Math.sin(-player.rotation.y);
                    }
                    if(me.keyboard[68]){//d
                        player.position.z -= DEV_CAM_SPEED * Math.sin(player.rotation.y);
                        player.position.x += DEV_CAM_SPEED * Math.sin(player.rotation.y + Math.PI/2);
                    }
                } 
            }
        }
        raycast();
        if(intersects[0]){
            intersects[0].object.rotation.y += 0.05;
            if(me.mouse.down){
                if(!intersects[0].object.shot){
                    launchVec.subVectors(intersects[0].object.position,player.position).normalize();
                    intersects[0].object.shot = true;
                    intersects[0].object.launchVec = launchVec;
                }
            }
        }

        var originPoint = movingCube.mesh.position.clone();
        collisions(ray,originPoint,index1);



        newPos.set(movingCube.mesh.position.x,movingCube.mesh.position.y,movingCube.mesh.position.z);
    }
    for(i in cubeMeshes){
        cubeMeshes[i].next(delta);
    }
}

function collisions(ray,originPoint,index) {
    var i = 0;
    DOINK = false;
    while(i < movingCube.mesh.geometry.vertices.length){
        var localVertex = movingCube.mesh.geometry.vertices[i].clone();
        var globalVertex = localVertex.applyMatrix4( movingCube.mesh.matrix );
        var directionVector = globalVertex.sub( movingCube.mesh.position );
        ray.set( originPoint, directionVector.clone().normalize() );
        var collisionResults = ray.intersectObjects( shitBoxes );

        if(collisionResults[0] && collisionResults[0].distance < directionVector.length()){
 
            movingCube.mesh.position.set(index.x,index.y,index.z);
            console.log('doink');
            DOINK = true;
          
        }
        i++;  
   
    }
    if(DOINK === false){
        if(me.keyboard[16]){
            if(me.keyboard[32]){//space
                if((!movingCube.jumping) && (!movingCube.falling)){
                    movingCube.jumping = true;
                    movingCube.falling = true;
                }
            }
            if(me.keyboard[87]){//w
                movingCube.mesh.position.z -= DEV_CAM_SPEED;
            }
            if(me.keyboard[65]){//a
                movingCube.mesh.position.x -= DEV_CAM_SPEED;
            }
            if(me.keyboard[83]){//s
                movingCube.mesh.position.z += DEV_CAM_SPEED;
            }
            if(me.keyboard[68]){//d
                movingCube.mesh.position.x += DEV_CAM_SPEED;
            }
        }
    }
}

//var gen = idMaker();
//console.log(gen.next().value);

