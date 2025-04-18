document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');

    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
        });
    }

    // Social Sidebar Toggle
    const hideButton = document.querySelector('.hide-button');
    const socialIcons = document.querySelectorAll('.social-sidebar .social-icon:not(.hide-button)');

    if (hideButton && socialIcons.length > 0) {
        hideButton.addEventListener('click', function() {
            const isHidden = hideButton.querySelector('i').classList.contains('fa-chevron-right');

            if (isHidden) {
                hideButton.querySelector('i').classList.remove('fa-chevron-right');
                hideButton.querySelector('i').classList.add('fa-chevron-left');
                socialIcons.forEach(icon => {
                    icon.style.display = 'flex';
                });
            } else {
                hideButton.querySelector('i').classList.remove('fa-chevron-left');
                hideButton.querySelector('i').classList.add('fa-chevron-right');
                socialIcons.forEach(icon => {
                    icon.style.display = 'none';
                });
            }
        });
    }



    

    // Games Slider
    const gamesContainer = document.querySelector('.games-container');
    const prevButton = document.querySelector('.prev-arrow');
    const nextButton = document.querySelector('.next-arrow');
    const dots = document.querySelectorAll('.slider-dots .dot');

    if (gamesContainer && prevButton && nextButton) {
        const scrollAmount = 300;
        let currentSlide = 0;
        const maxSlides = dots.length;

        // Initialize first dot as active
        updateDots(0);

        // Next button click
        nextButton.addEventListener('click', function() {
            gamesContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            currentSlide = Math.min(currentSlide + 1, maxSlides - 1);
            updateDots(currentSlide);
        });

        // Previous button click
        prevButton.addEventListener('click', function() {
            gamesContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            currentSlide = Math.max(currentSlide - 1, 0);
            updateDots(currentSlide);
        });

        // Dot click handlers
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                const scrollPosition = index * scrollAmount;
                gamesContainer.scrollTo({ left: scrollPosition, behavior: 'smooth' });
                currentSlide = index;
                updateDots(currentSlide);
            });
        });

        // Update active dot
        function updateDots(index) {
            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    }

    // Search functionality
    const searchBox = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');

    if (searchBox && searchButton) {
        searchButton.addEventListener('click', function() {
            performSearch();
        });

        searchBox.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        function performSearch() {
            const searchTerm = searchBox.value.trim().toLowerCase();
            if (searchTerm.length > 0) {
                alert('Searching for: ' + searchTerm);
                // In a real implementation, this would search through games data
                // and filter/display results
            }
        }
    }

    // Game card hover effects
    const gameCards = document.querySelectorAll('.game-card');

    gameCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });

    // Simulated game loading
    const allGameImages = document.querySelectorAll('.game-card img, .category-game img');

    allGameImages.forEach(img => {
        img.addEventListener('click', function(e) {
            e.preventDefault();
            const gameTitle = this.closest('.game-card, .category-game').querySelector('h3').innerText;
            alert('Loading game: ' + gameTitle);
            // In a real implementation, this would navigate to the game page
        });
    });

    // Auto slider for featured games (if available)
    let sliderInterval;

    function startAutoSlide() {
        if (gamesContainer && nextButton) {
            sliderInterval = setInterval(() => {
                nextButton.click();
            }, 5000); // Change slide every 5 seconds
        }
    }

    function stopAutoSlide() {
        clearInterval(sliderInterval);
    }

    // Start auto-sliding when page loads
    startAutoSlide();

    // Stop auto-sliding when user interacts with slider
    if (gamesContainer) {
        gamesContainer.addEventListener('mouseenter', stopAutoSlide);
        gamesContainer.addEventListener('mouseleave', startAutoSlide);
    }

    // Handle category card clicks
    const categoryCards = document.querySelectorAll('.category-card');

    categoryCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const categoryName = this.querySelector('h3').innerText;
            alert('Viewing ' + categoryName + ' games');
            // In a real implementation, this would filter games by category
        });
    });
});
