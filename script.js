class Task {

    constructor(name, done, deadLine, priority, description) {
      this.name = name;
      this.done = done;
      this.deadLine = deadLine;
      this.priority = priority;
      this.description = description;
    }

    displayInfo() {
        console.log(`${this.name}, ${this.done}, ${this.priority}`);
    }
}

function addTask(task, list){
    list.push(task)
}

function removeTask(task, toDo, done){
    done.push(task)
    indexToRemove = toDo.indexOf(task);
    toDo.splice(indexToRemove, 1);
}

let toDoList = [];
let doneList = [];

let buttonAddTask = document.querySelector(".task-add");
let sectionToAdd = document.querySelector("section.task-list");

buttonAddTask.addEventListener("click", function(){
    const newItem = document.createElement("div");
    newItem.innerText = "aaaaaaaaaaa";
    sectionToAdd.appendChild(newItem);
});