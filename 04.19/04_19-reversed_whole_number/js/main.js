let numberToBeReversed = +prompt("Please enter the number to be reversed: ");
let minus = "";

let reversedNumber = "";

if (numberToBeReversed < 0) {
  minus = "-";
  numberToBeReversed = -numberToBeReversed;
}

while (numberToBeReversed > 0) {
  const lastDigit = numberToBeReversed % 10;
  reversedNumber += lastDigit;
  numberToBeReversed = (numberToBeReversed - lastDigit) / 10;
}

alert("The reversed number is: " + reversedNumber + minus);
