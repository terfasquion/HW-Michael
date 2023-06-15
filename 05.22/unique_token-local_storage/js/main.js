//-------------------------------------------------------------------------------------------------------------
//------------------------ TOKEN GENERATION RELATED FUNCTIONS - START -----------------------------------------

function getShuffledArr(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getBaseTokenArr(jumbledArr) {
  const length = jumbledArr.length;
  const baseArrLength = Math.floor(Math.random() * 21) + 40; // 40-60
  const baseArr = [];
  for (let i = 0; i < baseArrLength; i++) {
    const j = Math.floor(Math.random() * length);
    baseArr.push(jumbledArr[j]);
  }
  return baseArr;
}

function plantTimestampInToken(baseArr) {
  const timestamp = Date.now().toString();
  let i = 3;
  for (const digit of timestamp) {
    baseArr.splice(i, 0, digit);
    i += 3;
  }
  return;
}

// I have the base string with 82 chars where the alphabet chars and digits are in order
// Then I create an arr based on that string
// Then I shuffle that array using the Fisher-Yates Shuffle Algorithm for randomizing array items
// Then I randomly choose a base token array LENGTH between 12 and 16 inclusive
// I create the base token arr by choosing items at random from the shuffled array
function createUniqueToken() {
  const baseCharStr =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-=+{}[]:;";
  const baseCharArr = baseCharStr.split("");
  const shuffledArr = getShuffledArr(baseCharArr);
  const baseTokenArray = getBaseTokenArr(shuffledArr); // create base token array based on the shuffled base array
  plantTimestampInToken(baseTokenArray);
  return baseTokenArray.join(""); // returns the complete token
}

//-----------------------------TOKEN GENERATION RELATED FUNCTIONS - END -------------------------------------------
//-----------------------------------------------------------------------------------------------------------------

function createUsers() {
  const UsersDB = [
    {
      fName: "Bracha",
      email: "bracha@mail.com",
      pass: "pass123",
      token: createUniqueToken(),
    },
    {
      fName: "Chaiyalle",
      email: "chaiyalle@mail.com",
      pass: "pass123",
      token: createUniqueToken(),
    },
    {
      fName: "Yocheved",
      email: "yocheved@mail.com",
      pass: "pass123",
      token: createUniqueToken(),
    },
    {
      fName: "Goldeh",
      email: "goldeh@mail.com",
      pass: "pass123",
      token: createUniqueToken(),
    },
    {
      fName: "Rivkele",
      email: "rivkele@mail.com",
      pass: "pass123",
      token: createUniqueToken(),
    },
    {
      fName: "Frumka",
      email: "frumka@mail.com",
      pass: "pass123",
      token: createUniqueToken(),
    },
    {
      fName: "Estera",
      email: "estera@mail.com",
      pass: "pass123",
      token: createUniqueToken(),
    },
  ];
  return UsersDB;
}

// Get user data from LS, create sample user data if non-existant
// Returns an array consisting of the users array and the current user object
function handleLS() {
  let UsersDB = [];
  const UsersLS = localStorage.users;
  if (UsersLS) UsersDB = JSON.parse(UsersLS);
  if (!UsersDB.length) UsersDB = createUsers();
  localStorage.users = JSON.stringify(UsersDB);
  const connectedUser = localStorage.user ? JSON.parse(localStorage.user) : {};
  return [UsersDB, connectedUser];
}

function updateLS(keyNameLS, valueLS) {
  localStorage[keyNameLS] = valueLS;
}

function userAuth(userObj, authType, UsersFromDB, Body) {
  const connectedUser = {};
  if (userObj.email && userObj[authType]) {
    for (const userFromDB of UsersFromDB) {
      if (
        userObj.email === userFromDB.email &&
        userObj[authType] === userFromDB[authType]
      ) {
        const token = createUniqueToken();
        connectedUser.token = token;
        userFromDB.token = token;
        connectedUser.email = userObj.email;
        updateLS("user", JSON.stringify(connectedUser));
        updateLS("users", JSON.stringify(UsersFromDB));
        Body.innerHTML = `<h1>Welcome, ${userFromDB.fName} 😍😍😍</h1>`;
        return;
      }
    }
    // Here, I make sure the "Wrong Credentials" alert is activated only if the email does not match the password authType. If the email does not match the token authType then the user is removed from the localStorage, so its existence won't trigger extraneous calls to the server and redundant alerts
    authType === "pass"
      ? alert("Wrong Credentials")
      : localStorage.removeItem("user");
    return;
  }
  alert("Missing Credentials");
}

class Input {
  constructor(inpName, inpType, inpPlaceholder, inpRequired = false) {
    this.input = document.createElement("input");
    this.input.name = inpName;
    this.input.type = inpType;
    this.input.placeholder = inpPlaceholder;
    this.input.required = inpRequired;
    this.input.autocomplete = "off";
  }
}

class Button {
  constructor(btnText) {
    this.btn = document.createElement("button");
    this.btn.innerText = btnText;
  }
}

const $Login = {
  inputs: [
    new Input("email", "email", "Your email here", true).input,
    new Input("password", "password", "Your password here", true).input,
  ],
  btn: new Button("Login").btn,
};

function init() {
  const Body = document.querySelector("body");
  Body.append($Login.inputs[0], $Login.inputs[1], $Login.btn);

  const [UsersFromDB, connectedUser] = handleLS();

  $Login.btn.addEventListener("click", function () {
    const formEmail = $Login.inputs[0].value;
    const formPass = $Login.inputs[1].value;
    const userToConnect = { email: formEmail, pass: formPass };
    userAuth(userToConnect, "pass", UsersFromDB, Body);
  });

  if (connectedUser && connectedUser.email && connectedUser.token) {
    userAuth(connectedUser, "token", UsersFromDB, Body);
  }
}

init();
