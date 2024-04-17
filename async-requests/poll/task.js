const requestURL = 'https://students.netoservices.ru/nestjs-backend/poll';
const postURL = 'https://students.netoservices.ru/nestjs-backend/poll';
const questionDiv =  document.querySelector('.poll__title');
const answersDiv = document.querySelector('.poll__answers');


function renderValue(res) {
    questionDiv.textContent = res.data.title;
    questionDiv.id = res.id;
    const answers = res.data.answers;

    answers.forEach(answer => {
        answersDiv.insertAdjacentHTML('beforeend',`
        <button class="poll__answer">
          ${answer}
        </button>
        `);
    });
}

function sendRequest(method, URL, body = null) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(method, URL);

        xhr.responseType = 'json';
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response); 
            } else {
                reject(new Error(`Ошибка: ${xhr.status}`));
            }
        };

        xhr.onerror = () => {
            reject(xhr.response);
        };

        xhr.send(body);
    });
}

sendRequest('GET', requestURL)
    .then(response => {
        renderValue(response);
    })
    .catch(error => {
        console.error(`Ошибка: ${error}`);
    });

answersDiv.addEventListener('click', (event) => {
    const targetButton = event.target.closest('.poll__answer');
    if (targetButton) {
        const answers = [...(answersDiv.querySelectorAll('.poll__answer'))];
        const index = answers.indexOf(targetButton);
        const id = questionDiv.id; 

        sendRequest('POST', postURL, `vote=${id}&answer=${index}`)
            .then(response => {
                alert('Ваш голос засчитан!');
                answersDiv.innerHTML = '';
                response.stat.forEach(item => {
                    const totalVotes = response.stat.reduce((acc, item) => acc + item.votes, 0);

                    const votes = (item.votes / totalVotes * 100).toFixed(2); 
                    const result = `${item.answer}: ${votes}%`;
                    const div = document.createElement('div');
                    div.textContent = result;
                    answersDiv.appendChild(div);
                });
            })
            .catch(error => {
                console.error(`Ошибка: ${error}`);
            });
    }
});