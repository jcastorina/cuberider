import './globals.js';
import _ from 'lodash';
import './style/style.css';
import doArt from './art/doArt';
import animate from './init/animate';
import init from './init/init';
import io from 'socket.io-client';

init();
doArt();

var input1 = 5;
var input2 = 10;


var socket = io.connect('http://localhost:1337');

var btn = document.getElementById("send");
var btn2 = document.getElementById("sockets");

btn.addEventListener('click', ()=>{
    socket.emit('test', {
        data1: input1,
        data2: input2,

    })
});

btn2.addEventListener('click', ()=>{
    socket.emit('tellme', {
        data: null,
    })
});

socket.on('test', (data)=>{
    input1 = data.data1;
    input2 = data.data2;
    console.log(data);
    //console.log(socket);
})

socket.on('tellme', (data)=>{
     console.log(data);
    //console.log(socket);
})




scene.add(player);
player.add(camera);
animate();