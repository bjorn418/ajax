document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTask');
    const todoList = document.getElementById('todoList');

    loadTasks(); // Load tasks when the page is loaded

    addTaskBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent form submission
        addTask();
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/api/tasks');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = () => {
                if (xhr.status === 200) {
                    const task = JSON.parse(xhr.responseText);
                    createTaskElement(task);  // Immediately add the new task to the list
                    taskInput.value = ''; // Clear the input field
                } else {
                    console.error('Error adding task');
                }
            };
            xhr.send(JSON.stringify({ text: taskText }));
        }
    }

    function loadTasks() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/tasks');
        xhr.onload = () => {
            if (xhr.status === 200) {
                const tasks = JSON.parse(xhr.responseText);
                todoList.innerHTML = ''; // Clear the list before adding tasks again
                tasks.forEach(task => createTaskElement(task)); // Render all tasks
            } else {
                console.error('Error loading tasks');
            }
        };
        xhr.send();
    }

    function createTaskElement(task) {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.dataset.id = task.id;
        if (task.completed) li.classList.add('completed');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTask(task.id));

        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = task.text;

        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => editTask(task.id, span));

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);  // Add task to the DOM
    }

    function editTask(id, spanElement) {
        const currentText = spanElement.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.className = 'edit-input';
        spanElement.replaceWith(input);
        input.focus();

        const saveEdit = () => {
            const newText = input.value.trim();
            if (newText && newText !== currentText) {
                const xhr = new XMLHttpRequest();
                xhr.open('PUT', `/api/tasks/${id}`);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.onload = () => {
                    if (xhr.status === 200 || xhr.status === 201) {
                        const updatedTask = JSON.parse(xhr.responseText);
                        spanElement.textContent = updatedTask.text;
                        input.replaceWith(spanElement); // Replace input with updated text
                    } else {
                        console.error('Error updating task');
                        input.replaceWith(spanElement); // If error, revert input to span
                    }
                };
                xhr.send(JSON.stringify({ text: newText }));
            } else {
                input.replaceWith(spanElement); // If text is empty or same, revert
            }
        };

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveEdit();
            }
        });

        input.addEventListener('blur', saveEdit);
    }

    function toggleTask(id) {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', `/api/tasks/${id}/toggle`);
        xhr.onload = () => {
            if (xhr.status === 200) {
                const updatedTask = JSON.parse(xhr.responseText);
                const taskElement = document.querySelector(`[data-id="${id}"]`);
                taskElement.classList.toggle('completed', updatedTask.completed); // Toggle completion
            } else {
                console.error('Error toggling task');
            }
        };
        xhr.send();
    }

    function deleteTask(id) {
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', `/api/tasks/${id}`);
        xhr.onload = () => {
            if (xhr.status === 200) {
                const taskElement = document.querySelector(`[data-id="${id}"]`);
                taskElement.remove(); // Remove task from the DOM immediately
            } else {
                console.error('Error deleting task');
            }
        };
        xhr.send();
    }
});
