// Importing the Deck and Card classes
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
let pause = false;

// Initial Control of css status
playButton.style.visibility = 'hidden';
playedCardsNumber.style.visibility = 'hidden';
playedCardsTitle.style.visibility = 'hidden';
playButton.style.color = 'rgba(138, 249, 2, 0.989)';
// inital background image setup
document.body.style.backgroundImage = "url('./images/img.png')";
document.body.style.objectFit = 'fill';
document.body.style.backgroundRepeat = 'repeat';

// slap using space when J appears!!
document.addEventListener('keydown', () => {
  playerSlap();
});

// change the state of slap from false to true if player slaps
function playerSlap() {
  slap = true;
  return;
}

// collect cards when one wins the round
function collectCards() {
  // computer slaps before the player, it gets all the played cards and will be stored in the updatedComputerDeck
  if (!slap) {
    setTimeout(() => {
      // populate computer cards with the played cards
      // player slap first and gets the card in updatedComputerDeck
      computerCards = computerCards.concat(otherCards);
      clearOtherCards();
      // create a new deck of computer deck and shuffle it for computer
      updatedComputerDeck = new Deck(computerCards);
      updatedComputerDeck.shuffle();
    }, computingTime + 100);
  } else {
    // populate player cards with the played cards
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

// clear the played cards array back to empty...
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
  // start the game...
  gameStart();

  // working with initial game setup by using css visibility
  document.body.style.backgroundImage = 'none';
  startButton.style.visibility = 'hidden';
  playButton.style.visibility = 'visible';
  playedCardsNumber.style.visibility = 'visible';
  playedCardsTitle.style.visibility = 'visible';
});

// play button to start and continue the game
playButton.addEventListener('click', () => {
  console.log(otherCards, updatedPlayerDeck, updatedComputerDeck);

  console.log(computerCards, playerCards);
  // restart CSS default settings
  playButton.innerHTML = 'Play';
  if (!isGameOver) {
    // check if the game is over or not
    setInterval(() => {
      if (playerCards.length === 0 || computerCards.length === 0) gameOver();
    }, 200);

    // flip player card first and then flip computer card
    // if flipped player card is not Jack, then computer will flip its card
    // else just return from this setTimeout
    if (!pause) {
      setTimeout(() => {
        playerFlipCard();
        console.log(flippedPlayerCard, flippedComputerCard);
        if (flippedPlayerCard.value !== 'J') {
          console.log('flipped Card is not Jack');
          setTimeout(() => {
            if (!pause) computerFlipCard();
            setTimeout(() => {
              console.log(slap);
              if (flippedComputerCard.value === 'J') {
                playButton.disabled = false;
                // pause = true;
                if (!slap) {
                  collectCards();
                  alert('Computer slapped first');
                  pause = true;
                } else if (slap) {
                  collectCards();
                  alert('You slapped first!!!');
                  pause = true;
                }
                // otherCards.push(flippedComputerCard);
                // pause = false;
                return;
              }
              return;
            }, Math.abs(computingTime - 100));
          }, Math.abs(computingTime));
          //  pause = false;
          return;
        } else if (flippedPlayerCard.value === 'J') {
          //  playButton.disabled = false;
          setTimeout(() => {
              playButton.disabled = false;
            console.log('flipped Card is Jack');
            if (flippedPlayerCard.value === 'J') {
              playButton.disabled = false;
              // pause = true;
              console.log(slap);
              if (!slap) {
                collectCards();
                pause = true;
                 playButton.disabled = false;
                alert('Computer slapped first');
              } else if (slap) {
                collectCards();
                pause = true;
                 playButton.disabled = false;
                alert('You slapped first!!!');
              }
              // collectCards();
              // pause = false;
              return;
            }
            // pause = false;
          
            pause = false;
            return;
          }, computingTime - 100);
          //  pause = false;
          pause = false;
          return;
        }
      }, computingTime);
    }

    // check who wins by utilizing the function of displayNumberOfCards to track of the if it is game over or not..
    if (updatedComputerDeck !== undefined) {
      setTimeout(() => {
        displayNumberOfCards();
      }, computingTime - 25);
    }

    // display the number of the cards
    displayNumberOfCards();
  } else {
    gameStart();
    isGameOver = false;
  }
  pause = false;
});

