const form = document.querySelector('form');
const btnAdd = document.getElementById('tasks__add');
const taskList = document.getElementById('tasks__list');
const taskInput = document.getElementById('task__input');

function getSavedTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
};

function setSavedTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

window.addEventListener('load', () => {
    restoreTasksFromLocalStorage();
});

function updateTasksInLocalStorage() {
    const taskTexts = [...taskList.querySelectorAll('.task__title')].map(task => task.innerHTML);
    setSavedTasks(taskTexts);
};

function restoreTasksFromLocalStorage() {
    getSavedTasks().forEach(taskText => {
        renderTask(taskText);
    });
};

function renderTask(taskText) {
    const taskHTML = `<div class="task">
                            <div class="task__title">
                                ${taskText}
                            </div>
                            <a href="#" class="task__remove">&times;</a>
                          </div>`;
    taskList.insertAdjacentHTML('beforeEnd', taskHTML);
}; 

btnAdd.addEventListener('click', e => {
    e.preventDefault();

    const taskInputValue = taskInput.value.trim();

    if (taskInput.length !== 0) {
        const updatedTasks = getSavedTasks();
        updatedTasks.push(taskInputValue);
        setSavedTasks(updatedTasks);
        renderTask(taskInputValue);
        
        form.reset();
    }
});

taskList.addEventListener('click', e => {
    if (e.target.classList.contains('task__remove')) {
        e.preventDefault();
        const taskToRemove = e.target.closest('.task').outerHTML; 
        e.target.closest('.task').remove();

        const updatedTasks = getSavedTasks().filter(task => task !== taskToRemove);
        setSavedTasks(updatedTasks);
        
        updateTasksInLocalStorage();
    };
});
