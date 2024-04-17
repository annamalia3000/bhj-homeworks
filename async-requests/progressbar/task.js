const progress = document.getElementById('progress');
const progressURL = 'https://students.netoservices.ru/nestjs-backend/upload';

function sendRequest(method, URL, body) {
    return new Promise((resolve, reject) => {
        fetch(URL, {
            method: method,
            body: body,
            headers: {
                'Content-Type': 'application/json'
            },
            
            onprogress: event => {
                if (event.lengthComputable) {
                    const percentComplete = (event.loaded / event.total) * 100;
                    progress.value = percentComplete;
                }
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                reject(new Error(`Ошибка: ${response.status}`));
            }
        })
        .then(data => {
            resolve(data);
        })
        .catch(error => {
            reject(error);
        });
    });
}

sendRequest('GET', progressURL)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(`Ошибка: ${error}`);
    });
