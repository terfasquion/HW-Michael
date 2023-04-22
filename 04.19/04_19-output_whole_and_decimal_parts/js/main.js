const numAsStr = prompt("Please enter any decimal number: ");

const decimalAsStr = numAsStr.split(".")[1];

const len = decimalAsStr.length;

const num = +numAsStr;

let whole, decimal;

decimal = +(num % 1).toPrecision(len);

whole = num - decimal;

let message = "You entered: " + num + "\n";
message += "Whole part is: " + whole + "\n";
message += "Decimal part is: " + decimal;

alert(message);
