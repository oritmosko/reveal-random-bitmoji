const numOfImages = 6;
let images = [];
let imageSources = [];
let imageSize = 512; // Images are 512 pixels

let mouseDraggedEnough = 200;
let mouseDraggedCount = 0;

let canvas;
let chosenImage;
let imageGraphics;

function preload() {
  for (let i = 1; i <= numOfImages; i++) {
    images.push(loadImage(`assets/${i}.webp`));
    imageSources.push(`assets/${i}.webp`);
  }
}

function setup() {
  pixelDensity(1);
  canvas = createCanvas(imageSize * 1.3, imageSize * 1.2);
  canvas.position(document.getElementById('img').offsetLeft / 1.7, document.getElementById('img').offsetTop / 1.2 + 10);

  renderNewImage();
  select('#renderNew').mousePressed(renderNewImage);
  select('#revealImage').mousePressed(revealImage);
}

function draw() {
  if (mouseIsPressed) {
    strokeWeight(30);
    line(pmouseX, pmouseY, mouseX, mouseY);
    if (mouseDraggedCount++ > mouseDraggedEnough) {
      select('#revealImage').style('visibility', 'visible');
    }
  }
}

function renderNewImage() {
  // Clear canvas
  push();
  background(255);
  stroke(200);
  rect(0, 0, imageSize * 1.299, imageSize * 1.199 ,10);
  pop();
  // Generate new image
  document.getElementById("img").src = imageSources[Math.floor(random(numOfImages))];
  select('#revealImage').style('visibility', 'hidden');
  mouseDraggedCount = 0;
}

function revealImage() {
  push();
  background(20);
  pop();
}



// function fillColor(x, y) {
//   if (x < 0 || x >= smallerSize || y < 0 || y >= smallerSize) {
//     return;
//   }
//   pixelColor = chosenImage.get(x, y);
//   fill(pixelColor);
//   noStroke();
//   rect(x, y, 4, 4);
// }
