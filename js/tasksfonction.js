// function createTask(event) {
//     // Empêche le comportement par défaut du formulaire (rechargement de la page)
//     event.preventDefault();

//     const addTaskName = document.getElementById("add-task-name").value;
//     const addTaskComment = document.getElementById("add-task-comment").value;
//     const addTaskEmojiSelect = document.getElementById("add-task-emoji");
//     const addTaskEmojiText = addTaskEmojiSelect.options[addTaskEmojiSelect.selectedIndex].innerText;
//     const addTaskPlace = document.getElementById("add-task-place").value;
//     const addTasklistSelect = document.getElementById("add-task-list");
//     const addTasklistValue = addTasklistSelect.options[addTasklistSelect.selectedIndex].value;
//     const addTasklistText = addTasklistSelect.options[addTasklistSelect.selectedIndex].innerText;
//     const addTaskDate = document.getElementById("add-task-date").value;

//     const article = document.createElement("article");
//     article.classList.add("task-template", addTasklistValue);
//     // article = document.getElementsByClassName("task-template");

//     const taskTitle = document.createElement("div");
//     taskTitle.classList.add("task-title");
//     const taskName = document.createElement("h3");
//     taskName.innerText = addTaskName;
//     taskTitle.appendChild(taskName);

//     const taskPlace = document.createElement("div");
//     taskPlace.classList.add("task-place");
//     taskPlace.innerText = addTaskPlace;

//     const taskEmoji = document.createElement("div");
//     taskEmoji.classList.add("task-emoji");
//     taskEmoji.innerText = addTaskEmojiText;

//     const taskDate = document.createElement("span");
//     taskDate.classList.add("task-date");
//     taskDate.innerText = addTaskDate;

//     const taskComment = document.createElement("div");
//     taskComment.classList.add("task-comment");
//     taskComment.innerText = addTaskComment;

//     const tasklist = document.createElement("div");
//     tasklist.classList.add("task-listname");
//     tasklist.innerText = addTasklistText;

//     article.append(taskTitle, taskPlace, taskEmoji, taskDate, taskComment, tasklist);

//     // Ajoute l'article à la liste (à remplacer par votre élément de liste)
//     document.getElementById("listtask").appendChild(article);
// }

// // Utilise getElementById pour cibler le bouton
// const taskbutton = document.getElementById("add-task-confirm");
// taskbutton.addEventListener('click', createTask);

function filterByType (selectedType) {
    const articles = document.querySelectorAll(".task-template");
    articles.forEach((article)=>{
        if (article.classList.contains(selectedType)){
        article.style.display = "flex";
    } else {
        article.style.display = "none";
    }

    })

}

const listbutton = document.getElementById("list-task");
listbutton.addEventListener("click", (event)=>{
    const tasklist = event.target.closest('button').dataset.type;
    filterByType(tasklist)
})










