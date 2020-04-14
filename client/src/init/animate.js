import updateState from "../updateState";

export default function animate() {
    requestAnimationFrame( animate );
    updateState();
    renderer.render( scene, camera );
}