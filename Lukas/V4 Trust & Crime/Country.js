/*
Marsha, Noah, Lukas
*/

class Country {
	constructor() {
		//Datenbank
		this.myIso = "NaN";
		this.myCountry = "NaN";
		this.myRegion = "NaN";
		this.mySubregion = "NaN";
		this.myCategory = "NaN";
		this.mySex = "NaN";
		this.myAge = "NaN";
		this.myYear = "NaN";
		this.myValue = "NaN";
		//Sonstiges
		this.myPosition = 0;
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
		ellipse(
			this.myPosition,
			500,
			this.myValue / 10000,
			this.myValue / 10000
		);

		if (this.estaEncima) {
			fill(200);
			text(this.myCountryArea, myX, myY + 30);
			text(this.myCountry, myX, myY + 15);
		}
	} // end of display
} // end of class
