import ModalView from './views/ModalView.js';
import TaskBoardView from './views/TaskBoardView.js';
import TaskStore from './store/TaskStore.js';
import TaskController from './components/AppController.js';

const store = new TaskStore();
const modalView = new ModalView('task-modal').init();
const boardView = new TaskBoardView('task-board', store, modalView);

const controller = new TaskController(store, boardView, modalView);
