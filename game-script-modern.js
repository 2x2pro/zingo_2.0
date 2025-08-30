// Modern Game Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all game page components
    initGamePlayer();
    initGameActions();
    initShareModal();
    initGameData();
    initFullscreen();
    initGameControls();
});

// Game Data Configuration
const gameData = {
    temple: {
        title: "Temple Run 2",
        category: "Adventure",
        image: "https://i.pinimg.com/736x/07/ef/10/07ef10c982b089babd27eb19228264e5.jpg",
        description: "Experience the thrill of endless running in this exciting adventure game. Navigate through ancient temples, collect coins, and avoid obstacles in this action-packed runner that will keep you on the edge of your seat!",
        controls: "Use arrow keys to move left/right, up to jump, down to slide",
        objective: "Run as far as possible while collecting coins and avoiding obstacles",
        goal: "Beat your high score and unlock new characters",
        plays: "1.2K",
        rating: "4.5",
        gameUrl: "games/templerun2/index.html"
    },
    subway: {
        title: "Subway Surfers",
        category: "Adventure",
        image: "https://downloadr2.apkmirror.com/wp-content/uploads/2018/11/5bffa628baff0.png",
        description: "Dash as fast as you can in this colorful 3D running game! Dodge the oncoming trains and help Jake, Tricky & Fresh escape from the grumpy Inspector and his dog.",
        controls: "Use arrow keys or swipe gestures to move and jump",
        objective: "Surf the subways and dodge trains while collecting coins",
        goal: "Run as far as you can and collect power-ups",
        plays: "2.1K",
        rating: "4.7",
        gameUrl: "games/subway/index.html"
    },
    guess: {
        title: "Guess the Number",
        category: "Puzzle",
        image: "games/random number/guess.jpeg",
        description: "Test your guessing skills in this fun number guessing game! The computer thinks of a number and you have to guess it in the fewest attempts possible.",
        controls: "Use mouse or touch to input numbers and make guesses",
        objective: "Guess the secret number in the minimum attempts",
        goal: "Achieve the lowest average guess count across multiple rounds",
        plays: "890",
        rating: "4.2",
        gameUrl: "games/random number/index.html"
    },
    mario: {
        title: "Super Mario Bros",
        category: "Adventure",
        image: "https://www.mariowiki.com/images/thumb/5/50/SMBDeluxeBoxart.jpg/1200px-SMBDeluxeBoxart.jpg",
        description: "Join Mario on his classic adventure to rescue Princess Peach! Jump on enemies, collect coins, and navigate through iconic levels in this legendary platformer.",
        controls: "Use arrow keys to move, space bar to jump",
        objective: "Reach the flag at the end of each level",
        goal: "Save Princess Peach and defeat Bowser",
        plays: "4.5K",
        rating: "4.9",
        gameUrl: "games/mario/mario.html"
    },
    angrybird: {
        title: "Angry Birds",
        category: "Adventure",
        image: "images.jpeg",
        description: "Use the unique powers of the Angry Birds to destroy the greedy pigs' defenses! The survival of the Angry Birds is at stake in this physics-based puzzle game.",
        controls: "Use mouse to aim and launch birds at pig structures",
        objective: "Destroy all pigs using the minimum number of birds",
        goal: "Complete all levels with maximum stars",
        plays: "3.2K",
        rating: "4.6",
        gameUrl: "games/angrybirds/index.html"
    },
    amongus: {
        title: "Among Us",
        category: "Adventure",
        image: "https://upload.wikimedia.org/wikipedia/en/9/9a/Among_Us_cover_art.jpg",
        description: "Play with 4-15 players online or locally in this social deduction game! Crewmates work together to complete tasks while trying to identify the Impostors.",
        controls: "Use WASD keys to move and mouse to interact with objects",
        objective: "Complete tasks or find the impostor if you're a crewmate",
        goal: "Win by completing all tasks or ejecting all impostors",
        plays: "5.7K",
        rating: "4.8",
        gameUrl: "games/amongus/index.html"
    },
    candycrush: {
        title: "Candy Crush",
        category: "Puzzle",
        image: "Candy.png",
        description: "Match three or more candies to clear them from the board in this addictive puzzle game! Complete objectives to progress through hundreds of sweet levels.",
        controls: "Use mouse to swap adjacent candies and create matches",
        objective: "Match candies to complete level objectives",
        goal: "Progress through all levels and achieve high scores",
        plays: "2.8K",
        rating: "4.4",
        gameUrl: "games/candy-crush/index.html"
    },
    "traffic-jam-3d": {
        title: "Traffic Jam 3D",
        category: "Racing",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf-PDRFohPHOd3aE9BsrtOkrSFi_ygCqbR3g&s",
        description: "Navigate through busy traffic in this exciting 3D racing game! Dodge cars, collect coins, and see how far you can drive without crashing.",
        controls: "Use arrow keys or WASD to steer your vehicle",
        objective: "Drive as far as possible without hitting other vehicles",
        goal: "Achieve the highest distance and collect maximum coins",
        plays: "1.9K",
        rating: "4.1",
        gameUrl: "games/traffic-jam-3d/index.html"
    },
    sudoku: {
        title: "Sudoku",
        category: "Puzzle",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sudoku-by-L2G-20050714.svg/1200px-Sudoku-by-L2G-20050714.svg.png",
        description: "Challenge your mind with this classic number puzzle! Fill a 9×9 grid with digits so that each column, row, and 3×3 sub-grid contains all numbers from 1 to 9.",
        controls: "Use mouse to click on cells and keyboard to enter numbers",
        objective: "Fill the entire grid following Sudoku rules",
        goal: "Complete the puzzle in the shortest time possible",
        plays: "1.8K",
        rating: "4.3",
        gameUrl: "games/Sudoku/index.html"
    },
    mixmatch: {
        title: "Halloween Mix & Match",
        category: "Puzzle",
        image: "games/mix&match/img/Halloween_mixmatch.jpeg",
        description: "Spooky fun awaits! Match Halloween-themed items in this entertaining puzzle game. Perfect for getting into the Halloween spirit!",
        controls: "Use mouse to click and match items",
        objective: "Match all the spooky items to complete levels",
        goal: "Complete all Halloween-themed matching challenges",
        plays: "1.1K",
        rating: "4.2",
        gameUrl: "games/mix&match/Index-iframe.html"
    },
    "mix-match": {
        title: "Halloween Mix & Match",
        category: "Puzzle", 
        image: "games/mix&match/img/Halloween_mixmatch.jpeg",
        description: "Spooky fun awaits! Match Halloween-themed items in this entertaining puzzle game. Perfect for getting into the Halloween spirit!",
        controls: "Use mouse to click and match items",
        objective: "Match all the spooky items to complete levels",
        goal: "Complete all Halloween-themed matching challenges",
        plays: "1.1K",
        rating: "4.2",
        gameUrl: "games/mix&match/Index-iframe.html"
    }
};

