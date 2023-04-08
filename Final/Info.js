class Info {
    constructor(trustData, crimeData, border, scoreMax, slider, sizeAll) {
        this.trustData = trustData;
        this.crimeData = crimeData;
        this.border = border;
        this.scoreMax = scoreMax;
        this.slider = slider;
        this.sizeAll = sizeAll;
        this.factor = 1.9;
        this.data = [];  

        this.trustData.rows.forEach(row => {
            const crimes = new map();
            let score;
            this.crimeData.rows.filter(row => {
                row.obj["Country"] === row.obj["Countries"];
            }).forEach(row => {
                const curScore = row.obj["Score"];
                score += curScore;
                crimes.set(row.obj["Category"], curScore);
            });
            this.data.push(this.countryInfo(row, crimes, row.obj["Year"], score));
        });
    }

    countryInfo(trustDbRow, crimeMap, year, score) {
        const posKreisy = map(
            trustDbRow.obj["Evaluation of trust in/Police (score)"],
            100,
            0,
            this.border,
            windowHeight - this.border
        );

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
            radius: score * this.sizeAll * this.factor,
            crimes: crimeMap,
            trust: trustDbRow,
            year: year
        };
    }

    searchHoveredCircleData(xValue, yValue) {
        return this.data.find(dataValue => {
            const distance = dist(xValue, yValue, dataValue.posX, dataValue.posY);
            return distance <= dataValue.radius;
        });
    }

    addText() {
        strokeWeight(2);
        const circleData = this.searchHoveredCircleData(mouseX, mouseY);
        if(!circleData) {
            return;
        }

        text(circleData.trust.obj["Countries"], 100, 100);
        text("Trust in police: " + circleData.trust.obj["Percentage of people with trust in/Police (%)"] + "%", 100, 120);

        let offset = 40;
        circleData.crimes.forEach((category, score) => {
            text(category + ": " + score, 100, 100 + offset);
            offset += 20;
        });
    }

}  // end of class