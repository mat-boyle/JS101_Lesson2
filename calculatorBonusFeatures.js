const readline = require('readline-sync');
const MESSAGES = require('./calculator_messages.json');

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

prompt(MESSAGES['root']['language']);
let language = readline.question();

while (!(language.toLocaleLowerCase() === 'english' || language.toLocaleLowerCase() === 'espanol' || language.toLocaleLowerCase() === 'francais' || language.toLocaleLowerCase() === '中文')) {
  prompt(MESSAGES["root"]['invalidLanguage']);
  language = readline.question();
}

language = language.toLowerCase();

prompt(MESSAGES[language]['intro']);

let repeat = true;

do {
  prompt(MESSAGES[language]['firstQuestion']);
  let number1 = readline.question();

  while (invalidNumber(number1)) {
    prompt(MESSAGES[language]['invalidNumber']);
    number1 = readline.question();
  }

  prompt(MESSAGES[language]['secondQuestion']);
  let number2 = readline.question();

  while (invalidNumber(number2)) {
    prompt(MESSAGES[language]['invalidNumber']);
    number2 = readline.question();
  }

  prompt(MESSAGES[language]['operationQuestion']);
  let operation = readline.question();

  while (!['1','2','3','4'].includes(operation)) {
    prompt(MESSAGES[language]['invalidOperation']);
    operation = readline.question();
  }

  let output;

  switch (operation) {
    case '1':
      output = Number(number1) + Number(number2);
      break;
    case '2':
      output = Number(number1) - Number(number2);
      break;
    case '3':
      output = Number(number1) * Number(number2);
      break;
    case '4':
      output = Number(number1) / Number(number2);
      break;
  }

  prompt(MESSAGES[language]['output'] + output);

  prompt(MESSAGES[language]['repeatQuestion']);
  let another = readline.question();

  while (!(another.toLocaleLowerCase() === 'yes' ||
           another.toLocaleLowerCase() === 'si' ||
           another.toLocaleLowerCase() === 'oui' ||
           another.toLocaleLowerCase() === '是的' ||
           another.toLocaleLowerCase() === 'no' ||
           another.toLocaleLowerCase() === 'non' ||
           another.toLocaleLowerCase() === '不')) {
    prompt(MESSAGES[language]['invalidRepeat']);
    another = readline.question();
  }

  if (another.toLowerCase() === 'no' ||
      another.toLocaleLowerCase() === 'non' ||
      another.toLocaleLowerCase() === '不') {
    repeat = false;
  }

} while (repeat === true);

