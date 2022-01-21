const list = document.querySelector('.task-content');

let LIST = [];

export const addToDo = (toDo, id, done) => {
  const item = `
    <li class="todo-task" ${id}>
      <input type="checkbox" class="checkbox"
      ${done ? 'checked' : ''}
      id="${id}"/>
        <input class="input" type="text" value='${toDo}' id="${id}" readonly />
      <img src="./images/delete.png" alt="delete" class="delete" id="${id}"/>
      <img src="./images/dots.png" alt="drag" class="drag" id="${id}" />
    </li> `;
  list.insertAdjacentHTML('beforeend', item);
};

const completeToDo = (LIST, element) => {
  const task = LIST.find((t) => t.index === Number(element.id));
  task.done = element.checked;
  localStorage.setItem('todoStore', JSON.stringify(LIST));
};

export const removeToDo = (element) => {
  LIST = LIST.filter((t) => t.index !== Number(element.id)).map((t, i) => {
    t.index = i;
    return t;
  });
  localStorage.setItem('todoStore', JSON.stringify(LIST));
};
export const loadList = (array) => {
  if (array) {
    LIST = array;
  }

  list.innerHTML = '';
  array.forEach((item) => {
    addToDo(item.name, item.index, item.done);
  });
  document.querySelectorAll('.input').forEach((b) => {
    b.addEventListener('click', () => {
      b.readOnly = false;
      b.classList.add('showBtn');
      b.focus();
    });
    b.addEventListener('change', () => {
      b.readOnly = true;
      const task = LIST.find((t) => t.index === Number(b.id));
      task.name = b.value.trim();
      b.classList.remove('showBtn');
      localStorage.setItem('todoStore', JSON.stringify(LIST));
    });
  });

  document.querySelectorAll('.checkbox').forEach((b) => {
    b.addEventListener('change', () => {
      completeToDo(LIST, b);
    });
  });
  document.querySelectorAll('.delete').forEach((btn) => {
    btn.addEventListener('click', () => {
      removeToDo(btn.parentNode.parentNode);
      loadList(LIST);
    });
  });
};