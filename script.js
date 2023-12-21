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

let i = 1;

let buttonAddTask = document.querySelector(".task-add");
let sectionToAdd = document.querySelector("section.task-list");

buttonAddTask.addEventListener("click", function(){
    const newItemArticle = document.createElement("article");
    newItemArticle.classList.add("task-template");
    newItemArticle.classList.add("red");
    sectionToAdd.appendChild(newItemArticle);
    newItemArticle.addEventListener("click", function(){
        setTimeout(function(){
            newItemArticle.remove();
        }, 500);
    });

    const newTitleDiv = document.createElement("div");
    newTitleDiv.classList.add("task-title");
    newItemArticle.appendChild(newTitleDiv);

    const newTitle = document.createElement("h3");
    newTitle.innerText = i;
    newTitleDiv.appendChild(newTitle);
    i += 1;

    const emojiDiv = document.createElement("div");
    emojiDiv.classList.add("task-emoji");
    emojiDiv.innerText = "😅";
    newItemArticle.appendChild(emojiDiv);

    const newDate = document.createElement("span");
    newDate.classList.add("task-date");
    newDate.classList.add("hidden");
    newItemArticle.appendChild(newDate);

    const newPlace = document.createElement("div");
    newPlace.classList.add("task-place");
    newPlace.classList.add("hidden");
    newItemArticle.appendChild(newPlace);

    const newComment = document.createElement("div");
    newComment.classList.add("task-comment");
    newComment.classList.add("hidden");
    newItemArticle.appendChild(newComment);
});