// Initialize Game Data
function initGameData() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('game') || 'temple';
    
    console.log('🎮 Initializing game:', gameId);
    console.log('🔍 Available games:', Object.keys(gameData));
    
    const game = gameData[gameId];
    if (!game) {
        console.error('❌ Game not found:', gameId);
        console.error('Available games:', Object.keys(gameData));
        return;
    }
    
    console.log('✅ Game found:', game.title);
    console.log('📂 Game URL:', game.gameUrl);
    
    // Update page elements with game data
    document.title = `${game.title} - Play Free Online | Zingo.gg`;
    
    // Update breadcrumb
    const categoryElement = document.getElementById('game-category');
    const nameElement = document.getElementById('game-name');
    if (categoryElement) categoryElement.textContent = game.category;
    if (nameElement) nameElement.textContent = game.title;
    
    // Update game info
    const gameTitle = document.getElementById('gameTitle');
    const gameImage = document.getElementById('gameImage');
    const gameDescription = document.getElementById('gameDescription');
    const gameCategory = document.getElementById('gameCategory');
    const gamePlays = document.getElementById('gamePlays');
    const gameControls = document.getElementById('gameControls');
    const gameObjective = document.getElementById('gameObjective');
    const gameGoal = document.getElementById('gameGoal');
    
    if (gameTitle) gameTitle.textContent = game.title;
    if (gameImage) {
        gameImage.src = game.image;
        gameImage.alt = `${game.title} - ${game.category} game`;
    }
    if (gameDescription) gameDescription.textContent = game.description;
    if (gameCategory) gameCategory.textContent = game.category;
    if (gamePlays) gamePlays.textContent = `${game.plays} plays`;
    if (gameControls) gameControls.textContent = game.controls;
    if (gameObjective) gameObjective.textContent = game.objective;
    if (gameGoal) gameGoal.textContent = game.goal;
    
    // Store game URL for later use
    window.currentGameUrl = game.gameUrl;
    window.currentGameData = game;
}

