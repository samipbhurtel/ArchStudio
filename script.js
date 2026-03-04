document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MOBILE HAMBURGER MENU ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    // Toggle menu open/close
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // --- 2. SCROLL ANIMATION LOGIC ---
    const scrollElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 
    });

    scrollElements.forEach((element) => {
        observer.observe(element);
    });

    // --- 3. MODAL & CAROUSEL LOGIC ---
    const modal = document.getElementById('project-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalDesc = document.getElementById('modal-description');
    const closeBtn = document.querySelector('.close-modal');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Carousel state variables
    let currentImageArray = [];
    let currentImageIndex = 0;

    // Open modal and populate data
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.getAttribute('data-title');
            const category = item.getAttribute('data-category');
            const desc = item.getAttribute('data-description');
            
            // Parse the JSON array of images
            currentImageArray = JSON.parse(item.getAttribute('data-images'));
            currentImageIndex = 0; // Reset to the first image

            // Inject data into modal
            modalTitle.textContent = title;
            modalCategory.textContent = category;
            modalDesc.textContent = desc;
            
            // Set initial carousel image
            modalImg.src = currentImageArray[currentImageIndex];

            // Trigger animation
            modal.classList.add('is-open');
            document.body.style.overflow = 'hidden'; 
        });
    });

    // Carousel Navigation Functions
    const nextBtn = document.querySelector('.carousel-btn.next');
    const prevBtn = document.querySelector('.carousel-btn.prev');

    nextBtn.addEventListener('click', () => {
        if (currentImageArray.length > 0) {
            currentImageIndex = (currentImageIndex + 1) % currentImageArray.length;
            modalImg.src = currentImageArray[currentImageIndex];
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentImageArray.length > 0) {
            // Add array length before modulo to handle negative numbers in JS
            currentImageIndex = (currentImageIndex - 1 + currentImageArray.length) % currentImageArray.length;
            modalImg.src = currentImageArray[currentImageIndex];
        }
    });

    // Close modal function
    const closeModal = () => {
        modal.classList.remove('is-open');
        document.body.style.overflow = ''; 
    };

    // Close events
    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        // Only close if clicking the dark background, not the modal content itself
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) {
            closeModal();
        }
        // Keyboard accessibility for the carousel
        if (modal.classList.contains('is-open')) {
            if (e.key === 'ArrowRight') nextBtn.click();
            if (e.key === 'ArrowLeft') prevBtn.click();
        }
    });
});