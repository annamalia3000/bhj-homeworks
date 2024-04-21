const popUp = document.querySelector('.modal__close');
const modal = document.getElementById('subscribe-modal');

function setCookie(name, value) {
    document.cookie = `${name}=${encodeURIComponent(value)}`;
}

function closeModal() {
    modal.classList.remove('modal_active');
    setCookie('modalClosed', true);
    console.log(document.cookie)
};

popUp.addEventListener('click', () => {
    closeModal();
    console.log(document.cookie);
});

window.addEventListener('load', () => {
    const cookies = document.cookie.split(';');
    const modalClosed = cookies.some(cookie => cookie.trim().startsWith('modalClosed'));

    if (!modalClosed) {
        modal.classList.add('modal_active');
    }
});
