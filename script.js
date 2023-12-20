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

const firstTask = new Task("Buy coffee", false, Date(), "😊", "I'm out of coffee, I need to buy it");
const secondTask = new Task("Do Sports", false, Date(), "😊", "Get back in shape");
const thirdTask = new Task("Read a book", false, Date(), "😊", "I need to read more");

addTask(firstTask, toDoList);
addTask(secondTask, toDoList);
removeTask(secondTask, toDoList, doneList);
removeTask(firstTask, toDoList, doneList);
console.log(toDoList);
console.log(" -------------------- ");
console.log(doneList);
console.log(" * * * ");