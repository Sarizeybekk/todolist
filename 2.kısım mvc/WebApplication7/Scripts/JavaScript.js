﻿const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

evetListeners();

function evetListeners() {//tüm eventlistenerlar
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTedosToUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", clearAllTodos);
}
function clearAllTodos(e) {
    //arayüzden todoları temzileme
    if (confirm("tümünü silmek istediginizden emin misiniz ?")) {
        while (todoList.firstElementChild != null) {
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }

}
function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(function (listItem) {
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1) {
            //Bulamadı
            listItem.setAttribute("style", "display : none !important");

        }
        else {
            listItem.setAttribute("style", "display : block");

        }

    });
}
function deleteTodo(e) {
    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "todo başarıyla silindi");

    }
}
function deleteTodoFromStorage(deleteTodo) {
    let todos = getTodosFromStorage();

    todos.forEach(function (todo, index) {
        if (todo === deleteTodo) {
            todos.splice(index, 1);//arrayden degeri silebiliriz
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTedosToUI() {
    let todos = getTodosFromStorage();
    todos.forEach(function (todo) {
        addTodoToUI(todo);
    })
}
function addTodo(e) {
    const newTodo = todoInput.value.trim();
    if (newTodo === "") {

        showAlert("danger", "lütfen bir todo giriniz");
    }
    else {
        addTodoToUI(newTodo);
        addTodoToStrage(newTodo);
        showAlert("success", "todo başarıyla eklendi..");
    }





    e.preventDefault();
}
function getTodosFromStorage() {//stroragede todoları alma
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));

    }
    return todos;
}
function addTodoToStrage(newTodo) {
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));

}
function showAlert(type, message) {
    const alert = document.createElement("div");
    alert.className = 'alert alert-${type}';
    alert.textContent = message;
    firstCardBody.appendChild(alert);
    //settimeout
    setTimeout(function () {
        alert.remove();
    }, 1000);
}
function addTodoToUI(newTodo) {//string degerleri list item olarak uı ekleyecek
    /*
    <li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li>

*/
    //list item oluşturma
    const listItem = document.createElement("li");
    //link oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    listItem.className = "list-group-item d-flex justify-content-between";
    //text NOde ekleme

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    //todoliste list itemı ekleme
    todoList.appendChild(listItem);
    todoInput.value = "";

}