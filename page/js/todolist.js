const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

function saveTodos() {
    const todos = [];
    todoList.querySelectorAll('li span').forEach(span => {
        todos.push(span.textContent);
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const saved = localStorage.getItem('todos');
    if (saved) {
        const todos = JSON.parse(saved);
        todos.forEach(text => addTodo(text));
    }
}

function addTodo(text) {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox-icon';
    checkbox.autocomplete = 'off';

    checkbox.addEventListener('change', async() => {
        if (checkbox.checked) {
            await sleep(100);
            console.log("todo削除")
            li.remove();
            saveTodos(); // 削除後に保存
        }
    });

    const textNode = document.createElement('span');
    textNode.textContent = text;

    li.appendChild(checkbox);
    li.appendChild(textNode);
    todoList.insertBefore(li, todoList.firstChild);
}

//追加ボタンのイベント
addBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (text === '') return;
    addTodo(text);
    saveTodos(); // 追加後に保存！
    input.value = '';
});

//ページ読み込み時にToDo復元
window.addEventListener('DOMContentLoaded', loadTodos);


