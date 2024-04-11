const form = document.querySelector('form');
const btnAdd = document.getElementById('tasks__add');
const taskList = document.getElementById('tasks__list');
const taskInput = document.getElementById('task__input');

const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

window.addEventListener('load', () => {
    if (savedTasks.length !== 0) {
        savedTasks.forEach(task => {
            taskList.insertAdjacentHTML('beforeEnd', task);
        });
    }
});

btnAdd.addEventListener('click', e => {
    e.preventDefault();

    if (taskInput.value.trim().length !== 0) {
        const taskHTML = `<div class="task">
                            <div class="task__title">
                                ${taskInput.value.trim()}
                            </div>
                            <a href="#" class="task__remove">&times;</a>
                          </div>`;
        taskList.insertAdjacentHTML('beforeEnd', taskHTML);
        
        savedTasks.push(taskHTML);
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
        console.log(savedTasks)
        
        form.reset();
    }
});

taskList.addEventListener('click', e => {
    if (e.target.classList.contains('task__remove')) {
        e.preventDefault();
        const taskToRemove = e.target.closest('.task').outerHTML; 
        e.target.closest('.task').remove();
        
        const updatedTasks = savedTasks.filter(task => task !== taskToRemove);
        
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        console.log(updatedTasks);
    }
});

// //при перезагрузке страницы задачи сохраняются, но не получется обновить localStorage после удаления задач
