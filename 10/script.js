document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const totalTasksCounter = document.getElementById('totalTasks');
    const completedTasksCounter = document.getElementById('completedTasks');
  
    // Modal Elements
    const editModal = document.getElementById('editModal');
    const editTaskInput = document.getElementById('editTaskInput');
    const saveEditBtn = document.getElementById('saveEditBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    let editingTaskId = null;
  
    let tasks = [];
  
    // Load tasks on page load
    loadTasks();
  
    // Add task
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
  
    // Handle task actions (delete, complete/undo, edit)
    taskList.addEventListener('click', function (e) {
      const taskId = parseInt(e.target.dataset.id, 10);
  
      // Delete task
      if (e.target.classList.contains('delete-btn')) {
        tasks = tasks.filter(task => task.id !== taskId);
        renderTasks();
        saveTasks();
      }
  
      // Complete or Undo task
      if (e.target.classList.contains('complete-btn') || e.target.classList.contains('undo-btn')) {
        const task = tasks.find(task => task.id === taskId);
        if (task) {
          task.completed = !task.completed; // Toggle completion status
          renderTasks();
          saveTasks();
        }
      }
  
      // Edit task
      if (e.target.classList.contains('edit-btn')) {
        const task = tasks.find(task => task.id === taskId);
        if (task) {
          editingTaskId = taskId;
          editTaskInput.value = task.description;
          editModal.classList.remove('hidden');
        }
      }
    });
  
    // Save edited task
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
  
    // Cancel editing
    cancelEditBtn.addEventListener('click', closeEditModal);
  
    // Close modal
    function closeEditModal() {
      editModal.classList.add('hidden');
      editingTaskId = null;
    }
  
    // Render tasks to the DOM
    function renderTasks() {
      taskList.innerHTML = tasks
        .map(task => `
          <li class="${task.completed ? 'completed' : ''}">
            <span>${task.description}</span>
            ${task.completed
              ? `<button class="undo-btn" data-id="${task.id}">Undo</button>`
              : `<button class="complete-btn" data-id="${task.id}">Complete</button>`
            }
            <button class="edit-btn" data-id="${task.id}">Edit</button>
            <button class="delete-btn" data-id="${task.id}">Delete</button>
          </li>
        `)
        .join('');
  
      updateCounters();
    }
  
    // Save tasks locally (simulate server save)
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    // Load tasks from local storage (simulate server fetch)
    function loadTasks() {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        tasks = JSON.parse(storedTasks);
      }
      renderTasks();
    }
  
    // Update task counters
    function updateCounters() {
      const totalTasks = tasks.length;
      const completedTasks = tasks.filter(task => task.completed).length;
  
      totalTasksCounter.textContent = totalTasks;
      completedTasksCounter.textContent = completedTasks;
    }
  });