let salary = +prompt("Please enter your salary: ");
let taxAmountToPay = 0;

switch (true) {
  case salary < 25000:
    taxAmountToPay = 0.1 * salary;
    break;
  case salary < 50000:
    taxAmountToPay = 0.1 * 25000 + 0.2 * (salary - 25000);
    break;
  case salary < 100000:
    taxAmountToPay = 0.1 * 25000 + 0.2 * 25000 + 0.3 * (salary - 50000);
    break;
  case salary < 150000:
    taxAmountToPay =
      0.1 * 25000 + 0.2 * 25000 + 0.3 * 50000 + 0.4 * (salary - 100000);
    break;
  default:
    taxAmountToPay =
      0.1 * 25000 +
      0.2 * 25000 +
      0.3 * 50000 +
      0.4 * 50000 +
      0.5 * (salary - 150000);
}

// if (salary < 25000) {
//   taxAmountToPay = 0.1 * salary;
// } else if (salary < 50000) {
//   taxAmountToPay = 0.1 * 25000 + 0.2 * (salary - 25000);
// } else if (salary < 100000) {
//   taxAmountToPay = 0.1 * 25000 + 0.2 * 25000 + 0.3 * (salary - 50000);
// } else if (salary < 150000) {
//   taxAmountToPay =
//     0.1 * 25000 + 0.2 * 25000 + 0.3 * 50000 + 0.4 * (salary - 100000);
// } else {
//   taxAmountToPay =
//     0.1 * 25000 +
//     0.2 * 25000 +
//     0.3 * 50000 +
//     0.4 * 50000 +
//     0.5 * (salary - 150000);
// }

alert("You have to pay $" + taxAmountToPay + " in tax.");
