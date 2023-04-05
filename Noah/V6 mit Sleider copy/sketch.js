/*
Marsha Tasch, Lukas Speidel, Noah Hielscher
*/

//Slider
let mySlider;

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

//Datenbank Trust0
let trustData;
let myTrust = [];

let latestData;

let filterYear = 2016;

// Box definieren, in der euer Diagramm aufbauen wollt

// ..._______________...
// ...|				|...

function preload() {
	trustData = loadTable("data/trust.csv", "csv", "header");
	crimeData = loadTable("data/Crime.csv", "csv", "header");
	img = loadImage("data/crime_and_trust_graph.png");
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	//Slider
	mySlider = new Slider(
		windowWidth - 500,
		windowHeight - 100,
		400,
		20,
		4,
		18,
		4
	);

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

	//Slider wird gemalt
	mySlider.render();

	// Schleife über jedes Land im "result" Objekt
	for (let country in result) {
		let countryData = result[country];

		// Finde den Datensatz für das Jahr 2004 für das Land
		let data2004 = countryData.find(
			(data) => data.year === 2000 + mySlider.myValue
		);
		if (data2004) {
			// Berechne die Größe des Kreises basierend auf dem Wert
			let size = data2004.trustinPolicePercentage;

			// Position der Kreise x
			let posKreisx = data2004.Score;

			// Position der Kreise y
			let posKreisy = data2004.trustinPolicePercentage;

			//For-Schleife für den größten Score von Crime
			for (let t = 0; scoreMax < data2004.Score; t++) {
				scoreMax = scoreMax + 1;
			}

			// Mappen der %
			posKreisy = map(data2004.trustinPolicePercentage, 100, 0, 0, 1050);

			// Mappen der Score
			posKreisx = map(data2004.Score, scoreMax, 0, 1680, 0);

			// Zeichne den Kreis
			noStroke();
			fill(255, 0, 0);
			ellipse(posKreisx * 10, posKreisy, size, size);
		}
	}

	//Erstellt von
	push();
	noStroke();
	fill(200);
	textSize(16);
	text("Marsha Tasch, Lukas Speidel, Noah Hielscher", 200, height - 5);
	pop();
	image(img, 100, height - 600);
}

//für Slider
function mousePressed() {
	mySlider.mouseClickMe();
}

function mouseReleased() {
	mySlider.mouseReleasedMe();
}

function mouseDragged() {
	mySlider.mouseDraggingMe();
}
