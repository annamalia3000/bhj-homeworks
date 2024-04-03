const fontSizeControls = document.querySelectorAll('.font-size');
const book = document.querySelector('.book');

fontSizeControls.forEach(control => {
    control.addEventListener('click', function(e) {
        e.preventDefault(); 

        fontSizeControls.forEach(control => {
            control.classList.remove('font-size_active');
        });

        this.classList.add('font-size_active');

        const booksize = this.dataset.size;

        book.classList.remove('book_fs-big', 'book_fs-small');
        if (booksize) {
            book.classList.add(`book_fs-${booksize}`);
            }
    });
});

document.querySelectorAll('.text_color_black, .text_color_gray, .text_color_whitesmoke').forEach(control => {
    control.addEventListener('click', function(event) {
        event.preventDefault(); 
        
        document.querySelectorAll('.color').forEach(el => {
            el.classList.remove('color_active');
        });

        this.classList.add('color_active');

        const textColor = this.dataset.textColor;

        book.style.color = textColor;
    });
});

document.querySelectorAll('.bg_color_black, .bg_color_gray, .bg_color_white').forEach(control => {
    control.addEventListener('click', function(event) {
        event.preventDefault(); 
        
        document.querySelectorAll('.color').forEach(el => {
            el.classList.remove('color_active');
        });

        this.classList.add('color_active');

        const bgColor = this.dataset.bgColor;

        book.style.backgroundColor = bgColor;
    });
});




