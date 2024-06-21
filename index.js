document.addEventListener('DOMContentLoaded', function() {
    // Navigation and Section Scrolling
    const links = document.querySelectorAll('.nav a');
    const sections = document.querySelectorAll('section');

    function activateLink(link) {
        links.forEach(link => link.classList.remove('active'));
        link.classList.add('active');
    }

    function scrollToElement(element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }

    function handleClick(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            activateLink(this);
            scrollToElement(targetElement);
        } else {
            console.error('Target element not found for link:', this);
        }
    }

    function handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                const activeLink = document.querySelector(`.nav a[href="#${id}"]`);
                if (activeLink) {
                    activateLink(activeLink);
                }
            }
        });
    }

    // Set the first link as active and scroll to the first section
    if (links.length > 0) {
        const firstLink = links[0];
        const firstLinkId = firstLink.getAttribute('href').substring(1);
        const firstElement = document.getElementById(firstLinkId);

        if (firstElement) {
            activateLink(firstLink);
            setTimeout(() => {
                scrollToElement(firstElement);
            }, 100); // Add a delay to ensure it scrolls after page load
        } else {
            console.error('First element not found for link:', firstLink);
        }
    }

    // Add click event listeners to links
    links.forEach(link => link.addEventListener('click', handleClick));

    // Set up Intersection Observer for section visibility
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.7
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    sections.forEach(section => observer.observe(section));

    // Sliding Image Gallery
    let currentIndexPosition = 0;
    const slideTrack = document.querySelector('.slide-tracks');
    const images = document.querySelectorAll('.slide-tracks .certificate-slides');
    const totalImages = images.length;
    const slideWidth = images[0].clientWidth;
    console.log("the slide width is =>  "+slideWidth);
    const imagesPerSlide = 3;

    function updatePosition() {
        slideTrack.scrollTo({
            left: currentIndexPosition * slideWidth,
            behavior: 'smooth'
        });
    }

    window.nextSlide = function() {
        if (currentIndexPosition < totalImages - 1) {
            currentIndexPosition++;
        } else {
            currentIndexPosition = 0;
        }
        updatePosition();
    }

    window.prevSlide = function() {
        if (currentIndexPosition > 0) {
            currentIndexPosition--;
        } else {
            currentIndexPosition = totalImages - imagesPerSlide;
        }
        updatePosition();
    }

    updatePosition();
});
