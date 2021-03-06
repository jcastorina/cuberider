var express = require('express');
var socket = require('socket.io');
var blockCity = require('./blockCity');

var app = express();
var server = app.listen('1337', ()=>{
    console.log('listening on 1337');
});

app.use(express.static('public'));

var io = socket(server);

var allClients = [];

var initField = blockCity.recurse(20,20);

io.on('connection', (socket)=>{

    console.log('\n-----------------\n\n   ',socket.id,' connected *\n');

    allClients.push(socket.id);
    
    io.sockets.emit('connected',socket.id);
    socket.emit('field',{
    
        field: initField
    })


    for(i in allClients){
        console.log('   ',allClients[i],' online')
    }

    socket.on('disconnect', ()=>{
        var socks;
        socks = Object.keys(io.sockets.sockets);
        var remaining = [];
        console.log('\n-----------------\n\n   ',arr_diff(socks, allClients)[0],' disconnected *');

        for(i in allClients){
            for(j in socks){
                if(allClients[i] === socks[j]){
                    remaining.push(allClients[i])
                }
            }
        }
        for(i in remaining){
            console.log('   ',remaining[i], ' online');
        }
        allClients = remaining;
    });

    socket.on('chat', (data)=>{
        io.sockets.emit('chat',data);
    });

    socket.on('typing', (data)=>{
        socket.broadcast.emit('typing',data);
    });
    
    socket.on('tellme', (data)=>{
            console.log('\n-----------------\n\n   ',Object.values(data)[0],' says hi :) *');
    });
    socket.on('needScott',()=>{
        var scott = {
            id: socket.id,
            x: 12,
            y: 2,
            z: 10,
        };
        socket.emit('scott', scott);
        io.sockets.emit('joined',scott.id);
        socket.broadcast.emit('addScott',scott);
    });
    socket.on('player', (player)=>{
        //console.log(player);
        socket.broadcast.emit('playerMove',player);
    });
    socket.on('shootObj', (obj)=>{
   
        socket.broadcast.emit('objNotify',obj);
    });     
});

function arr_diff (a1, a2) {
    var a = [], diff = [];
    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }
    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }
    for (var k in a) {
        diff.push(k);
    }
    return diff;
}