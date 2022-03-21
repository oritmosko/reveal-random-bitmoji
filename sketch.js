const numOfImages = 6;
let images = [];
let imageSources = [];
let imageSize = 512; // Images are 512 pixels

let mouseDraggedEnough = 200;
let mouseDraggedCount = 0;

let canvas;
let chosenImage;
let imageGraphics;

let scale = 0.7;
let displayedImageSize;

function preload() {
  for (let i = 1; i <= numOfImages; i++) {
    images.push(loadImage(`assets/${i}.webp`));
    imageSources.push(`assets/${i}.webp`);
  }
}

function setup() {
  scale = displayWidth > imageSize ? 1 : 0.6;
  displayedImageSize = Math.min(displayWidth, imageSize) * scale;
  console.log(displayedImageSize);
  console.log(displayWidth);
  console.log(imageSize);
  document.getElementById("img").height = displayedImageSize;
  document.getElementById("img").width = displayedImageSize;

  pixelDensity(1);
  canvas = createCanvas(displayedImageSize * 1.3, displayedImageSize * 1.2);
  if (displayWidth > imageSize) {
    canvas.position(document.getElementById('img').offsetLeft / 1.2, document.getElementById('img').offsetTop / 1.2 + 16);
  } else {
    canvas.position(document.getElementById('img').offsetLeft / 1.7, document.getElementById('img').offsetTop / 1.2 + 16);
  }

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
  rect(0, 0, displayedImageSize * 1.299, displayedImageSize * 1.199 ,10);
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
