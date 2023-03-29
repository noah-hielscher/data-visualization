/*
franklin hernandez-castro
www.skizata.com
TEC costa rica, hfg schw. gmuend
2022
*/

let countryData;
let myCountries = [];

function preload(){
    countryData = loadTable('data/countries&areas.csv', 'csv', 'header');
}

function setup() {
    createCanvas(1400, 800);
    let i=0;

    for (let myRow of countryData.rows){
        let currentCountry = new Country();

        currentCountry.myCountryArea = myRow.get('sqr_Km');
        if (currentCountry.myCountryArea>10000){
            currentCountry.myCountry = myRow.get('Country_Name');
            currentCountry.myCountryISO = myRow.get('ISO_A3');
            currentCountry.mySize = map( currentCountry.myCountryArea, 17098250,50,  700,5) ; // [17098250,50]

            if ( currentCountry.myCountryISO === "DEU" || currentCountry.myCountryISO === "CRI")
                currentCountry.myColor = color(200,100,100);

            myCountries [i] = currentCountry;
            i++;
        }
    }
}

function draw() {
    background(51);

    let currentX = 10;
    let currentY = 750;

    for (let i = 0; i < myCountries.length; i++) {
        myCountries [i].display (currentX, currentY);
        currentX += myCountries[i].myWidth+2;
    }

    fill (200);
    textSize(18);
    text ("countries by area", 10, 30);
    textSize(12);
    text("frameRate:   " + Math.round(frameRate()), 10, height-5);

    //noLoop();
}