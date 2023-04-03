/*
Marsha, Noah, Lukas
*/

//Datenbank Crime
let crimeData;
let myCrime = [];

//Datenbank Trust
let trustData;
let myTrust = [];

function preload() {
	trustData = loadTable("data/trust.csv", "csv", "header");
	crimeData = loadTable("data/Crime.csv", "csv", "header");
}

function setup() {
	createCanvas(1400, 800);

	//Import Crime
	let c = 0;

	for (let myRow of crimeData.rows) {
		let currentCountry = new Country();

		//Sortierung nach Europa
		if (myRow.get("Region") == "Europe") {
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

			myCrime[c] = currentCountry;
			c++;
		}
	}

	//Import Trust

	let i = 0;

	for (let myRow of trustData.rows) {
		let currentTrust = new TrustinPolice();

		//ImportDatenbank
		currentTrust.myCountry = myRow.get("Countries");
		currentTrust.myYears = myRow.get("Periods");
		currentTrust.myTrustinPoliceC = myRow.get(
			"Evaluation of trust in/Police (score)"
		);
		currentTrust.myTrustinPoliceP = myRow.get(
			"Percentage of people with trust in/Police (%)"
		);

		//Map
		currentTrust.mySize = map(
			currentTrust.myCountryArea,
			17098250,
			50,
			700,
			5
		); // [17098250,50]

		currentTrust.myColor = color(200, 100, 100);

		myTrust[i] = currentTrust;
		i++;
	}
}

function draw() {
	background("white");

	let currentX = 10;
	let currentY = 750;

	//Display Trust
	for (let i = 0; i < myTrust.length; i++) {
		myTrust[i].display(currentX, currentY);
		currentX += myTrust[i].myWidth + 2;
	}

	//FrameRate
	fill(200);
	textSize(12);
	text("frameRate:   " + Math.round(frameRate()), 10, height - 5);
}
