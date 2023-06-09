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
		let latestData = countryData.find(
			(data) => data.year === 2000 + mySlider.myValue
		);
		if (latestData) {
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
			}
			push();
			// Zeichne den Kreis
			push();
			stroke("white");
			strokeWeight(2);
			noFill();
			ellipse(posKreisx, posKreisy, sizeTrust, sizeTrust);
			pop();
		}
	}
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

//für Hover
display () 
{
	this.estaEncima = mouseX > this.myX - this.mySize / 2 && mouseX < this.myX + this.mySize / 2 &&
		mouseY > this.myY - this.mySize / 2 && mouseY < this.myY + this.mySize / 2;

	stroke(0,0,100);
	if (this.hover) strokeWeight (2);
	else noStroke();

	fill(this.myColor);
	ellipse (this.myX, this.myY, this.mySize, this.mySize);
	noStroke();
}