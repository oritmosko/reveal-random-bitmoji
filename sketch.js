const numOfImages = 6;
let images = [];
let imageSources = [];
let imageSize = 512; // Images are 512 pixels

let mouseDraggedEnough = 100;
let mouseDraggedCount = 0;

let canvas;
let chosenImage;
let imageGraphics;

let scaleImg;
let displayedImageSize;

function setup() {
  // Disable elemnts selection.
  disableElementsSelection();

  // Keep image names.
  for (let i = 1; i <= numOfImages; i++) {
    imageSources.push(`assets/${i}.webp`);
  }

  // Setup canvas over image.
  let scaleImg = 1;
  let heightLeft = displayHeight - document.getElementById("revealImage").offsetTop - document.getElementById("revealImage").offsetHeight;
  if (displayWidth <= imageSize || heightLeft <= imageSize) {
    scaleImg = 0.6;
  }
  let canvasOffsetTop = document.getElementById('img').offsetTop / 1.2;

  displayedImageSize = Math.min(Math.min(displayWidth, heightLeft), imageSize) * scaleImg;
  console.log("orittt");
  console.log(displayedImageSize, displayHeight, scaleImg);
  document.getElementById("img").height = displayedImageSize;
  document.getElementById("img").width = displayedImageSize;

  pixelDensity(1);
  canvas = createCanvas(displayedImageSize * 1.3, displayedImageSize + 20);
  canvas.position(0, canvasOffsetTop);
  canvas.center('horizontal');

  renderNewImage();

  // Setup buttons.
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

function disableElementsSelection() {
  let unFocus = function () {
    if (document.selection) {
        document.selection.empty()
    } else {
        window.getSelection().removeAllRanges()
    }
  }
  document.getElementById('revealImage').onmousemove = function () {
      unFocus()
  }
  document.getElementById('revealImage').onmouseup = function () {
      unFocus()
  }
  document.getElementById('renderNew').onmousemove = function () {
      unFocus()
  }
  document.getElementById('renderNew').onmouseup = function () {
      unFocus()
  }
  document.getElementById('header').onmousemove = function () {
      unFocus()
  }
  document.getElementById('header').onmouseup = function () {
      unFocus()
  }
  document.getElementById('imgDiv').onmousemove = function () {
      unFocus()
  }
  document.getElementById('imgDiv').onmouseup = function () {
      unFocus()
  }
}

function renderNewImage() {
  // Clear canvas.
  push();
  background(255);
  strokeWeight(12);
  stroke(100);
  rect(0, 0, displayedImageSize * 1.299, displayedImageSize * 1.199 ,10);
  pop();
  // Generate new image.
  document.getElementById("img").src = imageSources[Math.floor(random(numOfImages))];
  select('#revealImage').style('visibility', 'hidden');
  mouseDraggedCount = 0;
}

function revealImage() {
  push();
  background(20);
  pop();
}
