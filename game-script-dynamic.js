/**
 * Dynamic Game Script for Zingo.gg
 * Loads games from iframes.txt dynamically
 */

// Global variables
let gameLoader = null;
let allGames = [];
let currentGameData = null;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🎮 Dynamic game system loading...');
    
    // Initialize the iframe game loader
    gameLoader = new IframeGameLoader();
    
    // Load games from iframes.txt
    await initializeGames();
    
    // Initialize game components based on page
    if (window.location.pathname.includes('game.html')) {
        initGamePage();
    } else if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        initHomePage();
    } else if (window.location.pathname.includes('categories.html')) {
        initCategoriesPage();
    }
});

/**
 * Initialize games from iframes.txt
 */
async function initializeGames() {
    try {
        console.log('📂 Loading games from iframes.txt...');
        
        const games = await gameLoader.loadIframes();
        allGames = gameLoader.getAllGames();
        
        console.log(`✅ Loaded ${allGames.length} games dynamically`);
        console.log('📊 Categories:', gameLoader.getAllCategories());
        
        // Store games globally
        window.allGames = allGames;
        window.gamesByCategory = {};
        
        gameLoader.getAllCategories().forEach(category => {
            window.gamesByCategory[category] = gameLoader.getGamesByCategory(category);
        });
        
        return allGames;
        
    } catch (error) {
        console.error('❌ Failed to initialize games:', error);
        return [];
    }
}

/**
 * Initialize game page
 */
function initGamePage() {
    console.log('🎯 Initializing game page...');
    
    // Get game ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('game');
    
    if (!gameId) {
        console.error('❌ No game ID provided');
        showGameError('No game specified');
        return;
    }
    
    // Find game by ID or index
    let game = findGameById(gameId);
    
    if (!game) {
        console.error('❌ Game not found:', gameId);
        showGameError('Game not found');
        return;
    }
    
    console.log('✅ Game found:', game.title);
    
    // Update page with game data
    updateGamePage(game);
    
    // Initialize game player
    initGamePlayer(game);
    
    // Store current game
    currentGameData = game;
    window.currentGameData = game;
}

/**
 * Find game by ID (supports multiple ID formats)
 */
function findGameById(gameId) {
    // Try direct ID match
    let game = gameLoader.getGame(gameId);
    if (game) return game;
    
    // Try to find by index (game_1, game_2, etc.)
    const indexMatch = gameId.match(/(\d+)$/);
    if (indexMatch) {
        const index = parseInt(indexMatch[1]) - 1;
        if (index >= 0 && index < allGames.length) {
            return allGames[index];
        }
    }
    
    // Try to find by title similarity
    const lowerGameId = gameId.toLowerCase().replace(/[-_]/g, ' ');
    game = allGames.find(g => 
        g.title.toLowerCase().replace(/[-_]/g, ' ').includes(lowerGameId) ||
        lowerGameId.includes(g.title.toLowerCase().replace(/[-_]/g, ' '))
    );
    
    return game;
}

/**
 * Update game page with game data
 */
function updateGamePage(game) {
    console.log('🔄 Updating game page UI...');
    
    // Update page title
    document.title = `${game.title} - Play Free Online | Zingo.gg`;
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = game.description;
    }
    
    // Update breadcrumbs and page elements
    const elements = {
        'game-category': game.category,
        'game-name': game.title,
        'gameTitle': game.title,
        'gameCategory': game.category,
        'gamePlays': `${game.plays} plays`,
        'gameDescription': game.description,
        'gameControls': game.controls,
        'gameObjective': game.objective,
        'gameGoal': game.goal
    };
    
    // Update all text elements
    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
            console.log(`✅ Updated ${id}: ${value}`);
        }
    });
    
    // Update game image with enhanced loading
    const gameImage = document.getElementById('gameImage');
    if (gameImage && window.imageLoader && gameLoader) {
        // Use enhanced image loading with multiple fallbacks
        const imageSources = gameLoader.getImageSources(
            game.title, 
            game.category, 
            game.gameUrl, 
            game.title.toLowerCase().replace(/[^a-z0-9]/g, '-')
        );
        
        window.imageLoader.loadImageWithFallbacks(
            imageSources, 
            gameImage, 
            `${game.title} - ${game.category} game`
        );
    } else if (gameImage) {
        // Fallback to original method
        gameImage.src = game.image;
        gameImage.alt = `${game.title} - ${game.category} game`;
        gameImage.onerror = function() {
            this.src = `https://via.placeholder.com/400x300/4f46e5/ffffff?text=${encodeURIComponent(game.title)}`;
        };
    }
    
    // Update game tags
    const tagsContainer = document.querySelector('.game-tags');
    if (tagsContainer && game.tags) {
        tagsContainer.innerHTML = game.tags.map(tag => 
            `<span class="tag">${tag}</span>`
        ).join('');
    }
    
    // Update rating
    const ratingNumber = document.querySelector('.rating-number');
    if (ratingNumber) {
        ratingNumber.textContent = game.rating;
    }
}

