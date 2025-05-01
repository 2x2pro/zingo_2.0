document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.games-slider');

    sliders.forEach(slider => {
        const container = slider.querySelector('.games-container');
        const prevBtn = slider.querySelector('.prev-arrow');
        const nextBtn = slider.querySelector('.next-arrow');
        const cardWidth = 280; // Width of each game card including margins
        const scrollAmount = cardWidth * 3; // Scroll 3 cards at a time

        if (prevBtn && nextBtn && container) {
            prevBtn.addEventListener('click', () => {
                container.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            });

            nextBtn.addEventListener('click', () => {
                container.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });

            // Update button states based on scroll position
            container.addEventListener('scroll', () => {
                const isAtStart = container.scrollLeft <= 0;
                const isAtEnd = container.scrollLeft >= (container.scrollWidth - container.clientWidth);
                
                prevBtn.style.opacity = isAtStart ? '0.5' : '1';
                nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
            });
        }
    });
}));