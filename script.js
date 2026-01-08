document.addEventListener('DOMContentLoaded', () => {

    // Parallax Effect for Hero Background
    // Parallax & Sticky Navbar Logic
    const heroBg = document.getElementById('hero-bg');
    const stickyNav = document.getElementById('sticky-nav');
    const heroSection = document.querySelector('.hero-section');
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;

        // Parallax
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrollPosition * 0.4}px)`;
        }

        // Hero Content Exit Animation (Fade out & Move down)
        if (heroContent && heroSection) {
            const limit = heroSection.offsetHeight * 0.8;
            if (scrollPosition < limit) {
                const opacity = 1 - (scrollPosition / limit);
                const translateY = scrollPosition * 0.3; // Move slightly down

                heroContent.style.opacity = Math.max(0, opacity);
                heroContent.style.transform = `translateY(${translateY}px)`;
            }
        }

        // Sticky Navbar Toggle
        if (heroSection && stickyNav) {
            const heroHeight = heroSection.offsetHeight;
            // Toggle visibility slightly before the hero section ends
            if (scrollPosition > heroHeight - 100) {
                stickyNav.classList.add('visible');
            } else {
                stickyNav.classList.remove('visible');
            }
        }
    });

    // Replayable Scroll Animations (Enter & Exit)
    const observerOptions = {
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                // Remove class on exit to replay animation when scrolling back
                entry.target.classList.remove('in-view');
            }
        });
    }, observerOptions);

    // Target elements to animate
    const revealElements = document.querySelectorAll('.reveal-on-scroll, .fade-in-out, .section-title');
    revealElements.forEach(el => {
        // el.classList.add('reveal-on-scroll'); // No longer forcing base class, using specific ones
        observer.observe(el);
    });
});
