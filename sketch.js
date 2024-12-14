let backgroundImage;
let cardImages = {};
let balance = 500;

let positionX = 500;
let positionY = 150;
let speedX = 10;
let speedY = 20;

// preload runs before everything else
function preload() {
	backgroundImage = loadImage("/assets/home_bg.webp");

    const suits = ['clubs', 'diamonds', 'hearts', 'spades']; //category of cards
    const values = ['A', '02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K']; // card values
    
    for (let suit of suits) {
        cardImages[suit] = {};  // nested object for each suit
        for (let value of values) {
            let filename = `/assets/cards/card_${suit}_${value}.png`;
            cardImages[suit][value] = loadImage(filename);
        }
    }
}

// setup runs once at the start
function setup() {
	var canvas = createCanvas(1280, 720);
	canvas.parent("game-window");

	textSize(32);

	xSpeed = random(-3, 3);
	ySpeed = random(-3, 3);
}

// draw runs every frame
function draw() {
	background(46, 84, 41);

	positionX = positionX * speedX - 1;
	positionY = positionY * speedY - 1;

	image(cardImages['clubs']['05'], positionX, positionY, 64, 64);
	image(cardImages['hearts']['Q'], positionX, positionY, 64, 64);
	// image(testCard, 500, 150, 64, 64);
	text('Balance: $' + balance, 50, 50);
	//img, posX, poxY, width, height
	// image(backgroundImage, 0, 0, 1280, 720);


}

// unused in final game
function addMoney(amount)
{
	balance += amount;
	return balance; 
}