import loadGLTF from './loadGLTF';
import loadSkybox from './loadSkybox';
import html from './html';
import addGrass from './addGrass';
import recurseShader from './recurseShader';
import addCubes from './addCubes';

export default () => {
    loadGLTF();
    loadSkybox(THREE,scene,camera);
    recurseShader();
    addCubes();
    addGrass();
    html();

}