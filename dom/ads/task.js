const textBlocks = document.querySelectorAll('.rotator__case');
let currentIndex = 0;
let initialSpeed = parseInt(textBlocks[currentIndex].dataset.speed);

const changeText = (currentSpeed) => {
    textBlocks.forEach((text, index) => {
        const color = text.dataset.color;
        text.style.color = color;

        text.classList.toggle('rotator__case_active', index === currentIndex);
    });

    currentIndex = ++currentIndex % textBlocks.length;
    currentSpeed = parseInt(textBlocks[currentIndex].dataset.speed);
};


setInterval(() => {
    changeText(initialSpeed);
},initialSpeed);
