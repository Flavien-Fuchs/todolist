const DragAndDropModule = {
    init: function () {
      // Select the container with the class 'task-list'
      let container = document.querySelector('.task-list');
      let articles = container.querySelectorAll('article'), currentDrag;
  
      for (let article of articles) {
        article.draggable = true;
  
        article.ondragstart = function (e) {
          currentDrag = this;
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData('text/html', this.innerHTML);
        };
  
        article.ondragenter = () => article.classList.add('active');
        article.ondragleave = () => article.classList.remove('active');
  
        article.ondragend = function () {
          for (let active_article of articles) {
            active_article.classList.remove('active');
          }
        };
  
        article.ondragover = (e) => e.preventDefault();
  
        article.ondrop = function (e) {
          e.preventDefault();
          if (currentDrag !== this) {
            const isBelowMidpoint = e.clientY > this.getBoundingClientRect().top + this.clientHeight / 2;
            this.parentNode.insertBefore(currentDrag, isBelowMidpoint ? this.nextSibling : this);
          }
        };
      }
    },
  };
