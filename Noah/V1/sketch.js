/*
franklin hernandez-castro
www.skizata.com
TEC costa rica, hfg schw. gmuend
2022
*/

let TrustData;
let myCountries = [];

function preload() {
	TrustData = loadTable("data/trust.csv", "csv", "header");
	CrimeData = loadTable("data/crime.csv", "csv", "header");
}

function setup() {
	createCanvas(1400, 800);
	let i = 0;

	for (let myRow of TrustData.rows) {
		let currentTrust = new Trust();

		currentTrust.myTrustArea = myRow.get("sqr_Km");

		currentTrust.myTrust = myRow.get("Trust_Name");
		currentTrust.myTrustISO = myRow.get("ISO_A3");
		currentTrust.mySize = map(
			currentTrust.myTrustArea,
			17098250,
			50,
			700,
			5
		); // [17098250,50]

		if (
			currentTrust.myTrustISO === "DEU" ||
			currentTrust.myTrustISO === "CRI"
		)
			currentTrust.myColor = color(200, 100, 100);

		myCountries[i] = currentTrust;
		i++;
	}
}

function draw() {
	background(51);

	let currentX = 10;
	let currentY = 750;

	for (let i = 0; i < myCountries.length; i++) {
		myCountries[i].display(currentX, currentY);
		currentX += myCountries[i].myWidth + 2;
	}

	fill(200);
	textSize(18);
	text("countries by area", 10, 30);
	textSize(12);
	text("frameRate:   " + Math.round(frameRate()), 10, height - 5);

	//noLoop();
}
