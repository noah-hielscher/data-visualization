class Info {
	constructor(trustData, crimeData, border, slider, sizeAll) {
		this.trustData = trustData;
		this.crimeData = crimeData;
		this.border = border;
		this.slider = slider;
		this.sizeAll = sizeAll;
		this.factor = 1.9;
		this.data = [];
		this.circle;
		this.scoreMax = 0;

		this.trustData.rows
			.map((trustRow) => trustRow.obj)
			.forEach((trustObj) => {
				const crimes = new map();
				let score = 0;
				this.crimeData.rows
					.map((crimeDataRow) => crimeDataRow.obj)
					.filter(
						(crimeDataRowObj) =>
							crimeDataRowObj["Country"] ===
								trustObj["Countries"] &&
							crimeDataRowObj["Year"] === trustObj["Year"]
					)
					.forEach((crimeDataRowObj) => {
						const curScore = crimeDataRowObj["Score"];
						score += Number.parseFloat(curScore);
						crimes[crimeDataRowObj["Category"]] = curScore;
					});
				this.data.push(
					this.countryInfo(trustObj, crimes, trustObj["Year"], score)
				);
			});
	}

	countryInfo(trustDbRow, crimeMap, year, score) {
		const posKreisy = map(
			trustDbRow["Percentage of people with trust in/Police (%)"],
			100,
			0,
			this.border,
			windowHeight - this.border
		);

		for (let t = 0; this.scoreMax < score; t++) {
			this.scoreMax = this.scoreMax + 1;
		}

		// Mappen der Score
		const posKreisx = map(
			score,
			this.scoreMax,
			0,
			this.border,
			windowWidth - this.border
		);

		return {
			posX: posKreisx,
			posY: posKreisy,
			radius: score,
			crimes: crimeMap,
			trust: trustDbRow,
			year: year,
		};
	}

	searchHoveredCircleData() {
		const hovered = this.data.find((dataValue) => {
			const distance = dist(
				mouseX,
				mouseY,
				dataValue.posX,
				dataValue.posY
			);
			return distance <= dataValue.radius;
		});
		return hovered;
	}

	addText() {
		strokeWeight(2);
		const circleData = this.searchHoveredCircleData();
		if (!circleData) {
			return;
		}
		fill(globalBgColor);
		rect(0, 70, 600, 200);
		fill("white");
		textSize(20);
		text(circleData.trust["Countries"], 100, 100);
		text(
			"Trust in police: " +
				circleData.trust[
					"Percentage of people with trust in/Police (%)"
				] +
				"%",
			160,
			120
		);

		let offset = 40;
		const crimes = circleData.crimes;
		for (let category in crimes) {
			text(category + ": " + crimes[category], 100, 100 + offset);
			offset += 20;
		}
	}
} // end of class
