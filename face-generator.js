let x=280 //Face
let y=20  //Eyes
let z=20  //Nose
let r=255
let g=105
let b=180

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(r,g,b);
  
  // Face
  noStroke();
  fill(255);
  ellipse(200, 200, x, x);  
  
  // Eyes
  fill(0);
  ellipse(115, 230, y, y);  // Left eye
  ellipse(285, 230, y, y);  // Right eye
  
  // Nose
  fill(73, 45, 34);
  ellipse(mouseX, mouseY, z, z);  
  
  // Bow 
  fill(235, 127, 175);
  ellipse(330, 135, 90, 100);  // Right part of bow
  ellipse(230, 90, 90, 100);  // Left part of bow
  ellipse(280, 110, 50, 50);  // Center part of bow
  
  // Left whiskers 
  stroke(0);
  strokeWeight(5);
  line(30, 200, 70, 220);  // Upper whisker left
  line(30, 240, 70, 240);  // Middle whisker left
  line(30, 280, 70, 260);  // Lower whisker left
  
  // Right whiskers 
  line(370, 200, 330, 220);  // Upper whisker right
  line(370, 240, 330, 240);  // Middle whisker right
  line(370, 280, 330, 260);  // Lower whisker right
  
}
  
function mousePressed(){
  x=random(280,400)
  y=random(20,50)
  z=random(20,40)
  g=random(105,192)
  b=random(180,203)
}