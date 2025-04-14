const themes = {
  halloween: {
    items: ["piggy-bank", "shoe", "plane", "suitcase", "robot", "ring", "palm-tree", "mp3"],
    background: "url('img/Halloween_mixmatch.jpeg')",
    backButtonColor: "#FF6600",
    backButtonTextColor: "#FFFFFF",
    cardFrontColor: "#BD5424",
    cardBackColor: "#FFCCA9"
  },
  barbie: {
    items: ["doll", "dress", "shoes", "car", "house", "ken", "pet", "accessory"],
    background: "url('back.webp')",
    backButtonColor: "#FF69B4",
    backButtonTextColor: "#FFFFFF",
    cardFrontColor: "#FF69B4",
    cardBackColor: "#FFE4E1"
  },
  cars: {
    items: ["racecar", "tire", "flag", "helmet", "trophy", "pitstop", "speedometer", "steering-wheel"],
    background: "url('back-6.webp')",
    backButtonColor: "#FFD700",
    backButtonTextColor: "#4A4A4A",
    cardFrontColor: "#1A3A8A",
    cardBackColor: "#FFEFD5"
  }
};

let currentTheme = "halloween";
const gameContainer = document.querySelector(".game");
const themeSelector = document.getElementById("theme-selector");
const backButton = document.getElementById("back-button");
const startButton = document.getElementById("start-button");
const timer = document.querySelector(".timer");
let flippedCards = [];
let matchedPairs = 0;
let timeLeft = 30;
let gameStarted = false;
let timerInterval;

timer.style.display = "none";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function flipCard() {
  if (!gameStarted || flippedCards.length >= 2 || this.classList.contains("flip")) return;

  this.classList.add("flip");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 1000);
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  const type1 = card1.querySelector(".back").id;
  const type2 = card2.querySelector(".back").id;

  if (type1 === type2) {
    matchedPairs++;
    if (matchedPairs === themes[currentTheme].items.length) {
      endGame(true);
    }
  } else {
    card1.classList.remove("flip");
    card2.classList.remove("flip");
  }
  flippedCards = [];
}

function startGame() {
  if (gameStarted) return;
  gameStarted = true;
  startButton.style.display = "none";
  timer.style.display = "block";

  document.querySelectorAll(".flip-container").forEach((card) => {
    card.classList.add("flip");
  });

  setTimeout(() => {
    document.querySelectorAll(".flip-container").forEach((card) => {
      card.classList.remove("flip");
    });

    showAlert("Game Started!", "Match all the pairs before time runs out!", "info");

    timerInterval = setInterval(() => {
      timeLeft--;
      timer.textContent = timeLeft;
      if (timeLeft === 0) {
        endGame(false);
      }
    }, 1000);
  }, 2000);
}

function endGame(isWin) {
  clearInterval(timerInterval);
  gameStarted = false;
  startButton.style.display = "block";
  timer.style.display = "none";
  if (isWin) {
    showAlert("Congratulations!", "You won the game!", "success", "Play Again");
  } else {
    showAlert("Game Over", "Time's up!", "error", "Try Again");
  }
}

function resetGame() {
  gameContainer.innerHTML = "";
  flippedCards = [];
  matchedPairs = 0;
  timeLeft = 30;
  timer.textContent = timeLeft;
  gameStarted = false;
  initGame();
}

function applyBackground(theme) {
  document.body.style.backgroundImage = themes[theme].background;
}

function previewTheme(theme) {
  applyBackground(theme);
}

function clearPreview() {
  applyBackground(currentTheme);
}

function updateThemeStyles(theme) {
  backButton.style.backgroundColor = themes[theme].backButtonColor;
  backButton.style.color = themes[theme].backButtonTextColor;
  const cards = document.querySelectorAll(".flipper .front, .flipper .back");
  cards.forEach((card, index) => {
    if (index % 2 === 0) {
      card.style.backgroundColor = themes[theme].cardFrontColor;
    } else {
      card.style.backgroundColor = themes[theme].cardBackColor;
    }
  });
}

function selectTheme(theme) {
  currentTheme = theme;
  document.body.className = theme;
  applyBackground(theme);
  updateThemeStyles(theme);
  themeSelector.style.display = "none";
  startButton.style.display = "block";
  backButton.style.display = "block";
  resetGame();
}

themeSelector.addEventListener("mouseover", (event) => {
  if (event.target.tagName === "BUTTON") {
    const theme = event.target.getAttribute("onclick").match(/'(\w+)'/)[1];
    previewTheme(theme);
  }
});

themeSelector.addEventListener("mouseout", (event) => {
  if (event.target.tagName === "BUTTON") {
    clearPreview();
  }
});

backButton.addEventListener("click", () => {
  themeSelector.style.display = "block";
  startButton.style.display = "none";
  backButton.style.display = "none";
  timer.style.display = "none";
  gameContainer.innerHTML = "";
  clearBackground();
  clearInterval(timerInterval);
  timer.textContent = "";
  timeLeft = 30;
  gameStarted = false;
});

function initGame() {
  const cardPairs = shuffleArray([...themes[currentTheme].items, ...themes[currentTheme].items]);
  cardPairs.forEach((cardType) => {
    const flipContainer = document.createElement("div");
    flipContainer.className = "flip-container";
    flipContainer.innerHTML = `
      <div class="flipper">
        <div class="front"></div>
        <div class="back" id="${cardType}"></div>
      </div>
    `;
    flipContainer.addEventListener("click", flipCard);
    gameContainer.appendChild(flipContainer);
  });
  updateThemeStyles(currentTheme);
}

function showAlert(title, text, icon, confirmButtonText = "OK") {
  const swalConfig = {
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: confirmButtonText,
  };

  if (currentTheme === "barbie") {
    swalConfig.background = "#FFF0F5";
    swalConfig.confirmButtonColor = "#FF69B4";
  }

  Swal.fire(swalConfig).then((result) => {
    if (result.isConfirmed && (icon === "success" || icon === "error")) {
      resetGame();
    }
  });
}

const splashScreen = document.getElementById("splash-screen");
const splashImg = document.getElementById("splash-img");

function startGameAfterSplash() {
  splashScreen.style.opacity = "0";
  setTimeout(() => {
    splashScreen.style.display = "none";
    themeSelector.style.display = "block";
  }, 500);
}

window.addEventListener("load", () => {
  setTimeout(() => {
    splashImg.classList.add("animate");
  }, 100);

  setTimeout(startGameAfterSplash, 5000);
});

startButton.addEventListener("click", startGame);
