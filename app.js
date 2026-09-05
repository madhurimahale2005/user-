let timer = null;

window.onload = () => {
    document.querySelector('#calculate').onclick = calculate;
    document.querySelector('#stop').onclick = stopTimer;
    document.querySelector('#reset').onclick = resetTimer;
}

function calculate() {
    const date = document.querySelector("#date").value;
    const time = document.querySelector("#time").value;

    if (!date || !time) {
        alert("Please enter both date and time!");
        return;
    }

    const endTime = new Date(date + " " + time);

    if (timer) clearInterval(timer); // Prevent multiple timers

    timer = setInterval(() => calculateTime(endTime), 1000);
}

function calculateTime(endTime) {
    const now = new Date();

    const days = document.querySelector('#countdown-days');
    const hours = document.querySelector('#countdown-hours');
    const minutes = document.querySelector('#countdown-minutes');
    const seconds = document.querySelector('#countdown-seconds');

    if (endTime > now) {
        const timeLeft = (endTime - now) / 1000;

        days.innerText = Math.floor(timeLeft / (24 * 60 * 60));
        hours.innerText = Math.floor((timeLeft / 3600) % 24);
        minutes.innerText = Math.floor((timeLeft / 60) % 60);
        seconds.innerText = Math.floor(timeLeft % 60);
    } else {
        resetDisplay();
        clearInterval(timer);
    }
}

// Stop the countdown
function stopTimer() {
    clearInterval(timer);
}

// Reset countdown
function resetTimer() {
    clearInterval(timer);
    document.querySelector("#date").value = "";
    document.querySelector("#time").value = "";
    resetDisplay();
}

// Set all numbers to zero
function resetDisplay() {
    document.querySelector('#countdown-days').innerText = 0;
    document.querySelector('#countdown-hours').innerText = 0;
    document.querySelector('#countdown-minutes').innerText = 0;
    document.querySelector('#countdown-seconds').innerText = 0;
}
