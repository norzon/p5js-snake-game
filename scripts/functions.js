function randInt(min, max) {
    return Math.floor( Math.random() * (max - min) ) + min;
}

function randFloat(min, max) {
    return Math.random() * (max - min) + min;
}


function drawTiles() {
    push();
    stroke(255);
    strokeWeight(1);
    for(var i=1; i<20; i++){
        line(0, i*tile, w, i*tile);
        line(i*tile, 0, i*tile, h);
    }
    pop();
}


function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        direction(-1,0);
    } else if (keyCode === RIGHT_ARROW) {
        direction(1,0);
    } else if (keyCode === UP_ARROW) {
        direction(0,-1);
    } else if (keyCode === DOWN_ARROW) {
        direction(0,1);
    } else if (keyCode === 80 ) {
        pause("Paused");
    } else if (keyCode >= 97 && keyCode <= 105) {
        frameRate(map(keyCode,97,105,3,15));
    } else if (keyCode >= 49 && keyCode <= 57) {
        frameRate(map(keyCode,49,57,3,15));
    } else if (keyCode===96 || keyCode===48) {
        frameRate(30);
    } else {
        //console.log(keyCode);
    }
}


function pause(t) {
    if (looping) {
        noLoop();
        txt = t;
    } else {
        loop();
    }
    looping = !looping;
}


function displayText() {
    push();

    // Background
    var c = color("rgba(0, 0, 0, 0.7)");
    fill(c);
    rect(0, 0, width, height);

    // Main text
    fill(255);
    textSize(tile*2);
    textAlign(CENTER);
    text(txt, width/2, height/2);

    // Bottom text
    textSize(tile);
    var t = "Use number keys 1-9 or numpad keys\r\n1-9 to change speed. 0=extreme";
    text(t, width/2, height-tile*2);

    pop();
}


function direction(x,y) {
    if( (s.spx != -x || s.spy != -y) && !s.dirCD ){
        s.dir(x,y);
        s.dirCD = true;
    }
    if(first){
        pause("");
        first = false;
    }
}


function equals(a, b, acc=0) {
    if (acc!=0) {
        var fa = Math.floor(a*acc*10);
        var fb = Math.floor(b*acc*10);
        return fa===fb;
    } else {
        return Math.floor(a)===Math.floor(b);
    }
}
