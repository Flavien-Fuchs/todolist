/* Drag & Drop */
 
 let data = [
    {
        name: "read the book",
        done: true,
        deadline: Date(),
        priority: "😊",
        description: "Pour être libre",
        listname: "learn",
      },
      {
        name: "buy meat",
        done: false,
        deadline: Date(),
        priority: "😅",
        description: "Pour la forme",
        listname: "food",
      },
      {
          name: "buy a whey",
          done: false,
          deadline: Date(),
          priority: "😊",
          description: "Pour garder la forme",
          listname: "food",
  
      },
      {
          name: "eat a apple",
          done: true,
          deadline: Date(),
          priority: "😊",
          description: "Parceque c'est bon",
          listname: "food",
  
      },
      {
          name: "vist yucatan",
          done: true,
          deadline: Date(),
          priority: "😅",
          description: "pour l'amour de l'aventure",
          listname: "travel",
      },
      {
          name: "Learn to ride a horse",
          done: false,
          deadline: Date(),
          priority: "😊",
          description: "Pour l'expérience",
          listname: "sport",
  
          
      },
      {
          name: "training football ",
          done: true,
          deadline: Date(),
          priority: "😅",
          description: "Pour garder la forme",
          listname: "sport",
      },
      {
          name: "run across the street",
          done: false,
          deadline: Date(),
          priority: "😊",
          description: "Pour un défi amical",
          listname: "sport",
      },
      {
          name: "travel in spain",
          done: true,
          deadline: Date(),
          priority: "😅",
          description: "C'est mon plus grand rêve",
          listname: "travel",
      },
      
    ];

const ul = document.querySelector('ul');

 const createListElements = ()=>{
    ul.innerHTML = '';
    data.forEach((task, i) => {
        const li = document.createElement('li');
        li.setAttribute('list-pos', i);

        li.innerHTML = `

        <div class="task-template">
        <div class="task-title">
            <h3>${task.name}</h3>
        </div>
        <div class="task-emoji">😅</div>
    </div>

        `;

        ul.appendChild(li);
    });
    listenToEvents();
    adjustULHeight(); /* Adjusting UL Height attempt */
 }

 createListElements();

 function listenToEvents(){
    let lists = ul.querySelectorAll('li'), current_pos, drop_pos;

    for(let li of lists){
        li.draggable = true;

        li.ondragstart = function () {
            current_pos = this.getAttribute('list-pos');
            ul.style.height = ul.clientHeight + 'px';
            setTimeout(() => { 
            this.style.display = "flex";
        }, 0);

            ul.style.height = ul.clientHeight - this.clientHeight + 'px';
        };
 
        li.ondragenter = () => li.classList.add('active');
        li.ondragleave = () => li.classList.remove('active');

        li.ondragend = function() {
            this.style.display = 'flex';
            for(let active_list of lists) {
                active_list.classList.remove('active')
            }
            adjustULHeight(); /* Adjusting UL Height attempt */
        };

        li.ondragover = (e) => e.preventDefault();

        li.ondrop = function (e) {
            e.preventDefault()
            ul.style.height = ul.clientHeight + this.clientHeight + 'px';

            drop_pos = this.getAttribute('list-pos');
            data.splice(drop_pos, 0, data.splice(current_pos, 1)[0]);

            createListElements();
        };
    }
 }

 /* Adjusting UL Height attempt */
 function adjustULHeight() {
    ul.style.height = 'auto'; 
    ul.style.height = ul.scrollHeight + 'px';
}