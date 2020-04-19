const timerDisplay = document.querySelector("#timer-display");
const slider = document.querySelector("input[type=range]");
const btnStart = document.querySelector("#btn-start");
const tomatoContainer = document.querySelector("#tomato-container");
const backgroundGif = document.querySelector("#background-gif");
const btnStudy = document.querySelector("#btn-study");
const btnRest = document.querySelector("#btn-rest");
const title = document.querySelector("#title");

// Default Values
let minutes = 24;
let seconds = 59;
let t;
let tomatoMinutes = 0;

btnStudy.addEventListener("click",()=>{
    if (btnRest.classList.contains("active")){
        toggleStudyMode();
        backgroundGif.src = "";
    }
    else{
        btnStudy.classList.toggle("active");
        slider.classList.toggle("study-range");
    }
});

btnRest.addEventListener("click",()=>{
    if (btnStudy.classList.contains("active")){
        toggleRestMode();
        backgroundGif.src = "";

    }
    else{
        btnRest.classList.toggle("active");
        slider.classList.toggle("rest-range");

    }
});

slider.addEventListener("input", ()=>{
    minutes = slider.value -1;
    timerDisplay.textContent = `${slider.value < 10 ? "0" : ""}${slider.value}:00`;
    seconds = 1;
    tomatoMinutes = slider.value;
});

btnStart.addEventListener("click",()=>{
    if (btnStart.classList.contains("start") && minutes >=0) {
        toggleStart();
        t = setInterval(updateTimer, 1000);
    }
    else {
        togglePause();
    }
    btnStart.classList.toggle("start");
});


function updateTimer() {
    timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (minutes === 0 && seconds === 0){
        if (btnStudy.classList.contains("active")){
            toggleRestMode();
            createTomato();
        }
        else {
            toggleStudyMode();
        }
    clearInterval(t);
        btnStart.classList.toggle("start");
        togglePause();

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
    const tomatoDiv = document.createElement("div");
    tomatoDiv.style.marginLeft = "5px";
    tomatoContainer.append(tomatoDiv);

    const tomato = document.createElement("img");
    tomato.src= "images/tomato.png";
    tomato.style.opacity = "0";

    const figCaption = document.createElement("figcaption");
    tomatoDiv.append(tomato);
    tomatoDiv.append(figCaption);
    setTimeout(function () {
        tomato.classList.add("tomato-in");
        figCaption.textContent = tomatoMinutes;

    },1000);
}

function toggleStart(){
    if (btnStart.textContent === "START") {
        if (btnStudy.classList.contains("active")) {
            backgroundGif.src = "images/study-gif.gif";

        } else {
            backgroundGif.src = "images/rest-gif.gif";
        }

        btnStart.textContent = "PAUSE";
        slider.disabled = true;
        slider.style.opacity = "0.7";

    }

}
function togglePause() {
    backgroundGif.src = "";
    btnStart.textContent = "START";
    slider.disabled = false;
    slider.style.opacity = "1";
    clearInterval(t);
}

function toggleRangeClasses() {
    btnStudy.classList.toggle("active");
    btnRest.classList.toggle("active");

    slider.classList.toggle("study-range");
    slider.classList.toggle("rest-range");

}

function toggleRestMode() {
    toggleRangeClasses();
    btnRest.disabled = true;
    btnStudy.disabled = false;
    title.style.textShadow = "0 0 4px #157b1d"
    btnStart.style.color = "#157b1d";
    timerDisplay.style.color = "#a8feaf";
    timerDisplay.textContent = "10:00";
    minutes = 9;
    seconds = 59;
    slider.value = 10;
    backgroundGif.src = "images/rest-gif.gif";
    document.querySelector("link[rel*='icon']").href = "images/tomato-green.png";

}
function toggleStudyMode() {
    toggleRangeClasses();
    btnStudy.disabled = true;
    btnRest.disabled = false;
    title.style.textShadow = "0 0 4px #ff0050"
    btnStart.style.color = "#9a0937";
    timerDisplay.style.color = "#ff00509c";
    timerDisplay.textContent = "25:00";
    minutes = 24;
    seconds = 59;
    slider.value = 25;
    backgroundGif.src = "images/study-gif.gif";
    document.querySelector("link[rel*='icon']").href = "images/tomato.png";

}
