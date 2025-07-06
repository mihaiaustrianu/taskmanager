import ModalView from './views/ModalView.js';
import TaskBoardView from './views/TaskBoardView.js';
import TaskStore from './store/TaskStore.js';

const store = new TaskStore();
const modalView = new ModalView('task-modal', handleTaskSubmit);
const boardView = new TaskBoardView('task-board', store, modalView);

function handleTaskSubmit(taskData, isEditing) {
    if (isEditing) {
        store.updateTask(taskData);
    } else {
        store.addTask(taskData);
    }
    boardView.render();
}

boardView.render();
