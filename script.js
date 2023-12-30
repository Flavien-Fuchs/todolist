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
};

let buttonAddTask = document.querySelector(".task-add");
let sectionToAdd = document.querySelector("section.task-list");

let toDoList = [];
let doneList = [];

function createArticle() {
  const taskToAdd = getInput();
  toDoList.push(taskToAdd);

  const categorySelector = document.getElementById("add-task-list");
  const newItemArticle = document.createElement("article");
  newItemArticle.classList.add("task-template", categorySelector.value);
  if (taskToAdd.priority === "😅"){
      newItemArticle.classList.add("orange");
  } else if (taskToAdd.priority === "😊"){
      newItemArticle.classList.add("green");
  } else {
      newItemArticle.classList.add("red");
  };
  sectionToAdd.appendChild(newItemArticle);
  newItemArticle.addEventListener("click", function(){
      setTimeout(function(){
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
  };
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
  };
  newItemArticle.appendChild(newComment);

  newItemArticle.addEventListener("click", function () {
    setTimeout(function () {
      newItemArticle.remove();
      sendToDone(newTitle.innerText);
    }, 500);
  });
  DragAndDropModule.init();
}

buttonAddTask.addEventListener("click", createArticle);


function sendToDone(nameOfTask) {
  let indexToRemove = toDoList.findIndex(function(obj) {
  return obj.name === nameOfTask;
  });
  if (indexToRemove !== -1) {
      doneList.push(toDoList[indexToRemove]);
      toDoList.splice(indexToRemove, 1);
      console.log(toDoList);
      console.log(doneList);
  };
};

function getInput(){

  let taskField = document.getElementById("add-task-name");
  let deadlineField = document.getElementById("add-task-date");
  let describeField = document.getElementById("add-task-comment");
  let emojiSelector = document.getElementById("add-task-emoji");
  let categorySelector = document.getElementById("add-task-list");

  const emojiArray = [ "😊", "😅", "🫠" ];
  let emojiValue = "";
  if (emojiSelector.value === "green") {
      emojiValue = emojiArray[0];
  } else if (emojiSelector.value === "orange") {
      emojiValue = emojiArray[1];
  } else {
      emojiValue = emojiArray[2];
  };

  let taskToAdd = {
      name: taskField.value,
      done: false,
      deadLine: deadlineField.value,
      priority: emojiValue,
      description: describeField.value,
      category: categorySelector.value };

  return taskToAdd;
};

function getInput(){

    let taskField = document.getElementById("add-task-name");
    let deadlineField = document.getElementById("add-task-date");
    let describeField = document.getElementById("add-task-comment");
    let emojiSelector = document.getElementById("add-task-emoji");
    let categorySelector = document.getElementById("add-task-list");

    const emojiArray = [ "😊", "😅", "🫠" ];
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
        category: categorySelector.value };

    return taskToAdd;
};

const listbutton = document.querySelector(".list-task");
listbutton.addEventListener("click", (event) => {
    const button = event.target;
    
    if (button.tagName === 'BUTTON') {
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
            const selectedTypes = Array.from(activeButtons).map((activeButton) => activeButton.dataset.type);
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
