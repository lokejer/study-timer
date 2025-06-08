const timerDisplay = document.getElementById('timer');
const pauseBtn = document.querySelectorAll('.glowing-btn')[0];
const pauseIcon = pauseBtn.querySelector('i');
const resetBtn = document.querySelectorAll('.glowing-btn')[1];
const timeInput = document.getElementById('time-input');

let countdownTime = 30 * 60 * 1000; // default: 30 mins
let remainingTime = countdownTime;
let timerInterval = null;
let isRunning = false;

function timeToString(time) {
  const totalSeconds = Math.ceil(time / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const mm = minutes.toString().padStart(2, '0');
  const ss = seconds.toString().padStart(2, '0');

  return `${mm}<span>.</span>${ss}`;
}

function updateTimer() {
  if (remainingTime <= 0) {
    clearInterval(timerInterval);
    isRunning = false;
    remainingTime = 0;
    timerDisplay.innerHTML = timeToString(0);
    return;
  }
  timerDisplay.innerHTML = timeToString(remainingTime);
  remainingTime -= 1000;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
}

function toggleTimer() {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
    pauseIcon.classList.remove('fa-pause');
    pauseIcon.classList.add('fa-play');
  } else {
    startTimer();
    pauseIcon.classList.remove('fa-play');
    pauseIcon.classList.add('fa-pause');
  }
}

function resetTimer() {
  isRunning = false;
  clearInterval(timerInterval);
  remainingTime = countdownTime;
  timerDisplay.innerHTML = timeToString(remainingTime);
}

function setCustomTimeAndStart() {
  const inputMinutes = parseInt(timeInput.value, 10);
  if (isNaN(inputMinutes) || inputMinutes <= 0) return;

  countdownTime = inputMinutes * 60 * 1000;
  remainingTime = countdownTime;
  timerDisplay.innerHTML = timeToString(remainingTime);
  startTimer();
}

// Event listeners
pauseBtn.addEventListener('click', toggleTimer);
resetBtn.addEventListener('click', resetTimer);

timeInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    setCustomTimeAndStart();
    timeInput.blur(); // removes focus so hover works again
  }
});

// Initial setup
timerDisplay.innerHTML = timeToString(remainingTime);
timeInput.value = 30;