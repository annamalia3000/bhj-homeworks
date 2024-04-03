const textBlocks = document.querySelectorAll('.rotator__case');
let currentIndex = 0;
let initialSpeed = parseInt(textBlocks[currentIndex].dataset.speed);
let timerId;

const changeText = () => {
    textBlocks.forEach((text, index) => {
        const color = text.dataset.color;
        text.style.color = color;

        text.classList.toggle('rotator__case_active', index === currentIndex);
    });

    currentIndex = ++currentIndex % textBlocks.length;
    initialSpeed = parseInt(textBlocks[currentIndex].dataset.speed);

    clearInterval(timerId);

    timerId = setTimeout(changeText, initialSpeed);
};

timerId = setTimeout(changeText, initialSpeed);