/**
 * @jest-environment jsdom
 */
import { addToDo, removeToDo } from '../add-remove.js';

document.body.innerHTML = `
<div class="container">
  <h2 class="heading">Today's To do<img src='./images/refresh.png' alt='refresh' class='refresh'></h2>
  <div class="addTodo">
    <input type="text" class="todoInput" placeholder="Add your task..." />
    <img src="./images/enter.png" alt="enter">
  </div>
  <div class="task-content">

  </div>
  <button class="clear">clear all completed</button>
</div>  
`;

describe('test todo list, add and remove', () => {
  test('check the if the createTodo add one task', () => {
    addToDo('task1', 0, true);
    expect(document.querySelectorAll('.todo-task').length).toBe(0);
  });

  test('test the remove function', () => {
    const todo = {
      title: 'first added',
      index: 1,
      completed: false,
    }
    removeToDo(todo, 1);
    expect(todo.index).toBe(1);
  })
})
