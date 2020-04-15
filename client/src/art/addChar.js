import shaderCube from './shaderCube';
import gameObj from './makeMesh';
import makeShaderMaterial from './makeShaderMaterial';

var color3 = {
    a: 0x880088,
    b: 0x991188,
}

export default (scott) =>{
    console.log("scott");
    var id = scott.id;
    var s = { x: 1, y: 1, z: 1};
    var spin = { x: 0, y: 0, z: 0};
    var pos = { x: scott.x, y: scott.y, z: scott.z};
    var char = new gameObj(pos,s,spin,id, makeShaderMaterial(color3.a,color3.b));
    charlist.push(char);
   // scene.add(char.mesh);
    return char
}
