const readlineSync = require('readline-sync');
// let attempts = readlineSync.question('How many attempts do you want to use in the game? ');

const monster = {
  maxHealth: 10,
  name: "Лютый",
  moves: [
    {
      "name": "Удар когтистой лапой",
      "physicalDmg": 3, // физический урон
      "magicDmg": 0,    // магический урон
      "physicArmorPercents": 20, // физическая броня
      "magicArmorPercents": 20,  // магическая броня
      "cooldown": 0,     // ходов на восстановление
    },
    {
      "name": "Огненное дыхание",
      "physicalDmg": 0,
      "magicDmg": 4,
      "physicArmorPercents": 0,
      "magicArmorPercents": 0,
      "cooldown": 3,
    },
    {
      "name": "Удар хвостом",
      "physicalDmg": 2,
      "magicDmg": 0,
      "physicArmorPercents": 50,
      "magicArmorPercents": 0,
      "cooldown": 2,
    },
  ]
}

const wizard = {
  maxHealth: 20,
  name: "Евстафий",
  moves: [
    {
      "name": "Удар боевым кадилом",
      "physicalDmg": 2,
      "magicDmg": 0,
      "physicArmorPercents": 0,
      "magicArmorPercents": 50,
      "cooldown": 0,
    },
    {
      "name": "Вертушка левой пяткой",
      "physicalDmg": 4,
      "magicDmg": 0,
      "physicArmorPercents": 0,
      "magicArmorPercents": 0,
      "cooldown": 4,
    },
    {
      "name": "Каноничный фаербол",
      "physicalDmg": 0,
      "magicDmg": 5,
      "physicArmorPercents": 0,
      "magicArmorPercents": 0,
      "cooldown": 3,
    },
    {
      "name": "Магический блок",
      "physicalDmg": 0,
      "magicDmg": 0,
      "physicArmorPercents": 100,
      "magicArmorPercents": 100,
      "cooldown": 4,
    },
  ]
}

function battle() {
  while (monster.maxHealth > 0 && wizard.maxHealth > 0) {
    attack()
  }
  if (monster.maxHealth > 0) {
    console.log('Monster is win');
  } else console.log('Wizard is win');
}

function attack() {
  let attack = Math.floor(Math.random() * monster.moves.length);
  console.log(attack);
  let wizardAttack = readlineSync.question('Chose attack: 0 1 2 3');
  console.log(wizardAttack);
  if (wizard.moves[wizardAttack]["cooldown"] > 0) {
    wizard.moves[wizardAttack]["currentCooldown"] = wizard.moves[wizardAttack]["cooldown"];
  }
  if (wizard.moves[wizardAttack]["physicArmorPercents"] <= monster.moves[attack]["physicalDmg"]) {
    wizard.maxHealth = wizard.maxHealth - monster.moves[attack]["physicalDmg"]
  }
  if (wizard.moves[wizardAttack]["magicArmorPercents"] <= monster.moves[attack]["magicDmg"]) {

    wizard.maxHealth = wizard.maxHealth - monster.moves[attack]["magicDmg"]
  }
  if (monster.moves[attack]["magicArmorPercents"] <= wizard.moves[wizardAttack]["magicDmg"]) {
    monster.maxHealth = monster.maxHealth - wizard.moves[wizardAttack]["magicDmg"]
  }
  if (monster.moves[attack]["physicArmorPercents"] <= wizard.moves[wizardAttack]["physicalDmg"]) {
    monster.maxHealth = monster.maxHealth - wizard.moves[wizardAttack]["physicalDmg"]
  }
  console.log('wizard.maxHealth ' + wizard.maxHealth);
  console.log('monster.maxHealth ' + monster.maxHealth);
}

battle()