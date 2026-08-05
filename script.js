let workTime = 25 * 60;
let breakTime = 5 * 60;

let timeLeft = workTime;

let isWorkTime = true;
let timer = null;

let sessionNumber = 1;

const timerDisplay = document.getElementById("timer");
const modeDisplay = document.getElementById("mode");

const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");


function updateDisplay() {

    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    timerDisplay.textContent = `${minutes}:${seconds}`;

    if (isWorkTime) {
        modeDisplay.textContent = "session " + sessionNumber + ": Work";
    } else {
        modeDisplay.textContent = "session " + sessionNumber + ": Break";
    }

}


function startTimer() {

    if (timer !== null) {
        return;
    }

    timer = setInterval(function() {

        timeLeft--;

        updateDisplay();

        if (timeLeft <= 0) {
            switchMode();
        }

    }, 1000);
}


function pauseTimer() {

    clearInterval(timer);
    timer = null;
}


function resetTimer() {

    clearInterval(timer);
    timer = null;

    isWorkTime = true;
    timeLeft = workTime;
    sessionNumber = 1;

    updateDisplay();
}


function switchMode() {

    if (isWorkTime) {

        // Work finished
        // Move to break

        isWorkTime = false;
        timeLeft = breakTime;

    } else {

        // Break finished
        // Move to next work session

        isWorkTime = true;
        timeLeft = workTime;

        sessionNumber++;
    }

    updateDisplay();
}


startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

updateDisplay();







// javascript to make popup work


const settingsButton = document.getElementById("settingsButton");
const settingsPopup = document.getElementById("settingsPopup");

const closeButton = document.getElementById("closeButton");
const saveButton = document.getElementById("saveButton");

const workInput = document.getElementById("workInput");
const breakInput = document.getElementById("breakInput");


settingsButton.addEventListener("click", function() {
    settingsPopup.classList.add("show");
});


closeButton.addEventListener("click", function() {
    settingsPopup.classList.remove("show");
});


saveButton.addEventListener("click", function() {

    let newWorkTime = Number(workInput.value);
    let newBreakTime = Number(breakInput.value);

    workTime = newWorkTime * 60;
    breakTime = newBreakTime * 60;

    timeLeft = workTime;
    isWorkTime = true;

    sessionNumber = 1;

    updateDisplay();

    settingsPopup.classList.remove("show");
});