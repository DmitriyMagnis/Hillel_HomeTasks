class Coach {
  #name: string;
  #specialization: string;
  #rating: number;

  constructor(name: string, specialization: string, rating: number) {
    this.#name = name;
    this.#specialization = specialization;
    this.#rating = rating;
  }
  displayInfo(): string {
    return `Coach: ${this.#name}, Specialization: ${
      this.#specialization
    }, Rating: ${this.#rating}`;
  }
  get name(): string {
    return this.#name;
  }
  get specialization(): string {
    return this.#specialization;
  }
  get rating(): number {
    return this.#rating;
  }
}
const coach1 = new Coach('John Doe', 'Fitness', 4.7);

const coach2 = new Coach('Alice Smith', 'Yoga', 4.9);

console.log(coach1.displayInfo()); // "Coach: John Doe, Specialization: Fitness, Rating: 4.7"
console.log(coach1.name, coach1.rating, coach1.specialization);
console.log(coach2.displayInfo()); // "Coach: Alice Smith, Specialization: Yoga, Rating:4.9"
console.log(coach2.name, coach2.rating, coach2.specialization);
