/*
Marsha, Noah, Lukas
*/

//For-Schleife meiste Vorfälle
let valueMax = 0;

//For-Schleife meiste Vorfälle
let trustMax = 0;

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
	createCanvas(1680, 1050);

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

			//For-Schleife meiste Vorfälle
			for (let v = 0; valueMax < currentCountry.myValue; v++) {
				valueMax = valueMax + 1;
			}

			//Map
			currentCountry.myPosition = map(
				currentCountry.myValue,
				valueMax,
				0,
				1680,
				0
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

		//For-Schleife höchstes Vertrauen
		for (let t = 0; trustMax < currentTrust.myTrustinPoliceP; t++) {
			trustMax = trustMax + 1;
		}

		//Map Position
		currentTrust.myPosition = map(
			currentTrust.myTrustinPoliceP,
			trustMax,
			0,
			0,
			height
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

	//Display Crime
	for (let i = 0; i < myCrime.length; i++) {
		myCrime[i].display(currentX, currentY);
		currentX += myCrime[i].myWidth + 2;
	}

	//100%
	push();
	noStroke();
	fill(200);
	textSize(80);
	text("100%", 1680 / 2, 100);
	pop();

	//0%
	push();
	noStroke();
	fill(200);
	textSize(80);
	text("0%", 1680 / 2, 1050 - 100);
	pop();

	//viel
	push();
	noStroke();
	fill(200);
	textSize(80);
	text("viel", 0 + 100, 1050 / 2);
	pop();

	//wenig
	push();
	noStroke();
	fill(200);
	textSize(80);
	text("wenig", 1680 - 200, 1050 / 2);
	pop();

	//FrameRate
	push();
	noStroke();
	fill(200);
	textSize(12);
	text("frameRate:   " + Math.round(frameRate()), 10, height - 5);
	pop();
}
