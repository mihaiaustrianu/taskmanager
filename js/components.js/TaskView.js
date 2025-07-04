export default class TaskView {
    constructor(task) {
      this.task = task;
    }

    render() {
      return `
        <div class="task" data-id="${this.task.id}">
          <h3>${this.task.title}</h3>
          <p>${this.task.description}</p>
          <button class="task__delete">Delete</button>
        </div>
      `;
    }
  }