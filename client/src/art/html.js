export default () => {
    let fav = document.createElement('link');
    fav.setAttribute("rel","icon");
    fav.setAttribute("href","favicon-32x32.png");
    fav.setAttribute("type","image/x-icon")
    document.head.appendChild(fav);

    let div1 = document.createElement('div');
    div1.setAttribute("id","chatApp");

    let div2 = document.createElement('div');
    div2.setAttribute("id","chatWindow");
    div2.setAttribute("class","visible");
    div1.appendChild(div2);

    let wrapper = document.createElement('div');
    wrapper.setAttribute("id","wrapper");
    div2.appendChild(wrapper);

    let div3 = document.createElement('div');
    div3.setAttribute("id","output");
    wrapper.appendChild(div3);
    
    let div4 = document.createElement('div');
    div4.setAttribute("id","feedback");
    div2.appendChild(div4);
  
    let bottomPaneWrapper = document.createElement('div');
    bottomPaneWrapper.setAttribute("id","wrapper");
    div1.appendChild(bottomPaneWrapper);

    let message = document.createElement('input');
    message.setAttribute("id","message");
    message.setAttribute("type","text");
    message.setAttribute("placeholder","message");
    message.setAttribute("class","visible");
    bottomPaneWrapper.appendChild(message);
    

    let score = document.createElement('div');
    score.setAttribute("id","score");
    score.setAttribute("class","visible");

    
    var container = document.getElementById('container');
    container.appendChild(div1);
    container.appendChild(score);
}