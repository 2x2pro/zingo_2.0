document.addEventListener("DOMContentLoaded", function () {
    // Select elements
    const maxInput = document.getElementById("max");
    const dataInput = document.getElementById("data");
    const hintText = document.getElementById("Hint-txt");
    const infoText = document.getElementById("info-txt");
    const startBtn = document.getElementById("start-btn");
    const guessBtn = document.getElementById("guess-btn");
    const resetBtn = document.getElementById("reset-btn");
    const playBtn = document.getElementById("play-btn");
    const instructionBtn = document.getElementById("instruction-btn");
    const instructionBox = document.getElementById("instruction-box");
    const gameBox = document.querySelector(".game-box");

    let random; // Stores the random number
    let attempts = 0; // Tracks number of attempts

    // Play button logic
    playBtn.addEventListener("click", () => {
        gameBox.style.display = "block"; // Show game box
        playBtn.style.display = "none"; // Hide play button
        instructionBox.style.display = "none"; // Hide instructions (if visible)
    });

    // Instructions button toggle logic
    instructionBtn.addEventListener("click", () => {
        // Toggle the visibility of the instructions box
        if (instructionBox.style.display === "none" || instructionBox.style.display === "") {
            instructionBox.style.display = "block"; // Show instructions
        } else {
            instructionBox.style.display = "none"; // Hide instructions
        }
    });

    // Start game logic
    startBtn.addEventListener("click", () => {
        const max = parseInt(maxInput.value);
        if (isNaN(max) || max <= 1) {
            hintText.textContent = "Please enter a valid maximum number (greater than 1)!";
            return;
        }

        // Generate random number
        random = Math.floor(Math.random() * max) + 1;
        attempts = 0; // Reset attempts
        hintText.textContent = `Guess a number between 1 and ${max}!`;
        infoText.textContent = ""; // Clear previous hints
        dataInput.disabled = false; // Enable guessing input
        dataInput.value = ""; // Clear input field
        guessBtn.disabled = false; // Enable guess button
    });

    // Guess button logic
    guessBtn.addEventListener("click", () => {
        const data = parseInt(dataInput.value);
        if (isNaN(data)) {
            infoText.textContent = "Please enter a valid number!";
            return;
        }

        attempts++; // Increment attempts

        // Check the guess
        if (data === random) {
            infoText.textContent = `🎉 Congratulations! You guessed the number in ${attempts} attempts.`;
            dataInput.disabled = true; // Disable input after correct guess
            guessBtn.disabled = true; // Disable guess button
        } else if (data < random) {
            infoText.textContent = "📉 Too low! Try again.";
        } else {
            infoText.textContent = "📈 Too high! Try again.";
        }
    });

    // Reset button logic
    resetBtn.addEventListener("click", () => {
        random = null; // Clear random number
        attempts = 0; // Reset attempts
        maxInput.value = ""; // Clear max input
        dataInput.value = ""; // Clear guess input
        dataInput.disabled = true; // Disable guess input
        guessBtn.disabled = true; // Disable guess button
        hintText.textContent = "Enter the max number to start the game!"; // Reset hint
        infoText.textContent = ""; // Clear info text
    });
});
