// Modern Zingo.gg JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initSearch();
    initCategoryTabs();
    initGameCards();
    initLoadMore();
    initAnimations();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            
            // Update ARIA attribute
            const expanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !expanded);
        });
    }
}

// Search Functionality
function initSearch() {
    const searchInputs = document.querySelectorAll('.search-input, #header-search');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', debounce(function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            filterGames(searchTerm);
        }, 300));
    });
    
    function filterGames(searchTerm) {
        // Dynamic search for loaded games
        const gameCards = document.querySelectorAll('.game-card');
        let visibleCount = 0;
        
        gameCards.forEach(card => {
            const title = card.querySelector('.game-title')?.textContent.toLowerCase() || '';
            const category = card.querySelector('.game-category-badge')?.textContent.toLowerCase() || '';
            
            if (searchTerm === '' || title.includes(searchTerm) || category.includes(searchTerm)) {
                card.style.display = 'block';
                card.classList.remove('filtered-out');
                visibleCount++;
            } else {
                card.style.display = 'none';
                card.classList.add('filtered-out');
            }
        });
        
        // Update results count and show no results message if needed
        updateResultsCount(visibleCount, searchTerm);
    }
}

// Category Tabs
function initCategoryTabs() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    const gameCards = document.querySelectorAll('.game-card');
    const sectionHeading = document.getElementById('games-heading');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active tab
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter games
            filterByCategory(category);
            
            // Update section heading
            const categoryName = this.querySelector('span').textContent;
            if (sectionHeading) {
                sectionHeading.textContent = category === 'all' ? 'Popular Games' : `${categoryName} Games`;
            }
            
            // Scroll to games section smoothly
            document.querySelector('.games-section').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
    
    function filterByCategory(category) {
        gameCards.forEach(card => {
            const cardCategory = card.dataset.category;
            
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                card.classList.remove('filtered-out');
                // Add animation
                card.classList.add('fade-in-up');
            } else {
                card.style.display = 'none';
                card.classList.add('filtered-out');
            }
        });
        
        updateResultsCount();
    }
}

// Game Cards Interactions
function initGameCards() {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Handle click events
        card.addEventListener('click', function(e) {
            // Add click analytics if needed
            const gameTitle = this.querySelector('.game-title')?.textContent;
            const gameCategory = this.querySelector('.game-category-badge')?.textContent;
            
            // Google Analytics event (if gtag is available)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'game_click', {
                    'game_name': gameTitle,
                    'game_category': gameCategory
                });
            }
        });
    });
}

// Load More Functionality
function initLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const gamesGrid = document.querySelector('.games-grid');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Show loading state
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.disabled = true;
            
            // Simulate loading more games (in real app, this would be an API call)
            setTimeout(() => {
                loadMoreGames();
                this.innerHTML = '<i class="fas fa-plus"></i> Load More Games';
                this.disabled = false;
            }, 1000);
        });
    }
    
    function loadMoreGames() {
        // This would typically fetch from an API
        // For now, we'll duplicate some existing games
        const existingCards = document.querySelectorAll('.game-card');
        const cardsToAdd = 6;
        
        for (let i = 0; i < cardsToAdd && i < existingCards.length; i++) {
            const originalCard = existingCards[i];
            const clonedCard = originalCard.cloneNode(true);
            
            // Update the cloned card's data
            const title = clonedCard.querySelector('.game-title');
            if (title) {
                title.textContent = title.textContent + ' 2';
            }
            
            // Add animation class
            clonedCard.classList.add('fade-in-up');
            
            gamesGrid.appendChild(clonedCard);
        }
        
        updateResultsCount();
    }
}

// Animation on Scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe game cards
    document.querySelectorAll('.game-card').forEach(card => {
        observer.observe(card);
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function updateResultsCount(count, searchTerm) {
    const sectionHeading = document.getElementById('games-heading');
    const gamesGrid = document.getElementById('dynamic-games-grid');
    
    if (sectionHeading) {
        const currentText = sectionHeading.textContent;
        const baseText = currentText.replace(/\s*\(\d+\)$/, '');
        sectionHeading.textContent = `${baseText} (${count})`;
    }
    
    // Show/hide no results message
    let noResultsMsg = document.querySelector('.no-results-message');
    
    if (count === 0 && searchTerm) {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.className = 'no-results-message';
            noResultsMsg.innerHTML = `
                <div class="no-results-content">
                    <i class="fas fa-search"></i>
                    <h3>No games found</h3>
                    <p>Try searching with different keywords or browse our categories.</p>
                </div>
            `;
            gamesGrid.appendChild(noResultsMsg);
        }
        noResultsMsg.style.display = 'block';
    } else if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
    }
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // ESC key to clear search
    if (e.key === 'Escape') {
        const searchInputs = document.querySelectorAll('.search-input');
        searchInputs.forEach(input => {
            if (input.value) {
                input.value = '';
                input.dispatchEvent(new Event('input'));
            }
        });
    }
    
    // Enter key on search to focus first game
    if (e.key === 'Enter' && e.target.classList.contains('search-input')) {
        e.preventDefault();
        const firstVisibleGame = document.querySelector('.game-card:not([style*="display: none"]) .card-link');
        if (firstVisibleGame) {
            firstVisibleGame.focus();
        }
    }
});

// Theme Toggle (if implemented)
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.classList.toggle('dark-theme');
    
    // Store preference
    localStorage.setItem('theme', newTheme);
}

// Initialize theme from localStorage
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-theme');
    }
}

// Performance monitoring
function logPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                    console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart, 'ms');
                    
                    // Send to analytics if available
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'timing_complete', {
                            'name': 'page_load',
                            'value': Math.round(perfData.loadEventEnd - perfData.loadEventStart)
                        });
                    }
                }
            }, 0);
        });
    }
}

// Initialize performance monitoring
logPerformance();

// Service Worker Registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful');
        }, function(err) {
            console.log('ServiceWorker registration failed');
        });
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    
    // Send error to analytics if available
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            'description': e.error.toString(),
            'fatal': false
        });
    }
});

// Lazy loading for images (if browser doesn't support native lazy loading)
function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        return;
    }
    
    // Fallback for older browsers
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.classList.add('lazy');
        imageObserver.observe(img);
    });
}

// Initialize lazy loading
initLazyLoading();