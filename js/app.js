import AddTaskForm from './components/AddTaskForm.js';
import TaskBoardView from './views/TaskBoardView.js';
import TaskStore from './store/TaskStore.js';


const store = new TaskStore();
const boardView = new TaskBoardView('task-board', store);

boardView.render();

const addTaskForm = new AddTaskForm((newTask) => {
    store.addTask(newTask);
    boardView.render();
});
