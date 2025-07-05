export default class TaskStore {
    constructor(initialTasks = []) {
        this.tasks = initialTasks;
    }

    getTasksByStatus(status) {
        return this.tasks.filter((task) => task.status === status);
    }

    addTask(task) {
        this.tasks.push(task);
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter((task) => task.id !== Number(taskId));
    }

    updateTaskStatus(taskId, newStatus) {
      const task = this.tasks.find(task => task.id === Number(taskId));
      if (task) {
          task.status = newStatus;
          return true;
      }
      return false;
  }
}
