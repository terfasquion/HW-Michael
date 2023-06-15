const Body = document.querySelector("body");
const carsContainer = document.createElement("div");
const password = prompt("Enter your password");

function passAuth(pass) {
  return new Promise((resolve, reject) => {
    fetch(
      "https://s3-eu-west-1.amazonaws.com/dev.appdrag.com/promises-8a9415/password.json"
    )
      .then((result) => result.json())
      .then((jsonData) => {
        if (jsonData.password === pass) {
          resolve();
        } else {
          reject("Wrong password");
        }
      });
  });
}

function getCars() {
  return new Promise((resolve, reject) => {
    fetch(
      "https://s3-eu-west-1.amazonaws.com/dev.appdrag.com/promises-8a9415/cars.json"
    )
      .then((response) => response.json())
      .then((jsonData) => {
        if (jsonData) resolve(jsonData);
        else reject("Something went wrong");
      });
  });
}

function displayCars(carsArr) {
  carsArr.forEach(createHTML);
  Body.appendChild(carsContainer);
}

function createHTML(carObj) {
  const car = document.createElement("article");
  car.className = "each-car";
  const carMake = document.createElement("h2");
  const carModel = document.createElement("h3");
  const carPrice = document.createElement("h1");
  const carImg = document.createElement("img");
  carMake.innerText = carObj.make;
  carModel.innerText = carObj.model;
  carPrice.innerText = carObj.price;
  carImg.src = `./assets/images/${carObj.image}`;
  car.append(carMake, carModel, carPrice, carImg);
  carsContainer.appendChild(car);
}

passAuth(password)
  .then(getCars)
  .then(displayCars)
  .catch((err) => (Body.innerHTML = `<h1>${err}</h1>`));
