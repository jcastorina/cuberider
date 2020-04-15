import raycast from './tools/raycast';
import io from 'socket.io-client';
import addChar from './art/addChar.js';
import init from './init/init';
import doArt from './art/doArt';

init();
doArt();


global.player = null;

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
var playerOld = new THREE.Vector3();
var playerNew = new THREE.Vector3();

global.players = [];

var playerStart = true;

var socket = io.connect('http://localhost:1337');

var message = document.getElementById("message");
var output = document.getElementById("output");
var feedback = document.getElementById("feedback");
var chat = document.getElementById("chatWindow");
chat.className = "visible";

global.DEV_CAM_SPEED = 0.1;
global.DELTAFACTOR = 1;

global.GRAVITY = 0.083;
global.JUMPFORCE = 10;

chat.addEventListener('click', ()=>{
    console.log("test");
})

message.addEventListener('keypress', ()=>{
    socket.emit('typing', socket.id);
    if(send === true){
       
        socket.emit('chat', {
            message: message.value,
            handle: socket.id,
        });
        message.value = '';
        send = false;
    }
})

output.innerHTML += '<p style="margin-bottom: 1000px"> </p>';

socket.on('chat', (data)=>{
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>'+data.handle+': </strong><weak>'+data.message+'</weak></p>';
    chat.className = "visible";
})

socket.on('typing', (data)=>{
    feedback.innerHTML = '<p><em>'+data+' is typing a message...</em></p>';
});

socket.on('tellme', (data)=>{
    console.log('\n-----------------\n\n   ',data[0],' said hi *\n');
});

socket.on('connected', (socket)=>{
    output.innerHTML += '<p><strong>'+socket+' connected </strong></p>'
});

socket.on('joined', (id)=>{
    output.innerHTML += '<p><strong>'+id+' joined! </strong></p>'
});

socket.on('addScott',(scott)=>{
    var player = addChar(scott);
    scene.add(player.mesh);
    players.push(player);

});

for(i in cubes){
    players.push(cubes[i]);
}

socket.on('playerMove',(player)=>{
    for(i in players){
        if(player.id === players[i].name){
            players[i].mesh.position.x = player.x;
            players[i].mesh.position.y = player.y;
            players[i].mesh.position.z = player.z;
        }
    }
});

export default function updateState(){

    delta = clock.getDelta() * DELTAFACTOR;
    playerOld.set(playerNew.x,playerNew.y,playerNew.z);
    

    

    
    

    if(lockedMouse){
        if(playerStart){
            socket.emit('needScott',socket.id);
            socket.on('scott',(scott)=>{
                player = addChar(scott);
                scene.add(player.mesh);
                camera.position.z = 5;
                player.mesh.add(camera);
                player.mesh.name = "player";
                player.mesh.rotation.reorder("YXZ");
                player.jumping = false;
                player.falling = true;
                player.move = true;
                playerStart = false;
            })    
        }
        if(!playerStart){
            if(player.falling){
                force += GRAVITY * delta;
                player.mesh.position.y -= force;
                if(player.jumping){
                    player.mesh.position.y += JUMPFORCE * delta * 1.2;
                }
            }
            if(player.mesh.position.y < -3.8){
                player.mesh.position.y = -3.8;
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
                player.mesh.rotation.y = -me.mouse.curr.x;
                player.mesh.rotation.x = -me.mouse.curr.y;
                if(player.move === true){
                    if(!me.keyboard[16]){
                        if(me.keyboard[32]){//space
                            if((!player.jumping) && (!player.falling)){
                                player.jumping = true;
                                player.falling = true;
                            }
                        }    
                        if(me.keyboard[87]){//w
                            player.mesh.position.z -= DEV_CAM_SPEED * Math.sin(-player.mesh.rotation.y  + Math.PI/2);
                            player.mesh.position.x += DEV_CAM_SPEED * Math.sin(-player.mesh.rotation.y);

                        }
                        if(me.keyboard[65]){//a
                            player.mesh.position.z += DEV_CAM_SPEED * Math.sin(player.mesh.rotation.y);
                            player.mesh.position.x -= DEV_CAM_SPEED * Math.sin(player.mesh.rotation.y + Math.PI/2);
                        }
                        if(me.keyboard[83]){//s
                            player.mesh.position.z += DEV_CAM_SPEED * Math.sin(-player.mesh.rotation.y + Math.PI/2);
                            player.mesh.position.x -= DEV_CAM_SPEED * Math.sin(-player.mesh.rotation.y);
                        }
                        if(me.keyboard[68]){//d
                            player.mesh.position.z -= DEV_CAM_SPEED * Math.sin(player.mesh.rotation.y);
                            player.mesh.position.x += DEV_CAM_SPEED * Math.sin(player.mesh.rotation.y + Math.PI/2);
                        }
                    } 
                }
            }
            raycast();
            if(intersects[0]){
                intersects[0].object.rotation.y += 0.05;
                if(me.mouse.down){
                    if(!intersects[0].object.shot){
                        launchVec.subVectors(intersects[0].object.position,player.mesh.position).normalize();
                        intersects[0].object.shot = true;
                        intersects[0].object.launchVec = launchVec;
                    }
                }
            }

            var originPoint = movingCube.mesh.position.clone();
            collisions(ray,originPoint,index1);


            newPos.set(movingCube.mesh.position.x,movingCube.mesh.position.y,movingCube.mesh.position.z);
            playerNew.set(player.mesh.position.x,player.mesh.position.y,player.mesh.position.z);
            if(!playerOld.equals(playerNew)){
                var playerData = {
                    id: socket.id,
                    x: playerNew.x,
                    y: playerNew.y,
                    z: playerNew.z
                }
                socket.emit('player',playerData);
            }
        }
    }
    for(i in cubeMeshes){
        cubeMeshes[i].next(delta);
    }
    for(i in players){
        if(players[i].mesh.shot === true){
            var playerData = {
                id: players[i].name,
                x: players[i].mesh.position.x,
                y: players[i].mesh.position.y,
                z: players[i].mesh.position.z
            }
            socket.emit('player', playerData)
        }
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

