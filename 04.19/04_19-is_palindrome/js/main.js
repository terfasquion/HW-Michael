const numAsStr = prompt(
  "Please enter a number to check if it's a palindrome: "
);

let isPalindrome = false;
let msg = numAsStr + " is not a palindrome";

const numLen = numAsStr.length;

let start = 0;
let end = numLen - 1;

if (numLen === 1) isPalindrome = true;
else if (numLen === 2 && numAsStr[0] === numAsStr[1]) isPalindrome = true;
else {
  while (start < end) {
    if (numAsStr[start] === numAsStr[end]) {
      start++;
      end--;
    } else break;
  }
  if (end > 0 && start >= end) isPalindrome = true;
}

if (isPalindrome) msg = numAsStr + " is a palindrome";

alert(msg);
