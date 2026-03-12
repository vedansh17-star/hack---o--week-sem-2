// DOM Elements
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const completedCount = document.getElementById('completedCount');
const clearAllBtn = document.getElementById('clearAllBtn');
const currentDateElement = document.getElementById('currentDate');

// Initialize tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Display current date
function displayDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    currentDateElement.textContent = today.toLocaleDateString('en-US', options);
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update task counts
function updateCounts() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    taskCount.textContent = `${total} task${total !== 1 ? 's' : ''}`;
    completedCount.textContent = `${completed} completed`;
}

// Render tasks
function renderTasks() {
    taskList.innerHTML = '';
    
    if (tasks.length === 0) {
        taskList.innerHTML = `
            <li class="empty-state">
                <span>📋</span>
                <p>No tasks yet. Add your first task above!</p>
            </li>
        `;
    } else {
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <div class="task-content">
                    <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
                    <span class="task-text">${escapeHtml(task.text)}</span>
                </div>
                <div class="task-actions">
                    <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }
    
    updateCounts();
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Add new task
function addTask(text) {
    if (text.trim() === '') return;
    
    tasks.push({
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString()
    });
    
    saveTasks();
    renderTasks();
    taskInput.value = '';
}

// Toggle task completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Clear all tasks
function clearAllTasks() {
    if (tasks.length === 0) return;
    
    if (confirm('Are you sure you want to delete all tasks?')) {
        tasks = [];
        saveTasks();
        renderTasks();
    }
}

// Event Listeners
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask(taskInput.value);
});

clearAllBtn.addEventListener('click', clearAllTasks);

// Initialize
displayDate();
renderTasks();
