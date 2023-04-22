const num1 = +prompt("Please enter the first number: ");
const num2 = +prompt("Please enter the second number: ");
const num3 = +prompt("Please enter the third number: ");

const sum = num1 + num2 + num3;

const avg = sum / 3;

let msg =
  "You entered the numbers: " + num1 + ", " + num2 + ", and " + num3 + "\n";

msg += "Their sum is " + sum + " ,\nand their average is " + avg;

alert(msg);
