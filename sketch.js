const numOfImages = 6;
let images = [];
let chosenImage;
// Images are 512 pixels
let smallerSize = 256;
let mouseDraggedEnough = 400;
let mouseDraggedCount = 0;

function preload() {
  for (let i = 1; i <= numOfImages; i++) {
    images.push(loadImage(`assets/${i}.webp`));
  }
}

function setup() {
  const canvas = createCanvas(smallerSize, smallerSize);
  canvas.center();

  for (img of images) {
    img.resize(smallerSize, smallerSize);
  }
  renderNewImage();

  select('#renderNew').mousePressed(renderNewImage);
  select('#imLazy').mousePressed(revealImage);
  // select('#imLazy').hide();

  background(200);
  startRandomlyForStupidPeople();
  frameRate(10000);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function renderNewImage() {
  chosenImage = images[Math.floor(random(numOfImages))];
  select('#imLazy').style('visibility', 'hidden');
  mouseDraggedCount = 0;
  background(200);
}

function revealImage() {
  image(chosenImage, 0, 0, smallerSize, smallerSize);
}

function startRandomlyForStupidPeople() {
  console.log("here");
  let x = Math.floor(random(smallerSize/2, smallerSize));
  let y = Math.floor(random(smallerSize/2, smallerSize));
  for (let i = 0; i < 1000; i++) {
    newX = x + Math.floor(random(-1, 2));
    if (newX >= 0 && newX < smallerSize) {
      x = newX;
    }
    newY = y + Math.floor(random(-1, 2));
    if (newY >= 0 && newY < smallerSize) {
      y = newY;
    }
    fillColor(x, y);
  }
}

function mouseDragged() {
  fillSquare(mouseX - 1, mouseY);
  fillSquare(mouseX, mouseY);
  fillSquare(mouseX + 1, mouseY);
  fillSquare(mouseX - 1, mouseY - 1);
  fillSquare(mouseX, mouseY - 1);
  fillSquare(mouseX + 1, mouseY - 1);
  fillSquare(mouseX - 1, mouseY + 1);
  fillSquare(mouseX, mouseY + 1);
  fillSquare(mouseX + 1, mouseY + 1);
  if (mouseDraggedCount++ > mouseDraggedEnough) {
    select('#imLazy').style('visibility', 'visible');
  }
}

function fillSquare(x, y) {
  fillColor(mouseX - 1, mouseY);
  fillColor(mouseX, mouseY);
  fillColor(mouseX + 1, mouseY);
  fillColor(mouseX - 1, mouseY - 1);
  fillColor(mouseX, mouseY - 1);
  fillColor(mouseX + 1, mouseY - 1);
  fillColor(mouseX - 1, mouseY + 1);
  fillColor(mouseX, mouseY + 1);
  fillColor(mouseX + 1, mouseY + 1);
}

function fillColor(x, y) {
  if (x < 0 || x >= smallerSize || y < 0 || y >= smallerSize) {
    return;
  }
  pixelColor = chosenImage.get(x, y);
  fill(pixelColor);
  noStroke();
  rect(x, y, 4, 4);
}
