/*
 Marsha Tasch, Noah Hielscher
*/

let myObjects = [];

let cardXAmount = 6;
let cardYAmount = 6;
let numObjects = cardXAmount * cardYAmount;
let counter = 0;
const colorArray = [
	"red",
	"blue",
	"green",
	"black",
	"orange",
	"yellow",
	"green",
	"purple",
	"pink",
	"cyan",
	"blue",
	"grey",
	"black",
	"cyan",
	"red",
	"pink",
	"navy",
	"grey",
	"ightskyblue",
	"yellow",
	"orange",
	"indigo",
	"magenta",
	"lightskyblue",
	"greenyellow",
	"white",
	"turquoise",
	"indigo",
	"violet",
	"turquoise",
	"purple",
	"navy",
	"magenta",
	"greenyellow",
	"white",
	"violet",
];
const colorMatrix = [
	["red", "blue", "green", "black", "orange", "yellow"],
	["green", "purple", "pink", "cyan", "blue", "grey"],
	["black", "cyan", "red", "pink", "navy", "grey"],
	["teal", "yellow", "orange", "indigo", "magenta", "teal"],
	["darkgreen", "white", "turquoise", "indigo", "violet", "turquoise"],
	["purple", "navy", "magenta", "darkgreen", "white", "violet"],
];

function setup() {
	createCanvas(400, 400);
	rectMode(CENTER);
	colorMode(HSB, 360, 100, 100, 1);
	/* for (let i = 0; i < numObjects; i++) {
        myObjects[i] = new MyObject ( 100, 100 );;
    }*/
	const randomColorArray = this.createRandomColorArray();
	for (let i = 0; i < cardXAmount; i++) {
		for (let j = 0; j < cardYAmount; j++) {
			myObjects[counter] = new MyObject(
				100 + i * 50,
				100 + j * 50,
				randomColorArray[i * cardYAmount + j]
			);
			//myObjects[counter] = new MyObject ( 100 + (i * 50), 100 + (j * 50), colorMatrix[i][j]);
			// -> für manuell (colorMatrix)
			counter++;
		}
	}
}

function createRandomColorArray() {
	return colorArray
		.map((color) => ({ value: color, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map((color) => color.value);
	// map = geht durch array und ersetzt jeden wert (fügt random nummer hinzu)
	// sort sortiert (nach was sortiere ich? -> vergleicht random nummern)
	// map nummer entfernen

	// macht das was oben manuell ist (farben) aber jedes mal anders
}

function draw() {
	background(15);
	for (let i = 0; i < numObjects; i++) {
		myObjects[i].display();
	}

	fill(50);
	noStroke();
	text("frameRate:   " + Math.round(frameRate()), 20, height - 8);
}

function mouseReleased() {
	for (let i = 0; i < numObjects; i++) {
		myObjects[i].releasedOverMe();
	}
}

function mousePressed() {
	for (let i = 0; i < numObjects; i++) {
		myObjects[i].clickOverMe();
	}
}

function mouseDragged() {
	for (let i = 0; i < numObjects; i++) {
		myObjects[i].draggingMe();
	}
}
