/*
franklin hernandez-castro
www.skizata.com
TEC costa rica, hfg schw. gmuend
2019
 */


function Slider (_x, _y, _mW, _mH, _vMin, _vMax, _vIn, _myT){
    this.myX =_x;
    this.myY =_y;

    this.myWidth = _mW;
    this.myHeight = _mH;
    this.myMin = _vMin;
    this.myMax = _vMax;
    this.myInitial = _vIn;
    this.myTitle = _myT;
    this.myTextSize = 12;

    this.posButtonX = map(this.myInitial, this.myMin, this.myMax, this.myX, this.myX+this.myWidth);
    this.myValue = _vIn;

    this.mouseOverMe  = false;
    this.draggingMe = false;
    let dif = 0;


    this.render = function () {
        this.mouseOverMe = (mouseY > this.myY && mouseY < this.myY + this.myHeight &&
            mouseX > this.posButtonX - this.myHeight/2 && mouseX < this.posButtonX + this.myHeight/2);

        fill(255, 255, 255, 150);
        stroke(255, 255, 155);
        strokeWeight(2);
        let primerCuarto = this.myWidth * 0.25;
        let mitad = this.myWidth * 0.5;
        let tercerCuarto = this.myWidth * 0.75;
        line(this.myX + primerCuarto, this.myY - 1, this.myX + primerCuarto, this.myY + this.myHeight + 1);
        line(this.myX + mitad, this.myY - 1, this.myX + mitad, this.myY + this.myHeight + 1);
        line(this.myX + tercerCuarto, this.myY - 1, this.myX + tercerCuarto, this.myY + this.myHeight + 1);

        noStroke();
        fill(80, 80, 80);
        rect(this.myX, this.myY, this.myWidth, this.myHeight);

        // button
        fill(255, 255, 155, 40);
        if (this.mouseOverMe) fill(255, 255, 155, 90);
        strokeWeight(1);
        stroke(255, 255, 155);
        rect(this.posButtonX - this.myHeight/2, this.myY, this.myHeight, this.myHeight);
        line(this.posButtonX, this.myY-5, this.posButtonX, this.myY+5);

        // title text
        noStroke();
        textSize(this.myTextSize);
        fill(250, 250, 250);
        textAlign(CENTER);
        text(this.myTitle, this.myX + (this.myWidth / 2), this.myY - 10);
        //value text
        textSize(this.myTextSize-2);
        textAlign(CENTER);
        text(this.myValue.toFixed(0), this.posButtonX-3, this.myY + this.myHeight + 25);
    };

    this.mouseClickMe= function (){
        if (this.mouseOverMe) {
            this.draggingMe = true;
            dif = this.posButtonX - mouseX;
        }
    };

    this.mouseDraggingMe = function (){
        if(this.draggingMe){
            if (this.mouseOverMe){
                if (mouseX > this.myX && mouseX < this.myX + this.myWidth )
                this.posButtonX = mouseX + dif;
                if (this.posButtonX < this.myX ) this.posButtonX = this.myX;
                if (this.posButtonX > this.myX  + this.myWidth ) this.posButtonX = this.myX  + this.myWidth;
                this.myValue = map(this.posButtonX, this.myX, this.myX + this.myWidth, this.myMin, this.myMax);
            }
        }
    };


    this.mouseReleasedMe = function (){
        this.draggingMe = false;
        dif = 0;
    };

} // end of class
