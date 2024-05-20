function showText() {
    const blackScreen = document.querySelector('.black-screen');
    blackScreen.style.display = 'none';
}

console.log('Everything should go as planned.');

function showInformation() {
    const information = document.querySelector('.information');
    information.style.display = 'block'; 
}

const video = document.getElementById("KanyeWest");
const blackScreen = document.querySelector('.black-screen');
const information = document.querySelector('.information');

function startVideoOnExplicitClick() {
    if (!video.paused) return; 
    video.style.display = 'block'; 
    video.play(); 
    blackScreen.style.display = 'none'; 
    information.style.display = 'block'; 
}

video.addEventListener('pause', function() {
    blackScreen.style.display = 'block';
    information.style.display = 'none'; 
});



document.addEventListener('contextmenu', event=> event.preventDefault()); 
document.onkeydown = function(e) { 
    if(event.keyCode == 123) { 
        return false; 
    } 
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){ 
        return false; 
    } 
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){ 
        return false; 
    } 
    if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){ 
        return false; 
    }
    if(e.ctrlKey && e.keyCode == 'C'.charCodeAt(0)){ 
        return false; 
    } 
} 

document.documentElement.style.cursor = 'none';


