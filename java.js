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

