let buttonAddTask = document.querySelector(".task-add");
let sectionToAdd = document.querySelector("section.task-list");

let toDoList = [];
let doneList = [];

buttonAddTask.addEventListener("click", function () {
  taskToAdd = getInput();
  toDoList.push(taskToAdd);

  // Here and till the end we create a new element
  const newItemArticle = document.createElement("article");
  newItemArticle.classList.add("task-template");
  if (taskToAdd.priority === "😅") {
    newItemArticle.classList.add("orange");
  } else if (taskToAdd.priority === "😊") {
    newItemArticle.classList.add("green");
  } else {
    newItemArticle.classList.add("red");
  }

  newItemArticle.addEventListener("click", function () {
    setTimeout(function () {
      newItemArticle.remove();
      sendToDone(newTitle.innerText);
    }, 500);
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

  if (sectionToAdd.hasChildNodes) {
    const first = sectionToAdd.children[0];
    sectionToAdd.insertBefore(newItemArticle, first);
    return;
  }

  sectionToAdd.appendChild(newItemArticle);
});

function sendToDone(nameOfTask) {
  let indexToRemove = toDoList.findIndex(function (obj) {
    return obj.name === nameOfTask;
  });
  if (indexToRemove !== -1) {
    doneList.push(toDoList[indexToRemove]);
    toDoList.splice(indexToRemove, 1);
    console.log(toDoList);
    console.log(doneList);
  }
}

function getInput() {
  let taskToAdd = {
    name: "",
    done: false,
    deadLine: "",
    priority: "",
    description: "",
    category: "",
  };

  let taskField = document.getElementById("add-task-name");
  if (taskField.value === "") {
    taskToAdd.name = "Unnamed task";
  } else {
    taskToAdd.name = taskField.value;
  }

  let deadlineField = document.getElementById("add-task-date");
  if (deadlineField.value === "") {
    taskToAdd.deadLine = "Unknown deadline";
  } else {
    taskToAdd.deadLine = deadlineField.value;
  }

  let describeField = document.getElementById("add-task-comment");
  if (describeField.value === "") {
    taskToAdd.description = "No details given";
  } else {
    taskToAdd.description = describeField.value;
  }

  let emojiSelector = document.getElementById("add-task-emoji");
  console.log(emojiSelector.value);
  switch (emojiSelector.value) {
    case "green": {
      taskToAdd.priority = "😊";
      break;
    }
    case "orange": {
      taskToAdd.priority = "😅";
      break;
    }
    case "red": {
      taskToAdd.priority = "🫠";
      break;
    }
    default: {
      taskToAdd.priority = "😊";
    }
  }
  console.log(taskToAdd.priority);

  let categorySelector = document.getElementById("add-task-list");
  taskToAdd.category = categorySelector.value;

  return taskToAdd;
}
