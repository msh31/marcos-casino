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

        this.ui = new UI();
        this.ui.updateBalance(this.balance);
        this.ui.updateGameState('betting');
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('place-bet-btn').addEventListener('click', () => this.placeBet());

        document.getElementById('hit-btn').addEventListener('click', () => this.hit());
        document.getElementById('stand-btn').addEventListener('click', () => this.stand());
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

    placeBet() {
        const betAmount = parseInt(this.ui.elements.betSlider.value);

        if (betAmount <= this.balance && betAmount > 0) {
            this.currentBet = betAmount;
            this.balance -= betAmount;

            this.updateBalance(this.balance);
            this.ui.updateGameState('playing');

            this.initializeGame();
            this.dealInitialCards();
        }
    }

    dealInitialCards() {
        this.playerHand.push(this.deck.pop());
        this.dealerHand.push(this.deck.pop());
        this.playerHand.push(this.deck.pop());
        this.dealerHand.push(this.deck.pop());

        this.ui.drawCards(this.playerHand, this.dealerHand, true);
        this.ui.updateScores(this.calculateScore(this.playerHand), this.calculateScore([this.dealerHand[0]]));

        this.checkForBlackjack();
    }

    hit() {
        this.playerHand.push(this.deck.pop());
        this.ui.drawCards(this.playerHand, this.dealerHand, true);

        const playerScore = this.calculateScore(this.playerHand);
        this.ui.updateScores(playerScore, this.calculateScore([this.dealerHand[0]]));

        if (playerScore > 21) {
            this.endGame('player-bust');
        }
    }

    stand() {
        if (this.gameState !== 'playing') return;

        this.gameState = 'dealer-turn';
        this.ui.elements.hitBtn.disabled = true;
        this.ui.elements.standBtn.disabled = true;
        this.ui.elements.doubleBtn.disabled = true;

        this.dealerTurn();
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
        if(this.calculateScore(this.playerHand) === 21) {
            this.endGame('blackjack');
        } else if (this.calculateScore(this.dealerHand) === 21) {
            this.endGame('dealer-blackjack');
        }
    }

    determineWinner() {
        // TODO: Compare hands and determine winner
    }

    updateBalance(amount) {
        this.balance = amount;
        this.ui.updateBalance(this.balance);
    }

    endGame(result) {
        const resultMessage = this.ui.elements.resultMessage;
        resultMessage.classList.remove('hidden');

        let message = '';
        switch (result) {
            case 'blackjack':
                message = 'Blackjack! You win 1.5x your bet!';
                const blackjackWinnings = this.currentBet + (this.currentBet * 1.5);
                this.balance += blackjackWinnings;
                break;
            case 'player-wins':
                message = 'You win!';
                this.balance += (this.currentBet * 2);
                break;
            case 'dealer-bust':
                message = 'Dealer busts! You win!';
                this.balance += (this.currentBet * 2);
                break;
            case 'push':
                message = 'Push! Bet returned.';
                this.balance += this.currentBet;
                break;
            case 'player-bust':
                message = 'Bust! You lose!';
                break;
            case 'dealer-wins':
                message = 'Dealer wins!';
                break;
            case 'dealer-blackjack':
                message = 'Dealer has Blackjack!';
                break;
        }

        resultMessage.querySelector('span').textContent = message;

        this.ui.updateBalance(this.balance);

        setTimeout(() => {
            resultMessage.classList.add('hidden');
            this.gameState = 'betting';
            this.ui.updateGameState('betting');
            this.currentBet = 0;
            this.ui.clearTable();
        }, 3000);
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

document.addEventListener('DOMContentLoaded', () => {
    new BlackjackGame();
});