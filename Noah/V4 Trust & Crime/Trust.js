/*
Marsha, Noah, Lukas
*/

class TrustinPolice {
	constructor() {
		this.myCountry = "NaN";
		this.myYears = 0;
		this.myTrustinPoliceC = "NaN";
		this.myTrustinPoliceP = "NaN";
		this.mySize = 0;
		this.myPosition = 0;
		this.myWidth = 6;
		this.myColor = color(0, 0, 0);
		this.estaEncima = false;
	}

	display(myX, myY) {
		this.estaEncima =
			mouseX > myX &&
			mouseX < myX + this.myWidth &&
			mouseY > myY - this.mySize &&
			mouseY < myY;

		stroke(this.myColor);
		noFill();
		ellipseMode("CENTER");
		ellipse(
			500,
			this.myPosition,
			this.myTrustinPoliceP / 0.5,
			this.myTrustinPoliceP / 0.5
		);

		if (this.estaEncima) {
			fill(200);
			text(this.myCountryArea, myX, myY + 30);
			text(this.myCountry, myX, myY + 15);
		}
	} // end of display
} // end of class
