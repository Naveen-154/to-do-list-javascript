// Task Class
class Task {
    constructor(title, description = '', dueDate = '') {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.completed = false;
    }
}

// ToDoList Class
class ToDoList {
    constructor() {
        this.tasks = this.loadTasks();
        this.render();
    }

    addTask(task) {
        this.tasks.push(task);
        this.saveTasks();
        this.render();
    }

    editTask(index, updatedTask) {
        this.tasks[index] = updatedTask;
        this.saveTasks();
        this.render();
    }

    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasks();
        this.render();
    }

    toggleCompletion(index) {
        this.tasks[index].completed = !this.tasks[index].completed;
        this.saveTasks();
        this.render();
    }

    filterTasks(filter) {
        if (filter === 'completed') {
            return this.tasks.filter(task => task.completed);
        } else if (filter === 'incomplete') {
            return this.tasks.filter(task => !task.completed);
        }
        return this.tasks;
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks).map(task => Object.assign(new Task(), task)) : [];
    }

    render() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';

        this.filterTasks(this.currentFilter).forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = task.completed ? 'completed' : '';
            taskItem.innerHTML = `
                <div>
                    <strong>${task.title}</strong>
                    <p>${task.description}</p>
                    <small>Due: ${task.dueDate}</small>
                </div>
                <button class="edit" data-index="${index}">Edit</button>
                <button class="delete" data-index="${index}">Delete</button>
                <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}" />
            `;
            taskList.appendChild(taskItem);
        });

        // Attach event listeners to edit, delete, and checkbox buttons
        document.querySelectorAll('.edit').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                // Implement edit functionality here
            });
        });

        document.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                this.deleteTask(index);
            });
        });

        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const index = e.target.getAttribute('data-index');
                this.toggleCompletion(index);
            });
        });
    }
}

const toDoList = new ToDoList();

// Form Submission
document.getElementById('task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const dueDate = document.getElementById('task-due-date').value;

    if (title) {
        toDoList.addTask(new Task(title, description, dueDate));
        document.getElementById('task-form').reset();
    }
});

// Filter Tasks
document.getElementById('filter-all').addEventListener('click', () => {
    toDoList.currentFilter = 'all';
    toDoList.render();
});

document.getElementById('filter-completed').addEventListener('click', () => {
    toDoList.currentFilter = 'completed';
    toDoList.render();
});

document.getElementById('filter-incomplete').addEventListener('click', () => {
    toDoList.currentFilter = 'incomplete';
    toDoList.render();
});
