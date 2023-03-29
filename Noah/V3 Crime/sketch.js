/*
Marsha, Noah, Lukas
*/

let countryData;
let myCountries = [];

function preload() {
	countryData = loadTable("data/Crime.csv", "csv", "header");
}

function setup() {
	createCanvas(1400, 800);
	let i = 0;

	for (let myRow of countryData.rows) {
		let currentCountry = new Country();

		//Import
		currentCountry.myIso = myRow.get("Iso3_code");
		currentCountry.myCountry = myRow.get("Country");
		currentCountry.myRegion = myRow.get("Region");
		currentCountry.mySubregion = myRow.get("Subregion");
		currentCountry.myCategory = myRow.get("Category");
		currentCountry.mySex = myRow.get("Sex");
		currentCountry.myAge = myRow.get("Age");
		currentCountry.myYear = myRow.get("Year");
		currentCountry.myValue = myRow.get("VALUE");

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
