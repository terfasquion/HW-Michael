/*
EXERCISE # 7 

HTML:

Create a "main" container div with two inputs for 
username and password and a submit button.

JS :

Create a "users" array of three (or more) objects. 
Each object should contain three properties.  
One for the user's first name, 
one for his username, 
and one for his password.

When calling the function, verify that the info 
entered matches the object's values.  
If it doesn't match, alert wrong info.

If info matches, clear the container div and 
replace it with an H1 that says: 
"Welcome" and the user's first name.
*/

const Users = [
  {
    firstName: "Pandora",
    username: "pandora123",
    password: "pandora123",
  },
  {
    firstName: "Ursula",
    username: "ursula123",
    password: "ursula123",
  },
  {
    firstName: "Zelda",
    username: "zelda123",
    password: "zelda123",
  },
  {
    firstName: "Yocheved",
    username: "yocheved123",
    password: "yocheved123",
  },
  {
    firstName: "Barbara",
    username: "barbara123",
    password: "barbara123",
  },
];

const main = document.querySelector("main");
const UsernameInp = document.getElementById("username");
const PasswordInp = document.getElementById("password");
const btn = document.querySelector("button");

btn.addEventListener("click", login);

function login() {
  const UserInp = UsernameInp.value;
  const PassInp = PasswordInp.value;

  for (let i = 0; i < Users.length; i++) {
    currentUser = Users[i];
    if (currentUser.username === UserInp && currentUser.password === PassInp) {
      main.innerHTML = `<h1>Welcome ${currentUser.firstName}</h1>`;
      return;
    }
  }
  alert("Wrong Info");
  return;
}
