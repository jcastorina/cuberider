global.THREE = require('three')

global.camera = new THREE.PerspectiveCamera( 68, window.innerWidth / window.innerHeight, 0.1, 50000 );
camera.rotation.reorder("YXZ");

global.scene = new THREE.Scene();
global.textureLoader = new THREE.TextureLoader();
global.renderer =  new THREE.WebGLRenderer({ antialias: true });   


global.div = document.createElement( 'div' );
div.setAttribute( "id", "container");
document.body.appendChild( div );

global.raycaster = new THREE.Raycaster();
global.vmouse = new THREE.Vector2();
global.vmouseOffset = new THREE.Vector2();

global.send = false;

global.player = new THREE.Object3D();
player.name = "player";
player.rotation.reorder("YXZ");

//test
//global.FPS = 60;
//global.DURATION = 1 / FPS;
global.DEV_CAM_SPEED = 0.1;
global.DELTAFACTOR = 1;

global.GRAVITY = 0.083;
global.JUMPFORCE = 10;

player.jumping = false;
player.falling = true;
player.move = true;

global.intersects = null;
global.lockedMouse = false;
global.newLockedMouse = true;
global.devMode = true;

global.cubes = [];
global.cubeMeshes = [];
global.movingCube = null;
global.shitBoxes = [];

global.me = {
    keyboard:[],
    mouse:{
        down: false,
        rc  : false,
        curr: {
            x : 0,
            y : 0,
        },
        past: {
            x : 0,
            y : 0,
        },
        last: {
            x : 0,
            y : 0,
        },
    },
};

global.views = {
    game: {
        scene: 0,
        camera: 0,
        objectList: [],
        objectDict: [],
    },
    loading: {
        scene: 0,
        camera: 0,
        objects: [],
    },
};
