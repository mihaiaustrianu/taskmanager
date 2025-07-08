import TaskView from './TaskView.js';
import { STATUS } from '../constants.js';
import Draggable from '../components/Draggable.js';

export default class TaskBoardView {
    constructor(boardId) {
        this.container = document.getElementById(boardId);
        this.addTaskButton = this.container.querySelector('.task__add-button');
        this.groups = this.container.querySelectorAll('.task__group');

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

        this.draggable = new Draggable(this.groups);
        this.setupEventHandlers();
    }

    setupEventHandlers() {
        if (this.addTaskButton) {
            this.addTaskButton.addEventListener('click', () => {
                const event = new CustomEvent('taskCreateRequest');
                window.dispatchEvent(event);
            });
        }

        this.container.addEventListener('click', (e) => {
            if (e.target.classList.contains('task__delete')) {
                const taskId = e.target.closest('.task').dataset.id;
                const event = new CustomEvent('taskDelete', {
                    detail: { taskId },
                });
                window.dispatchEvent(event);
            }

            if (e.target.classList.contains('task__edit')) {
                const taskId = e.target.closest('.task').dataset.id;
                const event = new CustomEvent('taskEditRequest', {
                    detail: { taskId },
                });
                window.dispatchEvent(event);
            }
        });

        this.container.addEventListener('change', (e) => {
            if (e.target.classList.contains('task__status')) {
                const taskId = e.target.closest('.task').dataset.id;
                const newStatus = e.target.value;
                const event = new CustomEvent('taskStatusChange', {
                    detail: { taskId, newStatus },
                });
                window.dispatchEvent(event);
            }
        });
    }

    render(tasksByStatus, highlightTaskId = null) {
        // Reset columns before injecting new list
        Object.values(this.columns).forEach((col) => (col.innerHTML = ''));

        // Render tasks by status
        [STATUS.PENDING, STATUS.IN_PROGRESS, STATUS.COMPLETED].forEach(
            (status) => {
                const tasks = tasksByStatus[status] || [];
                tasks.forEach((task) => {
                    const taskHTML = new TaskView(task).render(highlightTaskId);
                    this.columns[status].insertAdjacentHTML(
                        'beforeend',
                        taskHTML
                    );
                });
            }
        );

        // Add class dinamically to last added task
        if (highlightTaskId) {
            const newTaskEl = document.querySelector(`.task[data-id="${highlightTaskId}"]`);
            if (newTaskEl) {
                newTaskEl.classList.add('task--highlighted');

                newTaskEl.addEventListener('animationend', () => {
                    newTaskEl.classList.remove('task--highlighted');
                }, { once: true });
            }
        }
    }
}
