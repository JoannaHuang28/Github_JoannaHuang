let positionX = 200;
let positionY = 150;
const moveSpeed = 3;

function setup() {
  createCanvas(400, 600);
  background(255);
  rectMode(CENTER);
  angleMode(DEGREES);
}

function draw() {
  drawHead(positionX, positionY, color(255), 3);
  drawBody(positionX, positionY, color(255), 3);
  moveFromInput();
}

function moveFromInput()
{
  let xInput = 0;
  let yInput = 0;

  if (keyIsDown(LEFT_ARROW))
  {
    xInput--;
  }
  if (keyIsDown(RIGHT_ARROW))
  {
    xInput++;
  }
  if (keyIsDown(UP_ARROW))
  {
    yInput--;
  }
  if (keyIsDown(DOWN_ARROW))
  {
    yInput++;
  }
  move(xInput, yInput);
}

function move(amountX, amountY)
{
  positionX += amountX * moveSpeed;
  positionY += amountY * moveSpeed;
}

function drawHead(positionX, positionY, col, weight){
  push();
  fill(255,165,0);
  stroke(col);
  strokeWeight(weight);
  rect(positionX, positionY, 140, 90);//Head
  ellipse(positionX-40, positionY-5, 30, 30);//Left eye
  ellipse(positionX+40, positionY-5, 30, 30);//Right eye
  
  fill(255,99,71);
  rect(positionX, positionY+35, 40, 20);//Mouth
  
  fill(60,179,113);
  rect(positionX, positionY-61, 10, 25);//Top of head
  
  fill(60,179,113);
  rect(positionX-81, positionY, 15, 28);//Left Ear
  rect(positionX-100, positionY, 15, 12);
  rect(positionX+81, positionY, 15, 28);//Right Ear
  rect(positionX+100, positionY, 15, 12);

  fill(32,178,170);
  noStroke();
  ellipse(positionX-35, positionY-5, 18, 18);//Left eyeball
  ellipse(positionX+45, positionY-5, 18, 18);//Right eyeball
  pop();
}

function drawBody(positionX, positionY, col, weight){
  stroke(col);
  strokeWeight(weight);
  fill(255,99,71);//Only Arms
  
  push();
  fill(60,179,113);
  rect(positionX, positionY+150, 180, 200);//Body
  fill(32,178,170);
  rect(positionX-50, positionY+300, 30, 100);//Left leg
  rect(positionX+50, positionY+300, 30, 100);//Right leg
  fill(255,165,0);
  ellipse(positionX-60, positionY+350, 60, 30);//Left foot
  ellipse(positionX+60, positionY+350, 60, 30);//Right foot
  fill(255);
  rect(positionX, positionY+150,110,130);
  pop();
  
  push();
  rotate(5);//Left arm
  rect(positionX-90, positionY+130, 35, 160);
  pop();
  
  push();
  rotate(-5);//Right arm
  rect(positionX+90, positionY+165, 35, 160);
  pop();
}