const timerDisplay = document.querySelector("#timer-display");
const slider = document.querySelector("#slider");
const btnStart = document.querySelector("#btn-start");
const tomatoContainer = document.querySelector("#tomato-container");
const backgroundGif = document.querySelector("#background-gif");

// Default Values
let minutes = 24;
let seconds = 59;
let t;

slider.addEventListener("input", ()=>{
    minutes = slider.value -1;
    timerDisplay.textContent = `${slider.value < 10 ? "0" : ""}${slider.value}:00`;
    seconds = 1;
});

btnStart.addEventListener("click",()=>{
    if (btnStart.classList.contains("start") && minutes >=0) {
        t = setInterval(updateTimer, 1000);
        btnStart.textContent = "PAUSE";
        slider.disabled = true;
        slider.style.opacity = "0.7";
        timerDisplay.style.color = "#ff00509c";
        backgroundGif.src = "images/study-gif.gif";

    }
    else {
        btnStart.textContent = "START";
        clearInterval(t);
        slider.disabled = false;
        slider.style.opacity = "1";
        timerDisplay.style.color = "grey";
        backgroundGif.src = "";
    }
    btnStart.classList.toggle("start");

});


function updateTimer() {

    timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (minutes === 0 && seconds === 0){
        createTomato();
        clearInterval(t);
    }

    if (seconds <= 0){
        seconds = 59;
        minutes--;
    }
    else{
        seconds--;
    }
}

function createTomato() {
    const tomato = document.createElement("img");
    tomato.src= "images/tomato.png";
    tomato.style.opacity = "0";
    tomato.style.marginLeft = "5px";
    tomatoContainer.append(tomato);
    setTimeout(function () {
        tomato.classList.add("tomato-in");
    },1000);
}