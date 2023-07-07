function initializeGame() {
  const Body = document.querySelector("body");

  const h1 = document.querySelector("h1");
  const playground = document.getElementById("playground");
  const dataItemPlayers = document.getElementsByClassName("data-item-players");
  const extraTime = 10; // seconds
  const maxAllowedTime = 60; // seconds
  const increasedEscapingSpeed = 50; // in milliseconds
  const increasedRotationSpeed = 0.25; // in seconds
  const pointsToNextLevel = 10;
  const timeoutIdsArr = [];
  let gameSummaryNotification = "";

  Body.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  const Target = {
    target: document.getElementById("target"),
    escapingSpeed: 300, //in milliseconds
    rotationSpeed: 2, // in seconds
  };

  const GameDataUI = {
    score: document.getElementById("score-value"),
    pointsToNextLevel: document.getElementById("points-to-next-level-value"),
    level: document.getElementById("level-value"),
    missedClicks: document.getElementById("missed-clicks-value"),
    timer: document.getElementById("timer-value"),
    topPlayersFullNames: document.getElementsByClassName(
      "top-players-full-names"
    ),
    topPlayersScores: document.getElementsByClassName("top-players-scores"),
    topPlayersQualificationDates: document.getElementsByClassName(
      "top-players-qualification-dates"
    ),
  };

  // Toggle dates
  for (let i = 0; i < dataItemPlayers.length; i++) {
    const currentDataItem = dataItemPlayers[i];
    currentDataItem.addEventListener("mouseover", function (e) {
      e.stopPropagation();
      GameDataUI.topPlayersQualificationDates[i].classList.remove("hidden");
    });
    currentDataItem.addEventListener("mouseleave", function (e) {
      e.stopPropagation();
      GameDataUI.topPlayersQualificationDates[i].classList.add("hidden");
    });
  }

  const GameData = {
    score: 0,
    pointsToNextLevel: pointsToNextLevel,
    level: 1,
    missedClicks: 0,
    timer: maxAllowedTime,
    topPlayers: [],
  };

  let topPlayersFromLS = localStorage.topPlayers;
  if (topPlayersFromLS) GameData.topPlayers = JSON.parse(topPlayersFromLS);
  if (!GameData.topPlayers.length) {
    GameData.topPlayers = [
      {
        playerFullName: "Hon Dah",
        playerScore: 50,
        playerQualificationDate: "17/05/2023",
      },
      {
        playerFullName: "Oleh Oleh",
        playerScore: 40,
        playerQualificationDate: "16/06/2023",
      },
      {
        playerFullName: "Qan Tas",
        playerScore: 30,
        playerQualificationDate: "03/06/2023",
      },
      {
        playerFullName: "Bar BQ",
        playerScore: 20,
        playerQualificationDate: "24/12/2022",
      },
      {
        playerFullName: "Teref Kal",
        playerScore: 10,
        playerQualificationDate: "30/06/2023",
      },
    ];

    localStorage.topPlayers = JSON.stringify(GameData.topPlayers);
  }

  let rotatingTarget = null;
  let playing;
  let intervalID = null;

  function getTodaysDate() {
    const todaysDate = new Date();
    let dd = todaysDate.getDate();
    let mm = todaysDate.getMonth() + 1;
    const yyyy = todaysDate.getFullYear();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    return `${dd}/${mm}/${yyyy}`;
  }

  function updateLeaderboard() {
    const newQualifiedPlayer = {};
    newQualifiedPlayer.playerFullName = prompt("Enter your full name");
    newQualifiedPlayer.playerScore = GameData.score;
    newQualifiedPlayer.playerQualificationDate = getTodaysDate();
    GameData.topPlayers.pop();
    GameData.topPlayers.push(newQualifiedPlayer);
    GameData.topPlayers.sort((a, b) => b.playerScore - a.playerScore);
    localStorage.topPlayers = JSON.stringify(GameData.topPlayers);
  }

  function isLeaderboardQualified() {
    return GameData.score > GameData.topPlayers[4].playerScore;
  }

  function isWinner() {
    return (
      GameData.level > 5 && GameData.score > GameData.topPlayers[0].playerScore
    );
  }

  function prepareSummaryNotification() {
    let msgStart = isWinner() ? "You won the game!" : "Game over!";
    let msgMiddle = `\nYour score is ${GameData.score}.\n`;
    let msgEnd = isLeaderboardQualified()
      ? "You qualified for the leaderboard.\nEnter your name in the following prompt."
      : "You did not qualify for the leaderboard.";
    gameSummaryNotification = msgStart + msgMiddle + msgEnd;
  }

  function resetGame() {
    Target.target.removeEventListener("mouseover", targetEscapeHandler);
    GameData.timer = 0;
    GameDataUI.timer.innerText = 0;
    Target.target.classList.remove("rotating-target");
    Target.target.removeEventListener("click", targetCatchHandler);
    playground.removeEventListener("click", playgroundClicksHandler);
    h1.classList.remove("arrow-cursor"); // change to pointer cursor for h1
    rotatingTarget.style.animationDuration = "2s";
    Target.target.style.top = 0;
    Target.target.style.left = 0;
  }

  function initializeGameDataUI() {
    GameDataUI.score.innerText = 0;
    GameDataUI.pointsToNextLevel.innerText = pointsToNextLevel;
    GameDataUI.level.innerText = 1;
    GameDataUI.missedClicks.innerText = 0;
    GameDataUI.timer.innerText = maxAllowedTime;
    GameData.topPlayers.forEach((player, idx) => {
      GameDataUI.topPlayersQualificationDates[idx].innerText =
        player.playerQualificationDate;
      GameDataUI.topPlayersFullNames[idx].innerText = player.playerFullName;
      GameDataUI.topPlayersScores[idx].innerText = player.playerScore;
    });
  }

  function setH1Content(e) {
    if (e.type === "mouseenter") {
      e.target.textContent = "CLICK TO START";
    } else if (e.type === "mouseleave") {
      e.target.textContent = "CATCH ME IF YOU CAN!";
    }
  }

  function targetEscapeHandler(e) {
    e.stopPropagation();
    let timeoutID = setTimeout(() => {
      if (!playing) {
        for (const _ of timeoutIdsArr) {
          clearTimeout(timeoutIdsArr.pop());
        }
      } else {
        Target.target.style.top = Math.trunc(Math.random() * 620) + "px";
        Target.target.style.left = Math.trunc(Math.random() * 950) + "px";
        timeoutIdsArr.push(timeoutID);
      }
    }, Target.escapingSpeed);
  }

  function levelUp() {
    GameData.level++;
    GameData.pointsToNextLevel = pointsToNextLevel;
    if (GameData.timer + extraTime > maxAllowedTime)
      GameData.timer = maxAllowedTime;
    else GameData.timer += extraTime;
    Target.escapingSpeed -= increasedEscapingSpeed;
    Target.rotationSpeed -= increasedRotationSpeed;
    rotatingTarget.style.animationDuration = Target.rotationSpeed + "s";
    GameDataUI.level.innerText = GameData.level;
    GameDataUI.pointsToNextLevel.innerText = GameData.pointsToNextLevel;
    GameDataUI.timer.innerText = GameData.timer;
  }

  function targetCatchHandler(e) {
    e.stopPropagation();
    GameData.score += 10 * GameData.level;
    if (GameData.pointsToNextLevel > 1) {
      GameData.pointsToNextLevel--;
      GameDataUI.score.innerText = GameData.score;
      GameDataUI.pointsToNextLevel.innerText = GameData.pointsToNextLevel;
    } else {
      if (GameData.level < 5) {
        levelUp();
      } else {
        GameData.level = 6;
        GameDataUI.score.innerText = GameData.score;
        GameData.pointsToNextLevel = 0;
        GameDataUI.pointsToNextLevel.innerText = 0;
      }
    }
  }

  function playgroundClicksHandler() {
    if (GameData.score - GameData.level >= 0) {
      GameData.score -= GameData.level;
      GameDataUI.score.textContent = GameData.score;
    }
    GameData.missedClicks++;
    GameDataUI.missedClicks.textContent = GameData.missedClicks;
  }

  h1.addEventListener("mouseenter", setH1Content);

  h1.addEventListener("mouseleave", setH1Content);

  h1.addEventListener("click", playGame);

  function arrangeDOM() {
    // Once the game starts, remove the event listener on mouseenter,
    // so to prevent the text from changing back to "click to start"
    h1.removeEventListener("mouseenter", setH1Content);
    h1.removeEventListener("click", playGame); // Remove also the click event
    h1.classList.add("arrow-cursor"); // restore default cursor
    Target.target.classList.add("rotating-target"); // Start rotating the target bar
    rotatingTarget = document.querySelector(".rotating-target");
    Target.target.addEventListener("mouseover", targetEscapeHandler);
    Target.target.addEventListener("click", targetCatchHandler);
    playground.addEventListener("click", playgroundClicksHandler);
  }

  const showAlert = () => {
    alert(gameSummaryNotification);
  };

  function playGame() {
    if (confirm("Ready to start?")) {
      arrangeDOM();
      playing = true;
      intervalID = setInterval(function () {
        GameData.timer--;
        GameDataUI.timer.innerText = GameData.timer;
        if (GameData.timer === 0 || GameData.level > 5) {
          playing = false;
          clearInterval(intervalID);
          resetGame();
        }
        if (!playing) {
          prepareSummaryNotification();
          setTimeout(showAlert, 2500);
          if (isLeaderboardQualified()) {
            setTimeout(updateLeaderboard, 3000);
          }
          setTimeout(initializeGame, 4000);
        }
      }, 1000);
    } else {
      alert("You chose not to play. Bye!");
    }
  }

  initializeGameDataUI();
}

initializeGame();
