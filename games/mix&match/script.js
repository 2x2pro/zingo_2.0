const themes = {
    halloween: {
      items: ["piggy-bank", "shoe", "plane", "suitcase", "robot", "ring", "palm-tree", "mp3"],
      background: "url('img/Halloween_mixmatch.jpeg')"
    },
    barbie: {
      items: ["doll", "dress", "shoes", "car", "house", "ken", "pet", "accessory"],
      background: "url('back.webp')"
    },
    cars: {
      items: ["racecar", "tire", "flag", "helmet", "trophy", "pitstop", "speedometer", "steering-wheel"],
      background: "url('back-6.webp')"
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
  
  // Hide the timer initially
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
    timer.style.display = "block"; // Show timer when the game starts
  
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
        timer.textContent = timeLeft; // Update timer display
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
    timer.style.display = "none"; // Hide the timer after the game ends
    if (isWin) {
      showAlert("Congratulations!", "You won the game!", "success", "Play Again");
    } else {
      showAlert("Game Over", "Time's up!", "error", "Try Again");
    }
  }
  
  function resetGame() {
    gameContainer.innerHTML = ""; // Clear game board
    flippedCards = [];
    matchedPairs = 0;
    timeLeft = 30; // Reset timer
    timer.textContent = timeLeft; // Reset timer display
    gameStarted = false; // Reset game state
    initGame(); // Reinitialize the game
  }
  
  function applyBackground(theme) {
    document.body.style.backgroundImage = themes[theme].background; // Dynamically set background image
  }
  
  function clearBackground() {
    document.body.style.backgroundImage = ""; // Clear the background image
  }
  
  function previewTheme(theme) {
    applyBackground(theme); // Temporarily apply the theme background
  }
  
  function clearPreview() {
    applyBackground(currentTheme); // Restore the current theme's background
  }
  
  function selectTheme(theme) {
    currentTheme = theme; // Set the selected theme as current
    applyBackground(theme); // Apply the selected theme background permanently
    themeSelector.style.display = "none"; // Hide theme selector
    startButton.style.display = "block"; // Show start button
    backButton.style.display = "block"; // Show back button
    resetGame(); // Reset the game for the selected theme
  }
  
  backButton.addEventListener("click", () => {
    // Show the theme selector
    themeSelector.style.display = "block";
    
    // Hide all other elements
    startButton.style.display = "none";
    backButton.style.display = "none";
    timer.style.display = "none"; // Hide the timer
    
    // Clear the game board
    gameContainer.innerHTML = "";
    
    // Reset the background to default (no theme)
    clearBackground();
    
    // Stop the timer if it's running
    clearInterval(timerInterval);
    
    // Clear timer text display
    timer.textContent = ""; 
    
    // Reset game variables
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
  