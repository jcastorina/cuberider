import controls from './controls.js';
//import initRenderer from './initRenderer';

//global.renderer =  new THREE.WebGLRenderer({ antialias: true });

export default () => {




//    renderer.setSize( window.innerWidth, window.innerHeight );

    //div.appendChild( renderer.domElement );
    global.renderer =  new THREE.WebGLRenderer({ antialias: true });   

    var width = window.innerWidth;
    console.log(window.innerWidth);
    var height = Math.floor(width);
    var offset = (window.innerHeight - height) /2;
    var offsetw = (window.innerWidth - width) /2;
    div.appendChild( renderer.domElement );
    renderer.domElement.parentNode.style.paddingTop = ''+offset+'px';
    renderer.domElement.parentNode.style.paddingLeft = ''+offsetw+'px';

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( width, height );
    renderer.outputEncoding = THREE.sRGBEncoding;
    console.log(width);



    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.renderReverseSided = false;

  //  global.renderer = initRenderer();
    me.mouse.curr.x = 0;
    me.mouse.curr.y = 0;
    camera.position.y = 3;
    renderer.domElement.onclick = () => {
        renderer.domElement.requestPointerLock();
        if(newLockedMouse){
            vmouseOffset.x = (event.clientX / window.innerWidth) * 2 - 1;
            vmouseOffset.y = - (event.clientY / window.innerHeight) * 2 + 1;
            newLockedMouse = false;
        }
        lockedMouse = true;
    }
    renderer.sortObjects = false;
    renderer.autoClear = false;
    controls();
}