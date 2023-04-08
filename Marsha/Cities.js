/*
Marsha Noah
*/

class Cities {
	constructor({ lng, lat }) {
		this.myLongitude = lng;
		this.myLatitude = lat;
		this.myX = 0;
		this.myY = 0;
		this.mySize = 0;
		this.myCountry = "NaN";
		this.myCountryISO = "NaN";
		this.myPopulation = 0;
		this.myName = "NaN";
		this.myColor = color(100,100,255, 100);
        this.estaEncima = false;
        this.selectColor = color(0,100)
        this.selected = false;
        this.captured = false;
	}

	display() {
		let distance = dist(mouseX, mouseY, this.myX, this.myY);
		this.estaEncima = distance < this.mySize / 2;

		stroke(this.myColor);
        fill(this.myColor);
        if (this.estaEncima) strokeWeight (8);
        else noStroke();
        ellipse (this.myX, this.myY, this.mySize, this.mySize);

		if (this.estaEncima) {
            fill (200);
            noStroke();
            text(this.myName, this.myX, this.myY);
            text(this.myCountry, this.myX, this.myY +15);
            text("code of country: " + this.myCountryISO, this.myX, this.myY + 30);
            text("population: " + this.myPopulation, this.myX, this.myY + 45);
            cursor(HAND)
        }
        if (this.selected) {
            fill(this.selectColor);
            ellipse(this.myX, this.myY, this.mySize, this.mySize);
            fill (200);
            noStroke();
            text(this.myName, this.myX, this.myY);
            text(this.myCountry, this.myX, this.myY +15);
            text("code of country: " + this.myCountryISO, this.myX, this.myY + 30);
            text("population: " + this.myPopulation, this.myX, this.myY + 45);
        }
    } // end of display

    clickOverMe() {
        if (this.estaEncima) {
            this.captured  = true;
            this.xOffset = mouseX-this.myX;
            this.yOffset = mouseY-this.myY;
        } else{
            this.captured = false;
        }
    }
    

    releasedOverMe () {
        if (this.estaEncima) this.selected = !this.selected;
    }


} // end of class
