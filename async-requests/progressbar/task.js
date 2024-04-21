const progress = document.getElementById('progress');
const progressURL = 'https://students.netoservices.ru/nestjs-backend/upload';
const form = document.getElementById('form');

function sendRequest(method, URL, body) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(method, URL);
        xhr.responseType = 'json';

        xhr.upload.onprogress = event => {
            if (event.lengthComputable) {
                const percentComplete = (event.loaded / event.total) * 100;
                progress.value = percentComplete;
            }
        };

        xhr.onloadend = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject(new Error(`Произошла ошибка во время отправки: ${xhr.status}`));
            }
        };

        xhr.onerror = () => {
            reject(new Error('Произошла ошибка во время отправки'));
        };

        xhr.send(body);
    });
}

form.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(form);

    sendRequest('POST', progressURL, formData)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error(`Ошибка: ${error.message}`);
        });
});
