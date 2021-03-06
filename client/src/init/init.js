import controls from './controls.js';

export default () => {

    var width = Math.floor(0.98 * window.innerWidth);
    var height = Math.floor(width*9/20);
    renderer.setSize(width,height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.domElement.id = "canvas";

    div.appendChild( renderer.domElement );
    var offsetx = (window.innerWidth - width) /2;
    var offsety = (window.innerHeight - height) /2;
    renderer.domElement.parentNode.style.paddingLeft = ''+offsetx+'px';
    renderer.domElement.parentNode.style.paddingTop = ''+offsety+'px';

    me.mouse.curr.x = 0;
    me.mouse.curr.y = 0;
    renderer.domElement.onclick = () => {
        renderer.domElement.requestPointerLock();
        if(newLockedMouse){
            vmouseOffset.x = (event.clientX / window.innerWidth) * 2 - 1;
            vmouseOffset.y = - (event.clientY / window.innerHeight) * 2 + 1;
            newLockedMouse = false;
            var chat = document.getElementById("chatWindow");
            chat.className = "hidden";
            var chat = document.getElementById("message");
            chat.className = "hidden";
        }
        lockedMouse = true;
    }
    renderer.sortObjects = false;
    renderer.autoClear = false;



    controls();
}