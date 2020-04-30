import updateState from "../updateState";



export default function animate() {
    requestAnimationFrame( animate );
    updateState();

    renderer.clear();
    renderer.render( scene, camera );
    renderer.clearDepth();
    
    scene.add(scottFont);
    //add things u want on top of z order to scene2
    //scene2.add(scottFont);
    renderer.render( scene2, camera );
  //  let chatBar = document.getElementById('chatWindow');

   // if(chatBar.clientTop === 0){
 //       chatBar.scrollTop = chatBar.scrollHeight - chatBar.clientHeight;
   // }
}