const themes = {
  halloween: ["piggy-bank", "shoe", "plane", "suitcase", "robot", "ring", "palm-tree", "mp3"],
  barbie: ["doll", "dress", "shoes", "car", "house", "ken", "pet", "accessory"],
  cars: ["racecar", "tire", "flag", "helmet", "trophy", "pitstop", "speedometer", "steering-wheel"],
}

let currentTheme = "halloween"
const gameContainer = document.querySelector(".game")
const timer = document.querySelector(".timer")
const startButton = document.getElementById("start-button")
const themeSelector = document.getElementById("theme-selector")
let flippedCards = []
let matchedPairs = 0
let timeLeft = 30
let gameStarted = false
let timerInterval

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array

}

function flipCard() {
  if (!gameStarted || flippedCards.length >= 2 || this.classList.contains("flip")) return

  this.classList.add("flip")
  flippedCards.push(this)

  if (flippedCards.length === 2) {
    
    setTimeout(checkMatch, 1000)
  }
  
}

function checkMatch() {
  const [card1, card2] = flippedCards
  const type1 = card1.querySelector(".back").id
  const type2 = card2.querySelector(".back").id

  if (type1 === type2) {
    matchedPairs++
    if (matchedPairs === themes[currentTheme].length) {
      endGame(true)
    }
  } else {
    card1.classList.remove("flip")
    card2.classList.remove("flip")
  }
  flippedCards = []
}

function startGame() {
  if (gameStarted) return
  gameStarted = true
  startButton.style.display = "none"

  document.querySelectorAll(".flip-container").forEach((card) => {
    card.classList.add("flip")
  })

  setTimeout(() => {
    document.querySelectorAll(".flip-container").forEach((card) => {
      card.classList.remove("flip")
    })

    showAlert("Game Started!", "Match all the pairs before time runs out!", "info")

    timerInterval = setInterval(() => {
      timeLeft--
      timer.textContent = timeLeft
      if (timeLeft === 0) {
        endGame(false)
      }
    }, 1000)
  }, 2000)
}

function endGame(isWin) {
  clearInterval(timerInterval)
  gameStarted = false
  startButton.style.display = "block"
  if (isWin) {
    showAlert("Congratulations!", "You won the game!", "success", "Play Again")
  } else {
    showAlert("Game Over", "Time's up!", "error", "Try Again")
  }
}

function resetGame() {
  gameContainer.innerHTML = ""
  flippedCards = []
  matchedPairs = 0
  timeLeft = 30
  timer.textContent = timeLeft
  initGame()
}

function selectTheme(theme) {
  currentTheme = theme
  document.body.className = theme
  themeSelector.style.display = "none"
  startButton.style.display = "block"
  resetGame()
}

function initGame() {
  const cardPairs = shuffleArray([...themes[currentTheme], ...themes[currentTheme]])
  cardPairs.forEach((cardType) => {
    const flipContainer = document.createElement("div")
    flipContainer.className = "flip-container"
    flipContainer.innerHTML = `
            <div class="flipper">
                <div class="front"></div>
                <div class="back" id="${cardType}"></div>
            </div>
        `
    flipContainer.addEventListener("click", flipCard)
    gameContainer.appendChild(flipContainer)
  })
}

function showAlert(title, text, icon, confirmButtonText = "OK") {
  const swalConfig = {
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: confirmButtonText,
  }

  if (currentTheme === "barbie") {
    swalConfig.background = "#FFF0F5"
    swalConfig.confirmButtonColor = "#FF69B4"
  }

  Swal.fire(swalConfig).then((result) => {
    if (result.isConfirmed && (icon === "success" || icon === "error")) {
      resetGame()
    }
  })
}

const splashScreen = document.getElementById("splash-screen")
const splashImg = document.getElementById("splash-img")

function startGameAfterSplash() {
  splashScreen.style.opacity = "0"
  setTimeout(() => {
    splashScreen.style.display = "none"
    themeSelector.style.display = "block"
  }, 500)
}

window.addEventListener("load", () => {
  setTimeout(() => {
    splashImg.classList.add("animate")
  }, 100)

  setTimeout(startGameAfterSplash, 5000)
})

startButton.addEventListener("click", startGame)

