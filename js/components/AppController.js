import TaskStore from '../store/TaskStore.js';
import ModalView from '../views/ModalView.js';
import TaskBoardView from '../views/TaskBoardView.js';

export default class TaskController {
    constructor() {
        this.store = new TaskStore();
        this.modalView = new ModalView('task-modal');
        this.boardView = new TaskBoardView('task-board');

        this.setupEventHandlers();
        this.renderBoard();
    }

    setupEventHandlers() {
        // Button -> openModel (create)
        window.addEventListener('taskCreateRequest', () => {
            const event = new CustomEvent('openModalForCreate');
            window.dispatchEvent(event);
        });

        // Button -> open modal (edit)
        window.addEventListener('taskEditRequest', (e) => {
            const { taskId } = e.detail;
            const task = this.store.getTaskById(taskId);
            if (task) {
                const event = new CustomEvent('openModalForEdit', {
                    detail: { task },
                });
                window.dispatchEvent(event);
            }
        });
        // Create new task [store]
        window.addEventListener('taskCreate', (e) => {
            const { taskData } = e.detail;
            this.store.addTask(taskData);
            this.renderBoard();
        });

        // Update task [store]
        window.addEventListener('taskUpdate', (e) => {
            const { taskData } = e.detail;
            this.store.updateTask(taskData);
            this.renderBoard();
        });

        // Delete task [store]
        window.addEventListener('taskDelete', (e) => {
            const { taskId } = e.detail;
            this.store.deleteTask(taskId);
            this.renderBoard();
        });

        // Update task status [store]
        window.addEventListener('taskStatusChange', (e) => {
            const { taskId, newStatus } = e.detail;
            this.store.updateTaskStatus(taskId, newStatus);
            this.renderBoard();
        });
    }

    renderBoard() {
        const tasksByStatus = {
            pending: this.store.getTasksByStatus('pending'),
            inprogress: this.store.getTasksByStatus('inprogress'),
            completed: this.store.getTasksByStatus('completed'),
        };
        this.boardView.render(tasksByStatus);
    }
}
