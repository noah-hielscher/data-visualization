function Slider(_x, _y, _mW, _mH, _vMin, _vMax, _vIn, _myT) {
	this.myX = _x;
	this.myY = _y;

	this.myWidth = _mW;
	this.myHeight = _mH;
	this.myMin = _vMin;
	this.myMax = _vMax;
	this.myInitial = _vIn;
	this.myTitle = _myT;
	this.myTextSize = 12;

	this.posButtonX = map(
		this.myInitial,
		this.myMin,
		this.myMax,
		this.myX,
		this.myX + this.myWidth
	);
	this.myValue = _vIn;

	this.mouseOverMe = false;
	this.draggingMe = false;
	let dif = 0;

	this.render = function () {
		this.mouseOverMe =
			mouseY > this.myY &&
			mouseY < this.myY + this.myHeight &&
			mouseX > this.posButtonX - this.myHeight / 2 &&
			mouseX < this.posButtonX + this.myHeight / 2;

		noStroke();
		fill(globalBgColor);
		rect(this.myX, this.myY, this.myWidth, this.myHeight, 8);

		fill("white");
		stroke("white");
		strokeWeight(2);

		//Skalen
		let linex = this.myWidth - 340;
		let linexSpace = 56;

		line(
			this.myX + linex,
			this.myY - 1,
			this.myX + linex,
			this.myY + this.myHeight + 1
		);

		line(
			this.myX + linex + linexSpace,
			this.myY - 1,
			this.myX + linex + linexSpace,
			this.myY + this.myHeight + 1
		);

		line(
			this.myX + linex + linexSpace * 2,
			this.myY - 1,
			this.myX + linex + linexSpace * 2,
			this.myY + this.myHeight + 1
		);

		line(
			this.myX + linex + linexSpace * 3,
			this.myY - 1,
			this.myX + linex + linexSpace * 3,
			this.myY + this.myHeight + 1
		);

		line(
			this.myX + linex + linexSpace * 4,
			this.myY - 1,
			this.myX + linex + linexSpace * 4,
			this.myY + this.myHeight + 1
		);

		line(
			this.myX + linex + linexSpace * 5,
			this.myY - 1,
			this.myX + linex + linexSpace * 5,
			this.myY + this.myHeight + 1
		);

		// button
		fill(255, 255, 255, 50);
		if (this.mouseOverMe) fill(255, 255, 155, 100);
		noStroke();
		push();
		translate(10, 10);
		ellipse(
			this.posButtonX - this.myHeight / 2,
			this.myY,
			this.myHeight * 1.4,
			this.myHeight * 1.4
		);
		pop();
		//line(this.posButtonX, this.myY - 5, this.posButtonX, this.myY + 5);

		// title text
		noStroke();
		textSize(this.myTextSize);
		fill(250, 250, 250);
		textAlign(CENTER);
		text(this.myTitle, this.myX + this.myWidth / 2, this.myY - 10);
		//value text
		textSize(this.myTextSize - 2);
		textAlign(CENTER);
		//text(
		//	this.myValue.toFixed(0),
		//	this.posButtonX - 3,
		//	this.myY + this.myHeight + 25
		//);
	};

	this.mouseClickMe = function () {
		if (this.mouseOverMe) {
			this.draggingMe = true;
			dif = this.posButtonX - mouseX;
		}
		return this.mouseOverMe;
	};

	this.mouseDraggingMe = function () {
		const oldValue = this.myValue;
		if (this.draggingMe) {
			if (this.mouseOverMe) {
				if (mouseX > this.myX && mouseX < this.myX + this.myWidth)
					this.posButtonX = mouseX + dif;
				if (this.posButtonX < this.myX) this.posButtonX = this.myX;
				if (this.posButtonX > this.myX + this.myWidth)
					this.posButtonX = this.myX + this.myWidth;
				this.myValue =
					floor(
						map(
							this.posButtonX,
							this.myX,
							this.myX + this.myWidth,
							this.myMin,
							this.myMax
						) / 2
					) * 2;
			}
		}
		return oldValue !== this.myValue;
	};

	this.mouseReleasedMe = function () {
		this.draggingMe = false;
		dif = 0;
	};
} // end of class
