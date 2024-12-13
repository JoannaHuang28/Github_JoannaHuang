let bird; // Bird object
let font; // Font for displaying text
let pipes = []; // Array to store Pipe objects
let gravity = 0.3; // Gravity force applied to the bird
let lift = -10; // Upward force applied when the bird jumps
let pipeSpacing = 150; // Vertical gap between pipes
let pipeWidth = 80; // Width of the pipes
let pipeInterval = 75; // Initial interval for spawning pipes
let score = 0; // Initialize score as a percentage
let collectedItems = 0; // Tracks number of unique items collected
let bg, bg2, bg3, pipeImg; // Background and pipe images
let pipeImgHei = 250; // Height of the pipe image
let scene = "start"; // Current scene ('start', 'game', or 'end')
let startImg; // Image for the start scene
let frontWalk = []; // Array of front walking animations
let sideWalk = []; // Array of side walking animations
let walk1x; // X-coordinate for the walking animation
let walkFrame1 = 0; // Frame counter for front walking animation
let walkFrame2 = 0; // Frame counter for side walking animation
let items = []; // Array of collectible item images
let itemIndex = 0; // Tracks the current item to use
let pipeCounter = 0; // Tracks the total number of pipes created
let againImg; // Image for "Try Again" button

function preload() {
  font = loadFont("LanaPixel.ttf"); // Load custom font
  bg = loadImage("bg.PNG"); // Load main background image
  bg2 = loadImage("BG_2.png"); // Load background for start scene
  bg3 = loadImage("BG_3.png"); // Load background for end scene
  pipeImg = loadImage("pipe.PNG"); // Load pipe image
  startImg = loadImage("START.PNG"); // Load start scene button image
  againImg = loadImage("TryAgain.PNG"); // Load "Try Again" button image
  for (let i = 0; i < 4; i++) {
    frontWalk[i] = loadImage("Front Walk" + (i + 1) + ".png"); // Load front walking frames
    sideWalk[i] = loadImage("Side Walk " + (i + 1) + ".png"); // Load side walking frames
  }
  for (let i = 0; i < 10; i++) {
    items[i] = loadImage(i + ".png"); // Load collectible item images
  }
}

function setup() {
  createCanvas(600, 400); 
  bird = new Bird(); // Initialize the bird object
  textFont(font); // Set the font for text rendering
  pipeImg.resize(0, pipeImgHei); // Resize pipe image
  startImg.resize(0, 100); // Resize start button image
  againImg.resize(0, 100); // Resize "Try Again" button image

  imageMode(CENTER); 
  walk1x = 110; // Initial X-coordinate for walking animation
  for (let i = 0; i < 10; i++) {
    items[i].resize(40, 0); // Resize item images
  }
}

function draw() {
  switch (scene) {
    case "start":
      startScene(); // Render the start scene
      break;
    case "game":
      gameScene(); // Render the game scene
      break;
    case "end":
      endScene(); // Render the end scene
      break;
  }
}

function keyPressed() {
  switch (scene) {
    case "start":
      break;
    case "game":
      if (key === " ") {
        bird.up(); // Make the bird jump
      }
      break;
    case "end":
      if (keyCode === ENTER) {
        resetToStartScene(); // Reset to the start scene
      }
      break;
  }
}

function resetToStartScene() {
  bird = new Bird(); // Reinitialize the bird
  pipes = []; // Clear pipes
  score = 0; // Reset score
  collectedItems = 0; // Reset collected items counter
  itemIndex = 0; // Reset item tracker
  pipeCounter = 0; // Reset pipe counter
  scene = "start"; // Set scene to 'start'
  frameCount = 0; // Reset frame count
}

function resetGameScene() {
  bird = new Bird(); // Reinitialize the bird
  pipes = []; // Clear pipes
  score = 0; // Reset score
  collectedItems = 0; // Reset collected items counter
  itemIndex = 0; // Reset item tracker
  pipeCounter = 0; // Reset pipe counter
  scene = "game"; // Set scene to 'game'
  frameCount = 0; // Reset frame count
}

function startScene() {
  image(bg2, width / 2, height / 2, width, height); // Draw start background
  rectMode(CENTER);
  noFill(); 
  if (keyIsPressed) {
    if (keyCode == LEFT_ARROW) {
      if (walk1x > 0) {
        walk1x -= 3; // Move left
      }
    } else if (keyCode == RIGHT_ARROW) {
      if (walk1x < width) {
        walk1x += 3; // Move right
      }
    }
  }
  image(startImg, 120, 200); // Draw start button
  if (abs(mouseX - 120) < 55 && abs(mouseY - 200) < 30 && mouseIsPressed) {
    scene = "game"; // Start the game
    frameCount = 0; // Reset frame count
  }

  image(frontWalk[walkFrame1 % 4], walk1x, 345); // Draw walking animation
  if (frameCount % 4 === 0) {
    walkFrame1 += 1; // Advance walking frame
  }
}

