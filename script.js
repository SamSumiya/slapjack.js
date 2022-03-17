import Deck from './deck.js';
import { Card } from './deck.js';

const playedCardsTitle = document.querySelector('.played-Cards-title');
const playedCardsNumber = document.querySelector('.played-cards-number');
const playButton = document.querySelector('.play-button');
const startButton = document.querySelector('.start-button');
const computerDeck = document.querySelector('.computer-deck');
const computerDeckNumber = document.querySelector('.computer-deck-number');
const playerDeck = document.querySelector('.player-Deck');
const playerDeckNumber = document.querySelector('.player-deck-number');
const playedCards = document.querySelector('.played-cards');
// const playerRound = document.querySelector('.player-round');

let computerCards = [];
let playerCards = [];
let otherCards = [];
let updatedComputerDeck, updatedPlayerDeck;
let slap = false;
let isGameOver, inRound;
let computingTime;

// Initial Control of css status
playButton.style.visibility = 'hidden';
playedCardsNumber.style.visibility = 'hidden';
playedCardsTitle.style.visibility = 'hidden';

// inital background image setup
document.body.style.backgroundImage = "url('./images/img.png')";
document.body.style.objectFit = 'fill';
document.body.style.backgroundRepeat = 'repeat';

// change the state of slap from false to true if player slaps
function playerSlap() {
  slap = true;
  return;
}

// slap using space when J appears!!
document.addEventListener('keydown', () => {
  playerSlap();
});

// collect cards when one wins the round
function collectCards() {
  // computer slaps before the player, it gets all the played cards and will be stored in the updatedComputerDeck
  if (!slap) {
    setTimeout(() => {
      computerCards = computerCards.concat(otherCards);
      clearOtherCards();
      // create a new deck of computer deck and shuffle it for computer
      updatedComputerDeck = new Deck(computerCards);
      updatedComputerDeck.shuffle();
      // computerCards.innerHTML = updatedComputerDeck.cards.length;
    }, 999);
  } else {
    // player slap first and gets the card in updatedPlayerDeck
    playerCards = playerCards.concat(otherCards);
    clearOtherCards();
    // create a new deck of computer deck and shuffle it for player
    updatedPlayerDeck = new Deck(playerCards);
    updatedPlayerDeck.shuffle();
  }
  // reset slap back to false
  slap = false;
}

// store the played cards in other cards array
function clearOtherCards() {
  otherCards = [];
}

// dynamically change number of computer cards and player cards to be displayed on the screen
setInterval(() => {
  displayNumberOfCards();
}, 200);

// start button
startButton.addEventListener('click', () => {
  gameStart();
  // working with initial game setup by using css visibility
  document.body.style.backgroundImage = 'none';
  playButton.style.visibility = 'visible';
  playedCardsNumber.style.visibility = 'visible';
  playedCardsTitle.style.visibility = 'visible';
  startButton.style.visibility = 'hidden';
  // start();
});

// play button to start and continue the game
playButton.addEventListener('click', () => {
  // clean the round when player or computer wins the round
  // gameStart();
  computingTime = randTimeGenerator();
  console.log(computingTime);
  if (inRound) {
    // cleanBeforeRound();
  } else {
    playerFlipCard();
    setTimeout(() => {
      computerFlipCard();
    }, computingTime);
  }

  // if updatedComputerDeck's cards length === 52 then show who wins the match
  if (updatedComputerDeck !== undefined) {
    console.log(updatedComputerDeck);
    console.log(computingTime);

    setTimeout(() => {
      displayNumberOfCards();
    }, computingTime + 1);
    //  displayNumberOfCards();
    if (updatedComputerDeck.cards.length >= 52) {
      console.log('Computer wins');
    }
  }

  // this setTimeout checks if there is a J in the otherCards or not.
  setTimeout(() => {
    // need to end the game before it exceeds 52 cards
    otherCards.forEach((card) => {
      if (card.value === 'J') {
        if (!slap) {
          alert('Computer slapped first');
        } else {
          alert('You slapped first!!!');
        }
        collectCards(card);
      }
    });
  }, 802);

  // display the number of the cards
  displayNumberOfCards();
});

function gameStart() {
  // Change default css
  playedCardsNumber.style.visibility = 'visible';

  computerDeck.style.visibility = 'visible';
  playerDeck.style.visibility = 'visible';
  // create a deck of ordered deck
  const deck = new Deck();
  // create an unorderded deck of card by shuffling it
  deck.shuffle();
  // distrubute each card to computer and player by the deck index
  // even goes to computer and odd goes to player
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
  isGameOver = false;
}

// display number of Card computer and player has
function displayNumberOfCards() {
  console.log(updatedComputerDeck);
  if (updatedComputerDeck) {
    computerDeckNumber.innerHTML = `Computer: ${computerCards.length}`;
  } else {
    computerDeckNumber.innerHTML = `Computer: ${computerCards.length}`;
  }

  if (updatedPlayerDeck) {
    console.log(updatedPlayerDeck.cards.length);
    playerDeckNumber.innerHTML = `Player: ${updatedPlayerDeck.cards.length}`;
  } else {
    playerDeckNumber.innerHTML = `Player: ${playerCards.length}`;
  }

  // playedCardsNumber.style.visibility = 'visible';
  playedCardsNumber.innerHTML = otherCards.length;
}

// function cleanBeforeRound() {
//   inRound = false;
//   otherCards = [];

//   updateDeckCount();
// }

// player flip the cards

function playerFlipCard() {
  const playerCard = playerCards.pop();
  otherCards.push(playerCard);

  if (otherCards.length > 0) {
    showPlayedCards(otherCards);
  }
}

// computer flip the cards
function computerFlipCard() {
  const computerCard = computerCards.pop();
  otherCards.push(computerCard);

  if (otherCards.length > 0) {
    showPlayedCards(otherCards);
  }
}

function showPlayedCards(cards) {
  playedCards.innerHTML = '';
  return cards.map((card) => {
    if (card !== undefined) {
      playedCards.appendChild(card.getHTML());
    }
  });
}

function gameOver() {
  if (updatedComputerDeck !== undefined)
    if (updatedComputerDeck.cards.length === 0) {
      computerDeck.innerHTML = 'You lose...';
    } else if (updatedComputerDeck.cards.length === 0) {
      playerDeck.innerHTML = 'You win!!!';
    }
}

function randTimeGenerator() {
  return Math.floor(Math.abs(Math.random() * 1000 - Math.random() * 800));
}
