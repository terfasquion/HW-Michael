function sum(numsArr) {
  let sum = 0;

  for (let i = 0; i < numsArr.length; i++) sum += numsArr[i];

  return sum;
}

const num = +prompt("Please enter a number: ");
const multiplesOfFiveAndEightArr = [];
let total;
let msg = "";

for (let i = 5; i <= num; i += 5) multiplesOfFiveAndEightArr.push(i);

for (let i = 8; i <= num; i += 8) multiplesOfFiveAndEightArr.push(i);

total = sum(multiplesOfFiveAndEightArr);

msg = "The sum is " + total;

alert(msg);