/**
 * Initialize game player functionality
 */
function initGamePlayer(game) {
    console.log('🎮 Initializing game player...');
    
    const playButton = document.getElementById('playButton');
    const gameLoading = document.getElementById('gameLoading');
    const gameThumbnail = document.getElementById('gameThumbnail');
    const gameIframe = document.getElementById('gameIframe');
    
    if (playButton) {
        playButton.addEventListener('click', function() {
            console.log('▶️ Starting game:', game.title);
            startDynamicGame(game);
        });
    }
    
    // Show thumbnail initially
    if (gameLoading) gameLoading.style.display = 'none';
    if (gameThumbnail) gameThumbnail.style.display = 'flex';
}

/**
 * Start the dynamic game
 */
function startDynamicGame(game) {
    console.log('🚀 Loading dynamic game:', game.title);
    
    const gameLoading = document.getElementById('gameLoading');
    const gameThumbnail = document.getElementById('gameThumbnail');
    const gameIframe = document.getElementById('gameIframe');
    const gameControls = document.getElementById('gameControls');
    
    // Show loading
    if (gameLoading) gameLoading.style.display = 'flex';
    if (gameThumbnail) gameThumbnail.style.display = 'none';
    
    // Set up iframe
    if (gameIframe) {
        gameIframe.onload = function() {
            console.log('✅ Game loaded successfully');
            if (gameLoading) gameLoading.style.display = 'none';
            if (gameControls) gameControls.style.display = 'flex';
            gameIframe.style.display = 'block';
        };
        
        gameIframe.onerror = function() {
            console.error('❌ Game failed to load');
            showGameError('Failed to load game');
            if (gameLoading) gameLoading.style.display = 'none';
            if (gameThumbnail) gameThumbnail.style.display = 'flex';
        };
        
        // Set iframe properties
        gameIframe.width = game.width || '100%';
        gameIframe.height = game.height || '100%';
        gameIframe.style.width = '100%';
        gameIframe.style.height = '100%';
        gameIframe.style.border = 'none';
        
        // Load the game
        setTimeout(() => {
            gameIframe.src = game.gameUrl;
            console.log('🔗 Loading game URL:', game.gameUrl);
        }, 500);
    }
}

/**
 * Show game error
 */
