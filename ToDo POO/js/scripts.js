const parentTodo = new Todo();
let todo = parentTodo;
let todo2 = parentTodo;
console.log(todo);
console.log(todo2);
let btnAdd = document.querySelector('#add');

btnAdd.addEventListener('click', (e) => {
    e.preventDefault();

    let textTask = document.querySelector('#task');
    
    if(textTask.value != '') {
        todo.addTask(textTask.value);
        textTask.value = '';
    }
})