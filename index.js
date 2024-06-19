document.addEventListener('DOMContentLoaded',function(){
    const links = document.querySelectorAll('.nav a');
    const sections = document.querySelectorAll('section');

if(links.length>0){
    links[0].classList.add('active');
    document.getElementById(links[0].getAttribute('href').substring(1)).scrollIntoView({behavior:'smooth'});
}


   
    
       
    links.forEach(link=>{
        link.addEventListener('click',function(event){
            
            links.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(this.getAttribute('href').substring(1)).scrollIntoView({behavior:'smooth'});
        });
    });

    const observercallback = (entries)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                links.forEach(link => link.classList.remove('active'));
                
                const id = entry.target.id;
                const activelink = document.querySelector(`.nav a[href="#${id}"]`);
                if(activelink){
                    activelink.classList.add('active');
                }
                
            }
        });
    };

    const observeroptions = {
        root:null,
        rootMargin:'0px',
        threshold:0.7
    };
    const observer = new IntersectionObserver(observercallback,observeroptions);
    sections.forEach(section=>{
        observer.observe(section);
    });


    
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
