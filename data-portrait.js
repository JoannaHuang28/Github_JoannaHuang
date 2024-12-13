let img; // Variable to hold the image of Liz
let imgX, imgY; // Variables for the position of Liz
// Boolean to check if the 'up''down''left''right' movement is active
let moveUp = false;
let moveDown = false;
let moveLeft = false;
let moveRight = false;
// X and Y position of the sun (controlled by mouse movement)
let ellipseX = 0;
let ellipseY = 0;

// Array for Dog Paw Bar (represents the number of paw prints per column)
const myData = [180, 150, 250, 180, 300, 200, 180];
const emojiSpacing = 80; // Spacing between each paw print bar
const emojiStartX = 55; // Initial X position for the paw print bar
const emojiY = 30; // Initial Y position for the paw prints
let timer = 0; // Timer to control the speed of the paw prints animation
const timeToComplete = 2; // Time in seconds to complete paw prints animation

function preload() {
  // Preload the image of Liz and log a success or failure message
  img = loadImage('Liz.PNG', () => {
    console.log("Image loaded successfully");
  }, () => {
    console.log("Failed to load image");
  });
}

function setup() {
  createCanvas(600, 600);
  noStroke();
  ellipseMode(CENTER); // Set ellipse mode to draw from the center
  textSize(30); 
  textAlign(CENTER, CENTER);
   // Initialize Liz's X and Y position at the center of the canvas
  imgX = width / 2;
  imgY = height / 2;
}

function draw() {
  background(135, 206, 235); // Sky blue color
  
  // Sun moving along with the mouse + Using Linear Interpolation to smooth movement
  ellipseX = lerp(ellipseX, mouseX, 0.05);
  ellipseY = lerp(ellipseY, mouseY, 0.05);
  fill(255, 231, 66); // Sun yellow color
  ellipse(ellipseX, ellipseY, 66, 66); // Draw the sun
  
  // Display instructions for user interaction
  fill(255); 
  textFont('chalkduster');
  textSize(12);
  textAlign(CENTER, TOP);
  text('Press Keyboard W A S D to Walk Liz! Moving Mouse to make the Sun Rise', width / 2, 20);
  
  // Call the custom functions to draw various elements on the screen
  drawLandscape();
  drawGrasses();
  LizPosition();
  drawEmojis();
  
  // Draw the image of Liz if it is successfully loaded
  if (img) {
    // Scale down Liz's image
    image(img, imgX, imgY-200, img.width / 8, img.height / 8);
  }
  drawEmojis();// Draw paw print emojis
}

// Function to draw the landscape (land and clouds)
function drawLandscape() {
  push();
  fill(166, 241, 180); // Land color
  ellipse(300, 570, 1300, 800);// Draw the grassy land
  // Draw multiple clouds at various positions
  fill(255); // Clouds color
  ellipse(100, 100, 70, 50);
  ellipse(130, 80, 70, 50);
  ellipse(140, 100, 70, 50);
  ellipse(160, 80, 70, 50);
  ellipse(280, 120, 70, 50);
  ellipse(310, 100, 70, 50);
  ellipse(320, 120, 70, 50);
  ellipse(340, 100, 70, 50);
  ellipse(450, 80, 70, 50);
  ellipse(480, 60, 70, 50);
  ellipse(490, 80, 70, 50);
  ellipse(510, 60, 70, 50);
  pop();
}

// Function to draw the grass
function drawGrasses() {
  push();
  fill(4, 150, 84); // Grass color
  // Draw grass triangles at various positions
  triangle(55, 520, 58, 480, 86, 520);
  triangle(60, 520, 80, 470, 95, 520);
  triangle(80, 520, 95, 480, 100, 520);
  triangle(175, 460, 180, 430, 200, 460);
  triangle(180, 460, 195, 420, 210, 460);
  triangle(200, 460, 205, 420, 220, 460);
  triangle(115, 310, 120, 280, 135, 310);
  triangle(125, 310, 135, 275, 145, 310);
  triangle(135, 310, 145, 275, 150, 310);
  triangle(300, 300, 310, 270, 320, 300);
  triangle(310, 300, 320, 260, 330, 300);
  triangle(320, 300, 330, 270, 340, 300);
  triangle(400, 550, 410, 520, 420, 550);
  triangle(410, 550, 420, 510, 430, 550);
  triangle(420, 550, 430, 515, 440, 550);
  triangle(450, 380, 460, 350, 470, 380);
  triangle(460, 380, 470, 340, 480, 380);
  triangle(470, 380, 480, 350, 500, 380);
  pop();
}

// Function to control the position of Liz using WASD keys
function LizPosition() {
  const moveDirection = 3; // The amount by which Liz moves in each direction
  if (moveUp) imgY -= moveDirection;
  if (moveDown) imgY += moveDirection;
  if (moveLeft) imgX -= moveDirection;
  if (moveRight) imgX += moveDirection;
}


// Function to animate the paw print bar
function drawEmojis() {
  timer += deltaTime / 1000; // Increment timer in seconds
  
  // Cap the timer when it reaches the animation duration
  if (timer >= timeToComplete) timer = timeToComplete;
  
  textSize(25); // Set the text size for the paw print emojis
  
  // Loop through the data array to display paw prints
  for (let i = 0; i < myData.length; i++) {
    
    // Calculate animation progress
    let timerCompletion = timer / timeToComplete;
    
    // Determine how many paw prints to show
    let emojiCount = int(myData[i] * timerCompletion / 30);
    
    // Display paw prints for the current column
    for (let j = 0; j < emojiCount; j++) {
      text('🐾', emojiStartX + i * emojiSpacing, height - (emojiY + j * 30)); // Position paw prints
    }
  }
}

// Function to handle key presses
function keyPressed() {
 // Check which key is pressed and set the corresponding movement
  if (key === 'W' || key === 'w') moveUp = true;
  if (key === 'S' || key === 's') moveDown = true;
  if (key === 'A' || key === 'a') moveLeft = true;
  if (key === 'D' || key === 'd') moveRight = true;
}

// Function to handle key releases
function keyReleased() {
// Check which key is released and reset the corresponding movement
  if (key === 'W' || key === 'w') moveUp = false;
  if (key === 'S' || key === 's') moveDown = false;
  if (key === 'A' || key === 'a') moveLeft = false;
  if (key === 'D' || key === 'd') moveRight = false;
}