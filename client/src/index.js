import './globals.js';
import _ from 'lodash';
import './style/style.css';
import doArt from './art/doArt';
import animate from './init/animate';
import init from './init/init';
import io from 'socket.io-client';

init();
doArt();

scene.add(player);
player.add(camera);
animate();

var socket = io.connect('http://localhost:1337');

var message = document.getElementById("message");
var output = document.getElementById("output");
var feedback = document.getElementById("feedback");
var chat = document.getElementById("chatWindow");
chat.className = "visible";

chat.addEventListener('click', ()=>{
    console.log("test");
})

message.addEventListener('keypress', ()=>{
    socket.emit('typing', socket.id);
    if(send === true){
        let chat = document.getElementById("chatWindow");
        chat.className = "visible";
       
        socket.emit('chat', {
            message: message.value,
            handle: socket.id,
        });
        message.value = '';
        send = false;
    }
})

console.log('doin it ');
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
})

