import Deck from './deck.js';
import { Card } from './deck.js';

const startButton = document.querySelector('.start-button');
const computerDeck = document.querySelector('.computer-deck');
const playerDeck = document.querySelector('.player-Deck');
const middleGround = document.querySelector('.middle-ground');

let computerCards = [];
let playerCards = [];

let stop = true; 

startButton.addEventListener('click', () => {
  console.log(stop);
  if (stop) gameStart();

  
});
gameStart()
function gameStart() {
  const deck = new Deck();
  deck.shuffle();

  for (let i = 0; i < deck.cards.length; i++) {
    if (i % 2 === 0) {
      computerCards = [
        ...computerCards,
        new Card(deck.cards[i].suit, deck.cards[i].value),
      ];
    } else {
      playerCards = [
        ...playerCards,
        new Card(deck.cards[i].suit, deck.cards[i].value),
      ];
    }
  }
}



console.log(computerCards, playerCards);
