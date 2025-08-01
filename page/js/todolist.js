const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

// --- 1. ToDoリストを保存する関数 ---
function saveTodos() {
    const todos = [];
    todoList.querySelectorAll('li span').forEach(span => {
        todos.push(span.textContent);
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

// --- 2. ToDoリストを読み込む関数 ---
function loadTodos() {
    const saved = localStorage.getItem('todos');
    if (saved) {
        const todos = JSON.parse(saved);
        todos.forEach(text => addTodo(text));
    }
}

// --- 3. ToDoを追加する共通処理（手動追加・復元どちらにも使う） ---
function addTodo(text) {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox-icon';
    checkbox.autocomplete = 'off';

    checkbox.addEventListener('change', async() => {
        if (checkbox.checked) {
            await sleep(250);
            console.log("todo削除")
            li.remove();
            saveTodos(); // 削除後に保存！
        }
    });

    const textNode = document.createElement('span');
    textNode.textContent = text;

    li.appendChild(checkbox);
    li.appendChild(textNode);
    todoList.insertBefore(li, todoList.firstChild);
}

// --- 4. 「追加」ボタンのイベント ---
addBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (text === '') return;
    addTodo(text);
    saveTodos(); // 追加後に保存！
    input.value = '';
});

// --- 5. ページ読み込み時にToDo復元 ---
window.addEventListener('DOMContentLoaded', loadTodos);


