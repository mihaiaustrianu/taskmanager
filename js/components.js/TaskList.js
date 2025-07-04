import Task from './Task.js';
export default class TaskList {
    constructor(containerId, tasks) {
        this.container = document.getElementById(containerId);
        console.log(this.container);

        this.tasks = tasks.map((task) => new Task(task));

        this.pending = this.container.querySelector('.task__column--pending');
        this.inProgress = this.container.querySelector(
            '.task__column--inprogress'
        );
        this.completed = this.container.querySelector(
            '.task__column--completed'
        );
    }

    render() {
        [this.pending, this.inProgress, this.completed].forEach((column) => {
            if (column) {
                column.innerHTML = column.querySelector('h2').outerHTML;
            }
        });

        this.tasks.forEach((task) => {
            const taskEl = task.render();

            switch (task.status) {
                case 'pending':
                    this.pending.appendChild(taskEl);
                    break;
                case 'inprogress':
                    this.inProgress.appendChild(taskEl);
                    break;
                case 'completed':
                    this.completed.appendChild(taskEl);
                    break;
                default:
                    console.warn(`Unknown task status: ${task.status}`);
            }
        });
    }

    addTask(task) {
        const newTask = new Task(task);
        this.tasks.push(newTask);
        this.render();
    }
}
