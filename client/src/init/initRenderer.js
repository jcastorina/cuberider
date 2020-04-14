var THREE = require('three');

var renderer = new THREE.WebGLRenderer( { antialias: true } );

export default function initRenderer() {
    var width = window.innerWidth;
    var height = Math.floor(width*9/16);
    var offset = (window.innerHeight - height) /2;
    renderer.domElement.parentNode.style.paddingTop = ''+offset+'px';
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( width, height );


//    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.outputEncoding = THREE.sRGBEncoding;
    div.appendChild( renderer.domElement );
    //global.renderer = renderer;
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.renderReverseSided = false;
    return renderer;
}
