/**
 * Sync Script for Games Data
 * This helps keep games-data.js in sync with games/iframes.txt
 * Run this whenever you update iframes.txt
 */

const fs = require('fs');
const path = require('path');

function syncGamesData() {
    try {
        console.log('🔄 Syncing games data...');
        
        // Read iframes.txt
        const iframesPath = path.join(__dirname, 'games', 'iframes.txt');
        const iframesContent = fs.readFileSync(iframesPath, 'utf8');
        
        console.log('✅ Read iframes.txt');
        
        // Generate games-data.js content
        const jsContent = `/**
 * Games Data for Zingo.gg
 * This file contains all the iframe games data to avoid CORS issues
 * Update this file when you want to add/remove games
 * 
 * Auto-generated from games/iframes.txt
 * Last sync: ${new Date().toISOString()}
 */

// Raw iframe HTML data - synced from iframes.txt
window.GAMES_IFRAME_DATA = \`${iframesContent.trim()}\`;

// Configuration
window.GAMES_CONFIG = {
    // Whether to try loading from iframes.txt first
    tryLoadFromFile: true,
    
    // Fallback to embedded data if file loading fails
    useFallbackData: true,
    
    // Debug mode for more logging
    debugMode: true,
    
    // Last sync timestamp
    lastSync: '${new Date().toISOString()}'
};

console.log('🎮 Games data loaded - ready for processing');
console.log('📊 Last sync:', window.GAMES_CONFIG.lastSync);`;
        
        // Write games-data.js
        const outputPath = path.join(__dirname, 'games-data.js');
        fs.writeFileSync(outputPath, jsContent);
        
        console.log('✅ Updated games-data.js');
        
        // Count games
        const gameCount = (iframesContent.match(/<iframe/g) || []).length;
        console.log(`🎮 Synced ${gameCount} games`);
        
    } catch (error) {
        console.error('❌ Sync failed:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    syncGamesData();
}

module.exports = { syncGamesData };