// Game Player Functionality
function initGamePlayer() {
    const playButton = document.getElementById('playButton');
    const gameLoading = document.getElementById('gameLoading');
    const gameThumbnail = document.getElementById('gameThumbnail');
    const gameIframe = document.getElementById('gameIframe');
    const gameControls = document.getElementById('gameControls');
    
    if (playButton) {
        playButton.addEventListener('click', function() {
            startGame();
        });
    }
    
    function startGame() {
        console.log('🚀 Starting game...');
        console.log('🌐 Current game URL:', window.currentGameUrl);
        
        if (!window.currentGameUrl) {
            console.error('❌ No game URL available');
            showGameError('Game not found');
            return;
        }
        
        console.log('🎯 Loading game from:', window.currentGameUrl);
        
        // Show loading state
        if (gameLoading) {
            gameLoading.style.display = 'flex';
            console.log('⏳ Showing loading screen');
        }
        if (gameThumbnail) {
            gameThumbnail.style.display = 'none';
            console.log('🖼️ Hiding thumbnail');
        }
        
        // Load game in iframe
        if (gameIframe) {
            let loadTimeout;
            
            gameIframe.onload = function() {
                clearTimeout(loadTimeout);
                console.log('Game loaded successfully:', window.currentGameUrl);
                
                // Hide loading, show game
                if (gameLoading) gameLoading.style.display = 'none';
                gameIframe.style.display = 'block';
                if (gameControls) gameControls.style.display = 'flex';
                
                // Track game start event
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'game_start', {
                        game_name: window.currentGameData.title,
                        game_category: window.currentGameData.category
                    });
                }
            };
            
            gameIframe.onerror = function(error) {
                clearTimeout(loadTimeout);
                console.error('Failed to load game:', error);
                if (gameLoading) gameLoading.style.display = 'none';
                if (gameThumbnail) gameThumbnail.style.display = 'block';
                
                // Show error message
                showGameError('Failed to load game');
            };
            
            // Set timeout for loading
            loadTimeout = setTimeout(() => {
                console.warn('Game loading timeout:', window.currentGameUrl);
                if (gameLoading && gameLoading.style.display === 'flex') {
                    gameLoading.style.display = 'none';
                    if (gameThumbnail) gameThumbnail.style.display = 'block';
                    showGameError('Game loading timeout. Please try again.');
                }
            }, 15000); // 15 second timeout
            
            // Start loading the game
            setTimeout(() => {
                console.log('🔄 Loading game:', window.currentGameUrl);
                
                let gameUrl = window.currentGameUrl;
                console.log('🎯 Setting iframe source to:', gameUrl);
                
                // Set the iframe source
                gameIframe.src = gameUrl;
                console.log('✅ Game iframe src set successfully');
            }, 500); // Reduced delay
        }
    }
    
    function showGameError(message = 'Game Loading Error') {
        const errorHtml = `
            <div class="game-error" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 2rem; text-align: center; background: #f8fafc; border-radius: 12px;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #f59e0b; margin-bottom: 1rem;"></i>
                <h3 style="font-size: 1.3rem; color: #1e293b; margin-bottom: 0.5rem;">${message}</h3>
                <p style="color: #64748b; margin-bottom: 1.5rem; line-height: 1.5;">The game couldn't be loaded. This might be due to network issues or the game being temporarily unavailable.</p>
                <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
                    <button class="retry-btn" onclick="location.reload()" style="background: var(--primary-color, #6366f1); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; font-weight: 500;">
                        <i class="fas fa-redo"></i> Retry
                    </button>
                    <button class="back-btn" onclick="window.location.href='index.html'" style="background: transparent; color: var(--primary-color, #6366f1); border: 2px solid var(--primary-color, #6366f1); padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; font-weight: 500;">
                        <i class="fas fa-home"></i> Back to Games
                    </button>
                </div>
            </div>
        `;
        
        if (gameThumbnail) {
            gameThumbnail.innerHTML = errorHtml;
            gameThumbnail.style.display = 'flex';
            gameThumbnail.style.alignItems = 'center';
            gameThumbnail.style.justifyContent = 'center';
        }
    }
}

