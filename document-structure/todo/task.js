const form = document.querySelector('form');
const btnAdd = document.getElementById('tasks__add');
const taskList = document.getElementById('tasks__list');
const taskInput = document.getElementById('task__input');

let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

window.addEventListener('load', () => {
    restoreTasksFromLocalStorage();
});

function updateTasksInLocalStorage() {
    const taskTexts = [...taskList.querySelectorAll('.task__title')].map(task => task.textContent);
    localStorage.setItem('tasks', JSON.stringify(taskTexts));
}

function restoreTasksFromLocalStorage() {
    savedTasks.forEach(taskText => {
        const taskHTML = `<div class="task">
                            <div class="task__title">
                                ${taskText}
                            </div>
                            <a href="#" class="task__remove">&times;</a>
                          </div>`;
        taskList.insertAdjacentHTML('beforeEnd', taskHTML);
    });
}

btnAdd.addEventListener('click', e => {
    e.preventDefault();

    const taskInputValue = taskInput.value.trim();

    if (taskInput.length !== 0) {
        const taskHTML = `<div class="task">
                            <div class="task__title">
                                ${taskInputValue}
                            </div>
                            <a href="#" class="task__remove">&times;</a>
                          </div>`;
        taskList.insertAdjacentHTML('beforeEnd', taskHTML);
        
        savedTasks.push(taskInputValue);
        updateTasksInLocalStorage();
        
        form.reset();
    
    }
});

taskList.addEventListener('click', e => {
    if (e.target.classList.contains('task__remove')) {
        e.preventDefault();
        const taskToRemove = e.target.closest('.task').outerHTML; 
        e.target.closest('.task').remove();
        
        savedTasks = savedTasks.filter(task => task !== taskToRemove);
        
        updateTasksInLocalStorage();
    };
});
