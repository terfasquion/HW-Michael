// const numsArr = [4, 2, 0, 8];
const numsArr = [54, 46, 60, 75, 0, 62, 87, 210, 6, 12];
let finalAvg;
let msg = "";
let isAvgUndefined = false;

if (numsArr[0] === 0) isAvgUndefined = true;
else if (numsArr[1] === 0) finalAvg = numsArr[0];
else if (numsArr[2] === 0) finalAvg = (numsArr[0] + numsArr[1]) / 2;
else {
  let currentAvg = (numsArr[0] + numsArr[1]) / 2;
  for (let i = 2; i < numsArr.length; i++) {
    if (numsArr[i] === 0) break;

    currentAvg = (currentAvg + numsArr[i]) / 2;
    finalAvg = currentAvg;
  }
}

if (isAvgUndefined) msg = "Error! Undefined average!";
else msg = "The average of the given list of numbers is: " + finalAvg;

alert(msg);
