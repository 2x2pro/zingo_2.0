/**
 * Dynamic iframe game loader system
 * Reads from iframes.txt and dynamically generates games
 */

class IframeGameLoader {
    constructor() {
        this.games = new Map();
        this.categories = new Set();
        this.iframeFilePath = 'games/iframes.txt';
    }

    /**
     * Load and parse iframes from the text file
     */
    async loadIframes() {
        try {
            console.log('🔄 Loading iframes from:', this.iframeFilePath);
            
            // First try to fetch the file
            let content = null;
            
            try {
                const response = await fetch(this.iframeFilePath);
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                content = await response.text();
                console.log('✅ Successfully loaded iframes.txt via fetch');
                
            } catch (fetchError) {
                console.warn('⚠️ Fetch failed, using fallback data:', fetchError.message);
                
                // Fallback: Use JavaScript data if available
                if (window.GAMES_IFRAME_DATA) {
                    console.log('✅ Using JavaScript games data');
                    content = window.GAMES_IFRAME_DATA;
                } else {
                    // Final fallback: Use embedded iframe data
                    content = this.getFallbackIframes();
                }
            }
            
            const iframes = this.parseIframes(content);
            
            console.log(`✅ Loaded ${iframes.length} iframes`);
            
            // Generate game data from iframes
            this.generateGameData(iframes);
            
            return this.games;
            
        } catch (error) {
            console.error('❌ Error loading iframes:', error);
            
            // Last resort: Generate sample games
            this.generateSampleGames();
            return this.games;
        }
    }

    /**
     * Fallback iframe data for local development
     */
    getFallbackIframes() {
        return `<iframe src="https://zv1y2i8p.play.gamezop.com/g/rJJMVIa8p-x" width="800" height="600" frameborder="0" allowfullscreen></iframe>
<iframe src="https://zv1y2i8p.play.gamezop.com/g/hgempP8Sc" width="800" height="600" frameborder="0" allowfullscreen></iframe>
<iframe src="https://zv1y2i8p.play.gamezop.com/g/SkQwnwnbK" width="800" height="600" frameborder="0" allowfullscreen></iframe>
<iframe src="https://zv1y2i8p.play.gamezop.com/g/BJ9bvzIKdJl" width="800" height="600" frameborder="0" allowfullscreen></iframe>
<iframe src="https://zv1y2i8p.play.gamezop.com/g/H1Tz6z1Dqym" width="800" height="600" frameborder="0" allowfullscreen></iframe>
<iframe src="https://www.htmlgames.com/game/Ludo" width="800" height="600" frameborder="0" allowfullscreen></iframe>
<iframe src="https://www.htmlgames.com/game/Pinball" width="800" height="600" frameborder="0" allowfullscreen></iframe>
<iframe src="https://www.htmlgames.com/game/Carrom%2BPool" width="800" height="600" frameborder="0" allowfullscreen></iframe>
<iframe src="https://zv1y2i8p.play.gamezop.com/g/PLQTtp9Ei" width="800" height="600" frameborder="0" allowfullscreen></iframe>
<iframe src="https://business.gamezop.com/html5-games/Dragon-Annihilation/PdIZyZNAe" width="800" height="600" frameborder="0" allowfullscreen></iframe>
<iframe src="https://www.htmlgames.com/game/2048" width="800" height="600" frameborder="0" allowfullscreen></iframe>
<iframe src="https://www.htmlgames.com/game/Sudoku" width="800" height="600" frameborder="0" allowfullscreen></iframe>
<iframe src="https://www.htmlgames.com/game/Tic%2BTac%2BToe" width="800" height="600" frameborder="0" allowfullscreen></iframe>
<iframe src="https://www.htmlgames.com/game/Checkers" width="800" height="600" frameborder="0" allowfullscreen></iframe>
<iframe src="https://www.htmlgames.com/game/Chess" width="800" height="600" frameborder="0" allowfullscreen></iframe>
<iframe src="https://www.htmlgames.com/game/Word%2BSearch" width="800" height="600" frameborder="0" allowfullscreen></iframe>
<iframe src="https://www.htmlgames.com/game/Memory%2BMatch" width="800" height="600" frameborder="0" allowfullscreen></iframe>
<iframe src="https://www.htmlgames.com/game/Mahjong%2BSolitaire" width="800" height="600" frameborder="0" allowfullscreen></iframe>
<iframe src="https://www.htmlgames.com/game/Solitaire" width="800" height="600" frameborder="0" allowfullscreen></iframe>
<iframe src="https://www.htmlgames.com/game/Spider%2BSolitaire" width="800" height="600" frameborder="0" allowfullscreen></iframe>`;
    }

