const list = document.querySelector('.task-content');
const clear = document.querySelector('.clear');

let todoArray = [];

export const addToDo = (toDo, id, completed) => {
  const item = `
    <li class="todo-task" ${id}>
      <input type="checkbox" class="checkbox"
      ${completed ? 'checked' : null}
      id="${id}"/>
        <input class="input" type="text" value='${toDo}' id="${id}" readonly />
      <img src="./images/delete.png" alt="delete" class="delete" id="${id}"/>
      <img src="./images/dots.png" alt="drag" class="drag" id="${id}" />
    </li> `;
  list.insertAdjacentHTML('beforeend', item);
};

export const removeToDo = (element) => {
  todoArray = todoArray.filter((t) => t.index !== Number(element.id)).map((t, i) => {
    t.index = i;
    return t;
  });
  localStorage.setItem('todoStore', JSON.stringify(todoArray));
};


const completeToDo = (todoArray, element) => {
  const task = todoArray.find((t) => t.index === Number(element.id));
  task.completed = element.checked;
  localStorage.setItem('todoStore', JSON.stringify(todoArray));
};

export const renderTodo = (array) => {
  if (array) {
    todoArray = array;
  }

  list.innerHTML = '';
  array.forEach((item) => {
    addToDo(item.title, item.index, item.completed);
  });
  document.querySelectorAll('.input').forEach((input) => {
    input.addEventListener('click', () => {
      input.readOnly = false;
      input.classList.add('showBtn');
      input.focus();
    });
    input.addEventListener('change', () => {
      input.readOnly = true;
      const task = todoArray.find((t) => t.index === Number(input.id));
      task.title = input.value.trim();
      input.classList.remove('showBtn');
      localStorage.setItem('todoStore', JSON.stringify(todoArray));
    });
  });

  document.querySelectorAll('.checkbox').forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      completeToDo(todoArray, checkbox);
    });
  });
  document.querySelectorAll('.delete').forEach((btn) => {
    btn.addEventListener('click', () => {
      removeToDo(btn.parentNode.parentNode);
      renderTodo(todoArray);
    });
  });
};

const clearAll = (todoArray) => {
  todoArray = todoArray.filter((t) => !t.completed).map((t, i) => {
    t.index = i;
    return t;
  });
  localStorage.setItem('todoStore', JSON.stringify(todoArray));

  return todoArray;
};


clear.addEventListener('click', () => {
  const arr = clearAll(todoArray);
  renderTodo(arr);
});
