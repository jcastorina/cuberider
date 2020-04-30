//import recurse from "./recurse";
import shaderCube from "./shaderCube";
import makeShaderMaterial from "./makeShaderMaterial";
import {Vector3} from 'three';

var color2 = {
    a: 0xACB6E5,
    b: 0x74ebd5
}

var spinNone = { x: 0.00, y: 0.00, z: 0.00 };

var scale1 = { x: 1, y: 1, z: 1 };

export default (initField) =>{

    var offsetMe = new Vector3(1,1,1);
    global.field = initField.field;
    //global.field = recurse(20,20);
  
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