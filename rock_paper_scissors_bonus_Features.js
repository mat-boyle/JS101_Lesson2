const readline = require('readline-sync');
const VALID_CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
const GAMES_NEEDED_TO_WIN_SERIES = 3;

let userGanesWon = 0;
let computerGamesWon = 0;
let tiedGames = 0;
let gameNumber = 0;
let playAgain = true;

function prompt(message) {
  console.log(`=> ${message}`);
}

function userWins() {
  prompt('You win!');
  userGanesWon++;
}

function computerWins() {
  prompt('Computer win!');
  computerGamesWon++;
}

function displayWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    prompt("It's a tie");
    tiedGames++;
  } else if ((userChoice === 'rock') && ((computerChoice === 'scissors') || (computerChoice === 'lizard'))) {
    userWins();
  } else if ((userChoice === 'paper') && ((computerChoice === 'rock') || (computerChoice === 'spock'))) {
    userWins();
  } else if ((userChoice === 'scissors') && ((computerChoice === 'paper') || (computerChoice === 'lizard'))) {
    userWins();
  } else if ((userChoice === 'lizard') && ((computerChoice === 'spock') || (computerChoice === 'paper'))) {
    userWins();
  } else if ((userChoice === 'spock') && ((computerChoice === 'rock') || (computerChoice === 'scissors'))) {
    userWins();
  } else {
    computerWins();
  }
}

function askUserForChoice() {
  prompt(`Choose one: ${VALID_CHOICES.join(', ')}`);
  let choice = expandChoiceFromShortName(readline.question());

  while (!VALID_CHOICES.includes(choice)) {
    prompt("Thats not a valid choice");
    choice = expandChoiceFromShortName(readline.question());
  }

  return choice;
}

function expandChoiceFromShortName(userPick) {
  switch (userPick[0]) {
    case 'r':
      userPick = 'rock';
      break;
    case 'p':
      userPick = 'paper';
      break;
    case 'l':
      userPick = 'lizard';
      break;
    case 's':
      if (userPick[1] === 'c') {
        userPick = 'scissors';
      } else if (userPick[1] === 'p') {
        userPick = 'spock';
      }
  }
  return userPick;
}

function DisplaySeriesWon() {
  if (userGanesWon === GAMES_NEEDED_TO_WIN_SERIES) {
    prompt('You won the series!');
  } else if (computerGamesWon === GAMES_NEEDED_TO_WIN_SERIES) {
    prompt('Computer won the series!');
  }
}

function seriesOver() {
  if ((userGanesWon === GAMES_NEEDED_TO_WIN_SERIES) ||
  (computerGamesWon === GAMES_NEEDED_TO_WIN_SERIES)) {
    return false;
  } else {
    return true;
  }
}

function askPlayAgain() {
  prompt('Do you want to play again (y/n)?');
  let answer = readline.question().toLocaleLowerCase();

  while (answer[0] !== 'n' && answer[0] !== 'y') {
    prompt('Please enter "y" or "n".');
    answer = readline.question().toLocaleLowerCase();
  }

  if (answer[0] === 'y') {
    playAgain = true;
  } else {
    playAgain = false;
  }
}

function resetGameCounters() {
  userGanesWon = 0;
  computerGamesWon = 0;
  tiedGames = 0;
  gameNumber = 0;
}

do {
  do {
    gameNumber++;
    prompt(`This is game ${gameNumber} in our series`);

    let userChoice = askUserForChoice();
    let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
    let computerChoice = VALID_CHOICES[randomIndex];

    prompt(`You chose ${userChoice}, computer chose ${computerChoice} \n`);
    displayWinner(userChoice, computerChoice);

    prompt(`\nThe series score is: User ${userGanesWon} - Computer ${computerGamesWon} - Ties ${tiedGames} \n`);
    DisplaySeriesWon();

  } while (seriesOver());

  askPlayAgain();
  resetGameCounters();

} while (playAgain);