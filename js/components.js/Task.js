export default class Task {
    constructor(task) {
      this.id = task.id;
      this.title = task.title;
      this.description = task.description;
      this.status = task.status || 'pending';
    }

    render() {
      const taskDiv = document.createElement('div');
      taskDiv.classList.add('task');

      const titleEl = document.createElement('h2');
      titleEl.textContent = this.title;

      const descEl = document.createElement('p');
      descEl.textContent = this.description;

      taskDiv.appendChild(titleEl);
      taskDiv.appendChild(descEl);

      return taskDiv;
    }
  }