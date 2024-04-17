const loadImg = document.getElementById('loader');
const itemsContainer = document.getElementById('items'); 
const RequestURL = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses';

function renderValue(valute) {
    for (const key in valute) {
        const {CharCode, Value} = valute[key];

        itemsContainer.insertAdjacentHTML('beforeend', `
            <div class="item">
              <div class="item__code">${CharCode}</div>
              <div class="item__value">${Value}</div>
              <div class="item__currency">руб.</div>
            </div>
        `);
    };
};

// xhr
// function sendRequest(method, URL) {
//     return new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest();
    
//         xhr.open(method, URL);

//         xhr.responseType = 'json';

//         xhr.onload = () => {
//             if (xhr.status >= 200 && xhr.status < 300) {
//                 resolve(xhr.response.response.Valute); 
//                 loadImg.classList.remove('loader_active');
//                 renderValue(xhr.response.response.Valute); 
//             } else {
//                 reject(new Error(`Ошибка: ${xhr.status}`));
//             }
//         };

//         xhr.onerror = () => {
//             reject(xhr.response);
//         };
   
//         xhr.send();
//     });
// }

// sendRequest('GET', RequestURL);

//fetch

function sendRequest(URL) {
    return fetch(URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            renderValue(data.response.Valute);
            loadImg.classList.remove('loader_active'); 
        })
        .catch(error => {
            console.error(`Ошибка: ${error}`)
            loadImg.classList.remove('loader_active'); 
        });
}

sendRequest(RequestURL);