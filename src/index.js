import './style.css';
import {
  renderTodo,
  addToDo,
} from './add-remove.js';

const input = document.querySelector('.todoInput');
const refresh = document.querySelector('.refresh');

let todoArray = '';
let id = '';
const data = localStorage.getItem('todoStore');

if (data) {
  todoArray = JSON.parse(data);
  id = todoArray.length;
  renderTodo(todoArray);
} else {
  todoArray = [];
  id = 0;
}

refresh.addEventListener('click', () => {
  localStorage.reload();
});

const pushToDo = () => {
  const data = localStorage.getItem('todoStore');

  if (data) {
    todoArray = JSON.parse(data);
    id = todoArray.length;
    renderTodo(todoArray);
  } else {
    todoArray = [];
    id = 0;
  }
  const title = input.value;
  if (title) {
    addToDo(title, id, false);

    todoArray.push({
      title,
      index: id,
      completed: false,
    });
    renderTodo(todoArray);
    localStorage.setItem('todoStore', JSON.stringify(todoArray));
    id += 1;
  }
  input.value = '';
};

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    pushToDo();
  }
});
