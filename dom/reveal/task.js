const blocks = document.querySelectorAll('.reveal');

blocks.forEach(block => {
    function isVisible() {
        const {top, bottom} = block.getBoundingClientRect();
    
        if (bottom < 0 || top > window.innerHeight) {
           return false;
        } else {
            block.classList.add('reveal_active');
        };
    };
    window.addEventListener('scroll', isVisible);
})


 