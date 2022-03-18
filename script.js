import Deck from './deck.js';
import { Card } from './deck.js';

// Get HTML elements
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

// Get Random Time for randTimeGenerator Function, so each round will have the same milli-seconds
let computingTime = randTimeGenerator();

// create global variables
let flippedPlayerCard, flippedComputerCard;
let computerCards = [];
let playerCards = [];
let otherCards = [];
let updatedComputerDeck, updatedPlayerDeck;
let slap = false;
let isGameOver = false;
let inRound = false;

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
      // updatedPlayerDeck = new Deck(playerCards);
      // updatedPlayerDeck.shuffle();

      // computerCards.innerHTML = updatedComputerDeck.cards.length;
    }, computingTime + 100);
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

// dynamically change number of computer, player cards and the palyed cards deck on the DOM
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
});

// play button to start and continue the game
playButton.addEventListener('click', () => {
  // restart CSS default settings
  playButton.innerHTML = 'Play';
  if (!isGameOver) {
    // check if the game is over or not
    setInterval(() => {
      if (playerCards.length === 0 || computerCards.length === 0) gameOver();
    }, 100);

    // player's turn to play the game
    // this functin changes the flippedPlayer card
    setTimeout(() => {
      playerFlipCard();
    }, 0);

    // computer's turn to play the game and waiting time is computingTime
    // this function only changes the flippedComputer card
    setTimeout(() => {
      computerFlipCard();
    }, computingTime);

    // check who wins by utilizing the function of displayNumberOfCards to track of the if it is game over or not..
    if (updatedComputerDeck !== undefined) {
      setTimeout(() => {
        displayNumberOfCards();
      }, computingTime - 25);
    }

    // this setTimeout checks if there is a J in the otherCards or not.
    setTimeout(() => {
      // need to end the game before it exceeds 52 cards
      otherCards.forEach((card) => {
        console.log(otherCards);
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
    }, computingTime - 20);

    // display the number of the cards
    displayNumberOfCards();
  } else {
    gameStart();
    isGameOver = false;
  }
});

function gameStart() {
  // Change default css
  playedCardsNumber.style.visibility = 'visible';
  computerDeck.style.visibility = 'visible';
  playerDeck.style.visibility = 'visible';

  // create a deck of ordered deck

  restart();

  // create a new deck of cards
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
  if (updatedComputerDeck && updatedPlayerDeck) {
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
  // check if remaining player cards, if none, game over
  gameOver();
  flippedPlayerCard = playerCards.pop();
  otherCards.push(flippedPlayerCard);

  if (otherCards.length > 0) {
    showPlayedCards(otherCards);
  }
}

// computer flip the cards
function computerFlipCard() {
  setTimeout(() => {
    if (flippedComputerCard.value === 'J') {
      console.log(flippedComputerCard);
      if (!slap) {
        alert('Computer slapped first');
      } else {
        alert('You slapped first!!!');
      }
      collectCards(flippedComputerCard);
      return;
    } else {
      return;
    }
  }, computingTime + 100);
  flippedComputerCard = computerCards.pop();
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

// When reset the game, computer and player deck will be reset back to 26 cards
function resetDecks() {
  console.log(playerCards, updatedPlayerDeck, 'LOOKKKK AT MMMMEEEE!!');
  updatedPlayerDeck = null; 
  updatedComputerDeck = null
  computerCards = [];
  playerCards = [];
  otherCards = [];
  roundResult.innerHTML = '';
}

function clearDeckOnDOM() {
  if (otherCards.length === 0) playedCards.innerHTML = '';
}

function gameOver() {
  if (playerCards.length === 0) {
    roundResult.innerHTML = 'Computer won this round';
    isGameOver = true;
    playButton.innerHTML = 'Play Again';
  } else if (computerCards.length === 0) {
    roundResult.innerHTML = 'You won this round !!';
    isGameOver = true;
    playButton.innerHTML = 'Play Again';
  } else if (updatedPlayerDeck && updatedPlayerDeck.cards.length <= 0) {
    roundResult.innerHTML = 'Computer won this round';
    isGameOver = true;
    playButton.innerHTML = 'Play Again';
  } else if (updatedComputerDeck && updatedComputerDeck.cards.length <= 0) {
    roundResult.innerHTML = 'You won this round !!';
    isGameOver = true;
    playButton.innerHTML = 'Play Again';
  }
}

function restart() {
  if (isGameOver) {
    resetDecks();
    playerDeckNumber.innerHTML = '';
    computerDeckNumber.innerHTML = '';
  }
}

function randTimeGenerator() {
  return Math.floor(Math.abs(Math.random() * 900));
}
