class Todo {
    constructor(className) {
        this.totalTasks = document.querySelectorAll('#task').length;
        this.classeName = className;
    }

    checkTasks(command) {
        let msg = document.querySelector('.empty-tasks');
        if (command === 'add') {
            this.totalTasks += 1;
        } else {
            this.totalTasks -= 1;
        }

        if (this.totalTasks == 1) {
            msg.classList.remove('hide');
        } else {
            msg.classList.add('hide');
        }
    }

    addTask(taskText) {
        let template = document.querySelector('.task').cloneNode(true);
        template.classList.remove('hide');
        let templateText = template.querySelector('.task-title');
        templateText.textContent = taskText;
        let list = document.querySelector('#tasks-container');
        list.appendChild(template);

        this.addEvents();
        this.checkTasks('add');
    }

    removeTask(task) {
        let parentEl = task.parentElement;
        parentEl.remove();
        this.checkTasks('remove');
    }

    doneTask(task) {
        task.classList.add('done');
    }

    addEvents() {
        let removeBtns = document.querySelectorAll('.bi-trash2-fill');
        let removeBtn = removeBtns[removeBtns.length - 1];
        let doneBtns = document.querySelectorAll('.bi-check-circle-fill');
        let doneBtn = doneBtns[doneBtns.length - 1];

        removeBtn.addEventListener('click', function () {
            parentTodo.removeTask(this);
        });

        doneBtn.addEventListener('click', function () {
            parentTodo.doneTask(this);
        });
    }
}
