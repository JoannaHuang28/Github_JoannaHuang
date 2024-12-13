function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES); 
}

function draw() {
  noStroke();
  background(173, 216, 230); 
  fill(126, 200, 80); 
  rect(0, height / 2, width); 

  blendMode(MULTIPLY); 
  
  // Draw the entire racket rotated by 45 degrees clockwise
  push();
  
  translate(200, 200); 
  rotate(45); 
  
  drawHandle();
  drawRacketHead();
  drawGrid();

  pop();

  blendMode(BLEND);
}

function drawHandle() {
  push(); 
  translate(0, 50); 
  fill(0); 
  rect(-10, 30, 20, 150); 
  fill(100); 
  rect(-10, 0, 20, 30);
  pop(); 
}

function drawRacketHead() {
  push(); 
  translate(0, -50); 
  stroke(0); 
  strokeWeight(5); 
  noFill();
  ellipse(0, 0, 150, 200); 
  pop(); 
}

function drawGrid() {
  push(); 
  translate(0, -50); 
  stroke(0);
  strokeWeight(1);

  // Grid lines within the racket head
  //Verticla grid lines
  for (let i = -65; i <= 65; i += 15) { 
    if (dist(i, 0, 0, 0) <= 75) {
      line(i, -100, i, 100);
    }
  }
  //Horizontal grid lines 
  for (let j = -75; j <= 75; j += 15) {
    if (dist(0, j, 0, 0) <= 75) { 
      line(-75, j, 75, j);
    }
  }
  pop(); 
}