function gameStart() {
  // Change default css
  playButton.disabled = false;
  pause = false;
  playedCardsNumber.style.visibility = 'visible';
  computerDeck.style.visibility = 'visible';
  playerDeck.style.visibility = 'visible';

  // create a deck of ordered deck and clear the player and computer card numbers
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

// display number of Card computer and player have
function displayNumberOfCards() {
  // checking if the game is over or not if player or computer cards is equal or less then 0, or updatedPlayerDeck/updatedComputerDeck becomes undefined
  if (updatedComputerDeck && updatedPlayerDeck) {
    gameOver();
  }

  // shows computer cards from updatedComputerDeck or computerCards
  if (updatedComputerDeck) {
    computerDeckNumber.innerHTML = `Computer: ${updatedComputerDeck.cards.length}`;
  } else {
    computerDeckNumber.innerHTML = `Computer: ${computerCards.length}`;
  }

  // display player cards from updatedPlayerDeck or playerCards
  if (updatedPlayerDeck) {
    playerDeckNumber.innerHTML = `Player: ${updatedPlayerDeck.cards.length}`;
  } else {
    playerDeckNumber.innerHTML = `Player: ${playerCards.length}`;
  }

  // display playedCard number from otherCards
  playedCardsNumber.innerHTML = otherCards.length;
}

function playerFlipCard() {
  // get the first card from playerCards
  if (!pause) {
    flippedPlayerCard = playerCards.shift();
    console.log(flippedPlayerCard, 'flippedPlayerCard');
    if (flippedPlayerCard.value === 'J') {
      // playButton.disabled = true;
      // playButton.disabled = true;
      setTimeout(() => {
        if (flippedPlayerCard.value === 'J') {
          pause = true;
          playButton.disabled = true;
          if (!slap) {
            alert('Computer slapped first');
            collectCards();
            playButton.disabled = false;
            pause = false;
          } else if (slap) {
            alert('You slapped first!!!');
            collectCards();
            playButton.disabled = false;
            pause = false;
          }
          // collectCards();
          // pause = false;
          playButton.disabled = false;
          return;
        }
        playButton.disabled = false;
        // pause = false;
        return;
      }, computingTime);
    } else {
      playButton.disabled = false;
    }
    otherCards.push(flippedPlayerCard);
  }
  // otherCards.push(flippedPlayerCard);

  if (otherCards.length > 0) {
    showPlayedCards(otherCards);
  }
  return flippedPlayerCard;
}

// function flipComputerCard() {
//   flippedComputerCard = computerCards.shift();
// }

// function flipPlayerCard() {
//   flippedPlayerCard = playerCards.shift();
// }

// computer flip the cards
function computerFlipCard() {
  if (!pause) {
    flippedComputerCard = computerCards.shift();
    console.log(flippedComputerCard, 'flippedComputerCard');
    if (flippedComputerCard.value === 'J') {
      // playButton.disabled = true;
      playButton.disabled = true;
      pause = true;
      setTimeout(() => {
        if (flippedComputerCard.value === 'J') {
          // playButton.disabled = true;
          pause = true;
          if (!slap) {
            alert('Computer slapped first');
            collectCards();
            playButton.disabled = false;
            pause = false;
          } else if (slap) {
            alert('You slapped first!!!');
            collectCards();
            playButton.disabled = false;
            pause = false;
          }
          playButton.disabled = false;
          // otherCards.push(flippedComputerCard);
          // pause = false;
          return;
        } else {
          playButton.disabled = false;
        }
        // pause = false;
        return;
      }, computingTime);
    }
    otherCards.push(flippedComputerCard);
  }

  if (otherCards.length > 0) {
    showPlayedCards(otherCards);
  }

  return flippedComputerCard;
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
  updatedPlayerDeck = null;
  updatedComputerDeck = null;
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
    playButton.innerHTML = 'Play Again ?';
    playButton.style.color = 'rgba(138, 249, 2, 0.989)';
  } else if (computerCards.length === 0) {
    roundResult.innerHTML = 'You won this round !!';
    isGameOver = true;
    playButton.innerHTML = 'Play Again ?';
    playButton.style.color = 'rgba(138, 249, 2, 0.989)';
  } else if (updatedPlayerDeck && updatedPlayerDeck.cards.length <= 0) {
    roundResult.innerHTML = 'Computer won this round';
    isGameOver = true;
    playButton.innerHTML = 'Play Again ?';
    playButton.style.color = 'rgba(138, 249, 2, 0.989)';
  } else if (updatedComputerDeck && updatedComputerDeck.cards.length <= 0) {
    roundResult.innerHTML = 'You won this round !!';
    isGameOver = true;
    playButton.innerHTML = 'Play Again ?';
    playButton.style.color = 'rgba(138, 249, 2, 0.989)';
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
  let generatedTime = Math.floor(Math.abs(Math.random() * 900));
  if (generatedTime < 1050) {
    let gap = 1050 - generatedTime;
    generatedTime += gap;
  }
  return generatedTime;
}
