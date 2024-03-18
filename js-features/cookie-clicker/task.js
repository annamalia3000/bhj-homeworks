const counterCliker = document.getElementById('clicker__counter');
const cookieClicker = document.getElementById('cookie');
let counter = 0;
const speed = document.getElementById('clicker__speed');


const currentTime = new Date();

cookieClicker.onclick = function() {
    const clickTime = new Date()
    let clickSpeed = counter /((clickTime - currentTime) / 1000);
    speed.textContent = clickSpeed.toFixed(1);

    counter++;
    counterCliker.textContent = counter;

    if (counter % 2 !== 0) {
        cookieClicker.width = "300";
    } else {
        cookieClicker.width = "200"
    };
};

