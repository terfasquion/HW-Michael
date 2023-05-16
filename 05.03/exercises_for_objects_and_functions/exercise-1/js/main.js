const VOWELS = "aeiou";
const CONSONANTS = "bcdfghjklmnpqrstvwxyz";

const InputStr = prompt("Please enter a string:").toLowerCase();

function separateVowelsFromConsonants(str) {
  const OutputArr = [];
  let VowelStr = "",
    ConsonantStr = "";

  for (const char of str) {
    if (VOWELS.includes(char)) {
      VowelStr += char;
    } else if (CONSONANTS.includes(char)) {
      ConsonantStr += char;
    }
  }

  VowelStr = VowelStr.split("").sort().join(", ");
  ConsonantStr = ConsonantStr.split("").sort().join(", ");

  OutputArr.push(VowelStr);
  OutputArr.push(ConsonantStr);

  return OutputArr;
}

function printMessage(arr) {
  const VowelsMsg = `Your string contains the following vowels: ${arr[0]}. `;
  const ConsonantsMsg = `And the following consonants: ${arr[1]}.`;
  alert(VowelsMsg + "\n" + ConsonantsMsg);
}

printMessage(separateVowelsFromConsonants(InputStr));
