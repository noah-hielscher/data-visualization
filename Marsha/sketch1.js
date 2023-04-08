/*
Marsha Noah
*/

let GermanyCities;
let backgroundImage;
let myCities = [];
let numOfCities;

let GermanyL;

function preload() {
	GermanyCities = loadJSON("data/csvjson.json");
	//backgroundImage = loadImage("data/mapaMundi1800x600.png");
}

function setup() {
	createCanvas(1600, 800);

	numOfCities = GermanyCities.cities.length;
	for (let r = 0; r < numOfCities; r++) {
		/** @type {Cities} */ let currentCountry = new Cities(
			GermanyCities.cities[r]
		);
		let cities = GermanyCities.cities;

		// currentCountry.myLongitude = cities[r].longitude;
		// currentCountry.myLatitude = cities[r].latitude;

		// Mapping
		currentCountry.myX = map(
			currentCountry.myLongitude,
			-180,
			180,
			0,
			width
		);
		currentCountry.myY = map(currentCountry.myLatitude, 90, -90, 0, height);
		currentCountry.mySize = map(
			cities[r].population,
			35000000,
			500000,
			100,
			5
		);

		currentCountry.myPopulation = cities[r].population;
		currentCountry.myName = cities[r].city_ascii;
		currentCountry.myCountry = cities[r].country;
		currentCountry.myCountryISO = cities[r].iso3;

		myCities.push(currentCountry);
	}

	//g = germany
	document.addEventListener("keydown", function (event) {});

	GermanyL = myCities.filter((city) => city.myCountry === "Germany");
}

function draw() {
	image(backgroundImage, 0, 0);
	//myCities[i].display();

	//Alle Städte
	if (key === "a") {
		allStädte();
	}

	//Germany
	if (key === "g") {
		deutschland();
	}
	//Text
	push();
	fill("white");
	text("press a = all cities", 20, 20);
	text("press g = germany", 20, 40);
	pop();
}

function allStädte() {
	for (let i = 0; i < myCities.length; i++) {
		myCities[i].display();
		//GermanyL[i].display();
	}
}

function deutschland() {
	GermanyL = myCities.filter((city) => city.myCountry === "Germany");
	for (let i = 0; i < GermanyL.length; i++) {
		GermanyL[i].display();
		//console.log(myCities);
	}
}

function mouseReleased(){
    for (let r = 0; r < numOfCities; r++) {
        myCities[r].releasedOverMe();
    }
}

function mousePressed() {
    for (let r = 0; r < numOfCities; r++) {
        myCities[r].clickOverMe();
    }
}
