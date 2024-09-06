class Character {
  static MAX_HEALTH = 100;

  constructor(name) {
    this.name = name;
    this.health = Character.MAX_HEALTH;
    this.inventory = [];
  }

  roll(mod = 0) {
    const result = Math.floor(Math.random() * 20) + 1 + mod;
    console.log(`${this.name} rolled a ${result}.`);
    return result;
  }
}

class Adventurer extends Character {
  static ROLES = ["Fighter", "Healer", "Wizard"];

  constructor(name, role) {
    if (!Adventurer.ROLES.includes(role)) {
      throw new Error(`Invalid role: ${role}`);
    }
    super(name);
    this.role = role;
    this.inventory.push("bedroll", "50 gold coins");
  }

  scout() {
    console.log(`${this.name} is scouting ahead...`);
    super.roll();
  }

  duel(opponent) {
    if (!(opponent instanceof Adventurer)) {
      throw new Error("Opponent must be an Adventurer");
    }

    while (this.health > 50 && opponent.health > 50) {
      const myRoll = this.roll();
      const opponentRoll = opponent.roll();
      const winner = myRoll > opponentRoll ? this : opponent;
      const loser = winner === this ? opponent : this;
      loser.health -= 1;
      console.log(
        `${winner.name} wins the round! ${loser.name} now has ${loser.health} health.`
      );
    }

    const winner = this.health > 50 ? this.name : opponent.name;
    console.log(`${winner} wins the duel!`);
  }
}

class Companion extends Character {
  constructor(name, type) {
    super(name);
    this.type = type;
  }
}

class AdventurerFactory {
  constructor(role) {
    this.role = role;
    this.adventurers = [];
  }

  generate(name) {
    const newAdventurer = new Adventurer(name, this.role);
    this.adventurers.push(newAdventurer);
    return newAdventurer;
  }

  findByIndex(index) {
    return this.adventurers[index];
  }

  findByName(name) {
    return this.adventurers.find((a) => a.name === name);
  }
}

const robin = new Adventurer("Robin", "Fighter");
robin.inventory.push("sword", "potion", "artifact");

const leo = new Companion("Leo", "Cat");
robin.companion = leo;
const frank = new Companion("Frank", "Flea");
leo.companion = frank;
frank.inventory.push("small hat", "sunglasses");


const healerFactory = new AdventurerFactory("Healer");
const healerRobin = healerFactory.generate("HealerRobin");
console.log(healerFactory.findByName("HealerRobin"));

const bill = new Adventurer("Bill", "Wizard");
robin.duel(bill);
