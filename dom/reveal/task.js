const block = document.querySelector('.reveal');

function isVisible() {
    const {top, bottom} = block.getBoundingClientRect()

    if (bottom < 0 || top > window.innerHeight) {
       return false;
    } else {
        block.classList.add('reveal_active');
    };
};

window.addEventListener('scroll', isVisible);

 