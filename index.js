const todoList = document.getElementById('todo-list');
const todoTitleInput = document.getElementById('todo-title');

let todos = [];
let editingTodoId = null;

function createOrUpdateTodo() {
  const title = todoTitleInput.value;

  if (title) {
    if (editingTodoId !== null) {
      // Update existing todo
      const todoIndex = todos.findIndex(todo => todo.id === editingTodoId);
      if (todoIndex !== -1) {
        todos[todoIndex].title = title;
      }
      editingTodoId = null;
    } else {
      // Create new todo
      const todo = {
        id: generateId(),
        title: title
      };
      todos.push(todo);
    }

    renderTodos();
    clearInputs();
  }
}

function deleteTodoById(id) {
  todos = todos.filter(todo => todo.id !== id);
  if (editingTodoId === id) {
    editingTodoId = null;
  }
  renderTodos();
}

function editTodoById(id) {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todoTitleInput.value = todo.title;
    editingTodoId = id;

    document.querySelectorAll('.edit-button').forEach(button => {
      button.disabled = true;
    });
    document.querySelectorAll('.delete-button').forEach(button => {
      button.disabled = true;
    });
  }
}

function cancelEdit() {
  clearInputs();
  editingTodoId = null;

  document.querySelectorAll('.edit-button').forEach(button => {
    button.disabled = false;
  });
  document.querySelectorAll('.delete-button').forEach(button => {
    button.disabled = false;
  });
}

function saveEdit(id) {
  createOrUpdateTodo();

  document.querySelectorAll('.edit-button').forEach(button => {
    button.disabled = false;
  });
  document.querySelectorAll('.delete-button').forEach(button => {
    button.disabled = false;
  });
}

function renderTodos() {
  todoList.innerHTML = '';

  todos.forEach(todo => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    const todoTitle = document.createElement('p');
    todoTitle.classList.add('todo-title');
    todoTitle.textContent = todo.title;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    editButton.onclick = () => editTodoById(todo.id);

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.classList.add('save-button');
    saveButton.onclick = () => saveEdit(todo.id);

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.classList.add('cancel-button');
    cancelButton.onclick = cancelEdit;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = () => deleteTodoById(todo.id);

    if (editingTodoId === todo.id) {
      editButton.disabled = true;
      deleteButton.disabled = true;
      saveButton.style.display = 'inline-block';
      cancelButton.style.display = 'inline-block';
    }

    todoItem.appendChild(todoTitle);
    todoItem.appendChild(editButton);
    todoItem.appendChild(saveButton);
    todoItem.appendChild(cancelButton);
    todoItem.appendChild(deleteButton);

    todoList.appendChild(todoItem);
  });
}

function clearInputs() {
  todoTitleInput.value = '';
}

function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

renderTodos();
