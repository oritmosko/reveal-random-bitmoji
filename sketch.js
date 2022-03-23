const numOfImages = 32;
let imageSources = [];
let nextImageIndex = 0;
let imageSize = 512; // Images are 512 pixels

let mouseDraggedEnough = 50;
let mouseDraggedCount = 0;

let canvas;
let chosenImage;
let imageGraphics;

let imgEl;
let revealImageButton;

let scaleImg;
let displayedImageSize;

function setup() {
	// Disable elemnts selection.
	disableElementsSelection();

	imgEl = document.getElementById("img");
	revealImageButton = select('#revealImage');

	// Keep image names.
	for (let i = 1; i <= numOfImages; i++) {
		imageSources.push(`assets/${i}.webp`);
	}
	// Randomize elements in images array to avoid displaying the same image twice.
	shuffle(imageSources, true);

	// Setup canvas over image.
	let scaleImg = 1;
	let heightLeft = displayHeight - document.getElementById("revealImage").offsetTop - document.getElementById("revealImage").offsetHeight;
	if (displayWidth <= imageSize || heightLeft <= imageSize) {
		scaleImg = 0.6;
	}
	let canvasOffsetTop = document.getElementById('img').offsetTop - 16;

	displayedImageSize = Math.min(Math.min(displayWidth, heightLeft), imageSize) * scaleImg;
	document.getElementById("img").height = displayedImageSize;
	document.getElementById("img").width = displayedImageSize;

	canvas = createCanvas(displayedImageSize * 1.3, displayedImageSize + 20);
	canvas.position(0, canvasOffsetTop);
	canvas.center('horizontal');

	renderNewImage();

	// Setup buttons.
	select('#renderNew').mousePressed(renderNewImage);
	revealImageButton.mousePressed(revealImage);
}

function draw() {
	if (mouseIsPressed) {
		strokeWeight(30);
		line(pmouseX, pmouseY, mouseX, mouseY);
		if (mouseDraggedCount++ > mouseDraggedEnough) {
			revealImageButton.style('visibility', 'visible');
		}
	}
}

function disableElementsSelection() {
	disableElementSelection('revealImage');
	disableElementSelection('renderNew');
	disableElementSelection('header');
	disableElementSelection('imgDiv');
}

function disableElementSelection(el) {
	let unFocus = () => {
		if (document.selection) {
			document.selection.empty()
		} else {
			window.getSelection().removeAllRanges()
		}
	}
	document.getElementById(el).onmousemove = function () {
		unFocus()
	}
	document.getElementById(el).onmouseup = function () {
		unFocus()
	}
}

function renderNewImage() {
	mouseDraggedCount = 0;

	// Generate new image.
	if (nextImageIndex == numOfImages) {
		shuffle(imageSources);
		nextImageIndex = 0;
	} else {
		nextImageIndex++;
	}

	// Clear canvas.
	push();
	background(255);
	imgEl.src = imageSources[nextImageIndex];
	revealImageButton.style('visibility', 'hidden');
	pop();
}

function revealImage() {
	push();
	background(20);
	pop();
}
