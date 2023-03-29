/*
    Marsha Tasch, Noah Hielscher
*/

class MyObject {
	constructor(_x, _y, _color) {
		this.myX = _x;
		this.myY = _y;
		this.mySize = 35;
		this.backgroundColor = color(0, 0, 0);
		this.frontColor = _color;
		this.hover = false;
		this.selected = false;
		this.estaEncima = false;
		this.captured = false;
		this.xOffset = 0.0;
		this.yOffset = 0.0;
	}

	display() {
		this.estaEncima =
			mouseX > this.myX - this.mySize / 2 &&
			mouseX < this.myX + this.mySize / 2 &&
			mouseY > this.myY - this.mySize / 2 &&
			mouseY < this.myY + this.mySize / 2;

		stroke(0, 0, 100);
		if (this.estaEncima) strokeWeight(2);
		else noStroke();

		this.hover =
			mouseX > this.myX - this.mySize / 2 &&
			mouseX < this.myX + this.mySize / 2 &&
			mouseY > this.myY - this.mySize / 2 &&
			mouseY < this.myY + this.mySize / 2;

		stroke(this.backgroundColor);
		if (this.hover) strokeWeight(4);
		else noStroke();

		fill(this.backgroundColor);
		rect(this.myX, this.myY, this.mySize, this.mySize);
		noStroke();

		// selected
		if (this.selected) {
			fill(this.frontColor);
			stroke(this.frontColor);
			strokeWeight(4);
			rect(this.myX, this.myY, this.mySize, this.mySize);
		}
	}

	clickOverMe() {
		if (this.estaEncima) {
			this.captured = true;
			this.xOffset = mouseX - this.myX;
			this.yOffset = mouseY - this.myY;
		} else {
			this.captured = false;
		}
	}

	draggingMe() {
		if (this.captured) {
			this.myX = mouseX - this.xOffset;
			this.myY = mouseY - this.yOffset;
		}
	}

	released() {
		this.captured = false;
	}

	releasedOverMe() {
		if (this.hover) this.selected = !this.selected;
	}
} // end of class
