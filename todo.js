const todoForm = document.querySelector(".todoForm");
const todoInput = todoForm.querySelector('input');
const todoList = document.querySelector('.js-todoList');

const TODOS_LS_KEY = 'todos';

let todos = [];

function deleteTodo(event){
    const btn = event.target;
    const li = btn.parentNode;
    todoList.removeChild(li);
    const cleanTodos = todos.filter(function(todo){
        console.log(`todo.id : ${todo.id}, li.id : ${li.id}`)
        return todo.id !== parseInt(li.id)
    });
    todos = cleanTodos;
    saveTodos();
}

function saveTodos (){
    localStorage.setItem(TODOS_LS_KEY, JSON.stringify(todos));
}

function paintTodo(todoText){
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    const newId = todos.length + 1;
    delBtn.innerText = '❌';
    delBtn.addEventListener('click', deleteTodo);
    const span = document.createElement('span');
    span.innerText = todoText;
    li.id = newId;
    li.appendChild(span);    
    li.appendChild(delBtn);
    todoList.appendChild(li);
    const todosObj = {
        text: todoText,
        id: newId
    };
    todos.push(todosObj);  
    saveTodos();   
}

function handleSubmit(event){
    event.preventDefault();
    const todoInputValue = todoInput.value;
    paintTodo(todoInputValue);
    todoInput.value = '';
}

function loadTodos(){
    const loadTodos = localStorage.getItem(TODOS_LS_KEY);
    if (loadTodos !== null) {
        const parsedTodos = JSON.parse(loadTodos);
        parsedTodos.forEach( function(todo){
            paintTodo(todo.text);
        } )
    }
}

function init(){
    loadTodos();
    todoForm.addEventListener('submit', handleSubmit);
}
init();