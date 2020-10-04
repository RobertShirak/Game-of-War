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
