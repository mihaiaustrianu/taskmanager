import { STATUS } from "./constants.js";
export default class Draggable {
    constructor(groups, store, onTaskMoved) {
        this.store = store;
        this.onTaskMoved = onTaskMoved;
        this.draggedElement = null;
        this.draggedTaskId = null;

        groups.forEach((group) => {
            this.setupGroup(group);
        });
    }

    setupGroup(group) {
        group.addEventListener('dragover', this.handleDragOver.bind(this));
        group.addEventListener('drop', this.handleDrop.bind(this));
        group.addEventListener('dragleave', this.handleDragLeave.bind(this));

        // Set up dragging for existing tasks
        this.setupTaskDragging(group);

        // Handle dynamically added tasks
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (
                        node.nodeType === 1 &&
                        node.classList.contains('task')
                    ) {
                        this.setupTaskDragging(
                            node.parentElement.parentElement
                        );
                    }
                });
            });
        });

        observer.observe(group.querySelector('.task__column'), {
            childList: true,
        });
    }

    setupTaskDragging(group) {
        const tasks = group.querySelectorAll('.task');
        tasks.forEach((task) => {
            // Remove existing listeners
            task.removeEventListener('dragstart', this.handleDragStart);
            task.removeEventListener('dragend', this.handleDragEnd);

            // Add new listeners
            task.addEventListener('dragstart', this.handleDragStart.bind(this));
            task.addEventListener('dragend', this.handleDragEnd.bind(this));
        });
    }

    handleDragStart(e) {
        this.draggedElement = e.target;
        this.draggedTaskId = e.target.dataset.id;
        e.target.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
    }

    handleDragEnd(e) {
        e.target.classList.remove('dragging');
        this.draggedElement = null;
        this.draggedTaskId = null;
    }

    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        e.currentTarget.classList.add('drag-over');
    }

    handleDragLeave(e) {

        if (!e.currentTarget.contains(e.relatedTarget)) {
            e.currentTarget.classList.remove('drag-over');
        }
    }

    handleDrop(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');

        if (!this.draggedTaskId) return;

        const newStatus = this.getStatusFromGroup(e.currentTarget);

        if (newStatus) {
            this.store.updateTaskStatus(this.draggedTaskId, newStatus);

            if (this.onTaskMoved) {
                this.onTaskMoved();
            }
        }
    }

    getStatusFromGroup(group) {
        return group.dataset.status;
    }
}
