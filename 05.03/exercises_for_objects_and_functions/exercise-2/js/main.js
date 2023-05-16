const VALID_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const InputStr = prompt("Please enter a string:");

function countLetters(str) {
  const lettersArr = str.toUpperCase().split("").sort();
  const outputArr = [],
    trackerArr = [];

  for (const letter of lettersArr) {
    if (VALID_LETTERS.includes(letter)) {
      const len = trackerArr.length;
      if (trackerArr.includes(letter)) {
        outputArr[len - 1].amount++;
      } else {
        trackerArr.push(letter);
        outputArr.push({ letter, amount: 1 });
      }
    }
  }
  return outputArr;
}

function outputAsAlert(dataArr) {
  let outputStr = "[\n";
  let comma = ",";
  for (let i = 0; i < dataArr.length; i++) {
    const obj = dataArr[i];
    if (i === dataArr.length - 1) comma = "";
    outputStr += `  { letter: "${obj.letter}", amount: ${obj.amount} }${comma}\n`;
  }
  outputStr += "]";
  alert(outputStr);
}

outputAsAlert(countLetters(InputStr));
