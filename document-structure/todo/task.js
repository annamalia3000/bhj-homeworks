const form = document.querySelector('form');
const btnAdd = document.getElementById('tasks__add');
const btnRemove = document.getElementsByClassName('.task__remove');
const taskList = document.getElementById('tasks__list');
const taskInput = document.getElementById('task__input');
const task = document.getElementById('task');

btnAdd.addEventListener('click', e => {
    e.preventDefault();

    if (taskInput.value !== '') {
        taskList.insertAdjacentHTML('beforeEnd', 
        `<div class="task">
            <div class="task__title">
                ${taskInput.value.trim()}
            </div>
             <a href="#" class="task__remove">&times;</a>
        </div>`)
        form.reset();
    };
});

taskList.addEventListener('click', e => {
    if (e.target.classList.contains('task__remove')) {
        e.preventDefault();
        e.target.closest('.task').remove();
    }
});




