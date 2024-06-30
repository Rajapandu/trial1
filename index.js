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
    let tempaddition = 10;
    const slideTrack = document.querySelector('.slide-tracks');
    const images = document.querySelectorAll('.slide-tracks .certificate-slides');
    const totalImages = images.length;
    const slideWidth = images[0].clientWidth+tempaddition;
    console.log("the slide width is =>  "+slideWidth);
    const imagesPerSlide = 1;
    //reloading the page 
    let resizeTimeout;
    window.addEventListener('resize',function(){

        this.clearTimeout(resizeTimeout);
        resizeTimeout = this.setTimeout(function(){
            location.reload();
        },300);
    });

   
    function sidewidth(){
        const windowwidth = window.innerWidth;
       if(windowwidth<800){
        return 1;
       }else{
        return 3;
       }
    }

    function updatePosition() {
        slideTrack.scrollTo({
            left: currentIndexPosition * slideWidth,
            behavior: 'smooth'
        });
    }

    window.nextSlide = function() {
        if (currentIndexPosition <= totalImages - 2) {
            currentIndexPosition++;
            tempaddition = tempaddition+10;
        } else {
            currentIndexPosition = 0;
            tempaddition = 10;
        }
        updatePosition();
    }

    window.prevSlide = function() {
        if (currentIndexPosition > 0) {
            currentIndexPosition--;
        } else {
            currentIndexPosition = totalImages - 1;
        }
        updatePosition();
    }

    updatePosition();


    // let currentIndexPosition = 0;
    // let slideWidth = 0;
    // let imagesPerSlide = calculateImagesPerSlide();

    // const slideTrack = document.querySelector('.slide-tracks');
    // const images = document.querySelectorAll('.slide-tracks .certificate-slides');
    // const totalImages = images.length;

    // function calculateImagesPerSlide() {
    //     // Calculate number of images per slide based on window width
    //     const windowWidth = window.innerWidth;
    //     if (windowWidth >= 1200) {
    //         return 3; // 3 images per slide for large screens
        
    // }
    //  else if (windowWidth >= 768) {
    //         return 2; // 2 images per slide for medium screens
    //     }
    //      else {
    //         return 1; // 1 image per slide for small screens
    //     }
    // }

    // function updatePosition() {
    //     slideTrack.style.transition = 'transform 0.6s ease-in-out';
    //     slideTrack.style.transform = `translateX(-${currentIndexPosition * slideWidth}px)`;
    // }

    // function nextSlide() {
    //     currentIndexPosition = (currentIndexPosition + imagesPerSlide) % totalImages;
    //     updatePosition();
    // }

    // function prevSlide() {
    //     currentIndexPosition = (currentIndexPosition - imagesPerSlide + totalImages) % totalImages;
    //     updatePosition();
    // }

    // function adjustSlideWidth() {
    //     slideWidth = slideTrack.clientWidth / imagesPerSlide;
    //     images.forEach(image => {
    //         image.style.minWidth = `${slideWidth}px`;
    //         image.style.flex = `0 0 ${slideWidth}px`;
    //     });
    //     updatePosition();
    // }

    // // Adjust slide width initially and on window resize
    // adjustSlideWidth();
    // window.addEventListener('resize', adjustSlideWidth);

    // // Next and previous slide buttons
    // const nextBtn = document.querySelector('.next-btn');
    // const prevBtn = document.querySelector('.prev-btn');
    // nextBtn.addEventListener('click', nextSlide);
    // prevBtn.addEventListener('click', prevSlide);
});
