const newTodoInput = document.querySelector("#new-todo-input");
const todoElementsBox = document.querySelector(".todo-elements");
let todoElements = document.querySelectorAll(".todo");
window.addEventListener("load" , showElements());

function showElements() {
    todoElementsBox.innerHTML = '';
}

function addElement() {
    todoElementsBox.innerHTML += 
    `
    <div class="todo" draggable="true">
        <span class="checkbox" onclick="spanClick(this)">
            <img src="images/icon-check.svg">
        </span>
        <p>${newTodoInput.value}</p>
        <button class="delete-todo" onclick="deleteTodo(this)"></button>
    </div>
  `
}

function spanClick(element) {
    element.classList.toggle("clicked");
    saveElements();
    countComplete();
}

function deleteTodo(element) {
    element.parentElement.remove();
    saveElements();
    countComplete();
}


function saveElements() {
    localStorage.setItem("elements", todoElementsBox.innerHTML);
}

newTodoInput.addEventListener("keydown", (e) => {
    if (e.key == "Enter" && newTodoInput.value != "") {
        addElement();
        saveElements();
        countComplete();
        allElementsButton.click();
        newTodoInput.value = "";
    }
});

let firstFiltersBar = document.querySelector(".last-box");
let itemsLeft = document.querySelector(".items-left span");

function countComplete() {
    let arrOfCompletedTodo = [];
    for(let element of todoElementsBox.children) {
        if(element.children[0].classList.contains("clicked")) {
            arrOfCompletedTodo.push(element);
        } 
    }
    itemsLeft.innerHTML = todoElementsBox.children.length - arrOfCompletedTodo.length;
    return arrOfCompletedTodo;
}
countComplete()


const clearCompletedButton = document.querySelector(".clear-completed");
clearCompletedButton.addEventListener("click" , clearCompleted);

function clearCompleted() {
    countComplete().forEach(element => element.children[2].click());
}


const filterBarButtons = document.querySelectorAll(".filter-bar button");
const allElementsButton = document.querySelector(".filter-bar .all");
const activeElementsButton = document.querySelector(".filter-bar .Active");
const completedElementsButton = document.querySelector(".filter-bar .Completed");

filterBarButtons.forEach(button => button.onclick = () => {
    filterBarButtons.forEach(button => button.classList.remove("active"));

    button.classList.add("active");
    
    if(button == allElementsButton) {
        for(let element of todoElementsBox.children) {
            element.style.display = "flex";
        }
    } else if(button == activeElementsButton) {
        for(let element of todoElementsBox.children) {
            if(element.children[0].classList.contains("clicked")) {
                element.style.display = "none";
            } else{
                element.style.display = "flex";
            }
        }
    } else if(button == completedElementsButton) {
        for(let element of todoElementsBox.children) {
            if(!element.children[0].classList.contains("clicked")) {
                element.style.display = "none";
            } else{
                element.style.display = "flex";
            }
        }
    }
});

