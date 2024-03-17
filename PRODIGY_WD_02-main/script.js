let timer;
let isRunning = false;
let seconds = 0;
let minutes = 0;
let hours = 0;
let lapCount = 1;

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        document.getElementById('startStopBtn').innerHTML = 'Start';
    } else {
        timer = setInterval(updateDisplay, 1000);
        document.getElementById('startStopBtn').innerHTML = 'Stop';
    }

    isRunning = !isRunning;
}

function lap() {
    if (isRunning) {
        const lapTimesList = document.getElementById('lapTimes');
        const lapTimeItem = document.createElement('li');
        lapTimeItem.textContent = `Lap ${lapCount}: ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
        lapTimesList.appendChild(lapTimeItem);
        lapCount++;
    }
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    seconds = 0;
    minutes = 0;
    hours = 0;
    lapCount = 1;
    updateDisplay();
    document.getElementById('startStopBtn').innerHTML = 'Start';
    document.getElementById('lapTimes').innerHTML = '';
}

function updateDisplay() {
    const display = document.getElementById('display');
    display.innerHTML = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);
    seconds++;

    if (seconds === 60) {
        seconds = 0;
        minutes++;

        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
    }
}

function formatTime(time) {
    return time < 10 ? '0' + time : time;
}
