function Snake(x=9*tile, y=9*tile) {
    this.x = x;
    this.y = y;
    this.spx = 0;
    this.spy = 0;
    this.total = 0;
    this.tail = [];
    this.dirCD = false;


    this.eat = function(x,y) {
        var d = dist(this.x, this.y, x, y);
        if (d < 1) {
            this.total++;
            return true;
        } else {
            return false;
        }
    }

    this.move = function(x=9, y=9) {
        this.x = x*tile;
        this.y = y*tile;
    }

    this.update = function() {
        for (var i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }
        if (this.total >= 1) {
            this.tail[this.total - 1] = createVector(this.x, this.y);
        }
        this.x += this.spx*tile;
        this.y += this.spy*tile;
        this.dirCD = false;
        if(this.x>w-tile){
            this.move(0,this.y/tile);
        } else if (this.x<(0-tile/2)) {
            this.move(18,this.y/tile);
        } else if (this.y>h-tile) {
            this.move(this.x/tile, 0);
        } else if (this.y<(0-tile/2)) {
            this.move(this.x/tile, 18);
        }
    }


    this.death = function() {
        for (var i = 0; i < this.tail.length; i++) {
            var pos = this.tail[i];
            var d = dist(this.x, this.y, pos.x, pos.y);
            if (d < 5) {
                this.gameOver();
            }
        }
    }


    this.gameOver = function() {
        this.move();
        this.total = 0;
        this.tail = [];
        pause("Game Over");
        first = true;
    }


    this.dir = function(spx, spy) {
        this.spx = spx;
        this.spy = spy;
    }

    this.draw = function() {
        push();
        noStroke();
        fill(215);

        this.update();
        this.death();

        //draw tail
        for (var i = 0; i < this.tail.length; i++) {
            rect(this.tail[i].x, this.tail[i].y, tile, tile);
        }
        //draw head
        fill(255);
        rect(this.x, this.y, tile, tile);
        pop();
    }
}



function Food() {
    this.x = false;
    this.y = false;
    this.exists = false;

    this.draw = function() {
        push();
        var c = color("rgb(176, 20, 20)");
        fill(c);
        stroke(255);
        strokeWeight(1);
        rect(this.x, this.y, tile, tile);
        pop();
    }

    this.move = function(x,y) {
        this.x = x;
        this.y = y;
    }

    this.set = function() {
        if(!this.exists){
            this.find();
        }
        this.draw();
    }

    this.find = function() {
        while(true){
            var x = randInt(0,18)*tile;
            var y = randInt(0,18)*tile;
            if(!equals(s.x,x) || !equals(s.y,y)){
                var found = false;
                for(var i=0; i<s.tail.length; i++){
                    if(equals(s.tail[i].x,x) && equals(s.tail[i].y,y)){
                        found = true;
                        break;
                    }
                }
                if(found == false){
                    break;
                }
            }
        }
        this.x = x;
        this.y = y;
        this.exists = true;
        //console.log("Food x:"+this.x+ ",y:" +this.y+"\r\n"+s.tail);
    }
}
