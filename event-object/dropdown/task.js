const button = document.querySelector('.dropdown');
const list = document.querySelector('.dropdown__list');
const iteam = document.querySelectorAll('.dropdown__item');
const value = document.querySelector('.dropdown__value');
const links = Array.from(document.querySelectorAll('.dropdown__link'));

button.addEventListener('click', () => {
    list.classList.toggle('dropdown__list_active');
});

links.forEach(link => {
    link.addEventListener('click', event => {
        value.textContent = link.textContent;
        event.preventDefault();
        list.classList.toggle('dropdown__list_active'); 
    });
});

// не закрывется список