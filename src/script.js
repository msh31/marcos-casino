class BlackjackGame {
    constructor() {
        this.deck = [];
        this.playerHand = [];
        this.dealerHand = [];
        this.currentBet = 0;
        this.balance = 500;
        this.gameState = 'betting'; // betting, playing, dealer-turn, game-over

        this.suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        this.values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

        this.ui = new UI();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // TODO: Add event listeners for all buttons
        // Betting buttons, deal button, hit/stand/double buttons
    }

    initializeGame() {
        this.deck = [];
        this.playerHand = [];
        this.dealerHand = [];

        // create deck
        for (let suit of this.suits) {
            for (let value of this.values) {
                this.deck.push({ suit, value });
            }
        }

        // shuffle deck
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    placeBet(amount) {
        // TODO: Handle betting logic
    }

    dealInitialCards() {
        // TODO: Deal 2 cards to player and dealer (1 face up, 1 face down for dealer)
    }

    hit() {
        // TODO: Add card to player's hand and check for bust
    }

    stand() {
        // TODO: Start dealer's turn
    }

    dealerTurn() {
        this.ui.drawCards(this.playerHand, this.dealerHand, false);

        // Dealer must hit on 16 and stand on 17
        while (this.calculateScore(this.dealerHand) < 17) {
            this.dealerHand.push(this.deck.pop());
            this.ui.drawCards(this.playerHand, this.dealerHand, false);
        }

        this.determineWinner();

    }

    double() {
        // TODO: Double bet, deal one card, then dealer's turn
    }

    checkForBlackjack() {
        // TODO: Check for natural blackjack
    }

    determineWinner() {
        // TODO: Compare hands and determine winner
    }

    updateBalance(amount) {
        // TODO: Update player's balance and UI
    }

    endGame(result) {
        // TODO: Handle end game state and show result message
    }
//     HELPER FUNCTIONS
    calculateScore(hand) {
        let score = 0;
        let aces = 0;

        for (let card of hand) {
            if (card.value === 'A') {
                aces++;
            } else if (['K', 'Q', 'J'].includes(card.value)) {
                score += 10;
            } else {
                score += parseInt(card.value);
            }
        }

        // handle ace cards (ace = 1 if total score is more than 21)
        for (let i = 0; i < aces; i++) {
            if (score + 11 <= 21) {
                score += 11;
            } else {
                score += 1;
            }
        }

        return score;
    }

}

class UI {
    constructor() {
        this.dealerCards = document.querySelector('.dealer-cards');
        this.playerCards = document.querySelector('.player-cards');
        this.dealerScore = document.getElementById('dealer-score');
        this.playerScore = document.getElementById('player-score');
        this.balance = document.getElementById('balance');
        this.bettingControls = document.getElementById('betting-controls');
        this.gameControls = document.getElementById('game-controls');
        this.resultMessage = document.getElementById('result-message');

        this.betSlider = document.getElementById('bet-slider');
        this.currentBet = document.getElementById('current-bet');
        this.placeBetBtn = document.getElementById('place-bet-btn');
        this.maxBet = document.getElementById('max-bet');
        this.initializeBetSlider();
    }

    initializeBetSlider() {
        this.betSlider.max = this.balance.textContent;
        this.maxBet.textContent = this.balance.textContent;

        this.betSlider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            this.currentBet.textContent = `€${value}`;

            if (value === parseInt(this.betSlider.max)) {
                this.placeBetBtn.textContent = 'ALL IN';
            } else {
                this.placeBetBtn.textContent = 'Place Bet';
            }
        });

        this.currentBet.textContent = `€${this.betSlider.value}`;
    }

    convertValueToFileName(value) {
        const valueMap = {
            'A': 'A',
            'K': 'K',
            'Q': 'Q',
            'J': 'J',
            '10': '10',
            '9': '09',
            '8': '08',
            '7': '07',
            '6': '06',
            '5': '05',
            '4': '04',
            '3': '03',
            '2': '02'
        };
        return valueMap[value] || value;
    }

    createCard(card) {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.style.cssText = `
            width: 120px;
            height: 174px;
            display: inline-block;
            margin: 5px;
        `;

        const suitName = card.suit.toLowerCase();
        const valueName = this.convertValueToFileName(card.value);

        const cardImage = document.createElement('img');
        cardImage.src = `img/cards/card_${suitName}_${valueName}.png`;
        cardImage.alt = `${card.value} of ${card.suit}`;
        cardImage.style.width = '100%';
        cardImage.style.height = '75%';

        cardElement.appendChild(cardImage);
        return cardElement;
    }

    drawCards(playerCards, dealerCards, hideDealer = false) {
        this.dealerCards.innerHTML = '';
        this.playerCards.innerHTML = '';
        
        playerCards.forEach(card => {
            const cardElement = this.createCard(card);
            this.playerCards.appendChild(cardElement);
        });
        
        dealerCards.forEach((card, index) => {
            if (hideDealer && index === 1) {
                // Create face-down card for dealer's hidden card
                const cardBack = document.createElement('div');
                cardBack.className = 'card';
                cardBack.style.cssText = `
                width: 120px;
                height: 174px;
                display: inline-block;
                margin: 5px;`;
                
                const cardImage = document.createElement('img');
                cardImage.src = 'img/cards/card_back.png';
                cardImage.alt = 'Card back';
                cardImage.style.width = '100%';
                cardImage.style.height = '75%';
                cardBack.appendChild(cardImage);
                this.dealerCards.appendChild(cardBack);
            } else {
                const cardElement = this.createCard(card);
                this.dealerCards.appendChild(cardElement);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new BlackjackGame();

    //game.initializeGame();
    //game.dealInitialCards();
});