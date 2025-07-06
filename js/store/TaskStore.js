import { STORAGE_KEY_TASKS } from "../constants.js";
export default class TaskStore {
    constructor() {
        this.tasks = this.loadFromStorage() || [];
        this.saveToStorage();
    }

    getTasksByStatus(status) {
        return this.tasks.filter((task) => task.status === status);
    }

    addTask(task) {
        this.tasks.push(task);
        this.saveToStorage();
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter((task) => task.id !== Number(taskId));
        this.saveToStorage();
    }

    updateTaskStatus(taskId, newStatus) {
      const task = this.tasks.find(task => task.id === Number(taskId));
      if (task) {
          task.status = newStatus;
          this.saveToStorage();
          return true;
      }
      return false;
  }

    loadFromStorage() {
        const data = localStorage.getItem(STORAGE_KEY_TASKS);
        if (data) {
            return JSON.parse(data)
        }
        return null;
    }

    saveToStorage(){
        localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(this.tasks));
    }
}
