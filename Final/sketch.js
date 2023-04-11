/*
Marsha Tasch, Lukas Speidel, Noah Hielscher
*/

//Golbal Color
globalBgColor = "grey";

//Slider
let mySlider;

// Multiplikator für die Größe
let sizeAll = 3;

//Rand
let border = 250;

// Let für For-Schleife für den größten Score von Crime
let scoreMax = 0;

//Datenbank Crime
let crimeData;
let myCrime = [];
let result = {};
this.filteredByYear = [];

//Datenbank Trust0
let trustData;
let myTrust = [];

let filterYear = 2016;

let info;

// Box definieren, in der euer Diagramm aufbauen wollt

// ..._______________...
// ...|				|...

function preload() {
	trustData = loadTable("data/trust.csv", "csv", "header");
	crimeData = loadTable("data/Crime.csv", "csv", "header");
	countryColors = loadImage("images/CountryColorsDescription.png");
	openSans = loadFont("font/OpenSans-Regular.ttf");
}

function setup() {
	this.info = new Info(trustData, crimeData, border, mySlider, sizeAll);
	createCanvas(windowWidth, windowHeight);

	textFont(openSans);

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

		let score = 0;
		const crimes = crimeData.rows
			.map((crimeDataRow) => crimeDataRow.obj)
			.filter(
				(crimeDataRowObj) =>
					crimeDataRowObj["Country"] === country &&
					crimeDataRowObj["Year"] === year
			);

		crimes.forEach((crimeDataRowObj) => {
			const curScore = crimeDataRowObj["Score"];
			score += Number.parseFloat(curScore);
		});

		result[country].push({
			year: +year,
			trustinPoliceScore: !trustinPoliceScore
				? null
				: +trustinPoliceScore,
			trustinPolicePercentage: !trustinPolicePercentage
				? null
				: +trustinPolicePercentage,
			Score: score,
			Subregion: crimes && crimes[0] ? crimes[0].Subregion : "",
		}); // parseInt(row.year)
	}

	this.drawCircles();
}

function exists(value, arr) {
	return arr.some((data) => data.year === value);
}

function draw() {
	//Slider wird gemalt
	mySlider.render();

	//Beschriftung der Achsen
	//% Vertrauen
	push();
	rectMode(CENTER);
	fill(106);

	//Straftaten
	rect(windowWidth / 2, border - 140, 600, 150, 30);
	rect(windowWidth / 2, windowHeight, 600, 150, 30);

	//Straftaten
	rect(0, windowHeight / 2, 450, 120, 30);
	rect(windowWidth, windowHeight / 2, 450, 120, 30);

	fill("white");
	textSize(30);
	textAlign(CENTER);
	text("100% Trust in Policework", windowWidth / 2, border - 90);
	text("0% Trust in Policework", windowWidth / 2, windowHeight - 25);
	textAlign(LEFT);
	text("High amount \nof crimes", 25, windowHeight / 2 - 10);
	text("Low amount \nof crimes", windowWidth - 195, windowHeight / 2 - 10);

	image(countryColors, 25, windowHeight - 290);
	pop();

	//Überschrift
	push();
	fill(67);
	rectMode(CORNERS);
	rect(0, 0, windowWidth, border - 140);
	textSize(40);
	textAlign(LEFT);
	fill("white");
	text(
		"Is there a correlation between the number of criminal offenses and the trust of the population in police work?",
		23,
		68
	);
	pop();

	//Erstellt von
	push();
	noStroke();
	fill(200);
	textSize(16);
	text("Marsha Tasch, Lukas Speidel, Noah Hielscher", 200, height - 5);
	pop();
}

function drawCircles() {
	background("black");
	// Schleife über jedes Land im "result" Objekt
	for (let country in result) {
		let countryData = result[country];

		// Finde den Datensatz für das Jahr 2004 für das Land
		let latestData = countryData.find(
			(data) => data.year === 2000 + mySlider.myValue
		);

		if (latestData) {
			// Berechne die Größe des Kreises basierend auf dem Wert
			let size = latestData.Score;

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
	//hier irgendwo nach Subregionen filtern

	//Jahr Anzeige
	push();
	noStroke();
	fill("white");
	textSize(35);
	text(2000 + mySlider.myValue, width - 300, height - 120);
	pop();
}

//rect(windowWidth / 2, 70, 600, 200, 30);

function findYearData() {
	this.filteredByYear = {};
	for (let country in result) {
		const filtered = result[country].filter(
			(data) => data.year === 2000 + mySlider.myValue
		);
		this.filteredByYear[country] = filtered;
	}
}

//für Slider
function mousePressed() {
	const clickedOnSlider = mySlider.mouseClickMe();
	if (!clickedOnSlider) {
		this.info.addText();
	}
	//console.log("clicked!");
}

function mouseReleased() {
	mySlider.mouseReleasedMe();
}

function mouseDragged() {
	const changed = mySlider.mouseDraggingMe();
	if (changed) {
		this.drawCircles();
	}
	//console.log("dragged!");
}
