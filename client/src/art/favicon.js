export default () => {
    let fav = document.createElement('link');
    fav.setAttribute("rel","icon");
    fav.setAttribute("href","favicon-32x32.png");
    fav.setAttribute("type","image/x-icon")
    document.head.appendChild(fav);

    let btn = document.createElement('button');
    btn.setAttribute("id","send");
    btn.innerText = "Send";
    document.body.appendChild(btn);

    let btn2 = document.createElement('button');
    btn2.setAttribute("id","sockets");
    btn2.innerText = "Sockets";
    document.body.appendChild(btn2);

//<link rel='icon' href='favicon.ico' type='image/x-icon'/ >

}