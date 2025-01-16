import {UI} from './uimgr.js'
class BlackjackGame {
    constructor() {
        this.suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        this.values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

        this.deck = [];
        this.playerHand = [];
        this.dealerHand = [];

        this.currentBet = 0;
        this.balance = 500;
        this.gameState = 'betting'; // betting, playing, dealer-turn, game-over

        document.addEventListener('DOMContentLoaded', () => {
            this.ui = new UI();
            this.ui.updateGameState('betting');
            this.setupEventListeners();
        });
    }

    setupEventListeners() {
        document.getElementById('place-bet-btn')?.addEventListener('click', () => this.placeBet());

        document.getElementById('hit-btn')?.addEventListener('click', () => this.hit());
        document.getElementById('stand-btn')?.addEventListener('click', () => this.stand());
    }

    initializeGame() {
        this.deck = [];
        this.playerHand = [];
        this.dealerHand = [];

        // create deck
        for (let suit of this.suits) {
            for (let value of this.values) {
                this.deck.push({suit, value});
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
        this.playerHand.push(this.deck.pop());
        this.dealerHand.push(this.deck.pop());
        this.playerHand.push(this.deck.pop());
        this.dealerHand.push(this.deck.pop());

        this.ui.drawCards(this.playerHand, this.dealerHand, true);
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

export {BlackjackGame};