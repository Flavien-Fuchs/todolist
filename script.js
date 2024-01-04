let buttonAddTask = document.getElementById("add-task-confirm");
let sectionToAdd = document.querySelector("section.task-list");

let addTaskButton = document.querySelector(".task-add");
let addTaskContainer = document.querySelector("#form-new-task");

addTaskButton.addEventListener("click", function (event) {
  event.preventDefault();
  toggleVisibility();
});

function toggleVisibility() {
  addTaskButton.classList.toggle("hidden");
  addTaskContainer.classList.toggle("hidden");
}

let toDoList = [];
let doneList = [];

function createCategory(emoji) {
  
  const listTaskContainer = document.querySelector(".list-task");

  const newCategoryButton = document.createElement("button");
  newCategoryButton.dataset.type = listTaskContainer.children.length + 1;
  newCategoryButton.innerText = emoji;

  newCategoryButton.addEventListener("click", function () {
    updateCategoryOptions(); 
  });

  listTaskContainer.appendChild(newCategoryButton);
  updateCategoryOptions(); 
}

function updateCategoryOptions() {
  const addTaskListSelect = document.getElementById("add-task-list");
  const listTaskContainer = document.querySelector(".list-task");
  addTaskListSelect.innerHTML = "";
  listTaskContainer.querySelectorAll("button").forEach(function (categoryButton) {
    const option = document.createElement("option");
    option.value = categoryButton.dataset.type;
    option.innerText = categoryButton.innerText;
    addTaskListSelect.appendChild(option);
  });
}

const addListButton = document.getElementById("addListButton");
const emojiModal = document.getElementById("emojiModal");

addListButton.addEventListener("click", function () {
  emojiModal.style.display = "block";
});

emojiModal.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    createCategory(event.target.innerText);
    emojiModal.style.display = "none";
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    emojiModal.style.display = "none";
  }
});

function createArticle() {
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


  newItemArticle.addEventListener("click", function () {
    onDeleteAnimation(newItemArticle);
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

  newItemArticle.addEventListener("click", function () {
    setTimeout(function () {
      newItemArticle.remove();
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
DragAndDropModule.init();

buttonAddTask.addEventListener("click", function (event) {
  event.preventDefault();
  createArticle();
  toggleVisibility()
});

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

const listbutton = document.querySelector(".list-task");
listbutton.addEventListener("click", (event) => {
  const button = event.target;

  if (button.tagName === "BUTTON") {
    /* const tasklist = button.dataset.type; */

    // Vérifie si le bouton est déjà actif
    const isActive = button.classList.contains("active");

    // Si le bouton est actif, retire la classe "active" et filtre par les types restants
    if (isActive) {
      button.classList.remove("active");
    } else {
      // Si le bouton n'est pas actif, ajoute la classe "active" et filtre par les types existants
      button.classList.add("active");
    }

    // Récupère tous les boutons actifs
    const activeButtons = document.querySelectorAll(".list-task button.active");

    // Si aucun bouton n'est actif, affiche tous les éléments
    if (activeButtons.length === 0) {
      const articles = document.querySelectorAll(".task-template");
      articles.forEach((article) => {
        article.style.display = "flex";
      });
    } else {
      // Si des boutons sont actifs, filtre par les types des boutons actifs
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

// function showPastTasks() {
//     // Efface le contenu actuel de la section "doToday"
//     const doTodaySection = document.querySelector(".doToday");
//     const isActive = pastTaskButton.classList.contains("active");
//     if (!isActive){
//         pastTaskButton.classList.add("active");
//         doTodaySection.innerHTML = "";
//     } else {
//         pastTaskButton.classList.remove("active");
//     }

// }

// const pastTaskButton = document.querySelector(".actual-page button.past-task")
// pastTaskButton.addEventListener("click", showPastTasks)