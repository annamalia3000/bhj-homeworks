const textEditor = document.getElementById('editor');
const btnClear = document.getElementById('btnClear');

function  restoreFromLocalStorage() {
    return JSON.parse(localStorage.getItem('text')) || '';
}

window.addEventListener('load', () => {
    textEditor.value = restoreFromLocalStorage();
});

function setSavedTexts(inputText) {
    localStorage.setItem('text', JSON.stringify(inputText));
}

textEditor.addEventListener('input', () => {
    setSavedTexts(textEditor.value);
});

btnClear.addEventListener('click', () => {
    textEditor.value = '';
    localStorage.clear();
});
  
