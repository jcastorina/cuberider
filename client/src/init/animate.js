import updateState from "../updateState";



export default function animate() {
    requestAnimationFrame( animate );
    updateState();
    renderer.render( scene, camera );
  //  let chatBar = document.getElementById('chatWindow');

   // if(chatBar.clientTop === 0){
 //       chatBar.scrollTop = chatBar.scrollHeight - chatBar.clientHeight;
   // }
}