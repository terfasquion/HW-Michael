const STUDENTS_NUM = 5;
const students = [];

for (let i = 0; i < STUDENTS_NUM; i++) {
  const student = prompt("Please enter the student's name").toLowerCase();
  students.push(student);
}

students.sort();
const studentsAsStr = students.join(", ");

alert(studentsAsStr);