function gameScene() {
  image(bg, width / 2, height / 2, width, height); // Draw game background
  bird.update(); // Update bird position
  bird.show(); // Render the bird

  let currentPipeSpeed = pipes.length > 0 ? pipes[0].speed : 3; // Get pipe speed
  let adjustedInterval = pipeInterval / (currentPipeSpeed / 3); // Adjust pipe interval

  if (frameCount % Math.floor(adjustedInterval) === 0) {
    pipes.push(new Pipe(pipeCounter)); // Add a new pipe
    pipeCounter++; // Increment pipe counter
  }

  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show(); // Render pipe
    pipes[i].update(); // Update pipe position

    pipes[i].getScore(); // Check if bird collects an item

    if (pipes[i].hits()) {
      scene = "end"; // End the game if the bird hits a pipe
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1); // Remove offscreen pipes
    }
  }

  displayScore(); // Display the current score

  if (collectedItems >= 10) {
    scene = "end"; // End game when 10 items are collected
  }
}

function endScene() {
  image(bg3, width / 2, height / 2, width, height); // Draw end background
  noStroke();

  if (collectedItems >= 10) {
    textSize(26);
    fill(0);
    textAlign(CENTER, CENTER);
    text("Congratulations Joanna!\nYou Are a Fashion Designer Now!", width / 2, height / 2 - 40);
    textSize(22);
    text("Press Enter to Restart", width / 2, height / 2 + 40);
  } else {
    textSize(38);
    fill(0);
    textAlign(CENTER, CENTER);
    text("You Are Almost There !!!", width / 2, height / 2);
    textSize(40);
    text(score + "%", width / 2, height / 2 - 40);

    image(againImg, width / 2, height / 2 + 90); // Show "Try Again" button
    if (abs(mouseX - width / 2) < 60 && abs(mouseY - height / 2 - 90) < 30 && mouseIsPressed) {
      resetGameScene(); // Reset game
    }
  }
}

function displayScore() {
  textSize(34);
  fill(255);
  stroke(0);
  textAlign(RIGHT, TOP);
  text(score + "%", width - 20, 20);
}

class Bird {
  constructor() {
    this.y = height / 2;
    this.x = 64;
    this.radius = 16; // Bird's size
    let newHeight = this.radius * 5;
    for (let i = 0; i < 4; i++) {
      sideWalk[i].resize(0, newHeight); // Resize side walk images
    }
    this.velocity = 0;
  }

  up() {
    this.velocity = lift; // Apply lift force
  }

  update() {
    this.velocity += gravity; // Apply gravity
    this.velocity *= 0.9; // Apply friction
    this.y += this.velocity; // Update vertical position
    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
      scene = "end"; // End game if bird hits the ground
    }
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }

  show() {
    noStroke();
    image(sideWalk[walkFrame2 % 4], this.x, this.y); // Render the bird

    if (frameCount % 4 === 0) {
      walkFrame2 += 1; // Animate the bird
    }
  }
}

class Pipe {
  constructor(pipeCount) {
    this.top = random(height / 2);
    this.bottom = height - (this.top + pipeSpacing);
    this.x = width;
    this.w = pipeWidth;
    this.baseSpeed = 3;
    this.speed = this.baseSpeed;
    this.scored = false;

    if (pipeCount % 2 === 0) {
      this.hasItem = true;
      this.item = itemIndex; // Assign item
      itemIndex = (itemIndex + 1) % 10; // Cycle items
    } else {
      this.hasItem = false;
      this.item = -1;
    }

    this.itemY = this.top + pipeSpacing / 2;
  }

  hits() {
    if (
      bird.x + bird.radius > this.x &&
      bird.x - bird.radius < this.x + this.w
    ) {
      if (
        bird.y - bird.radius < this.top ||
        bird.y + bird.radius > height - this.bottom
      ) {
        return true;
      }
    }
    return false;
  }

  update() {
    this.speed = this.baseSpeed + floor(frameCount / 300); // Increase speed over time
    this.x -= this.speed; // Move pipe left
  }

  offscreen() {
    return this.x < -this.w; // Check if pipe is offscreen
  }

  getScore() {
    if (
      this.hasItem &&
      dist(bird.x, bird.y, this.x + pipeWidth / 2, this.itemY) < 40 &&
      this.item !== -1
    ) {
      score += 10; // Increase score
      collectedItems++; // Increment collected items
      this.item = -1; // Mark item as collected
      this.hasItem = false; // Ensure item is not reused
    }
  }

  show() {
    push();
    if (this.hasItem && this.item !== -1) {
      image(items[this.item], this.x + pipeWidth / 2, this.itemY); // Draw item
    }
    imageMode(CORNER);
    image(pipeImg, this.x - 10, height - this.bottom); // Draw bottom pipe

    translate(this.x - 10, -pipeImgHei + this.top); // Position top pipe
    rotate(PI);
    image(pipeImg, -pipeImg.width, -pipeImg.height); // Draw top pipe
    pop();
  }
}
