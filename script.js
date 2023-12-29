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
  
  let buttonAddTask = document.querySelector(".task-add");
  let sectionToAdd = document.querySelector("ul");
  
  let toDoList = [];
  let doneList = [];
  
  buttonAddTask.addEventListener("click", createArticle);
  
  function createArticle() {
    sectionToAdd.innerHTML = '';
    taskToAdd = getInput();
    toDoList.push(taskToAdd);
  
    toDoList.forEach((taskToAdd, i) => {
      const newItemArticle = document.createElement("li");
      newItemArticle.setAttribute('list-pos', i);
      newItemArticle.classList.add("task-template");
  
      if (taskToAdd.priority === "😅") {
        newItemArticle.classList.add("orange");
      } else if (taskToAdd.priority === "😊") {
        newItemArticle.classList.add("green");
      } else {
        newItemArticle.classList.add("red");
      }
  
      sectionToAdd.appendChild(newItemArticle);
  
      newItemArticle.addEventListener("click", function () {
        setTimeout(function () {
          newItemArticle.remove();
          sendToDone(newTitle.innerText);
        }, 100);
      });
  
      const newTitleDiv = document.createElement("div");
      newTitleDiv.classList.add("task-title");
      newItemArticle.appendChild(newTitleDiv);
  
      const newTitle = document.createElement("h3");
      newTitle.innerText = taskToAdd.name;
      newTitleDiv.appendChild(newTitle);
  
      const emojiDiv = document.createElement("div");
      emojiDiv.classList.add("task-emoji");
      emojiDiv.innerText = taskToAdd.priority;
      newItemArticle.appendChild(emojiDiv);
  
      const newDate = document.createElement("span");
      newDate.classList.add("task-date");
  
      if (taskToAdd.deadLine) {
        newDate.innerText = taskToAdd.deadLine;
      } else {
        newDate.classList.add("hidden");
      }
  
      newItemArticle.appendChild(newDate);
  
      const newPlace = document.createElement("div");
      newPlace.classList.add("task-place");
      newPlace.classList.add("hidden");
      newItemArticle.appendChild(newPlace);
  
      const newComment = document.createElement("div");
      newComment.classList.add("task-comment");
  
      if (taskToAdd.deadLine) {
        newComment.innerText = taskToAdd.description;
      } else {
        newComment.classList.add("hidden");
      }
  
      newItemArticle.appendChild(newComment);

    });

    adjustULHeight();
    listenToEvents();
  }

 /* Update list-pos */

  function updateListPos() {
    const listItems = document.querySelectorAll('ul li');
    listItems.forEach((li, index) => {
      li.setAttribute('list-pos', index + 1);
    });
  }
  

  /* Drag and drop */

function listenToEvents() {
    let ul = document.querySelector('ul');
    let lists = ul.querySelectorAll('li'), currentDrag;
  
    for (let li of lists) {
      li.draggable = true;
  
      li.ondragstart = function (e) {
        currentDrag = this;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
      };
  
      li.ondragenter = () => li.classList.add('active');
      li.ondragleave = () => li.classList.remove('active');
  
      li.ondragend = function () {
        for (let active_list of lists) {
          active_list.classList.remove('active');
        }
        adjustULHeight();
      };
  
      li.ondragover = (e) => e.preventDefault();
  
      li.ondrop = function (e) {
        e.preventDefault();
        if (currentDrag !== this) {
            const isBelowMidpoint = e.clientY > this.getBoundingClientRect().top + this.clientHeight / 2;
            this.parentNode.insertBefore(currentDrag, isBelowMidpoint ? this.nextSibling : this);
            updateListPos();
          }
        };
    }
  }
  
  /* Adjusting UL Height */
  function adjustULHeight() {
    let ul = document.querySelector('ul');
    ul.style.height = 'auto';
    ul.style.height = ul.scrollHeight + 'px';
  }
  
  function sendToDone(nameOfTask) {
    let indexToRemove = toDoList.findIndex(function (obj) {
      return obj.name === nameOfTask;
    });
  
    if (indexToRemove !== -1) {
      doneList.push(toDoList[indexToRemove]);
      toDoList.splice(indexToRemove, 1);
      console.log(toDoList);
      console.log(doneList);

      updateListPos();
    }
  }
  
  function getInput() {
    let taskField = document.getElementById("add-task-name");
    let deadlineField = document.getElementById("add-task-date");
    let describeField = document.getElementById("add-task-comment");
    let emojiSelector = document.getElementById("add-task-emoji");
    let categorySelector = document.getElementById("add-task-list");
  
    const emojiArray = ["😊", "😅", "🫠"];
    let emojiValue = "";
  
    if (emojiSelector.value === "green") {
      emojiValue = emojiArray[0];
    } else if (emojiSelector.value === "orange") {
      emojiValue = emojiArray[1];
    } else {
      emojiValue = emojiArray[2];
    }
  
    let taskToAdd = {
      name: taskField.value,
      done: false,
      deadLine: deadlineField.value,
      priority: emojiValue,
      description: describeField.value,
      category: categorySelector.value
    };
  
    return taskToAdd;
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    listenToEvents();
    createArticle(); // Call createArticle once the DOM is loaded
    adjustULHeight(); 
  });
  