// Game Controls
function initGameControls() {
    const pauseBtn = document.getElementById('pauseBtn');
    const restartBtn = document.getElementById('restartBtn');
    const muteBtn = document.getElementById('muteBtn');
    
    let isPaused = false;
    let isMuted = false;
    
    if (pauseBtn) {
        pauseBtn.addEventListener('click', function() {
            isPaused = !isPaused;
            this.innerHTML = isPaused ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';
            this.title = isPaused ? 'Resume' : 'Pause';
            
            // Send message to game iframe (if game supports it)
            const gameIframe = document.getElementById('gameIframe');
            if (gameIframe && gameIframe.contentWindow) {
                gameIframe.contentWindow.postMessage({
                    type: 'pause',
                    paused: isPaused
                }, '*');
            }
        });
    }
    
    if (restartBtn) {
        restartBtn.addEventListener('click', function() {
            const gameIframe = document.getElementById('gameIframe');
            if (gameIframe && gameIframe.src !== 'about:blank') {
                gameIframe.src = gameIframe.src; // Reload the game
            }
        });
    }
    
    if (muteBtn) {
        muteBtn.addEventListener('click', function() {
            isMuted = !isMuted;
            this.innerHTML = isMuted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
            this.title = isMuted ? 'Unmute' : 'Mute';
            
            // Send message to game iframe (if game supports it)
            const gameIframe = document.getElementById('gameIframe');
            if (gameIframe && gameIframe.contentWindow) {
                gameIframe.contentWindow.postMessage({
                    type: 'mute',
                    muted: isMuted
                }, '*');
            }
        });
    }
}

// Fullscreen Functionality
function initFullscreen() {
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const gameFrame = document.querySelector('.game-frame');
    
    if (fullscreenBtn && gameFrame) {
        fullscreenBtn.addEventListener('click', function() {
            if (!document.fullscreenElement) {
                gameFrame.requestFullscreen().then(() => {
                    this.innerHTML = '<i class="fas fa-compress"></i>';
                    this.title = 'Exit Fullscreen';
                }).catch(err => {
                    console.error('Error attempting to enable fullscreen:', err);
                });
            } else {
                document.exitFullscreen().then(() => {
                    this.innerHTML = '<i class="fas fa-expand"></i>';
                    this.title = 'Fullscreen';
                });
            }
        });
        
        // Listen for fullscreen changes
        document.addEventListener('fullscreenchange', function() {
            if (!document.fullscreenElement) {
                fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
                fullscreenBtn.title = 'Fullscreen';
            }
        });
    }
}

// Game Actions
function initGameActions() {
    const favoriteBtn = document.querySelector('.favorite-btn');
    const shareBtn = document.querySelector('.share-btn');
    const reportBtn = document.querySelector('.report-btn');
    
    // Favorite functionality
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', function() {
            const isFavorite = this.classList.contains('active');
            
            if (isFavorite) {
                this.classList.remove('active');
                this.innerHTML = '<i class="far fa-heart"></i><span>Favorite</span>';
                removeFavorite();
            } else {
                this.classList.add('active');
                this.innerHTML = '<i class="fas fa-heart"></i><span>Favorited</span>';
                addFavorite();
            }
        });
        
        // Check if game is already favorited
        checkFavoriteStatus();
    }
    
    // Share functionality
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            openShareModal();
        });
    }
    
    // Report functionality
    if (reportBtn) {
        reportBtn.addEventListener('click', function() {
            reportGame();
        });
    }
    
    function addFavorite() {
        const favorites = getFavorites();
        const gameId = new URLSearchParams(window.location.search).get('game') || 'temple';
        
        if (!favorites.includes(gameId)) {
            favorites.push(gameId);
            localStorage.setItem('zingo_favorites', JSON.stringify(favorites));
        }
        
        // Track favorite event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'add_favorite', {
                game_name: window.currentGameData?.title || 'Unknown'
            });
        }
    }
    
    function removeFavorite() {
        const favorites = getFavorites();
        const gameId = new URLSearchParams(window.location.search).get('game') || 'temple';
        const index = favorites.indexOf(gameId);
        
        if (index > -1) {
            favorites.splice(index, 1);
            localStorage.setItem('zingo_favorites', JSON.stringify(favorites));
        }
    }
    
    function getFavorites() {
        try {
            return JSON.parse(localStorage.getItem('zingo_favorites') || '[]');
        } catch {
            return [];
        }
    }
    
    function checkFavoriteStatus() {
        const favorites = getFavorites();
        const gameId = new URLSearchParams(window.location.search).get('game') || 'temple';
        
        if (favorites.includes(gameId) && favoriteBtn) {
            favoriteBtn.classList.add('active');
            favoriteBtn.innerHTML = '<i class="fas fa-heart"></i><span>Favorited</span>';
        }
    }
    
    function reportGame() {
        // Simple report functionality
        const reason = prompt('Please tell us why you\'re reporting this game:');
        if (reason && reason.trim()) {
            alert('Thank you for your report. We\'ll review it shortly.');
            
            // Track report event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'report_game', {
                    game_name: window.currentGameData?.title || 'Unknown',
                    reason: reason.substring(0, 100) // Limit reason length
                });
            }
        }
    }
}

