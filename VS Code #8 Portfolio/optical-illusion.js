const rows = 10;// Number of rows for the heart grid
const columns = 10;// Number of columns for the heart grid

function setup() {
  createCanvas(600, 600);
  background(0); 
}

function draw(){
  // Map the mouseX position to determine the size of the hearts.
  // As mouse moves horizontally, heart size will range from 10 to 50.
  let heartSize = map(mouseX, 0, 90, 10, 50);

  // Loop for the rows (i controls the vertical position, y)
  for (let i = 0; i <= 100; i++) {
  // Loop for the colunms (j controls the horizontal position, x)
  for (let j = 0; j <= 100; j++) {
    
  // Calculate the remainder of (i + j) modulo 7 to determine the color pattern 
  let reminder = (i+j)%7;
    
  // Set fill color based on the remainder
    if(reminder === 0){
      fill(255, 173, 173); // Light pink
    } else if(reminder === 1){
      fill(254, 215, 165); // Peach
    } else if(reminder === 2){
      fill(253, 255, 182); // Light yellow
    } else if(reminder === 3){
      fill(203, 255, 191); // Light green
    } else if(reminder === 4){
      fill(155, 246, 255); // Light blue 
    } else if(reminder === 5){
      fill(160, 196, 255); // Blue
    } else if(reminder === 6){
      fill(166, 153, 242); // Light purple
    } 
    
  // Calculate the x and y positions for each heart in the grid
  let x = i * width/rows;
  let y = j * height/columns; 
    
  // Call the drawHeart function to draw a heart at (x, y) with the calculated size
  drawHeart(x, y, heartSize); 
    }
  }
}

// Function to draw a heart shape using bezier curves
function drawHeart(x, y, size) {
  noStroke();
  
  beginShape();// Start defining the heart shape
  
  // Draw the heart using two bezier curves
  vertex(x, y); // The starting point of the heart (the bottom point)
  
  // First half of the heart
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  // Second half of the heart
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  
  endShape(CLOSE); // Close the heart shape
}
