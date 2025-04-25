document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('#navLinks ul li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Hero Slider
    const heroSlider = document.getElementById('heroSlider');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    // Initialize slider
    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Pause slider on hover
    heroSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    heroSlider.addEventListener('mouseleave', startSlider);

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(index);
            startSlider();
        });
    });

    // Start the slider
    showSlide(0);
    startSlider();

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    function checkReveal() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }

    // Initial check
    checkReveal();

    // Check on scroll
    window.addEventListener('scroll', checkReveal);

    // Sticky Header
    const header = document.getElementById('header');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Product Gallery Lightbox (for product pages)
    if (document.querySelector('.product-gallery')) {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        document.body.appendChild(lightbox);

        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                lightbox.classList.add('active');
                lightbox.innerHTML = '';
                
                const lightboxImg = document.createElement('img');
                lightboxImg.src = img.src;
                lightbox.appendChild(lightboxImg);
            });
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target !== e.currentTarget) return;
            lightbox.classList.remove('active');
        });
    }
});

// Add lightbox styles dynamically
const lightboxStyles = `
#lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
}

#lightbox.active {
    opacity: 1;
    pointer-events: all;
}

#lightbox img {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
}
`;

const styleElement = document.createElement('style');
styleElement.innerHTML = lightboxStyles;
document.head.appendChild(styleElement);
