document.addEventListener('DOMContentLoaded',function(){

    
    let currentindexPosition = 0;
    const slideTrack = document.querySelector('.slide-tracks');
    const images = document.querySelectorAll('.slide-tracks .certificate-slides');
    const totalimages = images.length;
    const slidewidth  = images[0].clientWidth;
    console.log("totalimgs"+totalimages);
    const imageperslide = 3;
    function updatePosition(){
    slideTrack.scrollTo({
        left:currentindexPosition*slidewidth,
        behavior:"smooth"
    });
    
    }
    
    window.nextSlide = function(){
        if(currentindexPosition<totalimages-imageperslide){
            currentindexPosition++;
        }else{
            currentindexPosition=0;
        }
        updatePosition();
    }
    
    window.prevslide = function(){
        if(currentindexPosition>0){
            currentindexPosition--;
        }else{
            currentindexPosition = totalimages-imageperslide;
        }
        updatePosition();
    }
    updatePosition();
    


});