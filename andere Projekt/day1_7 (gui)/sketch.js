/*
franklin hernandez-castro
www.skizata.com
TEC costa rica, hfg schw. gmuend
2019
 */

let mySlider;
let myDualSlider;
let myButton;
let myCTA;
let localBoolean;

function setup() {
    createCanvas(800, 400);
    myCTA = new CTA(190,80, 20, "CTA");
    myButton = new Button(390,80, 20, "selection button");
    mySlider = new Slider(200, 180, 400, 20, 0, 255, 127, "color");
    myDualSlider = new DualSlider(150, 300, 500, 10, 0,100,"percentage");
    localBoolean = false;
}

function draw() {
    background(51);

    mySlider.render();
    myButton.display();
    myCTA.display();

    myDualSlider.render(mouseX, mouseY);
    myDualSlider.overMe(mouseX, mouseY);

    text("local boolean: " + localBoolean, 220, 95);
}

function mousePressed() {
    mySlider.mouseClickMe();
}

function mouseReleased(){
    mySlider.mouseReleasedMe();
    myDualSlider.mouseReleasedMe(mouseX, mouseY);
    myButton.releasedOverMe();
    if (myCTA.releasedOverMe()) localBoolean = !localBoolean;
}

function mouseDragged() {
    mySlider.mouseDraggingMe();
    myDualSlider.mouseCheckMe(mouseX, mouseY);
}