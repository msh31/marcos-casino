// our image
let hawk;

// preload runs before everything else
function preload()
{
	hawk = loadImage('/assets/hawk.png');
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

	image(hawk, 200, 200);
}
