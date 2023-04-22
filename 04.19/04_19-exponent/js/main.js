const base = +prompt("Please enter the base of the power: ");
const exponent = +prompt(
  "Please enter the exponent of the power (as a natural number): "
);

let result;

if (exponent === 0) result = 1;
else if (exponent === 1) result = base;
else if (exponent === 2) result = base * base;
else {
  result = base;
  let numberOfMultiplications = exponent - 1;
  while (numberOfMultiplications > 0) {
    result *= base;
    numberOfMultiplications--;
  }
}

alert(base + " ^ " + exponent + " = " + result);
