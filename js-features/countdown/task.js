const decreasTimer = function() {
    const timerStart = document.getElementById('timer');
    
    timerStart.textContent --;

    if (timerStart.textContent < 0) {
        alert("Вы победили в конкурсе!");
        clearInterval(intervalID);
        return;

    }   
};

let intervalID = setInterval(decreasTimer, 1000);
