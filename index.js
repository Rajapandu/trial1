document.addEventListener('DOMContentLoaded',function(){
    const links = document.querySelectorAll('.nav a');
    const sections = document.querySelectorAll('section');

// if(links.length>0){ 
//     links[0].classList.add('active');
//     console.log("first this;;=> "+links[0])
//     document.getElementById(links[0].getAttribute('href').substring(1)).scrollIntoView({behavior:'smooth'});
// }
// if(window.location.hash){
//     history.replaceState(null,null,' ');
//     console.log("after this ;; ")
//     document.getElementById("about").scrollIntoView({behavior:'smooth'});
// }
function scrolltofirst(){
    if (links.length > 0) {
    // Set the first link as active and scroll to its section
    links[0].classList.add('active');
    console.log("First link:", links[0]);

    const targetId = links[0].getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.error('Target element not found for first link:', targetId);
    }
}}


// Check if there's a hash in the URL and clear it
if (window.location.hash) {
    history.replaceState(null, null, ' ');
    window.scrollTo(0,0);
    scrolltofirst();
}else{
    scrolltofirst();
}
    
    links.forEach(link=>{
        link.addEventListener('click',function(event){
            event.preventDefault();
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
