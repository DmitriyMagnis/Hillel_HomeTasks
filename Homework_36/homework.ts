class BankAccount {
  #balance: number;
  constructor(balance: number) {
    this.#balance = balance;
  }
  public get getBalance(): number {
    return this.#balance;
  }
  public deposit(number: number): void {
    this.#balance += number;
  }
  public withdraw(number: number): void {
    this.#balance -= number;
  }
}

const account1 = new BankAccount(1000);

console.log(account1.getBalance); // 1000

account1.deposit(500);

console.log(account1.getBalance); // 1500

account1.withdraw(200);

console.log(account1.getBalance); // 1300
