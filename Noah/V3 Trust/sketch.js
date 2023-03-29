/*
Marsha, Noah, Lukas
*/

let countryData;
let myCountries = [];

function preload() {
	countryData = loadTable("data/trust.csv", "csv", "header");
}

function setup() {
	createCanvas(1400, 800);
	let i = 0;

	for (let myRow of countryData.rows) {
		let currentCountry = new Country();

		//Import
		currentCountry.myCountry = myRow.get("Countries");
		currentCountry.myYears = myRow.get("Periods");
		currentCountry.myTrustinPoliceC = myRow.get(
			"Evaluation of trust in/Police (score)"
		);
		currentCountry.myTrustinPoliceP = myRow.get(
			"Percentage of people with trust in/Police (%)"
		);

		//Map
		currentCountry.mySize = map(
			currentCountry.myCountryArea,
			17098250,
			50,
			700,
			5
		); // [17098250,50]

		currentCountry.myColor = color(200, 100, 100);

		myCountries[i] = currentCountry;
		i++;
	}
}

function draw() {
	background(51);

	let currentX = 10;
	let currentY = 750;

	//Display Countries
	for (let i = 0; i < myCountries.length; i++) {
		myCountries[i].display(currentX, currentY);
		currentX += myCountries[i].myWidth + 2;
	}

	//FrameRate
	fill(200);
	textSize(12);
	text("frameRate:   " + Math.round(frameRate()), 10, height - 5);
}
