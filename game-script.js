document.addEventListener('DOMContentLoaded', function() {
    // Game loading and iframe display functionality
    const gameLoading = document.getElementById('gameLoading');
    const gamePlaceholder = document.getElementById('gamePlaceholder');
    const gameIframe = document.getElementById('gameIframe');
    const startGameBtn = document.getElementById('startGameBtn');
    const playNowBtn = document.querySelector('.play-now-btn');

    // Hide loading screen initially
    if (gameLoading) {
        gameLoading.style.display = 'none';
    }

    // Start game button functionality
    function startGame() {
        if (gameLoading && gamePlaceholder && gameIframe) {
            // Show loading screen
            gameLoading.style.display = 'flex';
            gamePlaceholder.style.display = 'none';

            // Simulate loading time
            setTimeout(() => {
                // In a real implementation, this would load the actual game
                gameLoading.style.display = 'none';
                gameIframe.style.display = 'block';

                // For demo, we're just showing a message in the iframe
                gameIframe.contentWindow.document.open();
                gameIframe.contentWindow.document.write(`
                    <html>
                    <head>
                        <style>
                            body {
                                margin: 0;
                                padding: 0;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                height: 100vh;
                                background-color: #333;
                                color: white;
                                font-family: Arial, sans-serif;
                                text-align: center;
                            }
                            .game-message {
                                max-width: 80%;
                            }
                            .game-message h2 {
                                color: #e76a9b;
                                margin-bottom: 20px;
                            }
                            .game-message p {
                                margin-bottom: 30px;
                                line-height: 1.6;
                            }
                            .back-btn {
                                background-color: #e76a9b;
                                color: white;
                                border: none;
                                padding: 10px 20px;
                                border-radius: 5px;
                                cursor: pointer;
                                font-size: 16px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="game-message">
                            <h2>Knife Flip Game Placeholder</h2>
                            <p>In a real implementation, the actual game would be loaded here. This is just a placeholder to demonstrate the interface.</p>
                            <button class="back-btn" onclick="parent.exitGame()">Exit Game</button>
                        </div>
                    </body>
                    </html>
                `);
                gameIframe.contentWindow.document.close();
            }, 2000);
        }
    }

    // Exit game function (will be called from the iframe)
    window.exitGame = function() {
        if (gameIframe && gamePlaceholder) {
            gameIframe.style.display = 'none';
            gamePlaceholder.style.display = 'flex';
        }
    };

    // Attach event listeners to game buttons
    if (startGameBtn) {
        startGameBtn.addEventListener('click', startGame);
    }

    if (playNowBtn) {
        playNowBtn.addEventListener('click', function() {
            // Scroll to the game frame
            document.querySelector('.game-frame').scrollIntoView({ behavior: 'smooth' });

            // Auto-start the game after a short delay
            setTimeout(startGame, 800);
        });
    }

    // Rating select functionality
    const ratingStars = document.querySelectorAll('.rating-select i');

    if (ratingStars.length > 0) {
        ratingStars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = this.dataset.rating;

                // Reset all stars
                ratingStars.forEach(s => {
                    s.className = 'far fa-star';
                });

                // Set active stars
                for (let i = 0; i < rating; i++) {
                    ratingStars[i].className = 'fas fa-star active';
                }
            });

            star.addEventListener('mouseover', function() {
                const rating = this.dataset.rating;

                // Highlight stars on hover
                for (let i = 0; i < rating; i++) {
                    ratingStars[i].className = ratingStars[i].className.includes('active')
                        ? 'fas fa-star active'
                        : 'fas fa-star';
                }
            });

            star.addEventListener('mouseout', function() {
                // Reset stars that aren't active
                ratingStars.forEach(s => {
                    if (!s.className.includes('active')) {
                        s.className = 'far fa-star';
                    }
                });
            });
        });
    }

    // Review form submission
    const reviewForm = document.getElementById('reviewForm');

    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('reviewName').value;
            const reviewText = document.getElementById('reviewText').value;
            const activeStars = document.querySelectorAll('.rating-select i.active').length;

            if (name && reviewText && activeStars > 0) {
                alert(`Thank you for your ${activeStars}-star review, ${name}! In a real implementation, your review would be saved to a database.`);

                // Reset form
                reviewForm.reset();

                // Reset stars
                ratingStars.forEach(s => {
                    s.className = 'far fa-star';
                });
            } else {
                alert('Please complete all fields and select a rating.');
            }
        });
    }

    // Social share buttons
    const shareButtons = document.querySelectorAll('.social-share .social-icon');

    if (shareButtons.length > 0) {
        shareButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();

                const type = this.classList.contains('facebook') ? 'Facebook' :
                             this.classList.contains('twitter') ? 'Twitter' :
                             this.classList.contains('pinterest') ? 'Pinterest' : '';

                alert(`In a real implementation, this would share the game to ${type}.`);
            });
        });
    }

    // Update game link in the header
    const headerLinks = document.querySelectorAll('header nav ul li a');

    if (headerLinks.length > 0) {
        headerLinks.forEach(link => {
            if (link.textContent === 'Home') {
                link.classList.add('active');
            }
        });
    }
});
