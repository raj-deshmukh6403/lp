document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const totalTasksCounter = document.getElementById('totalTasks');
    const completedTasksCounter = document.getElementById('completedTasks');

    const editModal = document.getElementById('editModal');
    const editTaskInput = document.getElementById('editTaskInput');
    const saveEditBtn = document.getElementById('saveEditBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    let editingTaskId = null;

    let tasks = [];

    loadTasks();

    addTaskBtn.addEventListener('click', function () {
        const description = taskInput.value.trim();
        if (description) {
            const newTask = { id: Date.now(), description: description, completed: false };
            tasks.push(newTask);
            renderTasks();
            saveTasks();
            taskInput.value = '';
        }
    });

    taskList.addEventListener('click', function (e) {
        const taskId = parseInt(e.target.dataset.id, 10);

        if (e.target.classList.contains('delete-btn')) {
            tasks = tasks.filter(task => task.id !== taskId);
            renderTasks();
            saveTasks();
        }

        if (e.target.classList.contains('complete-btn') || e.target.classList.contains('undo-btn')) {
            const task = tasks.find(task => task.id === taskId);
            if (task) {
                task.completed = !task.completed;
                renderTasks();
                saveTasks();
            }
        }

        if (e.target.classList.contains('edit-btn')) {
            const task = tasks.find(task => task.id === taskId);
            if (task) {
                editingTaskId = taskId;
                editTaskInput.value = task.description;
                editModal.classList.remove('hidden');
            }
        }
    });

    saveEditBtn.addEventListener('click', function () {
        const newDescription = editTaskInput.value.trim();
        if (newDescription && editingTaskId !== null) {
            const task = tasks.find(task => task.id === editingTaskId);
            if (task) {
                task.description = newDescription;
                renderTasks();
                saveTasks();
            }
            closeEditModal();
        }
    });

    cancelEditBtn.addEventListener('click', closeEditModal);

    function closeEditModal() {
        editModal.classList.add('hidden');
        editingTaskId = null;
    }

    function renderTasks() {
        taskList.innerHTML = tasks
            .map(task => `
                <li class="${task.completed ? 'completed' : ''}">
                    <span>${task.description}</span>
                    ${task.completed
                ? `<button class="undo-btn" data-id="${task.id}">Undo</button>`
                : `<button class="complete-btn" data-id="${task.id}">Complete</button>`}
                    <button class="edit-btn" data-id="${task.id}">Edit</button>
                    <button class="delete-btn" data-id="${task.id}">Delete</button>
                </li>
            `)
            .join('');
        updateCounters();
    }

    function updateCounters() {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;

        totalTasksCounter.textContent = totalTasks;
        completedTasksCounter.textContent = completedTasks;
    }

    function saveTasks() {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/saveTasks', true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify(tasks));
    }

    function loadTasks() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/loadTasks', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                try {
                    tasks = JSON.parse(xhr.responseText);
                    renderTasks();
                } catch (e) {
                    console.error('Error parsing tasks:', e);
                    tasks = [];
                }
            }
        };
        xhr.send();
    }
});

