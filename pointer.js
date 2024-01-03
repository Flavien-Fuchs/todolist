let addTaskButton = document.querySelector(".task-add");
let addTaskContainer = document.querySelector("#form-new-task");

addTaskButton.addEventListener("click", function () {
    addTaskButton.classList.add("hidden");
    addTaskContainer.classList.toggle("hidden");
})
