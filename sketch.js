// our image
let character, characterRotated, backgroundImage;

// preload runs before everything else
function preload() {
	character = loadImage("/assets/hawk.png");
	characterRotated = loadImage("/assets/hawk_rotated.png");
	backgroundImage = loadImage("/assets/game_bg.png");
}

// setup runs once at the start
function setup() {
	var canvas = createCanvas(1280, 720);
	canvas.parent("game-window");
}

// draw runs every frame
function draw() {
	// background(200, 200, 255);

	//img, posX, poxY, width, height
	image(backgroundImage, 0, 0, 1280, 720);
	image(character, 200, 200, 100, 100);
	image(characterRotated, 800, 200, 100, 100);
}
