import recurse from "./recurse";
import shaderCube from "./shaderCube";
import makeShaderMaterial from "./makeShaderMaterial";
import {Vector3} from 'three';


var color1 = {
    a: 0xE9B2E1,
    b: 0x09B2E1,
}

var color2 = {
    a: 0xACB6E5,
    b: 0x74ebd5
}

var color3 = {
    a: 0x880088,
    b: 0x991188,
}

var pos1 = { x: 0, y: 0, z:-50 };
var pos2 = { x: 0, y:   0, z:-5 };
var pos3 = { x:-7, y:   0, z:-5 };
var pos4 = { x: 0, y:   0, z:-5};

var spin1 = { x: 0.01, y: 0.01, z: 0    };
var spin2 = { x: 0,    y: 0.01, z:-0.01 };
var spin3 = { x: 0.01, y: 0.01, z: 0.01 };
var spinNone = { x: 0.00, y: 0.00, z: 0.00 };

var scale1 = { x: 1, y: 1, z: 1 };
var scale2 = { x: 2, y: 2, z: 2 };
var scale3 = { x: 2, y: 2, z: 2 };

export default () =>{

    var offsetMe = new Vector3(1,1,1);

    global.field = recurse(20,20);

    for(var i in field){
        let startMe = new Vector3(10,-4.3,-20);
        let addMe = startMe.clone();
        startMe.x = startMe.x - (offsetMe.x * i);
        for(var j in field[i]){
            startMe.z = startMe.z + (offsetMe.z);
            var k = 0;
            while(k < field[i][j]){

                cubes.push(new shaderCube(startMe,scale1,spinNone,"field" +i +j +k, makeShaderMaterial(color2.a,color2.b)));
                scene.add(cubes[cubes.length -1].mesh)
                startMe.y += 1;
                k++;
            }
            startMe.y = addMe.y;
        }
    }
}