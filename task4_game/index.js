const readlineSync = require('readline-sync');

const health = [5, 15, 25]

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
      "currentCooldown": 0,
    },
    {
      "name": "Огненное дыхание",
      "physicalDmg": 0,
      "magicDmg": 4,
      "physicArmorPercents": 0,
      "magicArmorPercents": 0,
      "cooldown": 3,
      "currentCooldown": 0,
    },
    {
      "name": "Удар хвостом",
      "physicalDmg": 2,
      "magicDmg": 0,
      "physicArmorPercents": 50,
      "magicArmorPercents": 0,
      "cooldown": 2,
      "currentCooldown": 0,
    },
  ]
}

const wizard = {
  maxHealth: null,
  name: "Евстафий",
  moves: [
    {
      "name": "Удар боевым кадилом",
      "physicalDmg": 2,
      "magicDmg": 0,
      "physicArmorPercents": 0,
      "magicArmorPercents": 50,
      "cooldown": 0,
      "currentCooldown": 0,
    },
    {
      "name": "Вертушка левой пяткой",
      "physicalDmg": 4,
      "magicDmg": 0,
      "physicArmorPercents": 0,
      "magicArmorPercents": 0,
      "cooldown": 4,
      "currentCooldown": 0,
    },
    {
      "name": "Каноничный фаербол",
      "physicalDmg": 0,
      "magicDmg": 5,
      "physicArmorPercents": 0,
      "magicArmorPercents": 0,
      "cooldown": 3,
      "currentCooldown": 0,
    },
    {
      "name": "Магический блок",
      "physicalDmg": 0,
      "magicDmg": 0,
      "physicArmorPercents": 100,
      "magicArmorPercents": 100,
      "cooldown": 4,
      "currentCooldown": 0,
    },
  ]
}

function battle() {
  while (monster.maxHealth > 0 && wizard.maxHealth > 0) {
    attack()
  }
  if (monster.maxHealth > 0) {
    console.log('\nМонстр победил!');
  } else console.log('\nМаг победил!');
}

function attack() {
  decreaseCooldown()
  let monsterAttack = monsterMove()
  if (monster.moves[monsterAttack]["cooldown"] > 0) {
    monster.moves[monsterAttack]["currentCooldown"] = monster.moves[monsterAttack]["cooldown"]+1;
  }
  let wizardAttack = wizardMove()
  if (wizard.moves[wizardAttack]["cooldown"] > 0) {
    wizard.moves[wizardAttack]["currentCooldown"] = wizard.moves[wizardAttack]["cooldown"]+1;
  }
  if (monster.moves[monsterAttack]["physicalDmg"]> 0) {
    wizard.maxHealth = calculateDamage(wizard.maxHealth, monster.moves[monsterAttack]["physicalDmg"], wizard.moves[wizardAttack]["physicArmorPercents"])
  }
  if (monster.moves[monsterAttack]["magicDmg"]> 0) {
    wizard.maxHealth = calculateDamage(wizard.maxHealth, monster.moves[monsterAttack]["magicDmg"], wizard.moves[wizardAttack]["magicArmorPercents"])
  }
  if (wizard.moves[wizardAttack]["physicalDmg"]> 0) {
    monster.maxHealth = calculateDamage(monster.maxHealth, wizard.moves[wizardAttack]["physicalDmg"], monster.moves[monsterAttack]["physicArmorPercents"])
  }
  if (wizard.moves[wizardAttack]["magicDmg"]> 0) {
    monster.maxHealth = calculateDamage(monster.maxHealth, wizard.moves[wizardAttack]["magicDmg"], monster.moves[monsterAttack]["magicArmorPercents"])
  }
  console.log(`Монстр наносит атаку ${monster.moves[monsterAttack].name}`);
  console.log(`Маг наносит атаку ${wizard.moves[wizardAttack].name}`);
  console.log('Здоровье мага ' + wizard.maxHealth);
  console.log('Здоровье монстра ' + monster.maxHealth);
}

const monsterMove = () => {
  let attack = Math.floor(Math.random() * monster.moves.length);
  if (monster.moves[attack]["currentCooldown"] === 0) {
    return attack
  } else return monsterMove()
}

const wizardMove = () => {
  let names = []
  wizard.moves.forEach((move, index) => {
    if (move["currentCooldown"] === 0) {
      names.push(move.name)
    }
  })
  let wizardAttackIndex = readlineSync.keyInSelect(names, 'Выберите атаку:');
  return wizard.moves.findIndex(move => move.name === names[wizardAttackIndex])
}

const decreaseCooldown = () => {
  monster.moves.forEach((move) => {
    if (move["currentCooldown"] > 0) {
      move["currentCooldown"]--
    }
  })
  wizard.moves.forEach((move) =>  {
    if (move["currentCooldown"] > 0) {
      move["currentCooldown"]--
    }
  })
}

const calculateDamage = (health, damage, armor) => {
  return health - (damage-armor/100*damage)
}

const wizardHealth = readlineSync.keyInSelect(health, 'Выберите показатель здоровья мага');
wizard.maxHealth = health[wizardHealth]
battle()