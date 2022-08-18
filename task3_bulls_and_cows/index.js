const readlineSync = require('readline-sync');
const attempts = readlineSync.question('How many attempts do you want to use in the game? ');
let quantityOfNumbers = +readlineSync.question('Choose the quantity of symbols in the number (from 3 to 6) ')
let rightNumber = '';

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
