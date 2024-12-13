function setup() {
  createCanvas(600, 600);
  noStroke();
}

function draw() {
  background(0);

  push();
  // Scale the mouseY value from 0 to 600 to a range between 50 and 400
  let diameter = map(mouseY, 0, height, 50, 400);//Move the mouse along y-axis to change the clock scale.

  if (mouseX < 200) {
    fill(237,246,253);
  } else if (mouseX < 300) {
    fill(180,205,228);
  } else if (mouseX < 400) {
    fill(120,164,202);
  } else if (mouseX < 500) {
    fill(60,120,179);
  } else {
    fill(0,79,154);
  }
  
  circle(width / 2, height / 2, diameter);//Move the mouse along x-axis to change the clock color.
  
  let s = millis() / 1000; //Millisecond Recorder
  textAlign(LEFT, CENTER);
  textSize(15);
  textFont('Courier New');

  // Display how long the sketch has run.
  text(`Running time: ${nf(s, 1, 1)} sec`, 5, 50, 90);
  pop();

  push();
  colorMode(HSB);
  // Set the x variable based on the current frameCount.
  let x = frameCount % 600;

  // If the mouse is pressed, decrease the frame rate.
  if (mouseIsPressed === true) {
    frameRate(10);
  } else {
    frameRate(60);
  }

  fill(x / 3, 90, 90);
  circle(x, 300, 50);//x is circle's position.
  
  stroke(0); //Clock Point
  strokeWeight(5);
  point(x,300,300)
  
  stroke(0); //Clock Pointer #1
  strokeWeight(2);
  line(x,280,x,300)
  
  stroke(0); //Clock Pointer #2
  strokeWeight(1.5);
  line(x+20,295,x,300)
  
  pop();
}