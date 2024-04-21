const form = document.getElementById('signin__form');
const URL = 'https://students.netoservices.ru/nestjs-backend/auth';
const welcome = document.getElementById('welcome');
const signIn = document.querySelector('.signin');
let userId;

function sendRequest(method, url, body) {
    return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest;

        xhr.responseType = 'json';

        xhr.open(method, url)

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject(new Error(`Произошла ошибка во время отправки: ${xhr.status}`));
            };
        };

        xhr.onerror = () => {
            reject(new Error('Произошла ошибка во время отправки'));

        }

        xhr.send(body);

    })
};

function setSavedId(id) {
    localStorage.setItem('userId', JSON.stringify(id));
};

window.addEventListener('load', () => {
    const userId = localStorage.getItem('userId');

    if (userId) {
        const userIdElement = document.getElementById('user_id');
        userIdElement.textContent = JSON.parse(userId);
        signIn.classList.remove('signin_active');
        welcome.classList.add('welcome_active');
        console.log(userId)
    }
});

form.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(form);

    sendRequest('POST', URL, formData)
        .then(response => {
            if (response.success) {
                userId = response.user_id;
                setSavedId(userId);
                document.getElementById('user_id').textContent = userId;
                signIn.classList.remove('signin_active');
                welcome.classList.add('welcome_active');
                form.reset();
            } else {
                console.error('Неверный логин/пароль');
            }
        })
        .catch(error => {
            console.error(`Ошибка: ${error.message}`);
        });
});

//деавторизация

const btn = document.getElementById('log__Out');

btn.addEventListener('click', () => {
    signIn.classList.add('signin_active');
    welcome.classList.remove('welcome_active');
    localStorage.removeItem('userId');
})