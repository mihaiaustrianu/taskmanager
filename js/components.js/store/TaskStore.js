export default class TaskStore {
    constructor(initialTasks = []) {
      this.tasks = initialTasks;
    }

    getTasksByStatus(status) {
      return this.tasks.filter(task => task.status === status);
    }

    deleteTask(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== Number(taskId));
    }
  }
