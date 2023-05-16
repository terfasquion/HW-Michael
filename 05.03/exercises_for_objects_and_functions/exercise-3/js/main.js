function isValidData(theFirstName, theLastName, theTzNum) {
  const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const DIGITS = "0123456789";
  if (theFirstName && theLastName && theTzNum) {
    const theFullName = (theFirstName + theLastName).toUpperCase();
    for (const char of theFullName) if (!ALPHABET.includes(char)) return false;
    for (const char of theTzNum) if (!DIGITS.includes(char)) return false;
    return true;
  }
  return false;
}

function getInputData() {
  const FirstName = prompt("Please enter your first name:");
  const LastName = prompt("Please enter your last name:");
  const TeudatZeutNum = prompt("Please enter your 9-digit Teudat Zeut number:");
  if (isValidData(FirstName, LastName, TeudatZeutNum))
    return [FirstName.toUpperCase(), LastName.toUpperCase(), +TeudatZeutNum];
  return [];
}

function createUserObj(inputDataArr) {
  const user = {};
  user.fName = inputDataArr[0];
  user.lName = inputDataArr[1];
  user.tzNum = inputDataArr[2];

  return user;
}

function prepareForSorting(usersArray) {
  const UsersArrSortedByFirstName = usersArray.slice();
  const UsersArrSortedByLastName = usersArray.slice();
  const UsersArrSortedByTzNum = usersArray.slice();
  return [
    UsersArrSortedByFirstName,
    UsersArrSortedByLastName,
    UsersArrSortedByTzNum,
  ];
}

function sortArrays(arraysToSort) {
  arraysToSort[0].sort((p1, p2) =>
    p1.fName > p2.fName ? 1 : p1.fName < p2.fName ? -1 : 0
  );
  arraysToSort[1].sort((p1, p2) =>
    p1.lName > p2.lName ? 1 : p1.lName < p2.lName ? -1 : 0
  );
  arraysToSort[2].sort((p1, p2) =>
    p1.tzNum > p2.tzNum ? 1 : p1.tzNum < p2.tzNum ? -1 : 0
  );
  return arraysToSort;
}

function printArrays(arraysToPrint) {
  console.log("Sorted by first names:");
  console.log(arraysToPrint[0]);
  console.log("Sorted by last names:");
  console.log(arraysToPrint[1]);
  console.log("Sorted by Teudat Zeut number:");
  console.log(arraysToPrint[2]);
}

function manageData() {
  const UsersArr = [];
  do {
    const resArr = getInputData();
    if (resArr.length > 0) {
      const UserObj = createUserObj(resArr);
      UsersArr.push(UserObj);
    } else {
      alert(
        "It seems that some of your data was entered incorrectly. Please try again!"
      );
      return;
    }
  } while (confirm("Do you wish to add another user?"));
  printArrays(sortArrays(prepareForSorting(UsersArr)));
}

manageData();
