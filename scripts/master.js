var w = window.innerWidth-100;
var h = window.innerHeight-100;
var tile, s;
var txt = "Press arrow\r\nkey to begin";
var looping = false;
var first = true;


function setup() {
    if(w>h){
        w=h;
    }else{
        h=w;
    }
    tile = w/19;
    createCanvas(w, h);
    frameRate(9);


    drawTiles();
    s = new Snake();
    f = new Food();
}

function draw() {

    clear();
    drawTiles();

    f.set();
    s.draw();

    if(s.eat(f.x, f.y)){
        f.exists = false;
    }



    if(!looping) {
        displayText();
    }
}
