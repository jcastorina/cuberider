export default function recurse(hi,wi){

//create table dimensions
var HEIGHT = hi;
var WIDTH = wi;
var MIN = 0;
var TILES = HEIGHT * WIDTH;
var i = 0;

//generate blank table
var output = table(HEIGHT,WIDTH);

//recursion vars
var curr = [0,0];
var m = [0,0];
var mInit = [0,0];
var mem = [0,1,2,3];
var memInit = [0,1,2,3];

//randNum func
var randNum = function(){var randy = Math.floor(Math.random()*10 % mem.length); return randy};

//iterate "cursor" through table tiles and display results
move();

//recursion function
function move() {
    while(i < TILES){
        //randomly try to move a direction
        var tet = randNum().valueOf();
        if(mem[tet] === 0){
            m[1] = -1;
        }
        if(mem[tet] === 1){
            m[0] = 1;
        }
        if(mem[tet] === 2){
            m[1] = 1;
        }
        if(mem[tet] === 3){
            m[0] = -1;
        }
        //check if that direction is out of bounds
        if(curr[0] + m[0] < MIN || curr[0] + m[0] >= WIDTH || curr[1] + m[1] < MIN || curr[1] + m[1] >= HEIGHT){
            mem.splice(tet.valueOf(),1);
            m.splice(0,m.length);
            m = [...mInit];
            
            //if so, try again
            move();

        } else {
            curr[0] = curr[0] + m[0];
            curr[1] = curr[1] + m[1];
            
            //if not, flag the tile as visited
            output[curr[0]][curr[1]] += 1;
            
            mem.splice(mem.length);
            mem = [...memInit];
            m.splice(0,m.length);
            m = [...mInit];
            i++;
            //move to next tile
            return move();
        }
    }
}


//table generator function
function table (h,w){
    var row = [];
    var col = [];
    for(var i = 0; i < w; i ++){
        for(var j = 0; j < h; j++){
            row[j] = 0;
        }
       col[i] = row.splice(0,h);
    }
    return col;
}
return output;
}