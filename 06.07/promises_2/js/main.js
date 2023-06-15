const img = document.getElementById("current-step");
const fixedURL =
  "https://s3-eu-west-1.amazonaws.com/dev.appdrag.com/promises-8a9415";

function getCarParts() {
  console.log("Fetching car parts data from server...");
  return new Promise((resolve, reject) => {
    fetch(`${fixedURL}/car_parts.json`)
      .then((response) => response.json())
      .then((carPartsData) => {
        if (carPartsData.length) {
          console.log("Fetching of data completed successfully");
          resolve(carPartsData);
        } else reject("Data does not exist");
      })
      .catch((err) => console.log(err));
  });
}

function orderChassis(carPartsData) {
  const chassisObj = carPartsData[0];
  img.src = chassisObj.url ? chassisObj.url : "";
  console.log(
    "Start ordering...",
    chassisObj.part === "chassis"
      ? "chassis"
      : "An error has occurred - aborting... "
  );
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        chassisObj.part === "chassis" &&
        img.src === `${fixedURL}/car_parts/chassis.jpg`
      ) {
        console.log(`${chassisObj.part} ordered successfully.`);
        resolve(carPartsData);
      } else {
        reject(`Cannot order chassis`);
      }
    }, Math.floor(Math.random() * 4000 + 3000));
  });
}

function orderEngine(carPartsData) {
  const engineObj = carPartsData[1];
  img.src = engineObj.url ? engineObj.url : "";
  console.log(
    "Start ordering...",
    engineObj.part === "engine"
      ? "engine"
      : "An error has occurred - aborting... "
  );
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        engineObj.part === "engine" &&
        img.src === `${fixedURL}/car_parts/engine.jpg`
      ) {
        console.log(`${engineObj.part} ordered successfully.`);
        resolve(carPartsData);
      } else {
        reject(`Cannot order engine`);
      }
    }, Math.floor(Math.random() * 4000 + 3000));
  });
}

function orderWheels(carPartsData) {
  const wheelsObj = carPartsData[2];
  img.src = wheelsObj.url ? wheelsObj.url : "";
  console.log(
    "Start ordering...",
    wheelsObj.part === "wheels"
      ? "wheels"
      : "An error has occurred - aborting... "
  );
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        wheelsObj.part === "wheels" &&
        img.src === `${fixedURL}/car_parts/wheels.jpg`
      ) {
        console.log(`${wheelsObj.part} ordered successfully.`);
        resolve(carPartsData);
      } else {
        reject(`Cannot order wheels`);
      }
    }, Math.floor(Math.random() * 4000 + 3000));
  });
}

function orderSeats(carPartsData) {
  const seatsObj = carPartsData[3];
  img.src = seatsObj.url ? seatsObj.url : "";
  console.log(
    "Start ordering...",
    seatsObj.part === "seats" ? "seats" : "An error has occurred - aborting... "
  );
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        seatsObj.part === "seats" &&
        img.src === `${fixedURL}/car_parts/seats.jpg`
      ) {
        console.log(`${seatsObj.part} ordered successfully.`);
        resolve(carPartsData);
      } else {
        reject(`Cannot order seats`);
      }
    }, Math.floor(Math.random() * 4000 + 3000));
  });
}

function buildCar(carPartsData) {
  const carObj = carPartsData[4];
  img.src = carObj.url ? carObj.url : "";
  console.log(
    "Start building...",
    carObj.part === "car" ? "car" : "An error has occurred - aborting... "
  );
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        carObj.part === "car" &&
        img.src === `${fixedURL}/car_parts/car.jpg`
      ) {
        console.log(
          `The ${carObj.part} has been built successfully and is ready to ship.`
        );
        resolve(carPartsData);
      } else {
        reject(`Cannot build the car`);
      }
    }, Math.floor(Math.random() * 4000 + 3000));
  });
}

getCarParts()
  .then(orderChassis)
  .then(orderEngine)
  .then(orderWheels)
  .then(orderSeats)
  .then(buildCar)
  .catch((err) => console.log(err));
