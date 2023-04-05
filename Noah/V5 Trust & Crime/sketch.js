/*
Marsha, Noah, Lukas
*/

//Datenbank Crime
let crimeData;
let myCrime = [];
let result = {};

//Datenbank Trust
let trustData;
let myTrust = [];

// Box definieren, in der euer Diagramm aufbauen wollt

// ..._______________...
// ...|				|...

function preload() {
	trustData = loadTable("data/trust.csv", "csv", "header");
	crimeData = loadTable("data/Crime.csv", "csv", "header");
}

function setup() {
	createCanvas(1680, 1050);

	let i = 0;

	// Erstelle ein Objekt

	/** @type {Array<{country: string; year: number}>} */
	//Trust
	let data = trustData.rows.map((row) => ({
		country: row.obj["Countries"],
		year: row.obj["Year"],
		trustinPoliceScore: row.obj["Evaluation of trust in/Police (score)"],
		trustinPolicePercentage:
			row.obj["Percentage of people with trust in/Police (%)"],
	}));

	//Crime
	//let dataCrime = crimeData.rows.map((row) => ({
	//	country: row.obj["Countries"],
	//	year: row.obj["Year"],
	//}));

	// {country: <Name>, year: <Jahr>}

	//Trust
	for (let row of data) {
		let { country, year, trustinPoliceScore, trustinPolicePercentage } =
			row;

		if (!result[country]) {
			result[country] = [];
		}

		result[country].push({
			year: +year,
			trustinPoliceScore: !trustinPoliceScore
				? null
				: +trustinPoliceScore,
			trustinPolicePercentage: !trustinPolicePercentage
				? null
				: +trustinPolicePercentage,
		}); // parseInt(row.year)
	}

	// Gehe crime durch
	// Wenn in result das Land und Jahr passt
	// dann füge sämtliche Attribute ein

	for (let i = 0; i < crimeData.rows.length; i++) {
		// console.log(crimeData.rows[i]);

		let row = crimeData.rows[i];
		let country = row.obj["Country"],
			year = +row.obj["Year"];

		// Land
		if (result[country]) {
			if (exists(year, result[country])) {
				// 1. Greife auf die andere Datenbank zu
				// 2. Füge die restlichen Spalten ein

				// result[country] -> Array aus Objekten
				// obj => {year: <number>, ...}
				let dataset = result[country].find((obj) => obj.year === year);

				//"Deep copy" unserer Spalten aus dem zweiten Datensatz für das Land und Jahr
				const obj = { ...crimeData.rows[i].obj };

				// lösche die Spaltenwerte, damit es keine Überlappungen gibt
				delete obj["Country"];
				delete obj["Year"];
				obj["Score"] = +obj["Score"];

				// "Merge" den neuen mit dem alten Datensatz zusammen
				Object.assign(dataset, obj);
			}
		}
	}
}

function exists(value, arr) {
	return arr.some((data) => data.year === value);
}

function draw() {
	background("white");

	let xPos = 100;
	let yPos = 100;

	// Schleife über jedes Land im "result" Objekt
	for (let country in result) {
		let countryData = result[country];

		// Finde die neuesten Daten für das Land
		let latestData = countryData[countryData.length - 1];

		// Berechne die Größe des Kreises basierend auf dem Wert
		let size = latestData.trustinPolicePercentage;

		// Position der Kreise x
		let posKreisx = latestData.Score;

		// Position der Kreise y
		let posKreisy = latestData.trustinPolicePercentage;

		// Mappen der %
		posKreisy = map(latestData.trustinPolicePercentage, 100, 0, 0, 1050);

		// Mappen der Score
		posKreisx = map(latestData.Score, 100, 0, 1680, 0);

		// Zeichne den Kreis
		noStroke();
		fill(255, 0, 0);
		ellipse(posKreisx * 10, posKreisy, size, size);
	}
	
	let ScoreMax = 0;
	//For-Schleife höchstes Vertrauen
	for (let t = 0; ScoreMax < latestData.valueCrime; t++) {
		trustMax = trustMax + 1;
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
