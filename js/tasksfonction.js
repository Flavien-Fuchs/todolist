import { tasks } from "./tasks.js";
// console.log(tasks);
const listname = "learn";
const listnamebis = "food"
function filterByType(selectedType) {
    tasks.forEach(function (task) {
        if (task.listname === selectedType){
            console.log(task.name)
        } else {
            
        }
        // console.log(task.name);

    }); console.log(selectedType);
}


// const btnbillard = document.getElementById("click", (event)=>{
//     console.log("Billard");
// })
const buttonType = document.querySelector('.list-task').addEventListener('click',(event)=>{
    const select = event.target.closest('button').dataset.type
    console.log(select);
    filterByType(select);
})









