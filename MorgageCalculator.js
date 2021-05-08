const readline = require('readline-sync');
const MESSAGES = require('./MorgageCalculator.json');

function prompt(message) {
  console.log(`=> ${message}`);
}

function convertCurrancyToNum(cur) {
  let tempArray = [];

  for (let count = 0; count < cur.length; count++) {
    if (cur[count] === ' ') {
      continue;
    }
    if (cur[count] === "." || cur[count] === "-" || !(Number.isNaN(Number(cur[count])))) { //sorts through input and only adds numbers - and .
      tempArray.push(cur[count]);
    }
  }
  return tempArray.join(''); //returns the array as a string with no spaces or currency symbols
}

function convertAPR(numAPR) { //checks if APR is whole number (4%) and converts to decimals as needed for calculations
  if (numAPR >= 1) {
    numAPR /= 100;
  }
  return numAPR;
}

console.log(convertCurrancyToNum('$100,000.00'));

function invalidNumber(number) {
  return (number < 0 ||  Number.isNaN(Number(number)));
}

function durationInMonths(durationYealy) {
  return durationYealy * 12;
}

function monthlyInterestRate(APR) {
  return APR / 12;
}

function calculatePayment(loanAmount, monthlyIR, loanDurationMonths) {
  let monthlyPayment = loanAmount *
    (monthlyIR / (1 - Math.pow((1 + monthlyIR), (-loanDurationMonths))));

  return monthlyPayment.toFixed(2);
}

prompt(MESSAGES['intro']);

let repeat = true;

//runs loop for calculation and prompting if user wants to repreat
do {
  prompt(MESSAGES['loanAmountQuestion']);
  let userLoanAmount =
    Number.parseFloat(convertCurrancyToNum(readline.question()));

  while (invalidNumber(userLoanAmount)) {
    prompt(MESSAGES['invalidLoanAmountQuestion']);
    userLoanAmount =
      Number.parseFloat(convertCurrancyToNum(readline.question()));
  }

  prompt(MESSAGES['interestRateQuestion']);
  let userAPR = convertAPR(Number.parseFloat(readline.question()));

  while (invalidNumber(userAPR)) {
    prompt(MESSAGES['invalidInterestRateQuestion']);
    userAPR = convertAPR(Number.parseFloat(readline.question()));
  }

  prompt(MESSAGES['loanDurationQuestion']);
  let userLoanDuration = Number.parseFloat(readline.question());

  while (invalidNumber(userLoanDuration)) {
    prompt(MESSAGES['invalidLoanDurationQuestion']);
    userLoanDuration = Number.parseFloat(readline.question());
  }

  let userMonthlyIR = monthlyInterestRate(userAPR);
  let monthlyLoanDuration = durationInMonths(userLoanDuration);

  console.log(MESSAGES['monthlyPayment'] + calculatePayment(userLoanAmount, userMonthlyIR, monthlyLoanDuration));

  prompt(MESSAGES['repeatQuestion']);
  let another = readline.question();

  while (!((another.toLocaleLowerCase() === 'yes') || (another.toLocaleLowerCase() === 'no'))) {
    prompt(MESSAGES['invalidRepeat']);
    another = readline.question();
  }

  if (another.toLowerCase() === 'no') {
    repeat = false;
  }

} while (repeat === true);
