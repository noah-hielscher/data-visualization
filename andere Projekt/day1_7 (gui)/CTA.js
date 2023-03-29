/*
franklin hernandez-castro
www.skizata.com
TEC costa rica, hfg schw. gmuend
2019
 */

class CTA { // button Call To Action (CTA)
    constructor ( _x,_y, _sZ, _tl ){
        this.myX = _x;
        this.myY = _y;
        this.mySize = _sZ;
        this.myTitle = _tl;
        this.myColor = color(155, 255, 155, 90);
        this.myOverMeColor = color(255, 255, 155, 80);
        this.myStrokeColor = color(255, 255, 155);
        this.mouseOverMe = false;
        this.myTextSize = 12;
    }

    display () {

        fill(255,0,0);
        //ellipse (this.myX, this.myY, 5,5);

        this.mouseOverMe = mouseX > this.myX  && mouseX < this.myX + this.mySize &&
            mouseY > this.myY  && mouseY < this.myY + this.mySize ;

        fill(this.myColor);
        if (this.mouseOverMe) fill(this.myOverMeColor);

        strokeWeight(1);
        stroke(this.myStrokeColor);
        rect(this.myX, this.myY, this.mySize, this.mySize);

        if (this.mouseOverMe){
            fill(255);
            noStroke();
            textAlign(CENTER);
            textSize(this.myTextSize);
            text(this.myTitle, this.myX + this.mySize/2, this.myY + this.mySize + this.myTextSize*1.5);
        }
    }

    releasedOverMe () {
        if (this.mouseOverMe) return true;
    }

} // end of class