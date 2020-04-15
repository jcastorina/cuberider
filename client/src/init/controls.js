


export default () => {
    function onWindowResize() {
        
        var width = Math.floor(0.98 * window.innerWidth);
        var height = Math.floor(width*9/20);
        renderer.setSize(width,height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        var offsetx = (window.innerWidth - width) /4;
        var offsety = (window.innerHeight - height) /2;
        renderer.domElement.parentNode.style.paddingLeft = ''+offsetx+'px';
        renderer.domElement.parentNode.style.paddingTop = ''+offsety+'px';

    }

    function onDocumentMouseMove(event) {
        if(lockedMouse){ 
            vmouse.x = (event.clientX / window.innerWidth) * 2 - 1 - vmouseOffset.x; 
            vmouse.y = - (event.clientY / window.innerHeight) * 2 + 1 - vmouseOffset.y;
            me.mouse.curr.x += event.movementX/200;
            me.mouse.curr.y += event.movementY/200;
        }
    }

    function onDocumentMouseDown(event){
        if(event.button === 0){
            me.mouse.past.x = me.mouse.curr.x;
            me.mouse.past.y = me.mouse.curr.y;
            me.mouse.down = true;
        }
        if(event.button === 2){
            me.mouse.past.x = me.mouse.curr.x;
            me.mouse.past.y = me.mouse.curr.y;
            me.mouse.rc = true;
        }
    }

    function onDocumentMouseUp(event){
        if(event.button === 0){
            me.mouse.down = false;
        }
        if(event.button === 0){
            me.mouse.rc = false;
        }
    }

    function onDocumentKeyDown(event){

        if(event.which === 27){//ESC
            document.exitPointerLock();

            lockedMouse = false;
            newLockedMouse = true;
            var chat = document.getElementById("chatWindow");
            chat.className = "visible";
            var chat = document.getElementById("message");
            chat.className = "visible";
        }

        if(event.which === 13){//ENTER
            if(lockedMouse === false){
                send = true;
            }
        }
        me.keyboard[event.which] = true;
    }

    function onDocumentKeyUp(event){
        me.keyboard[event.which] = false;
    }
    window.addEventListener( 'resize', onWindowResize, false );
    window.addEventListener( 'mousemove', onDocumentMouseMove, false );
    window.addEventListener( 'keydown', onDocumentKeyDown, false );
    window.addEventListener( 'keyup', onDocumentKeyUp, false );
    window.addEventListener( 'mousedown', onDocumentMouseDown, false );
    window.addEventListener( 'mouseup', onDocumentMouseUp, false );
    onWindowResize();
}