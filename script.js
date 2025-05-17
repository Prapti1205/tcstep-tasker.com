const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task';

    const input = document.createElement('input');
    input.type = 'text';
    input.value = task;
    input.disabled = true;

    const actions = document.createElement('div');
    actions.className = 'actions';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => {
      input.disabled = !input.disabled;
      editBtn.textContent = input.disabled ? 'Edit' : 'Save';
      if (input.disabled) {
        tasks[index] = input.value;
        saveTasks();
      }
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete';
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    li.appendChild(input);
    li.appendChild(actions);
    taskList.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
document.addEventListener('click', (e) => {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.style.top = `${e.clientY}px`;
  sparkle.style.left = `${e.clientX}px`;
  sparkle.style.setProperty('--x', `${e.clientX}px`);
  sparkle.style.setProperty('--y', `${e.clientY}px`);
  document.body.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 1000);
});

taskForm.addEventListener('submit', e => {
  e.preventDefault();
  const task = taskInput.value.trim();
  if (task) {
    tasks.push(task);
    saveTasks();
    renderTasks();
    taskInput.value = '';
  }
});

renderTasks();
