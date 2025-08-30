// Categories Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize categories page functionality
    initCategoriesPage();
});

function initCategoriesPage() {
    initSortingAndFiltering();
    initViewToggle();
    initSearchFunctionality();
    initCategoryAnimations();
    initPopularCategoriesInteractions();
}

// Sorting and Filtering
function initSortingAndFiltering() {
    const sortSelect = document.getElementById('sortSelect');
    const categoriesGrid = document.getElementById('categoriesGrid');
    
    if (!sortSelect || !categoriesGrid) return;
    
    sortSelect.addEventListener('change', function() {
        const sortBy = this.value;
        const cards = Array.from(categoriesGrid.querySelectorAll('.category-card'));
        
        cards.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    const nameA = a.querySelector('.category-title').textContent;
                    const nameB = b.querySelector('.category-title').textContent;
                    return nameA.localeCompare(nameB);
                    
                case 'games':
                    const gamesA = parseInt(a.dataset.games) || 0;
                    const gamesB = parseInt(b.dataset.games) || 0;
                    return gamesB - gamesA; // Descending order
                    
                case 'popular':
                    const popA = parseInt(a.dataset.popularity) || 0;
                    const popB = parseInt(b.dataset.popularity) || 0;
                    return popB - popA; // Descending order
                    
                case 'newest':
                    // For demo purposes, we'll use a random sort for "newest"
                    // In a real implementation, you'd use actual creation dates
                    return Math.random() - 0.5;
                    
                default:
                    return 0;
            }
        });
        
        // Animate the sorting
        categoriesGrid.style.opacity = '0.7';
        setTimeout(() => {
            cards.forEach(card => categoriesGrid.appendChild(card));
            categoriesGrid.style.opacity = '1';
        }, 200);
    });
}

// View Toggle (Grid/List)
function initViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const categoriesGrid = document.getElementById('categoriesGrid');
    
    if (!viewButtons.length || !categoriesGrid) return;
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const view = this.dataset.view;
            
            // Update active button
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update grid view
            categoriesGrid.classList.remove('grid-view', 'list-view');
            categoriesGrid.classList.add(`${view}-view`);
            
            // Animate transition
            categoriesGrid.style.transform = 'scale(0.95)';
            categoriesGrid.style.opacity = '0.7';
            setTimeout(() => {
                categoriesGrid.style.transform = 'scale(1)';
                categoriesGrid.style.opacity = '1';
            }, 150);
        });
    });
}

// Enhanced Search Functionality
function initSearchFunctionality() {
    const searchInput = document.getElementById('header-search');
    const categoryCards = document.querySelectorAll('.category-card');
    
    if (!searchInput || !categoryCards.length) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const query = this.value.toLowerCase().trim();
        
        // Debounce search for better performance
        searchTimeout = setTimeout(() => {
            filterCategories(query, categoryCards);
        }, 300);
    });
    
    // Clear search on escape key
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            this.value = '';
            filterCategories('', categoryCards);
            this.blur();
        }
    });
}

function filterCategories(query, categoryCards) {
    let visibleCount = 0;
    
    categoryCards.forEach(card => {
        const title = card.querySelector('.category-title').textContent.toLowerCase();
        const description = card.querySelector('.category-description').textContent.toLowerCase();
        const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
        
        const isMatch = query === '' || 
                       title.includes(query) || 
                       description.includes(query) || 
                       tags.some(tag => tag.includes(query));
        
        if (isMatch) {
            card.style.display = '';
            card.style.animation = 'fadeInUp 0.5s ease forwards';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show no results message if needed
    showNoResultsMessage(visibleCount === 0 && query !== '');
}

function showNoResultsMessage(show) {
    let noResultsMsg = document.querySelector('.no-results-message');
    
    if (show && !noResultsMsg) {
        noResultsMsg = document.createElement('div');
        noResultsMsg.className = 'no-results-message';
        noResultsMsg.innerHTML = `
            <div class="no-results-content">
                <i class="fas fa-search"></i>
                <h3>No categories found</h3>
                <p>Try adjusting your search terms or browse all categories.</p>
            </div>
        `;
        
        const categoriesGrid = document.getElementById('categoriesGrid');
        categoriesGrid.parentNode.insertBefore(noResultsMsg, categoriesGrid.nextSibling);
    } else if (!show && noResultsMsg) {
        noResultsMsg.remove();
    }
}

// Category Card Animations
function initCategoryAnimations() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    categoryCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Hover effects enhancement
    categoryCards.forEach(card => {
        const icon = card.querySelector('.category-icon');
        
        card.addEventListener('mouseenter', function() {
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
        
        // Add click analytics (placeholder)
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('.category-title').textContent;
            trackCategoryClick(categoryName);
        });
    });
}

// Popular Categories Interactions
function initPopularCategoriesInteractions() {
    const popularItems = document.querySelectorAll('.popular-category-item');
    
    popularItems.forEach((item, index) => {
        // Add stagger animation
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 150);
        
        // Add click handler
        item.addEventListener('click', function() {
            const categoryName = this.querySelector('h3').textContent;
            // Navigate to category (you can implement this based on your routing)
            window.location.href = `index.html?category=${categoryName.toLowerCase().replace(' games', '')}`;
        });
        
        // Enhanced hover effects
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--primary-color-light, #f0f0ff)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
}

// Analytics and Tracking Functions
function trackCategoryClick(categoryName) {
    // Placeholder for analytics tracking
    console.log(`Category clicked: ${categoryName}`);
    
    // In a real implementation, you might send this to your analytics service
    // Example: gtag('event', 'category_click', { category_name: categoryName });
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

// Add CSS animations dynamically
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .no-results-message {
            text-align: center;
            padding: 4rem 2rem;
            color: var(--text-secondary);
        }
        
        .no-results-content i {
            font-size: 3rem;
            color: var(--text-muted);
            margin-bottom: 1rem;
        }
        
        .no-results-content h3 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
            color: var(--text-primary);
        }
        
        .category-icon {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .popular-category-item {
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
}

// Initialize dynamic styles
addDynamicStyles();

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === '/' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        const searchInput = document.getElementById('header-search');
        if (searchInput) {
            searchInput.focus();
        }
    }
});

// Performance optimization: Lazy load category icons
function optimizeCategoryIcons() {
    const categoryIcons = document.querySelectorAll('.category-icon i');
    
    const iconObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                iconObserver.unobserve(entry.target);
            }
        });
    });
    
    categoryIcons.forEach(icon => {
        icon.style.opacity = '0';
        icon.style.transition = 'opacity 0.3s ease';
        iconObserver.observe(icon);
    });
}

// Initialize icon optimization
setTimeout(optimizeCategoryIcons, 100);