const readlineSync = require('readline-sync');
let rightNumber = '';

function getAttemptsCount() {
  let attempts = readlineSync.question('How many attempts do you want to use in the game? ');
  if (isNaN(+attempts)) {
    console.log('Attempts must be a number');
    attempts = getAttemptsCount()
  }
  return attempts
} 

function getQuantityOfNumbers() {
  let quantityOfNumbers = +readlineSync.question('Choose the quantity of symbols in the number (from 3 to 6) ')
  if (isNaN(+quantityOfNumbers)) {
    console.log('Quantity must be a number');
    quantityOfNumbers = getQuantityOfNumbers()
  }
  if (+quantityOfNumbers < 3 || +quantityOfNumbers > 6) {
    console.log('Quantity must be from 3 to 6');
    quantityOfNumbers = getQuantityOfNumbers()
  }
  return quantityOfNumbers
}

function getRandomInt() {
  return Math.floor(Math.random() * 10);
}

function randomNumber(quantityOfNumbers) {
  while(rightNumber.length<quantityOfNumbers) {
    let number = getRandomInt()
      if (rightNumber.indexOf(number) < 0 ) {
        rightNumber += number;
      }
  }
}

let quantityOfNumbers = getQuantityOfNumbers()
let attempts = getAttemptsCount()
randomNumber(quantityOfNumbers)

function getAttempts(attempts, rightNumber) {
  while(attempts>0) {
    let bulls = []
    let bullsCount = 0
    let cows = []
    let cowsCount = 0
    let userNumber = readlineSync.question('Your number ');
    i=0
    if (rightNumber === userNumber) {
      console.log('You are win')
      break
    }
    while(i<rightNumber.length) {
      if (rightNumber[i] === userNumber[i]) {
        bullsCount++
        bulls.push(rightNumber[i])
      }
      else if (rightNumber.indexOf(userNumber[i]) >=0) {
        cowsCount++
        cows.push(userNumber[i])
      }
      i++
    }
    attempts--
    console.log(`Numbers on right places: ${bullsCount} [${bulls}]`);
    console.log(`Right numbers on wrong places: ${cowsCount} [${cows}]`);
    console.log(`Attempts left ${attempts}`);
    if (attempts == 0) {
      console.log('You are lose');
      console.log(`Right number was ${rightNumber}`);
    }
  }
}

getAttempts(attempts, rightNumber)
