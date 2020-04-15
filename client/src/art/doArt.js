import loadGLTF from './loadGLTF';
import loadSkybox from './loadSkybox';
import addCubes from './addCubes';
import html from './html';
import addGrass from './addGrass';

export default () => {
    loadGLTF();
    loadSkybox(THREE,scene,camera);
    addCubes();
    addGrass();
    html();
}