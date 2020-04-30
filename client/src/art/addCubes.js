import shaderCube from './shaderCube';
import gameObj from './makeMesh';
import makeShaderMaterial from './makeShaderMaterial';

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

var pos1 = { x: 7, y:   0, z:-5 };
var pos2 = { x: 0, y:   0, z:-5 };
var pos3 = { x:-7, y:   0, z:-5 };
var pos4 = { x: 5, y:   -3.8, z:-5};

var spin1 = { x: 0.01, y: 0.01, z: 0    };
var spin2 = { x: 0,    y: 0.01, z:-0.01 };
var spin3 = { x: 0.01, y: 0.01, z: 0.01 };
var spinNone = { x: 0.00, y: 0.00, z: 0.00 };

var scale1 = { x: 1, y: 1, z: 1 };
var scale2 = { x: 2, y: 2, z: 2 };
var scale3 = { x: 2, y: 2, z: 2 };

export default function addCubes() {
    cubes.push(new shaderCube(pos1,scale1,spin1,"right cube", makeShaderMaterial(color2.a,color2.b)));
    scene.add(cubes[cubes.length - 1].mesh);
    cubes.push(new shaderCube(pos2,scale1,spin2,"middle cube", makeShaderMaterial(color1.a,color2.b)));
    scene.add(cubes[cubes.length - 1].mesh);
    cubes.push(new gameObj(pos3,scale2,spin3,"ball", makeShaderMaterial(color3.a,color2.b)));
    scene.add(cubes[cubes.length - 1].mesh);
    movingCube = new shaderCube(pos4,scale3,spinNone,"mover", new THREE.MeshLambertMaterial());
    movingCube.jumping = false;
    movingCube.falling = true;
    movingCube.force = GRAVITY;



    scene.add(movingCube.mesh);


}