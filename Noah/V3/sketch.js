let countryData;

function preload() {
	countryData = loadTable("data/trust.csv", "csv", "header");
}

function setup() {
	createCanvas(400, 400);
	let i = 0;

	for (let myRow of countryData.rows) {
		console.log(
			i +
				"Countries: " +
				myRow.get("Countries") +
				"   Year: " +
				myRow.get("Periods") +
				"   trust in Police (score): " +
				myRow.get("Evaluation of trust in/Police (score)") +
				"   trust in Police (%): " +
				myRow.get("Percentage of people with trust in/Police (%)")
		);
		i++;
	}
}

function draw() {
	background(51);

	//Framrate
	fill(200);
	text("frameRate:   " + Math.round(frameRate()), 20, width - 20);
}
