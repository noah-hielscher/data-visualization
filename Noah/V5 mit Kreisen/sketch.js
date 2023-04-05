/*
Marsha Tasch, Lukas Speidel, Noah Hielscher
*/

// Multiplikator für die Größe
let sizeAll = 2;

//Rand
let border = 100;

// Let für For-Schleife für den größten Score von Crime
let scoreMax = 0;

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
	createCanvas(windowWidth, windowHeight);

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
	background("black");

	// Schleife über jedes Land im "result" Objekt
	for (let country in result) {
		let countryData = result[country];

		// Finde die neuesten Daten für das Land
		let latestData = countryData[countryData.length - 1];

		// Berechne die Größe des Kreises basierend auf dem Wert
		let size = latestData.Score * sizeAll * 1.9;

		// Größe von dem Trust
		let sizeTrust = latestData.trustinPolicePercentage * sizeAll;

		// Position der Kreise x
		let posKreisx = latestData.Score;

		// Position der Kreise y
		let posKreisy = latestData.trustinPolicePercentage;

		//For-Schleife für den größten Score von Crime
		for (let t = 0; scoreMax < latestData.Score; t++) {
			scoreMax = scoreMax + 1;
		}

		// Mappen der %
		posKreisy = map(
			latestData.trustinPolicePercentage,
			100,
			0,
			border,
			windowHeight - border
		);

		// Mappen der Score
		posKreisx = map(
			latestData.Score,
			scoreMax,
			0,
			border,
			windowWidth - border
		);
		push();
		noStroke();

		if (latestData.Subregion == "Northern Europe") {
			fill(80, 120, 170);
			ellipse(posKreisx, posKreisy, size, size);
		}

		if (latestData.Subregion == "Eastern Europe") {
			fill(130, 30, 100);
			ellipse(posKreisx, posKreisy, size, size);
		}

		if (latestData.Subregion == "Southern Europe") {
			fill(255, 170, 35);
			ellipse(posKreisx, posKreisy, size, size);
		}

		if (latestData.Subregion == "Western Europe") {
			fill(50, 110, 110);
			ellipse(posKreisx, posKreisy, size, size);
			console.log("Western Europe");
		}
		push();
		/* 		// Zeichne den Kreis
		noStroke();
		fill(255, 0, 0);
		ellipse(posKreisx, posKreisy, size, size); */

		// Zeichne den Kreis
		push();
		stroke("white");
		noFill();
		ellipse(posKreisx, posKreisy, sizeTrust, sizeTrust);
		pop();
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

	//Erstellt von
	push();
	noStroke();
	fill(200);
	textSize(12);
	text("Marsha Tasch, Lukas Speidel, Noah Hielscher", 10, height - 5);
	pop();
}
