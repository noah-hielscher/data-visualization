/*
franklin hernandez-castro
www.skizata.com
TEC costa rica, hfg schw. gmuend
2022
*/

class Trust {
	constructor(_diam, _firstA, _finalA) {
		this.myTrust = "NaN";
		this.myPeriods = "NaN";
		this.myTrustArea = 0;
		this.myTrustISO = "NaN";
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
		ellipse(myX, myY, this.mySize, this.mySize);

		if (this.estaEncima) {
			fill(200);
			text(this.myTrustArea, myX, myY + 30);
			text(this.myTrust, myX, myY + 15);
		}
	} // end of display
} // end of class
