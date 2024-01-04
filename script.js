let buttonAddTask = document.querySelector("#add-task-confirm");
let addTaskButton = document.querySelector(".task-add");
let addTaskContainer = document.querySelector("#form-new-task");
let sectionToAdd = document.querySelector("section.task-list");
let pastSectionToAdd = document.querySelector("section.task-list.done")
pastSectionToAdd.style.display = "none";

let toDoList = [];
let doneList = [];

addTaskButton.addEventListener("click", function () {
  addTaskButton.classList.add("hidden");
  addTaskContainer.classList.toggle("hidden");
})

function createArticle(event) {

  event.preventDefault();
  const taskToAdd = getInput();
  toDoList.push(taskToAdd);

  const categorySelector = document.getElementById("add-task-list");
  const newItemArticle = document.createElement("article");
  newItemArticle.classList.add("task-template", categorySelector.value);
  if (taskToAdd.priority === "😅") {
    newItemArticle.classList.add("orange");
  } else if (taskToAdd.priority === "😊") {
    newItemArticle.classList.add("green");
  } else {
    newItemArticle.classList.add("red");
  }


  const newTitleDiv = document.createElement("div");
  newTitleDiv.classList.add("task-title");
  newItemArticle.appendChild(newTitleDiv);

  const newTitle = document.createElement("h3");
  newTitle.innerText = taskToAdd.name;
  newTitleDiv.appendChild(newTitle);

  const newDeleteSpan = document.createElement("span");
  newDeleteSpan.classList.add("task-delete");
  newDeleteSpan.innerText = "❌";
  newItemArticle.appendChild(newDeleteSpan);

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
  if (taskToAdd.place) {
    newPlace.innerHTML = `<a
    href="https://www.google.com/search?q=${taskToAdd.place}" target="_blank">${taskToAdd.place}</a>`;

    if (taskToAdd.priority === "😅") {
      newPlace.classList.add("orange");
    } else if (taskToAdd.priority === "😊") {
      newPlace.classList.add("green");
    } else {
      newPlace.classList.add("red");
    }
  } else {
    newPlace.classList.add("hidden");
  }
  newItemArticle.appendChild(newPlace);


  const newComment = document.createElement("div");
  newComment.classList.add("task-comment");
  if (taskToAdd.deadLine) {
    newComment.innerText = taskToAdd.description;
  } else {
    newComment.classList.add("hidden");
  }
  addTaskButton.classList.toggle("hidden");
  addTaskContainer.classList.toggle("hidden");

  /*   const newCategory = document.createElement("div");
    newCategory.innerText = taskToAdd.category;
    newItemArticle.appendChild(newCategory); */

  newItemArticle.appendChild(newComment);

  /*  newDeleteSpan.addEventListener("click", function () {
     onDeleteAnimation(newItemArticle);
     setTimeout(function () {
       newItemArticle.remove();
       sendToDone(newTitle.innerText);
     }, 500);
   }); */

  newDeleteSpan.addEventListener("click", function () {
    onDeleteAnimation(newItemArticle);
    setTimeout(function () {
      pastSectionToAdd.appendChild(newItemArticle)
      if (pastSectionToAdd.style.display === "grid") {
        sectionToAdd.appendChild(newItemArticle)
      }
      sendToDone(newTitle.innerText);
    }, 500);
  });

  if (sectionToAdd.hasChildNodes) {
    const first = sectionToAdd.children[0];
    sectionToAdd.insertBefore(newItemArticle, first);
    DragAndDropModule.init();
    return;
  }

  sectionToAdd.appendChild(newItemArticle);
}

buttonAddTask.addEventListener("click", createArticle);
DragAndDropModule.init();

function sendToDone(nameOfTask) {
  let indexToRemove = toDoList.findIndex(function (obj) {
    return obj.name === nameOfTask;
  });
  if (indexToRemove !== -1) {
    toDoList[indexToRemove].done = true;
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
    place: "",
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
    taskToAdd.deadLine = "";
  } else {
    taskToAdd.deadLine = deadlineField.value;
  }

  let placeField = document.getElementById("add-task-place");
  if (placeField.value === "") {
    taskToAdd.place = "";
  } else {
    taskToAdd.place = placeField.value;
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
      taskToAdd.priority = "🥵";
      break;
    }
    default: {
      taskToAdd.priority = "😊";
    }
  }

  console.log(taskToAdd.priority);

  let categorySelector = document.getElementById("add-task-list");
  taskToAdd.category = categorySelector.options[categorySelector.selectedIndex].innerText;
  document.getElementById("form-new-task").reset();

  return taskToAdd;
}

const listbutton = document.querySelector(".list-task");
listbutton.addEventListener("click", (event) => {
  const button = event.target;

  if (button.tagName === "BUTTON") {

    const isActive = button.classList.contains("active");

    if (isActive) {
      button.classList.remove("active");
    } else {
      button.classList.add("active");
    }

    const activeButtons = document.querySelectorAll(".list-task button.active");

    if (activeButtons.length === 0) {
      const articles = document.querySelectorAll(".task-template");
      articles.forEach((article) => {
        article.style.display = "flex";
      });
    } else {
      const selectedTypes = Array.from(activeButtons).map(
        (activeButton) => activeButton.dataset.type
      );
      filterByType(selectedTypes);
    }
  }
});

function filterByType(selectedTypes) {
  const articles = document.querySelectorAll(".task-template");
  articles.forEach((article) => {
    const articleType = article.classList[1]; // La classe correspond au type de la tâche
    if (selectedTypes.includes(articleType)) {
      article.style.display = "flex";
    } else {
      article.style.display = "none";
    }
  });
}


function showPastTasks() {
  const isActive = pastTaskButton.classList.contains("active");
  const doTodaySection = document.querySelector('#title-list')
  doTodaySection.innerText = "Tasks already dones";

  if (!isActive) {
    pastTaskButton.classList.add("active");
    currentButton.classList.remove("active")
    pastSectionToAdd.style.display = "grid"
    sectionToAdd.style.display = "none"
  }
}

function showCurrentTasks() {
  pastTaskButton.classList.remove("active");
  currentButton.classList.add("active");
  pastSectionToAdd.style.display = "none"
  sectionToAdd.style.display = "grid"
  const doTodaySection = document.querySelector('#title-list')
  doTodaySection.innerText = "What to do today?";
}

const pastTaskButton = document.querySelector(".actual-page button.past-task")
const currentButton = document.querySelector(".actual-page button.current")
pastTaskButton.addEventListener("click", showPastTasks)
currentButton.addEventListener("click", showCurrentTasks)
