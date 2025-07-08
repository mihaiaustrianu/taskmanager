export default class ModalView {
    constructor(modalID) {
        this.modal = document.getElementById(modalID);
        this.form = this.modal.querySelector('#task-form');
        this.closeBtn = this.modal.querySelector('#close-task-modal');
        this.editingTaskId = null;
        this.isEditMode = false;
        this.init();
    }

    init() {
        this.setupEventHandlers();
        this.setupGlobalEventListeners();
    }

    setupEventHandlers() {
        this.closeBtn.addEventListener('click', () => this.closeModal());

        window.addEventListener('mousedown', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        window.addEventListener('keydown', (e) => this.handleKeyDown(e));

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    setupGlobalEventListeners() {
        window.addEventListener('openModalForCreate', () => {
            this.openModalForCreate();
        });

        window.addEventListener('openModalForEdit', (e) => {
            const { task } = e.detail;
            this.openModalForEdit(task);
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        const title = this.form.querySelector('#task-title').value.trim();
        const desc = this.form.querySelector('#task-desc').value.trim();
        const status = this.form.querySelector('#task-status').value;

        const taskData = {
            id: this.editingTaskId || Date.now(),
            title,
            description: desc,
            status,
        };

        if (this.isEditMode) {
            const event = new CustomEvent('taskUpdate', {
                detail: { taskData },
            });
            window.dispatchEvent(event);
        } else {
            const event = new CustomEvent('taskCreate', {
                detail: { taskData },
            });
            window.dispatchEvent(event);
        }

        this.resetForm();
        this.closeModal();
    }

    handleKeyDown(e) {
        if (!this.modal.classList.contains('hidden')) {
            if (e.key === 'Escape') {
                this.closeModal();
            }

            if (e.key === 'Tab') {
                this.maintainFocus(e);
            }
        }
    }

    openModal() {
        this.modal.classList.remove('hidden');
        this.closeBtn.focus();
    }

    openModalForCreate() {
        this.isEditMode = false;
        this.editingTaskId = null;
        this.form.querySelector('.modal__submit').textContent = 'Add Task';
        this.openModal();
    }

    openModalForEdit(task) {
        this.form.querySelector('#task-title').value = task.title;
        this.form.querySelector('#task-desc').value = task.description;
        this.form.querySelector('#task-status').value = task.status;
        this.editingTaskId = task.id;
        this.isEditMode = true;
        this.form.querySelector('.modal__submit').textContent = 'Update Task';
        this.openModal();
    }

    closeModal() {
        this.modal.classList.add('hidden');
        this.resetForm();
    }

    resetForm() {
        this.form.reset();
        this.editingTaskId = null;
        this.isEditMode = false;
        this.form.querySelector('.modal__submit').textContent = 'Add Task';
    }

    maintainFocus(e) {
        const focusableElements = this.modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const focusable = Array.prototype.slice.call(focusableElements);

        const firstEl = focusable[0];
        const lastEl = focusable[focusable.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstEl) {
                lastEl.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastEl) {
                firstEl.focus();
                e.preventDefault();
            }
        }
    }
}
