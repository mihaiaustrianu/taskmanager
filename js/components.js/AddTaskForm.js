// js/AddTaskForm.js

export default class AddTaskForm {
    constructor(onSubmitCallback) {
        this.modal = document.getElementById('add-task-modal');
        this.form = document.getElementById('add-task-form');
        this.openBtn = document.getElementById('open-add-task-modal');
        this.closeBtn = document.getElementById('close-add-task-modal');
        this.onSubmitCallback = onSubmitCallback;

        this.init();
    }

    init() {
        this.openBtn.addEventListener('click', () => this.openModal());
        this.closeBtn.addEventListener('click', () => this.closeModal());

        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        window.addEventListener('keydown', (e) => this.handleKeyDown(e));

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = this.form.querySelector('#task-title').value.trim();
            const desc = this.form.querySelector('#task-desc').value.trim();
            const status = this.form.querySelector('#task-status').value;

            if (!title || !desc) {
                alert('Please fill in all fields');
                return;
            }

            const newTask = {
                id: Date.now(),
                title,
                description: desc,
                status,
            };

            this.onSubmitCallback(newTask);
            this.form.reset();
            this.closeModal();
        });
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

    closeModal() {
        this.modal.classList.add('hidden');
    }

    maintainFocus(e) {
        const focusableElements = this.modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const focusable = Array.prototype.slice.call(focusableElements);

        const firstEl = focusable[0];
        const lastEl = focusable[focusable.length - 1];

        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstEl) {
                lastEl.focus();
                e.preventDefault();
            }
        } else {
            // Tab
            if (document.activeElement === lastEl) {
                firstEl.focus();
                e.preventDefault();
            }
        }
    }
}
