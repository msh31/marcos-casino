class UI {
    constructor() {
        this.elements = {
            dealerCards: document.querySelector('.dealer-cards'),
            playerCards: document.querySelector('.player-cards'),
            dealerScore: document.getElementById('dealer-score'),
            playerScore: document.getElementById('player-score'),
            balance: document.getElementById('balance'),
            betSlider: document.getElementById('bet-slider'),
            currentBet: document.getElementById('current-bet'),
            placeBetBtn: document.getElementById('place-bet-btn'),
            maxBet: document.getElementById('max-bet'),
            bettingControls: document.getElementById('betting-controls'),
            gameControls: document.getElementById('game-controls'),
            resultMessage: document.getElementById('result-message'),
            hitBtn: document.getElementById('hit-btn'),
            standBtn: document.getElementById('stand-btn')
        }

        this.initializeBetSlider()
        this.updateGameState('betting')
    }

    updateGameState(state) {
        if(state === 'betting') {
            this.elements.bettingControls.classList.remove('hidden');
            this.elements.gameControls.classList.add('hidden');
            this.elements.resultMessage.classList.add('hidden');
        } else {
            this.elements.bettingControls.classList.add('hidden');
            this.elements.gameControls.classList.remove('hidden');
        }
    }

    initializeBetSlider() {
        this.elements.betSlider.max = this.elements.balance.textContent
        this.elements.maxBet.textContent = this.elements.balance.textContent

        this.elements.betSlider.oninput = (e) => {
            let value = parseInt(e.target.value)
            this.elements.currentBet.textContent = `€${value}`

            if(value === parseInt(this.elements.betSlider.max)) {
                this.elements.placeBetBtn.textContent = 'ALL IN'
            } else {
                this.elements.placeBetBtn.textContent = 'Place Bet'
            }
        }

        this.elements.currentBet.textContent = `€${this.elements.betSlider.value}`
    }

    convertValueToFileName(value) {
        if(['2','3','4','5','6','7','8','9'].includes(value)) {
            return '0' + value
        }
        return value
    }

    updateScores(playerScore, dealerScore) {
        this.elements.playerScore.textContent = playerScore
        this.elements.dealerScore.textContent = dealerScore
    }

    createCard(card) {
        let cardElement = document.createElement('div')
        cardElement.className = 'card'
        cardElement.style = 'width: 120px; height: 174px; display: inline-block; margin: 5px;'

        let cardImage = document.createElement('img')
        let suitName = card.suit.toLowerCase()
        let valueName = this.convertValueToFileName(card.value)

        cardImage.src = `img/cards/card_${suitName}_${valueName}.png`
        cardImage.alt = `${card.value} of ${card.suit}`
        cardImage.style = 'width: 100%; height: 75%;'

        cardElement.appendChild(cardImage)
        return cardElement
    }

    updateBalance(amount) {
        this.elements.balance.textContent = amount
        this.elements.betSlider.max = amount
        this.elements.maxBet.textContent = amount
    }

    drawCards(playerCards, dealerCards, hideDealer = false) {
        this.elements.dealerCards.innerHTML = ''
        this.elements.playerCards.innerHTML = ''

        playerCards.forEach(card => {
            let cardElement = this.createCard(card)
            this.elements.playerCards.appendChild(cardElement)
        })

        dealerCards.forEach((card, index) => {
            if(hideDealer && index === 1) {
                let cardBack = document.createElement('div')
                cardBack.className = 'card'
                cardBack.style = 'width: 120px; height: 174px; display: inline-block; margin: 5px;'

                let cardImage = document.createElement('img')
                cardImage.src = 'img/cards/card_empty.png'
                cardImage.alt = 'Card back'
                cardImage.style = 'width: 100%; height: 75%;'

                cardBack.appendChild(cardImage)
                this.elements.dealerCards.appendChild(cardBack)
            } else {
                let cardElement = this.createCard(card)
                this.elements.dealerCards.appendChild(cardElement)
            }
        })
    }

    clearTable() {
        this.elements.dealerCards.innerHTML = '';
        this.elements.playerCards.innerHTML = '';
        this.elements.dealerScore.textContent = '0';
        this.elements.playerScore.textContent = '0';

        this.elements.hitBtn.disabled = false;
        this.elements.standBtn.disabled = false;
        this.initializeBetSlider();
    }
}

export {UI}