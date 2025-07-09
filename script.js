// Parallax scrolling effect
document.addEventListener('DOMContentLoaded', function() {
    const parallaxSections = document.querySelectorAll('.parallax-section');
    const parallaxBgs = document.querySelectorAll('.parallax-bg');
    
    // Initialize parallax backgrounds
    function updateParallax() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        parallaxSections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionBottom = sectionTop + sectionHeight;
            
            // Check if section is in viewport
            if (scrollTop + windowHeight > sectionTop && scrollTop < sectionBottom) {
                // Show corresponding background
                parallaxBgs.forEach((bg, bgIndex) => {
                    if (bgIndex === index) {
                        bg.style.opacity = '1';
                        bg.style.zIndex = '-1';
                    } else {
                        bg.style.opacity = '0';
                        bg.style.zIndex = '-2';
                    }
                });
            }
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
    
    // Contact form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation and feedback
            const formData = new FormData(this);
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            
            button.textContent = 'Sending...';
            button.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                button.textContent = 'Message Sent!';
                button.style.background = '#27ae60';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.background = '';
                    this.reset();
                }, 2000);
            }, 1000);
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe service cards and stats for animation
    document.querySelectorAll('.service-card, .stat, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Event listeners
    window.addEventListener('scroll', () => {
        updateParallax();
        updateNavbar();
    });
    
    window.addEventListener('resize', updateParallax);
    
    // Initial calls
    updateParallax();
    updateNavbar();
    
    // Gallery carousel functionality
    const carouselTrack = document.querySelector('.carousel-track');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (carouselTrack && galleryItems.length > 0) {
        let currentIndex = 0;
        const totalItems = galleryItems.length;
        let autoAdvanceInterval;
        
        function updateCarousel() {
            const translateX = -currentIndex * 100;
            carouselTrack.style.transform = `translateX(${translateX}%)`;
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        }
        
        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateCarousel();
        }
        
        function startAutoAdvance() {
            autoAdvanceInterval = setInterval(nextSlide, 5000);
        }
        
        function stopAutoAdvance() {
            clearInterval(autoAdvanceInterval);
        }
        
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        // Pause auto-advance on hover
        const carousel = document.querySelector('.gallery-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', stopAutoAdvance);
            carousel.addEventListener('mouseleave', startAutoAdvance);
        }
        
        // Start auto-advance
        startAutoAdvance();
    }
});

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});