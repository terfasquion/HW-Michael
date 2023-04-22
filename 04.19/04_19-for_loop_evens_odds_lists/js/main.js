let num = +prompt("Please enter a whole number: ");

let odds = "";
let evens = "";
let oddOrEven = "";
let minus = "";
let commaSpace = ", ";

if (num < 0) {
  num = -num;
  minus = "-";
}

for (let i = 1; i <= num; i++) {
  if (i === num - 1 || i === num) commaSpace = "";
  if (i % 2 === 0) evens += minus + i + commaSpace;
  else odds += minus + i + commaSpace;
}

if (num % 2 === 0) oddOrEven = "even";
else oddOrEven = "odd";

let msg =
  "Odds list: " +
  odds +
  "\n\n" +
  "Evens list: " +
  evens +
  "\n\nThe number you entered, " +
  minus +
  num +
  ", is " +
  oddOrEven;

alert(msg);