    /**
     * Generate sample games when all else fails
     */
    generateSampleGames() {
        console.log('🎲 Generating sample games as fallback');
        
        const sampleIframes = this.getFallbackIframes();
        const iframes = this.parseIframes(sampleIframes);
        this.generateGameData(iframes);
        
        console.log(`🎮 Generated ${this.games.size} sample games`);
    }

    /**
     * Parse iframe HTML tags and extract URLs
     */
    parseIframes(content) {
        const iframes = [];
        const lines = content.split('\n');
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.startsWith('<iframe')) {
                const srcMatch = line.match(/src="([^"]+)"/);
                const widthMatch = line.match(/width="(\d+)"/);
                const heightMatch = line.match(/height="(\d+)"/);
                
                if (srcMatch) {
                    iframes.push({
                        id: `game_${i + 1}`,
                        lineNumber: i + 1,
                        src: srcMatch[1],
                        width: widthMatch ? widthMatch[1] : '800',
                        height: heightMatch ? heightMatch[1] : '600',
                        rawHtml: line
                    });
                }
            }
        }
        
        return iframes;
    }

    /**
     * Generate game metadata from iframe URLs
     */
    generateGameData(iframes) {
        this.games.clear();
        this.categories.clear();

        iframes.forEach((iframe, index) => {
            const gameData = this.extractGameInfo(iframe, index);
            this.games.set(gameData.id, gameData);
            this.categories.add(gameData.category);
        });

        console.log(`🎮 Generated ${this.games.size} games in ${this.categories.size} categories`);
    }

    /**
     * Extract game information from iframe URL
     */
    extractGameInfo(iframe, index) {
        const url = iframe.src;
        let title = '';
        let category = 'Arcade';
        let description = '';
        let image = '';
        
        // Extract game info based on URL patterns
        if (url.includes('gamezop.com')) {
            // Extract from Gamezop URLs
            const gameIdMatch = url.match(/\/g\/([^/?]+)/);
            if (gameIdMatch) {
                const gameId = gameIdMatch[1];
                title = this.generateTitleFromId(gameId);
                category = this.categorizeBySrc(url, title);
                description = `Play ${title} - An exciting ${category.toLowerCase()} game from Gamezop!`;
                image = this.generateGameImage(title, category, url);
            }
        } else if (url.includes('htmlgames.com')) {
            // Extract from HTMLGames URLs
            const gameMatch = url.match(/\/game\/([^/?]+)/);
            if (gameMatch) {
                const gameName = decodeURIComponent(gameMatch[1]).replace(/\+/g, ' ');
                title = gameName;
                category = this.categorizeByName(gameName);
                description = `Play ${title} - A classic ${category.toLowerCase()} game!`;
                image = this.generateGameImage(title, category, url);
            }
        } else if (url.includes('business.gamezop.com')) {
            // Extract from Business Gamezop URLs
            const gameMatch = url.match(/games\/([^/]+)\/([^/?]+)/);
            if (gameMatch) {
                const gameName = gameMatch[1].replace(/-/g, ' ');
                title = gameName;
                category = this.categorizeBySrc(url, title);
                description = `Play ${title} - An amazing ${category.toLowerCase()} gaming experience!`;
                image = this.generateGameImage(title, category, url);
            }
        } else {
            // Generic extraction
            title = `Game ${index + 1}`;
            category = 'Arcade';
            description = `Play this exciting ${category.toLowerCase()} game!`;
            image = this.generateGameImage(title, category, url);
        }

        return {
            id: `iframe_game_${index + 1}`,
            gameId: iframe.id,
            title: title,
            category: category,
            description: description,
            image: image,
            gameUrl: url,
            gameType: 'iframe',
            width: iframe.width,
            height: iframe.height,
            plays: this.generateRandomPlays(),
            rating: this.generateRandomRating(),
            controls: this.generateControls(category),
            objective: this.generateObjective(title, category),
            goal: this.generateGoal(title, category),
            tags: this.generateTags(title, category),
            iframeHtml: iframe.rawHtml,
            source: this.getSource(url)
        };
    }

    /**
     * Generate title from game ID
     */
    generateTitleFromId(gameId) {
        // Convert game IDs to readable titles
        const titleMap = {
            'rJJMVIa8p-x': 'Racing Thunder',
            'hgempP8Sc': 'Space Adventure',
            'SkQwnwnbK': 'Puzzle Master',
            'BJ9bvzIKdJl': 'Action Hero',
            'H1Tz6z1Dqym': 'Strategy Empire',
            'PLQTtp9Ei': 'Bubble Shooter',
            'PdIZyZNAe': 'Dragon Annihilation'
        };

        return titleMap[gameId] || `Game ${gameId.substring(0, 8)}`;
    }

    /**
     * Categorize games by source URL and title
     */
    categorizeBySrc(url, title) {
        const lowerTitle = title.toLowerCase();
        const lowerUrl = url.toLowerCase();

        if (lowerTitle.includes('racing') || lowerTitle.includes('car') || lowerTitle.includes('drive') || lowerUrl.includes('racing')) {
            return 'Racing';
        } else if (lowerTitle.includes('puzzle') || lowerTitle.includes('match') || lowerTitle.includes('sudoku') || lowerTitle.includes('2048')) {
            return 'Puzzle';
        } else if (lowerTitle.includes('action') || lowerTitle.includes('hero') || lowerTitle.includes('dragon') || lowerTitle.includes('fight')) {
            return 'Action';
        } else if (lowerTitle.includes('sport') || lowerTitle.includes('soccer') || lowerTitle.includes('football') || lowerTitle.includes('basket')) {
            return 'Sports';
        } else if (lowerTitle.includes('strategy') || lowerTitle.includes('chess') || lowerTitle.includes('checkers')) {
            return 'Strategy';
        } else if (lowerTitle.includes('adventure') || lowerTitle.includes('space') || lowerTitle.includes('quest')) {
            return 'Adventure';
        } else if (lowerTitle.includes('card') || lowerTitle.includes('solitaire') || lowerTitle.includes('poker')) {
            return 'Card';
        } else {
            return 'Arcade';
        }
    }

    /**
     * Categorize by game name
     */
    categorizeByName(gameName) {
        const name = gameName.toLowerCase();
        
        if (name.includes('solitaire') || name.includes('card')) return 'Card';
        if (name.includes('chess') || name.includes('checkers')) return 'Strategy';
        if (name.includes('puzzle') || name.includes('sudoku') || name.includes('2048')) return 'Puzzle';
        if (name.includes('word') || name.includes('memory')) return 'Word';
        if (name.includes('ludo') || name.includes('carrom')) return 'Board';
        if (name.includes('pinball')) return 'Arcade';
        if (name.includes('tic tac toe')) return 'Strategy';
        
        return 'Casual';
    }

    /**
     * Generate game image URL with multiple fallbacks
     */
    generateGameImage(gameName, category = 'Arcade', gameUrl = '') {
        const slug = gameName.toLowerCase().replace(/[^a-z0-9]/g, '-');
        
        // Try multiple image sources in order of preference
        const imageSources = this.getImageSources(gameName, category, gameUrl, slug);
        
        // Return the first source (we'll handle fallbacks in HTML)
        return imageSources[0];
    }

    /**
     * Get multiple image sources for a game
     */
    getImageSources(gameName, category, gameUrl, slug) {
        const sources = [];
        
        // 1. Try game-specific image from URL patterns
        if (gameUrl.includes('gamezop.com')) {
            const gameId = this.extractGameId(gameUrl);
            if (gameId) {
                sources.push(`https://static.gamezop.com/games/${gameId}/cover.jpg`);
                sources.push(`https://static.gamezop.com/games/${gameId}/icon.png`);
                sources.push(`https://business.gamezop.com/assets/games/${gameId}/cover.jpg`);
            }
        }
        
        // 2. Try HTMLGames thumbnails
        if (gameUrl.includes('htmlgames.com')) {
            const cleanName = gameName.toLowerCase().replace(/[^a-z0-9]/g, '');
            sources.push(`https://www.htmlgames.com/games/${cleanName}/thumb.jpg`);
            sources.push(`https://www.htmlgames.com/games/${cleanName}/screenshot.png`);
        }
        
        // 3. Try category-based stock images
        sources.push(this.getCategoryImage(category, gameName));
        
        // 4. Try game icon services
        sources.push(`https://img.icons8.com/color/400/${slug}.png`);
        sources.push(`https://cdn.jsdelivr.net/npm/game-icons@1.0.0/svg/${slug}.svg`);
        
        // 5. Create custom banner image with better styling
        sources.push(this.generateCustomBanner(gameName, category));
        
        // 6. Final fallback - styled placeholder
        sources.push(this.generateStyledPlaceholder(gameName, category));
        
        return sources;
    }

    /**
     * Extract game ID from various URL patterns
     */
    extractGameId(url) {
        // Gamezop patterns
        const gamezopMatch = url.match(/\/g\/([^/?#]+)/);
        if (gamezopMatch) return gamezopMatch[1];
        
        // Business Gamezop patterns  
        const businessMatch = url.match(/games\/([^/]+)\/([^/?#]+)/);
        if (businessMatch) return businessMatch[1];
        
        return null;
    }

    /**
     * Get category-based image
     */
    getCategoryImage(category, gameName) {
        const categoryImages = {
            'Racing': `https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop&q=80&txt=${encodeURIComponent(gameName)}`,
            'Puzzle': `https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop&q=80&txt=${encodeURIComponent(gameName)}`,
            'Action': `https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop&q=80&txt=${encodeURIComponent(gameName)}`,
            'Sports': `https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&q=80&txt=${encodeURIComponent(gameName)}`,
            'Strategy': `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&q=80&txt=${encodeURIComponent(gameName)}`,
            'Adventure': `https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop&q=80&txt=${encodeURIComponent(gameName)}`,
            'Card': `https://images.unsplash.com/photo-1571770095004-6b61b1cf308a?w=400&h=300&fit=crop&q=80&txt=${encodeURIComponent(gameName)}`,
            'Arcade': `https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop&q=80&txt=${encodeURIComponent(gameName)}`
        };
        
        return categoryImages[category] || categoryImages['Arcade'];
    }

    /**
     * Generate custom banner with game branding
     */
    generateCustomBanner(gameName, category) {
        const colors = this.getCategoryColors(category);
        const icon = this.getCategoryIcon(category);
        
        // Create a more appealing banner URL
        return `https://dummyimage.com/400x300/${colors.bg}/${colors.text}.png&text=${icon}%20${encodeURIComponent(gameName)}`;
    }

    /**
     * Generate styled placeholder with better aesthetics
     */
    generateStyledPlaceholder(gameName, category) {
        const colors = this.getCategoryColors(category);
        return `https://via.placeholder.com/400x300/${colors.bg}/${colors.text}?text=${encodeURIComponent(`🎮 ${gameName}`)}`;
    }

    /**
     * Get category-specific colors
     */
    getCategoryColors(category) {
        const colorMap = {
            'Racing': { bg: 'ff4444', text: 'ffffff' },      // Red
            'Puzzle': { bg: '9c27b0', text: 'ffffff' },      // Purple  
            'Action': { bg: 'ff5722', text: 'ffffff' },      // Deep Orange
            'Sports': { bg: '4caf50', text: 'ffffff' },      // Green
            'Strategy': { bg: '2196f3', text: 'ffffff' },    // Blue
            'Adventure': { bg: 'ff9800', text: 'ffffff' },   // Orange
            'Card': { bg: '795548', text: 'ffffff' },        // Brown
            'Arcade': { bg: 'e91e63', text: 'ffffff' },      // Pink
            'Casual': { bg: '00bcd4', text: 'ffffff' }       // Cyan
        };
        
        return colorMap[category] || colorMap['Arcade'];
    }

    /**
     * Get category-specific icons  
     */
    getCategoryIcon(category) {
        const iconMap = {
            'Racing': '🏎️',
            'Puzzle': '🧩', 
            'Action': '⚔️',
            'Sports': '⚽',
            'Strategy': '♟️',
            'Adventure': '🗺️',
            'Card': '🃏',
            'Arcade': '🕹️',
            'Casual': '🎈'
        };
        
        return iconMap[category] || '🎮';
    }

    /**
     * Generate default image
     */
    generateDefaultImage(index) {
        const colors = ['4f46e5', 'ef4444', '10b981', 'f59e0b', '8b5cf6', 'ec4899'];
        const color = colors[index % colors.length];
        return `https://via.placeholder.com/400x300/${color}/ffffff?text=Game+${index}`;
    }

    /**
     * Generate random play count
     */
    generateRandomPlays() {
        const counts = ['1.2K', '856', '2.1K', '645', '3.4K', '1.8K', '967', '2.3K', '1.5K', '4.1K'];
        return counts[Math.floor(Math.random() * counts.length)];
    }

    /**
     * Generate random rating
     */
    generateRandomRating() {
        const ratings = ['4.2', '4.5', '4.1', '4.3', '4.7', '4.4', '4.6', '4.0', '4.8'];
        return ratings[Math.floor(Math.random() * ratings.length)];
    }

    /**
     * Generate controls description
     */
    generateControls(category) {
        const controlsMap = {
            'Racing': 'Use arrow keys or WASD to steer, space bar to brake',
            'Puzzle': 'Use mouse to click and drag pieces, keyboard for shortcuts',
            'Action': 'Use WASD to move, mouse to aim and shoot, space to jump',
            'Sports': 'Use arrow keys to move, space bar to kick/shoot',
            'Strategy': 'Use mouse to select and move pieces, click to make moves',
            'Adventure': 'Use WASD to move, mouse for interactions, space to jump',
            'Card': 'Use mouse to click and drag cards',
            'Arcade': 'Use arrow keys or mouse to control your character'
        };
        
        return controlsMap[category] || 'Use mouse or keyboard to play';
    }

    /**
     * Generate objective description
     */
    generateObjective(title, category) {
        const objectiveMap = {
            'Racing': 'Complete laps and reach the finish line first',
            'Puzzle': 'Solve challenges using logic and strategy',
            'Action': 'Defeat enemies and complete missions',
            'Sports': 'Score goals and win the match',
            'Strategy': 'Outsmart your opponent with tactical moves',
            'Adventure': 'Explore worlds and complete quests',
            'Card': 'Clear the board by following card game rules',
            'Arcade': 'Achieve high scores and beat your records'
        };
        
        return objectiveMap[category] || `Master the challenges in ${title}`;
    }

    /**
     * Generate goal description
     */
    generateGoal(title, category) {
        const goalMap = {
            'Racing': 'Win all races and become the champion',
            'Puzzle': 'Complete all levels with perfect scores',
            'Action': 'Save the day and defeat the final boss',
            'Sports': 'Win the tournament and claim victory',
            'Strategy': 'Master all tactics and win consistently',
            'Adventure': 'Complete the epic journey and discover all secrets',
            'Card': 'Master all card game variations',
            'Arcade': 'Achieve the ultimate high score'
        };
        
        return goalMap[category] || `Become the ultimate ${title} champion`;
    }

    /**
     * Generate tags for the game
     */
    generateTags(title, category) {
        const baseTags = [category.toLowerCase()];
        const titleWords = title.toLowerCase().split(' ');
        
        // Add relevant tags based on title words
        titleWords.forEach(word => {
            if (word.length > 3 && !baseTags.includes(word)) {
                baseTags.push(word);
            }
        });

        // Add category-specific tags
        const categoryTags = {
            'Racing': ['fast', 'cars', 'speed'],
            'Puzzle': ['brain', 'logic', 'solve'],
            'Action': ['adventure', 'fight', 'hero'],
            'Sports': ['compete', 'team', 'score'],
            'Strategy': ['think', 'plan', 'smart'],
            'Adventure': ['explore', 'journey', 'quest'],
            'Card': ['classic', 'cards', 'patience'],
            'Arcade': ['retro', 'classic', 'fun']
        };

        if (categoryTags[category]) {
            baseTags.push(...categoryTags[category]);
        }

        return baseTags.slice(0, 6); // Limit to 6 tags
    }

    /**
     * Get source platform name
     */
    getSource(url) {
        if (url.includes('gamezop.com')) return 'Gamezop';
        if (url.includes('htmlgames.com')) return 'HTML Games';
        return 'External';
    }

    /**
     * Get all games as an array
     */
    getAllGames() {
        return Array.from(this.games.values());
    }

    /**
     * Get games by category
     */
    getGamesByCategory(category) {
        return this.getAllGames().filter(game => game.category === category);
    }

    /**
     * Get all categories
     */
    getAllCategories() {
        return Array.from(this.categories);
    }

    /**
     * Get game by ID
     */
    getGame(gameId) {
        return this.games.get(gameId);
    }

    /**
     * Search games by title
     */
    searchGames(query) {
        const lowerQuery = query.toLowerCase();
        return this.getAllGames().filter(game => 
            game.title.toLowerCase().includes(lowerQuery) ||
            game.category.toLowerCase().includes(lowerQuery) ||
            game.tags.some(tag => tag.includes(lowerQuery))
        );
    }
}

// Export for use in other scripts
window.IframeGameLoader = IframeGameLoader;

// Auto-initialize if in browser
if (typeof window !== 'undefined') {
    window.gameLoader = new IframeGameLoader();
    console.log('🎮 Iframe Game Loader initialized');
}