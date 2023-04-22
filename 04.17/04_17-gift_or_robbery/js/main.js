let rent = +prompt("Please enter your rent: ");
let salary = +prompt("Please enter your salary: ");

let month = 1;
let rentDebt = 0;
let unknownAmount = 0;
let isGift = false;
let message = "";

// The result of the January salary deposit in my account is doubling my balance
// therefore the initial value of my balance was equal to my deposited January salary
// So:
let balance = salary;
balance += salary; // January salary deposited in my account

// Can I pay my rent in January?
if (rent <= balance) {
  balance -= rent; // rent paid so its sum is deducted from balance
} else {
  // I can't afford the January rent so I start accumulate rent debt
  rentDebt += rent;
}

month++; // We're now in February

balance += salary / 2; // February salary is only half of the Jan salary

// Check if I have a debt from January and if so check if I can pay it now
if (rentDebt) {
  if (rentDebt <= balance) {
    balance -= rentDebt;
    rentDebt = 0;
  }
}

// February rent is due
const febRent = rent + 200;
if (febRent <= balance) {
  balance -= febRent;
} else {
  rentDebt += febRent;
}

// Credit card charge deducted
balance -= 500;

month++; // In March

unknownAmount = balance;
balance = 0;

if (unknownAmount < 0) {
  unknownAmount = -unknownAmount;
  isGift = true;
}

message = "The current month is " + month + ".\n";

if (rentDebt) {
  message += "I owe $" + rentDebt + " to my landlord.\n";
}

if (isGift) {
  message += "I received a gift of $" + unknownAmount + ".";
} else {
  if (unknownAmount === 0) {
    message += "I was neither robbed nor received a gift."; // when rent is 2000 and salary is 1000
  } else {
    message += "I was robbed a total amount of $" + unknownAmount + ".";
  }
}

alert(message);
