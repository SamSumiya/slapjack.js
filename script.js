import Deck from './deck.js';
import { Card } from './deck.js';

const CARD_VALUE_MAP = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

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
      computerFlipCard();
    }, 800);
  }

  setTimeout(() => {
    otherCards.forEach((card) => {
      if (card.value === 'J') collectCards();
    });
  }, 802);
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
  otherCards.push(playerCard);

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
    playedCards.appendChild(card.getHTML());
  });
}

function collectCards() {
  console.log('slap');
}

console.log(computerCards, playerCards, otherCards);
