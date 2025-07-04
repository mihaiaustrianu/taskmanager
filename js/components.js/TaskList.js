export default class TaskList {
    constructor(containerId, tasks) {
        this.container = document.getElementById(containerId);
        this.tasks = tasks;
    }

    render() {
        this.container.innerHTML = '';

        this.tasks.forEach((task) => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task');

            taskDiv.innerHTML = `
          <h2>${task.title}</h2>
          <p>${task.description}</p>
        `;

            this.container.appendChild(taskDiv);
        });
    }

    addTask(task) {
        this.tasks.push(task);
        this.render();
    }
}
