/*
franklin hernandez-castro
www.skizata.com
TEC costa rica, hfg schw. gmuend
2022
*/

class Country {
    constructor ( ){
        this.myCountry = "NaN";
        this.myCountryArea = 0;
        this.myCountryISO = "NaN";
        this.mySize = 0;
        this.myWidth = 6;
        this.myColor = color(100,100,255);
        this.estaEncima = false;
    }


    display (myX, myY) {
        this.estaEncima = mouseX > myX  && mouseX < myX + this.myWidth &&
            mouseY > myY - this.mySize && mouseY < myY;

        noStroke();
        fill(this.myColor);
        rect (myX, myY, this.myWidth, -this.mySize);

        if (this.estaEncima) {
            fill (200);
            text(this.myCountryArea, myX, myY+30);
            text(this.myCountry, myX, myY +15);
        }
    } // end of display

}  // end of class