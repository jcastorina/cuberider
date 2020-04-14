import loadGLTF from './loadGLTF';
import loadSkybox from './loadSkybox';
import addCubes from './addCubes';
import favicon from './favicon';
import addGrass from './addGrass';

export default () => {
    loadGLTF();
    loadSkybox(THREE,scene,camera);
    addCubes();
    addGrass();
    favicon();
}