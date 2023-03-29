/*
Marsha, Noah, Lukas
*/

class Country {
	constructor() {
		this.myCountry = "NaN";
		this.myYears = 0;
		this.myTrustinPoliceC = "NaN";
		this.myTrustinPoliceP = "NaN";
		this.mySize = 0;
		this.myWidth = 6;
		this.myColor = color(100, 100, 255);
		this.estaEncima = false;
	}

	display(myX, myY) {
		this.estaEncima =
			mouseX > myX &&
			mouseX < myX + this.myWidth &&
			mouseY > myY - this.mySize &&
			mouseY < myY;

		noStroke();
		fill(this.myColor);
		rect(myX, myY, this.myWidth, -this.mySize);

		if (this.estaEncima) {
			fill(200);
			text(this.myCountryArea, myX, myY + 30);
			text(this.myCountry, myX, myY + 15);
		}
	} // end of display
} // end of class
