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
  
    let input2 = document.createElement('input');
    input2.setAttribute("id","message");
    input2.setAttribute("type","text");
    input2.setAttribute("placeholder","message");
    input2.setAttribute("class","visible");
    div1.appendChild(input2);
    
    var container = document.getElementById('container');
    container.appendChild(div1);
}