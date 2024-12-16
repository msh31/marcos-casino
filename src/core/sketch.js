let backgroundImage;
let dealer_1, dealer_2;
let cardImages = {}; //object to store key-value pairs (e.g., card category (suit) and card values), unlike an array which holds ordered lists.
let balance = 500;

let positionX = 1280;
let positionY = 0;

let positionXd = 1280;
let positionYd = 0;

let targetX = 550;
let targetY = 450;

let dTargetX = 550;
let dTargetY = 150;

let speed = 0.05;

let randomCard;
let randomCardTwo;

let playerTotal = 0;
let dealerTotal = 0;

// preload runs before everything else
function preload() {
	backgroundImage = loadImage("/assets/home_bg.webp");
	dealer_1 = loadImage("/assets/dealer_1.png");

	const suits = ['clubs', 'diamonds', 'hearts', 'spades']; //category of cards
	const values = ['A', '02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K']; // card values

	for (let suit of suits) {
		cardImages[suit] = {}; // nested object for each suit
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

	// pick random cards to deal to player
	randomCard = getRandomCard();
	randomCardTwo = getRandomCard();
	randomDealerCard = getRandomCard();
	randomDealerCardTwo = getRandomCard();

	playerTotal = calculateTotal([randomCard, randomCardTwo]);
    dealerTotal = calculateTotal([randomDealerCard, randomDealerCardTwo]);

	checkWinner();
}

// draw runs every frame
function draw() {
	background(46, 84, 41);

//CARD DEALING ANIMATION
	// calculate difference between current and target position
	let distanceX = targetX - positionX;
	let distanceY = targetY - positionY;

	// slowly move towards the target position using the 0.05 speed
	positionX += distanceX * speed;
	positionY += distanceY * speed;

	// draw random cards at current position
	image(randomCard.image, positionX, positionY, 96, 96);
	image(randomCardTwo.image, positionX + 20, positionY + 20, 96, 96); // Offset second card slightly

	// calculate difference between current and target position
	let distanceXd = dTargetX - positionXd;
	let distanceYd = dTargetY - positionYd;

	// slowly move towards the target position using the 0.05 speed
	positionXd += distanceXd * speed;
	positionYd += distanceYd * speed;

	// draw random cards at current position
	image(randomDealerCard.image, positionXd, positionYd, 96, 96);
	image(randomDealerCardTwo.image, positionXd + 20, positionYd + 20, 96, 96); // Offset second card slightly

//DRAWING THE UI
	fill(255)
	text('Balance: $' + balance, 50, 50);
	text('player: ' + playerTotal, 350, 550);
	text('dealer: ' + dealerTotal, 350, 250);
	image(dealer_1, 1025, 25, 224, 224)
	fill(51);
	noStroke(); //border
	rect(0, 600, 1280, 120);
}

// FUNCTIONS
function addMoney(amount) {
	balance += amount;
	return balance;
}

function getRandomCard() {
    let suits = Object.keys(cardImages);
    let randomSuit = suits[Math.floor(Math.random() * suits.length)];

    let cardValues = Object.keys(cardImages[randomSuit]);
    let randomValue = cardValues[Math.floor(Math.random() * cardValues.length)];

    // return cardimage with random suit and value
    return {
        suit: randomSuit,
        value: randomValue,
        image: cardImages[randomSuit][randomValue]
    };
}

function getCardValue(card) {
    if (card.value === 'A') {
        return 11; // ace can be 11 or 1, we'll start with 11
    } else if (['K', 'Q', 'J'].includes(card.value)) {
        return 10; // face cards are worth 10
    } else {
        return parseInt(card.value); // numbered cards are worth their number
    }
}

// adds up all the cards and handles if aces should be 1 or 11
function calculateTotal(cards) {
    let total = 0;
    let aces = 0;

    // calculate total
    for (let card of cards) {
        let value = getCardValue(card);
        if (value === 11) aces += 1;
        total += value;
    }

    // If we're over 21 and have aces, turn them into 1s instead of 11s
    while (total > 21 && aces > 0) {
        total -= 10; // Convert an ace from 11 to 1
        aces -= 1;
    }

    return total;
}

function checkWinner() {
    if (playerTotal > 21) {
        console.log("Bust! House wins!");
        return;
    }
    
    if (dealerTotal > 21) {
        console.log("Dealer bust! You win!");
        return;
    }
    
    // If nobody busts, higher number wins
    if (playerTotal > dealerTotal) {
        console.log("You win with " + playerTotal + " against dealer's " + dealerTotal + "!");
    } else if (dealerTotal > playerTotal) {
        console.log("Dealer wins with " + dealerTotal + " against your " + playerTotal + "!");
    } else {
        console.log("It's a tie! You both have " + playerTotal);
    }
}