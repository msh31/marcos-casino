// our image
let ufo;

// preload runs before everything else
function preload()
{
	ufo = loadImage('/assets/ufo.png');
}

// setup runs once at the start
function setup()
{
	createCanvas(1280, 720);
}

// draw runs every frame
function draw()
{
	background(200, 200, 255);

	image(ufo, 300, 200);
}
