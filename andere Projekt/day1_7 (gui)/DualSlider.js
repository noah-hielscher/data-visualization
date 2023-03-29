/*
franklin hernandez-castro
www.skizata.com
TEC costa rica, hfg schw. gmuend
2019
 */


function DualSlider (_x, _y, _mW, _mH, _vMin, _vMax, _myT){
    this.myX=_x;
    this.myY=_y;

    this.myWidth = _mW;
    this.myHeight = _mH;
    this.myMin = _vMin;
    this.myMax = _vMax;
    this.myTitle = _myT;

    this.posButtonLEFT = map(this.myMin, this.myMin, this.myMax, this.myX, this.myX+this.myWidth);
    this.posButtonRIGHT = map(this.myMax, this.myMin, this.myMax, this.myX, this.myX+this.myWidth);

    this.myLEFTvalue = this.myMin;
    this.myRIGHTvalue = this.myMax;

    this.overMeLEFT  = false;
    this.overMeRIGHT = false;
    this.overMeCENTER = false;

    this.draggingLEFT = false;
    this.draggingRIGHT = false;
    this.draggingCENTER = false;


    let dif = 0;
    let difLEFT = 0;
    let difRIGHT = 0;


    this.render = function () {
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

        // botón izquierdo
        fill(255, 255, 155, 40);
        if (this.overMeLEFT) fill(255, 255, 155, 90);

        strokeWeight(1);
        stroke(255, 255, 155);
        rect(this.posButtonLEFT - this.myHeight, this.myY, this.myHeight, this.myHeight);
        line(this.posButtonLEFT, this.myY - 10, this.posButtonLEFT, this.myY + this.myHeight + 10);

        // botón derecho
        fill(255, 255, 155, 40);
        if (this.overMeRIGHT) fill(255, 255, 155, 90);

        strokeWeight(1);
        rect(this.posButtonRIGHT, this.myY,  this.myHeight, this.myHeight);
        line(this.posButtonRIGHT, this.myY - 10, this.posButtonRIGHT, this.myY + this.myHeight + 10);

        // boton central
        fill(255, 255, 155, 40);
        noStroke();
        if (this.overMeCENTER) fill(255, 255, 155, 90);
        let anchoRec = this.posButtonRIGHT - this.posButtonLEFT;
        rect(this.posButtonLEFT, this.myY, anchoRec, this.myHeight);


        // líneas de los límites
        strokeWeight(2);
        fill(255, 255, 255, 150);
        line(this.myX, this.myY - 1, this.myX, this.myY + this.myHeight + 1);
        line(this.myX + this.myWidth, this.myY - 1, this.myX + this.myWidth, this.myY + this.myHeight + 1);

        // texto tiutlo
        textSize(12);
        fill(250, 250, 250);
        textAlign(CENTER);
        text(this.myTitle, this.myX + (this.myWidth / 2), this.myY - 10);

        //texto valores
        textSize(10);
        textAlign(RIGHT);
        text(this.myLEFTvalue.toFixed(0), this.posButtonLEFT-3, this.myY + this.myHeight + 25);
        textAlign(LEFT);
        text(this.myRIGHTvalue.toFixed(0), this.posButtonRIGHT+5, this.myY + this.myHeight + 25);

    };


    this.overMe = function (checkX, checkY) {
        // left button
        this.overMeLEFT = (checkY > this.myY && checkY < this.myY + this.myHeight &&
            checkX > this.posButtonLEFT - this.myHeight && checkX < this.posButtonLEFT);
        // right button
        this.overMeRIGHT = (checkY > this.myY && checkY < this.myY + this.myHeight &&
            checkX > this.posButtonRIGHT && checkX < this.posButtonRIGHT + this.myHeight);
        // center button
        this.overMeCENTER = (checkY > this.myY && checkY < this.myY + this.myHeight &&
            checkX > this.posButtonLEFT && checkX < this.posButtonRIGHT);

    }; // end of this.overMe



    this.mouseCheckMe = function (checkX, checkY){
        /*
        la lógica de un slider está en que se debe separar el dragging true de la ejecucion
        asi que se declara true y esto se queda asi hasta que no se haga mouse released
         */
        // LEFT BUTTON ----------------------------------------------------------------
        if (checkY > this.myY && checkY < this.myY + this.myHeight &&
            checkX > this.posButtonLEFT - this.myHeight && checkX < this.posButtonLEFT) {
            this.draggingLEFT = true;
            dif = this.posButtonLEFT - checkX;
        }
        if(this.draggingLEFT){
            if (checkX > this.myX - this.myWidth && checkX < this.posButtonRIGHT){
                if (checkX > this.myX) this.posButtonLEFT = checkX + dif;
                else this.posButtonLEFT = this.myX;
                this.myLEFTvalue = map(this.posButtonLEFT, this.myX, this.myX + this.myWidth, this.myMin, this.myMax);
            }
        }


        // RIGHT BUTTON ----------------------------------------------------------------
        if (checkY > this.myY && checkY < this.myY + this.myHeight &&
            checkX > this.posButtonRIGHT && checkX < this.posButtonRIGHT + this.myHeight) {
            this.draggingRIGHT = true;
            dif = this.posButtonRIGHT - checkX;
        }
        if(this.draggingRIGHT){
            if (checkX > this.myX && checkX < this.myX+this.myWidth+this.myHeight){
                if (checkX < this.myX + this.myWidth) this.posButtonRIGHT = checkX + dif;
                else this.posButtonRIGHT = this.myX+this.myWidth;
                this.myRIGHTvalue = map(this.posButtonRIGHT, this.myX, this.myX + this.myWidth, this.myMin, this.myMax);
            }
        }


        // CENTER BUTTON ----------------------------------------------------------------
        if (checkY > this.myY && checkY < this.myY + this.myHeight &&
            checkX > this.posButtonLEFT && checkX < this.posButtonRIGHT &&
            !this.draggingCENTER) {
            this.draggingCENTER = true;
            difRIGHT = this.posButtonRIGHT - checkX;
            difLEFT = this.posButtonLEFT - checkX;
            //console.log("this.draggingCENTER = true" );
        }


        if(this.draggingCENTER){
            if (this.posButtonLEFT >= this.myX){
                this.posButtonLEFT = checkX + difLEFT;
                this.myLEFTvalue = map(this.posButtonLEFT, this.myX, this.myX + this.myWidth, this.myMin, this.myMax);
            }
            if (this.posButtonRIGHT <= this.myX + this.myWidth){
                this.posButtonRIGHT = checkX + difRIGHT;
                this.myRIGHTvalue = map(this.posButtonRIGHT, this.myX, this.myX + this.myWidth, this.myMin, this.myMax);
            }
            if (this.posButtonLEFT < this.myX) {
                this.posButtonLEFT = this.myX;
                this.myLEFTvalue = this.myMin;
            }
            if (this.posButtonRIGHT > this.myX + this.myWidth) {
                this.posButtonRIGHT = this.myX + this.myWidth;
                this.myRIGHTvalue = this.myMax;
            }
        }


    };


    this.mouseReleasedMe = function (){
        this.draggingLEFT = false;
        this.draggingRIGHT = false;
        this.draggingCENTER = false;
        dif = 0;
        difLEFT = 0;
        difRIGHT = 0;
    };

} // end of class
