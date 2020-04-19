const timerDisplay = document.querySelector("#timer-display");
const slider = document.querySelector("input[type=range]");
const btnStart = document.querySelector("#btn-start");
const tomatoContainer = document.querySelector("#tomato-container");
const backgroundGif = document.querySelector("#background-gif");
const btnStudy = document.querySelector("#btn-study");
const btnRest = document.querySelector("#btn-rest");
const title = document.querySelector("#title");
const clickAudio = document.querySelector("#start-audio");
const sessionEndAudio = document.querySelector("#session-end-audio");

// Default Values
let minutes = 24;
let seconds = 59;
let t; // Timeout variable
let tomatoMinutes = 0; // To be displayed under tomato image
clickAudio.volume = 0.1; //
sessionEndAudio.volume = 0.3;

// Create Tomato after session with text below on how long the session was
function createTomato(mode) {
  // Create div that will contain the image and text
  const tomatoDiv = document.createElement("div");
  tomatoDiv.style.marginLeft = "5px";
  tomatoContainer.append(tomatoDiv);

  // Create image and text
  const tomato = document.createElement("img");
  const figCaption = document.createElement("figcaption");

  // Change the image and text color based on session mode
  tomato.src = mode === "study" ? "images/tomato.png" : "images/tomato-green.png";
  figCaption.style.color = mode === "study" ? "#9a0937" : "#157b1d";
  tomato.style.opacity = "0";

  // Append to created div
  tomatoDiv.append(tomato);
  tomatoDiv.append(figCaption);

  // Use timeout for a fadeIn effect of tomato
  setTimeout(function () {
    tomato.classList.add("tomato-in");
    figCaption.textContent = tomatoMinutes;
  }, 1000);
}

// Change button text and to show if the session is active or not
function toggleStart() {
  if (btnStart.textContent === "START") {
    // If study mode is active change to study background gif, else change to rest background gif
    if (btnStudy.classList.contains("active")) {
      backgroundGif.src = "images/study-gif.gif";
    } else {
      backgroundGif.src = "images/rest-gif.gif";
    }
    // Change button text and disable slider so no new input can be updated
    btnStart.textContent = "PAUSE";
    slider.disabled = true;
    slider.style.opacity = "0.7";
  }
}
// Pause session and stop Interval from making the countdown
function togglePause() {
  backgroundGif.src = "";
  btnStart.textContent = "START";
  slider.disabled = false;
  slider.style.opacity = "1";
  clearInterval(t);
}

// Change colors of STUDY and REST buttons and change colors and image of slider and it's thumb image
function toggleRangeClasses() {
  btnStudy.classList.toggle("active");
  btnRest.classList.toggle("active");

  slider.classList.toggle("study-range");
  slider.classList.toggle("rest-range");
}

//  Convert many styles and values to reflect a rest mode
function toggleRestMode() {
  toggleRangeClasses();
  btnRest.disabled = true;
  btnStudy.disabled = false;
  title.style.textShadow = "0 0 4px #157b1d";
  btnStart.style.color = "#157b1d";
  timerDisplay.style.color = "#a8feaf";
  timerDisplay.textContent = "10:00";
  minutes = 9;
  seconds = 59;
  slider.value = 10;
  // tomatoMinutes = 10;
  backgroundGif.src = "images/rest-gif.gif";
  document.querySelector("link[rel*='icon']").href = "images/tomato-green.png";
}
//  Convert many styles and values to reflect a study mode
function toggleStudyMode() {
  toggleRangeClasses();
  btnStudy.disabled = true;
  btnRest.disabled = false;
  title.style.textShadow = "0 0 4px #ff0050";
  btnStart.style.color = "#9a0937";
  timerDisplay.style.color = "#ff00509c";
  timerDisplay.textContent = "25:00";
  minutes = 24;
  seconds = 59;
  slider.value = 25;
  // tomatoMinutes = 25;
  backgroundGif.src = "images/study-gif.gif";
  document.querySelector("link[rel*='icon']").href = "images/tomato.png";
}
// Our function which is called by setTimeout. Updates timer display and values
function updateTimer() {
  // Adds 0 to the beginning of minutes and seconds when their values are below 10
  timerDisplay.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  if (minutes === 0 && seconds === 0) {
    // Switch between rest and study mode when their sessions have ended and create a tomato with session duration
    if (btnStudy.classList.contains("active")) {
      createTomato("study");
      toggleRestMode();
    } else {
      createTomato("rest");
      toggleStudyMode();
    }
    // Pause on session end
    clearInterval(t);
    btnStart.classList.toggle("start");
    togglePause();
    sessionEndAudio.play();
  }
  // Timer logic
  if (seconds <= 0) {
    seconds = 59;
    minutes--;
  } else {
    seconds--;
  }
}

// Toggle between STUDY and REST buttons
// Deactivate button once clicked and only allow the other(REST) button to be clicked
btnStudy.addEventListener("click", () => {
  clickAudio.load(); // Stop audio when clicked repeatedly
  clickAudio.play();
  if (btnRest.classList.contains("active")) {
    toggleStudyMode();
    backgroundGif.src = ""; // Background should be activated when user clicks start, null until then
  } else {
    btnStudy.classList.toggle("active");
    slider.classList.toggle("study-range");
  }
});
// Same as above reverse with REST
btnRest.addEventListener("click", () => {
  clickAudio.load();
  clickAudio.play();
  if (btnStudy.classList.contains("active")) {
    toggleRestMode();
    backgroundGif.src = "";
  } else {
    btnRest.classList.toggle("active");
    slider.classList.toggle("rest-range");
  }
});
// Get value of range slider
slider.addEventListener("input", () => {
  minutes = slider.value - 1; // Seconds will begin with 59, so we subtract value with 1 (15 ==> 14:59)
  timerDisplay.textContent = `${slider.value < 10 ? "0" : ""}${slider.value}:00`; // Add 0 before value if below 10
});
// Start session
btnStart.addEventListener("click", () => {
  tomatoMinutes = slider.value; // Used to hold the slider value for displaying session duration
  clickAudio.load();
  clickAudio.play();
  if (btnStart.classList.contains("start") && minutes >= 0) {
    toggleStart();
    t = setInterval(updateTimer, 1000);
  } else {
    togglePause();
  }
  btnStart.classList.toggle("start");
});

