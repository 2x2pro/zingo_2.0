/**
 * Enhanced Image Loading System
 * Handles multiple image sources with graceful fallbacks
 */

class ImageLoader {
    constructor() {
        this.cache = new Map();
        this.loadingPromises = new Map();
    }

    /**
     * Load image with multiple fallback sources
     */
    async loadImageWithFallbacks(imageSources, element, altText = 'Game Image') {
        const cacheKey = imageSources.join('|');
        
        // Check cache first
        if (this.cache.has(cacheKey)) {
            const cachedUrl = this.cache.get(cacheKey);
            this.setImageSource(element, cachedUrl, altText);
            return cachedUrl;
        }

        // Check if we're already loading this image
        if (this.loadingPromises.has(cacheKey)) {
            const url = await this.loadingPromises.get(cacheKey);
            this.setImageSource(element, url, altText);
            return url;
        }

        // Start loading
        const loadingPromise = this.tryImageSources(imageSources);
        this.loadingPromises.set(cacheKey, loadingPromise);

        try {
            const successfulUrl = await loadingPromise;
            this.cache.set(cacheKey, successfulUrl);
            this.setImageSource(element, successfulUrl, altText);
            return successfulUrl;
        } catch (error) {
            console.warn('All image sources failed:', error);
            // Use final fallback
            const fallbackUrl = this.generateFinalFallback(altText);
            this.setImageSource(element, fallbackUrl, altText);
            return fallbackUrl;
        } finally {
            this.loadingPromises.delete(cacheKey);
        }
    }

    /**
     * Try image sources in order until one succeeds
     */
    async tryImageSources(sources) {
        for (let i = 0; i < sources.length; i++) {
            const url = sources[i];
            try {
                await this.testImageLoad(url);
                console.log(`✅ Image loaded: ${url}`);
                return url;
            } catch (error) {
                console.log(`❌ Image failed (${i + 1}/${sources.length}): ${url}`);
                if (i === sources.length - 1) {
                    throw new Error('All image sources failed');
                }
            }
        }
    }

    /**
     * Test if an image URL loads successfully
     */
    testImageLoad(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(url);
            img.onerror = () => reject(new Error(`Failed to load: ${url}`));
            img.src = url;
        });
    }

    /**
     * Set image source on element
     */
    setImageSource(element, url, altText) {
        if (element) {
            element.src = url;
            element.alt = altText;
            element.classList.add('image-loaded');
        }
    }

    /**
     * Generate final fallback image
     */
    generateFinalFallback(altText) {
        const encodedText = encodeURIComponent(altText);
        return `https://via.placeholder.com/400x300/6366f1/ffffff?text=${encodedText}`;
    }

    /**
     * Preload images for better performance
     */
    preloadImage(url) {
        if (this.cache.has(url)) return Promise.resolve(url);
        
        const promise = this.testImageLoad(url);
        promise.then(() => this.cache.set(url, url));
        return promise;
    }

    /**
     * Create enhanced img element with automatic fallbacks
     */
    createEnhancedImage(game, className = '') {
        const img = document.createElement('img');
        img.className = `enhanced-image ${className}`;
        img.alt = `${game.title} - ${game.category} game`;
        img.loading = 'lazy';

        // Add loading placeholder
        img.style.background = 'linear-gradient(45deg, #f0f0f0, #e0e0e0)';
        img.style.minHeight = '150px';

        // Get image sources
        if (window.gameLoader) {
            const imageSources = window.gameLoader.getImageSources(
                game.title, 
                game.category, 
                game.gameUrl, 
                game.title.toLowerCase().replace(/[^a-z0-9]/g, '-')
            );
            
            // Load with fallbacks
            this.loadImageWithFallbacks(imageSources, img, img.alt);
        } else {
            // Fallback if gameLoader not available
            img.src = game.image;
            img.onerror = () => {
                img.src = this.generateFinalFallback(game.title);
            };
        }

        return img;
    }

    /**
     * Enhance existing images with fallback loading
     */
    enhanceExistingImages() {
        const images = document.querySelectorAll('img[data-game-title]');
        images.forEach(img => {
            const gameTitle = img.dataset.gameTitle;
            const gameCategory = img.dataset.gameCategory || 'Arcade';
            const gameUrl = img.dataset.gameUrl || '';

            if (window.gameLoader) {
                const imageSources = window.gameLoader.getImageSources(
                    gameTitle, 
                    gameCategory, 
                    gameUrl, 
                    gameTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')
                );
                
                this.loadImageWithFallbacks(imageSources, img, `${gameTitle} - ${gameCategory} game`);
            }
        });
    }

    /**
     * Clear cache (useful for development)
     */
    clearCache() {
        this.cache.clear();
        this.loadingPromises.clear();
        console.log('🧹 Image cache cleared');
    }
}

// Create global instance
window.imageLoader = new ImageLoader();

// Auto-enhance images when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🖼️ Image loader initialized');
    
    // Enhance existing images after a short delay
    setTimeout(() => {
        window.imageLoader.enhanceExistingImages();
    }, 1000);
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImageLoader;
}