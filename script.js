import Deck from './deck.js';
import { Card } from './deck.js';

const startButton = document.querySelector('.start-button');
const computerDeck = document.querySelector('.computer-deck');
const playerDeck = document.querySelector('.player-Deck');
const playedCards = document.querySelector('.played-cards');

let computerCards = [];
let playerCards = [];
let otherCards = [];

let stop, inRound;

startButton.addEventListener('click', () => {
  if (stop) {
    gameStart();
    return;
  }
  console.log(inRound);
  if (inRound) {
    cleanBeforeRound();
  } else {
    playerFlipCard();
    setTimeout(() => {
      computerFlipCard() 
    }, 1000)
  }
});

gameStart();
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

  inRound = false;
  stop = false;
}

function cleanBeforeRound() {
  inRound = false;
  otherCards = [];

  updateDeckCount();
}

function playerFlipCard() {
  // const computerCard = computerCards.pop();
  const playerCard = playerCards.pop();
  otherCards.push(playerCard)

  if (otherCards.length > 0) {
    showPlayedCards(otherCards);
  }
}

function computerFlipCard() {
  // const computerCard = computerCards.pop();
  const computerCard = computerCards.pop();
  otherCards.push(computerCard);

  if (otherCards.length > 0) {
    showPlayedCards(otherCards);
  }
}


function showPlayedCards(cards) {
  playedCards.innerHTML = '';
  return cards.map((card) => {
    console.log(card);
    playedCards.appendChild(card.getHTML())
  });
}

console.log(computerCards, playerCards, otherCards);
