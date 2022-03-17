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
const roundResult = document.querySelector('.round-result');
// const playerRound = document.querySelector('.player-round');

let computingTime = randTimeGenerator(); 

// Flipped Cards
let flippedPlayerCard, flippedComputerCard;

let computerCards = [];
let playerCards = [];
let otherCards = [];
let updatedComputerDeck, updatedPlayerDeck;
let slap = false;
let isGameOver = false;
let inRound = false;
let turn = false;


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
      updatedPlayerDeck = new Deck(playerCards);
      updatedPlayerDeck.shuffle();
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
  clearDeckOnDOM();
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
  // clear middle deck
  console.log(otherCards);

  // clean the round when player or computer wins the round
  // gameStart();
  // computingTime = randTimeGenerator();
  if (inRound) {
    // cleanBeforeRound();
    // setTimeout(() => {
    //   computerFlipCard();
    // }, computingTime - 10);
  } else {
    setTimeout(() => {
      computerFlipCard();
    }, computingTime - 10);

    playerFlipCard();
  }

  // console.log(flippedComputerCard, flippedPlayerCard);
  // if (flippedComputerCard !== undefined || flippedPlayerCard !== undefined) {
  //   if (flippedComputerCard.value === 'J') {
  //     console.log(flippedComputerCard);
  //   } else if (flippedPlayerCard.value === 'J') {
  //     console.log(flippedPlayerCard);
  //   }
  // }

  // if updatedComputerDeck's cards length === 52 then show who wins the match
  if (updatedComputerDeck !== undefined) {
    setTimeout(() => {
      displayNumberOfCards();
    }, computingTime + 1);
    //  displayNumberOfCards();
    // if (updatedComputerDeck.cards.length >= 52) {
    // }
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
        return;
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

  restart();

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
  if (updatedComputerDeck || updatedPlayerDeck) {
    gameOver();
  }
  if (updatedComputerDeck) {
    computerDeckNumber.innerHTML = `Computer: ${computerCards.length}`;
  } else {
    computerDeckNumber.innerHTML = `Computer: ${computerCards.length}`;
  }

  if (updatedPlayerDeck) {
    playerDeckNumber.innerHTML = `Player: ${updatedPlayerDeck.cards.length}`;
  } else {
    playerDeckNumber.innerHTML = `Player: ${playerCards.length}`;
  }

  // playedCardsNumber.style.visibility = 'visible';
  playedCardsNumber.innerHTML = otherCards.length;
}

function playerFlipCard() {
  flippedPlayerCard = playerCards.pop();
  console.log(flippedPlayerCard);

  // setTimout(() => {
  //   if (playerCard.value === 'J') {
  //     if (!slap) {
  //       alert('Computer slapped first');
  //     } else {
  //       alert('You slapped first!!!');
  //     }
  //     collectCards(card);
  //   }
  // }, 1000);

  otherCards.push(flippedPlayerCard);

  if (otherCards.length > 0) {
    showPlayedCards(otherCards);
  }
}

// computer flip the cards
function computerFlipCard() {
  flippedComputerCard = computerCards.pop();
  console.log(flippedComputerCard);
  setTimeout(() => {
    if (flippedComputerCard.value === 'J') {
      // if (!slap) {
      //   alert('Computer slapped first');
      // } else {
      //   alert('You slapped first!!!');
      // }
      otherCards.push(flippedComputerCard);
    }
  }, computingTime - 1);

  // setTimeout(() => {
  //   if (computerCard.value === 'J') {
  //     if (!slap) {
  //       alert('Computer slapped first');
  //     } else {
  //       alert('You slapped first!!!');
  //     }
  //     collectCards(card);
  //   }
  // },1000);

  otherCards.push(flippedComputerCard);

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

function clearDeckOnDOM() {
  if (otherCards.length === 0) playedCards.innerHTML = '';
}

function gameOver() {
  if (updatedPlayerDeck.cards.length <= 0) {
    roundResult.innerHTML = 'Computer won this round';
    isGameOver = true;
  } else if (updatedComputerDeck.cards.length <= 0) {
    roundResult.innerHTML = 'You won this round !!';
    isGameOver = true;
  }
}

function restart() {
  if (isGameOver) {
    playerDeckNumber.innerHTML = '';
    computerDeckNumber.innerHTML = '';
  }
}

function randTimeGenerator() {
  return Math.floor(Math.abs(Math.random() * 1000 + 300));
}