// Share Modal
function initShareModal() {
    const shareBtn = document.querySelector('.share-btn');
    const shareModal = document.getElementById('shareModal');
    const closeModalBtn = document.getElementById('closeShareModal');
    const shareOptions = document.querySelectorAll('.share-option');
    
    function openShareModal() {
        if (shareModal) {
            shareModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeShareModal() {
        if (shareModal) {
            shareModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeShareModal);
    }
    
    // Close modal when clicking outside
    if (shareModal) {
        shareModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeShareModal();
            }
        });
    }
    
    // Handle share options
    shareOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const type = this.classList.contains('facebook') ? 'facebook' :
                        this.classList.contains('twitter') ? 'twitter' :
                        this.classList.contains('whatsapp') ? 'whatsapp' :
                        'copy-link';
            
            shareGame(type);
            closeShareModal();
        });
    });
    
    function shareGame(platform) {
        const gameTitle = window.currentGameData?.title || 'Amazing Game';
        const gameUrl = window.location.href;
        const shareText = `Check out this awesome game: ${gameTitle}`;
        
        switch (platform) {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(gameUrl)}`, '_blank', 'width=600,height=400');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(gameUrl)}`, '_blank', 'width=600,height=400');
                break;
            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + gameUrl)}`, '_blank');
                break;
            case 'copy-link':
                copyToClipboard(gameUrl);
                showNotification('Link copied to clipboard!');
                break;
        }
        
        // Track share event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'share', {
                method: platform,
                content_type: 'game',
                item_id: window.currentGameData?.title || 'Unknown'
            });
        }
    }
    
    // Make openShareModal globally accessible
    window.openShareModal = openShareModal;
}

// Utility Functions
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).catch(err => {
            console.error('Could not copy text: ', err);
            fallbackCopyTextToClipboard(text);
        });
    } else {
        fallbackCopyTextToClipboard(text);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Fallback: Could not copy text: ', err);
    }
    
    document.body.removeChild(textArea);
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 8px;
        z-index: 1001;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    // Add animation keyframes
    if (!document.getElementById('notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC to close modal
    if (e.key === 'Escape') {
        const shareModal = document.getElementById('shareModal');
        if (shareModal && shareModal.classList.contains('active')) {
            shareModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // F for fullscreen
    if (e.key === 'f' || e.key === 'F') {
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        if (fullscreenBtn && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            fullscreenBtn.click();
        }
    }
    
    // Space for pause/play
    if (e.key === ' ' || e.key === 'Spacebar') {
        const pauseBtn = document.getElementById('pauseBtn');
        if (pauseBtn && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            e.preventDefault();
            pauseBtn.click();
        }
    }
});

// Performance monitoring
function trackGamePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData && typeof gtag !== 'undefined') {
                    gtag('event', 'timing_complete', {
                        name: 'game_page_load',
                        value: Math.round(perfData.loadEventEnd - perfData.loadEventStart)
                    });
                }
            }, 0);
        });
    }
}

// Initialize performance tracking
trackGamePerformance();

// Handle messages from game iframe
window.addEventListener('message', function(event) {
    // Handle messages from the game iframe
    if (event.data && typeof event.data === 'object') {
        switch (event.data.type) {
            case 'game_loaded':
                console.log('Game loaded successfully');
                break;
            case 'game_score':
                console.log('Game score:', event.data.score);
                break;
            case 'game_ended':
                console.log('Game ended');
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'game_complete', {
                        game_name: window.currentGameData?.title || 'Unknown',
                        score: event.data.score || 0
                    });
                }
                break;
        }
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('Game page error:', e.error);
    
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            description: e.error?.toString() || 'Unknown error',
            fatal: false
        });
    }
});