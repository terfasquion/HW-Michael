function getFailingAvg(studentsExamScoresArr) {
  let failingAvg;
  let failingCount = 0;
  let failingScoresSum = 0;
  let arrLength = studentsExamScoresArr.length;

  for (let i = 0; i < arrLength; i++) {
    const currentScore = studentsExamScoresArr[i];
    if (currentScore < PASSING_SCORE) {
      failingCount++;
      failingScoresSum += currentScore;
    }
  }

  if (failingCount > 0) {
    failingAvg = failingScoresSum / failingCount;
    return failingAvg;
  }
  return -1;
}

function getPassingAvg(studentsExamScoresArr) {
  let passingAvg;
  let passingCount = 0;
  let passingScoresSum = 0;
  let arrLength = studentsExamScoresArr.length;

  for (let i = 0; i < arrLength; i++) {
    const currentScore = studentsExamScoresArr[i];
    if (currentScore >= PASSING_SCORE) {
      passingCount++;
      passingScoresSum += currentScore;
    }
  }

  if (passingCount > 0) {
    passingAvg = passingScoresSum / passingCount;
    return passingAvg;
  }
  return -1;
}

const STUDENTS_NUM = 6;
const PASSING_SCORE = 70;
const studentsNamesArr = [];
const studentsScoresArr = [];
const passingStudentsNamesArr = [];
let passingStudentsNamesStr = "";
let commaSpace = ", ";

let failingScoresAvg;
let passingScoresAvg;

for (let i = 0; i < STUDENTS_NUM; i++) {
  const studentName = prompt("Please enter the student's name: ");
  const studentScore = +prompt("Please enter the student's score: ");
  studentsNamesArr.push(studentName);
  studentsScoresArr.push(studentScore);

  if (studentScore >= PASSING_SCORE) passingStudentsNamesArr.push(studentName);
}

passingStudentsNamesStr = passingStudentsNamesArr.join(", ");
failingScoresAvg = getFailingAvg(studentsScoresArr);
passingScoresAvg = getPassingAvg(studentsScoresArr);

let msg =
  "The names of the students that passed the exam:\n" +
  passingStudentsNamesStr +
  "\nThe average passing score is: " +
  passingScoresAvg +
  "\nThe average failing score is: " +
  failingScoresAvg;

alert(msg);
