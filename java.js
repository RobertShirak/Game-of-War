// create Cards and Player class
class Card {
    constructor(suit, rank, value) {
        this.suit = suit
        this.rank = rank
        this.value = value
    }
}

class Player {
    constructor(name) {
        this.name = name
        this.hand = []
        this.cardInPlay = []
    }
}


// create Deck and shuffle

class Deck {
    constructor () {
        this.suit = ["Diamonds","Hearts", "Clubs", "Spades"]
        this.rank = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King", "Ace"]
        this.value = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
        this.cards = []
        this.length = 52
        for (let i = 0; i < this.suit.length; i++) {
            for (let j = 0; j < this.rank.length; j++) {
                let card = new Card(this.suit[i], this.rank[j], this.value[j])
                this.cards.push(card)
            }
        }   
    }
    //// fisher-yates shuffle 
    shuffle = () => {
        for (let i = this.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let shuffled = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = shuffled;
        }    
    }
}


// create game class and logic to make the game work

// deal
// start the first round (start so they can keep track of rounds)
// played cards
/// keep track of played cards
/// collect cards
/// compare cards
/// check if someone has 0 cards or not // if someone does not have enough cards for war the opposite player wins
/// create war stipulation 





class Game { 
    constructor() {
        this.round = 0
        this.warCards = []
        this.twoPlayers = [new Player ("Player 1"), new Player ("Player 2")]
        this.deck = new Deck ()
        this.deck.shuffle();
    } 
    dealCards() {    
        for (let i = 0; i < this.deck.length; i++) {
            if (i % 2 === 0) {
                this.twoPlayers[0].hand.unshift(this.deck.cards[i])
            } else {
                this.twoPlayers[1].hand.unshift(this.deck.cards[i])
            }
        }
        this.deck = []
        this.startRound()
    }
    startRound() {
        this.round += 1;
        this.playedCards();
    }
    playedCards() {
        this.twoPlayers[0].cardInPlay.unshift(this.twoPlayers[0].hand[0]);
        this.twoPlayers[0].hand.shift();
        this.twoPlayers[1].cardInPlay.unshift(this.twoPlayers[1].hand[0]);
        this.twoPlayers[1].hand.shift();
        console.log(`${this.twoPlayers[0].name} Played: ${this.twoPlayers[0].cardInPlay[0].rank} of ${this.twoPlayers[0].cardInPlay[0].suit} | ${this.twoPlayers[1].name} Played: ${this.twoPlayers[1].cardInPlay[0].rank} of ${this.twoPlayers[1].cardInPlay[0].suit}`)
        this.compareCards();
    }
    collectCards(r,s) {
        this.twoPlayers[r].hand.push(...this.warCards);
        this.twoPlayers[r].hand.push(...this.twoPlayers[r].cardInPlay, ...this.twoPlayers[s].cardInPlay);
        this.twoPlayers[r].cardInPlay = []
        this.twoPlayers[s].cardInPlay = []
        this.warCards = [];
        console.log(`${this.twoPlayers[r].name} Wins Round ${this.round}! |   ${this.twoPlayers[r].name} Has: ${this.twoPlayers[r].hand.length} Cards  |   ${this.twoPlayers[s].name} Has: ${this.twoPlayers[s].hand.length} Cards`)
        this.checkGame()
    }
    compareCards() {
        if (this.twoPlayers[0].cardInPlay[0].value > this.twoPlayers[1].cardInPlay[0].value) {
            this.collectCards(0,1);
        } else if (this.twoPlayers[0].cardInPlay[0].value < this.twoPlayers[1].cardInPlay[0].value) {
            this.collectCards(1,0)
        } else {
            if (this.twoPlayers[0].hand.length === 0) {
                this.winnerMessage(this.twoPlayers[1].name)
            } else if (this.twoPlayers[1].hand.length === 0) {
                this.winnerMessage(this.twoPlayers[0].name)
            } else {
            this.startWar();
        }
    }
}
    
    checkGame() {
        if (this.twoPlayers[0].hand.length === 0) {
            this.winnerMessage(this.twoPlayers[1].name)
        } else if (this.twoPlayers[1].hand.length === 0) {
            this.winnerMessage(this.twoPlayers[0].name)
        } else {
            this.startRound();
        }
    }

    winnerMessage(winner) {
        console.log(`CONGRATS! ${winner} YOU WON! in ${this.round} Rounds!`)
    }

    startWar() {
            for (let i = 0; i < 3; i++) {
                if (i >= this.twoPlayers[0].hand.length - 1){
                } else{
                    this.warCards.unshift(this.twoPlayers[0].hand[0]);
                    this.twoPlayers[0].hand.shift()
                }
            }   
            for (let i = 0; i < 3; i++) {
                if (i >= this.twoPlayers[1].hand.length - 1){
                } else{
                    this.warCards.unshift(this.twoPlayers[1].hand[0]);
                    this.twoPlayers[1].hand.shift()
                }
            }
            console.log("WAR!");
            this.playedCards();
        }
}


/// call on game class for new game with the help of deal cards function
let newGame = new Game()
newGame.dealCards();
