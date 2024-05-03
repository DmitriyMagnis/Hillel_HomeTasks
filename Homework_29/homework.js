const form = document.getElementById('form');
const container = document.getElementById('todo-list');

const drawTodoItem = val => {
  const li = document.createElement('li');
  const text = document.createElement('p');
  const deleteBtn = document.createElement('button');

  li.classList.add('todo-list__item');
  text.classList.add('todo-list__item-text');
  deleteBtn.classList.add('btn', 'btn-danger', 'todo-list__item-btn');
  deleteBtn.setAttribute('data-todoitem', true);
  deleteBtn.textContent = 'delete';
  text.textContent = val;
  li.appendChild(text);
  li.appendChild(deleteBtn);
  container.appendChild(li);
};

const handleAdd = e => {
  e.preventDefault();
  const inputTask = new FormData(e.target).get('task');

  drawTodoItem(inputTask);

  form.reset();
};
const handleDelete = ({ target }) => {
  if (target.hasAttribute('data-todoitem')) {
    target.parentElement.remove();
  }
};

form.addEventListener('submit', handleAdd);
container.addEventListener('click', handleDelete);
