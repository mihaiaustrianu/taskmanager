import Draggable from './Draggable.js';
import TaskView from './TaskView.js';
import { STATUS } from './constants.js';

export default class TaskBoardView {
    constructor(boardId, store) {
        this.container = document.getElementById(boardId);
        this.store = store;

        this.columns = {
            [STATUS.PENDING]: this.container.querySelector(
                '.task__column--pending'
            ),
            [STATUS.IN_PROGRESS]: this.container.querySelector(
                '.task__column--inprogress'
            ),
            [STATUS.COMPLETED]: this.container.querySelector(
                '.task__column--completed'
            ),
        };

        this.groups = this.container.querySelectorAll(".task__group");

        // Event delegation delete
        this.container.addEventListener('click', (e) => {
            if (e.target.classList.contains('task__delete')) {
                const taskId = e.target.closest('.task').dataset.id;
                this.store.deleteTask(taskId);
                this.render();
            }
        });

        this.draggable = new Draggable(
            this.groups,
            this.store,
            () => this.render()
        );
    }

    render() {
        Object.values(this.columns).forEach((col) => (col.innerHTML = ''));

        // Render tasks by status
        [STATUS.PENDING, STATUS.IN_PROGRESS, STATUS.COMPLETED].forEach(
            (status) => {
                const tasks = this.store.getTasksByStatus(status);
                tasks.forEach((task) => {
                    const taskHTML = new TaskView(task).render();
                    this.columns[status].insertAdjacentHTML(
                        'beforeend',
                        taskHTML
                    );
                });
            }
        );
    }
}