function showGameError(message) {
    console.error('🚨 Game error:', message);
    
    const gameLoading = document.getElementById('gameLoading');
    const gameThumbnail = document.getElementById('gameThumbnail');
    
    if (gameLoading) {
        gameLoading.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>${message}</p>
                <button onclick="location.reload()" class="retry-btn">Try Again</button>
            </div>
        `;
    }
    
    if (gameThumbnail) gameThumbnail.style.display = 'none';
}

/**
 * Initialize home page with dynamic games
 */
function initHomePage() {
    console.log('🏠 Initializing home page...');
    
    // Wait a bit for games to load
    setTimeout(() => {
        updateHomePageGames();
        initializeSearch();
    }, 1000);
}

/**
 * Update home page with dynamic games
 */
function updateHomePageGames() {
    const gamesGrid = document.querySelector('.games-grid');
    if (!gamesGrid || allGames.length === 0) return;
    
    console.log('🔄 Updating home page games grid...');
    
    // Take first 12 games for home page
    const featuredGames = allGames.slice(0, 12);
    
    gamesGrid.innerHTML = featuredGames.map((game, index) => `
        <div class="game-card" data-category="${game.category.toLowerCase()}">
            <a href="game.html?game=${game.id}" class="card-link">
                <div class="game-image">
                    <img data-game-title="${game.title}" 
                         data-game-category="${game.category}" 
                         data-game-url="${game.gameUrl}"
                         src="${game.image}" 
                         alt="${game.title}" 
                         loading="lazy" 
                         onerror="this.src='https://via.placeholder.com/300x200/4f46e5/ffffff?text=${encodeURIComponent(game.title)}'">
                    <div class="play-overlay">
                        <i class="fas fa-play"></i>
                    </div>
                    <div class="game-category-badge">${game.category}</div>
                </div>
                <div class="game-info">
                    <h3 class="game-title">${game.title}</h3>
                    <div class="game-meta">
                        <div class="game-rating">
                            <i class="fas fa-star"></i>
                            <span>${game.rating}</span>
                        </div>
                        <div class="game-plays">
                            <i class="fas fa-gamepad"></i>
                            <span>${game.plays}</span>
                        </div>
                    </div>
                    <p class="game-description">${game.description}</p>
                </div>
            </a>
        </div>
    `).join('');
    
    console.log(`✅ Updated home page with ${featuredGames.length} games`);
}

/**
 * Initialize categories page
 */
function initCategoriesPage() {
    console.log('📂 Initializing categories page...');
    
    setTimeout(() => {
        updateCategoriesPage();
    }, 1000);
}

/**
 * Update categories page with dynamic games
 */
function updateCategoriesPage() {
    const categoriesGrid = document.querySelector('.categories-grid');
    if (!categoriesGrid) return;
    
    console.log('🔄 Updating categories page...');
    
    const categories = gameLoader.getAllCategories();
    
    categoriesGrid.innerHTML = categories.map(category => {
        const categoryGames = gameLoader.getGamesByCategory(category);
        const firstGame = categoryGames[0];
        
        return `
            <div class="category-card" data-category="${category.toLowerCase()}">
                <div class="category-header">
                    <div class="category-image">
                        <img src="${firstGame ? firstGame.image : 'https://via.placeholder.com/300x200/4f46e5/ffffff?text=' + encodeURIComponent(category)}" 
                             alt="${category}" loading="lazy">
                        <div class="category-overlay">
                            <h3 class="category-title">${category}</h3>
                            <p class="category-count">${categoryGames.length} games</p>
                        </div>
                    </div>
                </div>
                <div class="category-games">
                    ${categoryGames.slice(0, 6).map(game => `
                        <a href="game.html?game=${game.id}" class="mini-game-card">
                            <img src="${game.image}" alt="${game.title}" loading="lazy" 
                                 onerror="this.src='https://via.placeholder.com/100x75/4f46e5/ffffff?text=${encodeURIComponent(game.title)}'">
                            <span class="mini-game-title">${game.title}</span>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
    
    console.log(`✅ Updated categories page with ${categories.length} categories`);
}

/**
 * Initialize search functionality
 */
function initializeSearch() {
    const searchInputs = document.querySelectorAll('[id*="search"], .search-input');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const query = this.value.trim();
            if (query.length >= 2) {
                performSearch(query);
            } else {
                clearSearchResults();
            }
        });
    });
}

/**
 * Perform search across dynamic games
 */
function performSearch(query) {
    if (!gameLoader) return;
    
    const results = gameLoader.searchGames(query);
    displaySearchResults(results, query);
}

/**
 * Display search results
 */
function displaySearchResults(results, query) {
    console.log(`🔍 Search "${query}" found ${results.length} results`);
    
    // Create or update search results container
    let resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) {
        resultsContainer = document.createElement('div');
        resultsContainer.id = 'search-results';
        resultsContainer.className = 'search-results';
        
        const mainContent = document.querySelector('main, .main-content');
        if (mainContent) {
            mainContent.appendChild(resultsContainer);
        }
    }
    
    if (results.length > 0) {
        resultsContainer.innerHTML = `
            <div class="search-results-header">
                <h2>Search Results for "${query}" (${results.length})</h2>
                <button onclick="clearSearchResults()" class="close-search">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="search-results-grid">
                ${results.slice(0, 20).map(game => `
                    <div class="search-result-card">
                        <a href="game.html?game=${game.id}">
                            <img src="${game.image}" alt="${game.title}" loading="lazy" 
                                 onerror="this.src='https://via.placeholder.com/200x150/4f46e5/ffffff?text=${encodeURIComponent(game.title)}'">
                            <div class="result-info">
                                <h3>${game.title}</h3>
                                <span class="result-category">${game.category}</span>
                                <div class="result-rating">
                                    <i class="fas fa-star"></i>
                                    <span>${game.rating}</span>
                                </div>
                            </div>
                        </a>
                    </div>
                `).join('')}
            </div>
        `;
        resultsContainer.style.display = 'block';
    } else {
        resultsContainer.innerHTML = `
            <div class="search-results-header">
                <h2>No results found for "${query}"</h2>
                <button onclick="clearSearchResults()" class="close-search">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>Try a different search term</p>
            </div>
        `;
        resultsContainer.style.display = 'block';
    }
}

/**
 * Clear search results
 */
function clearSearchResults() {
    const resultsContainer = document.getElementById('search-results');
    if (resultsContainer) {
        resultsContainer.style.display = 'none';
    }
}

// Export functions for global access
window.initializeGames = initializeGames;
window.startDynamicGame = startDynamicGame;
window.clearSearchResults = clearSearchResults;

console.log('🎯 Dynamic game script loaded');