import TaskList from './components.js/TaskList.js';

const tasks = [
    {
        id: 1,
        title: 'First Task',
        description: 'This is the first task.',
        status: 'pending',
    },
    {
        id: 2,
        title: 'Second Task',
        description: 'This is the second task.',
        status: 'inprogress',
    },
    {
        id: 3,
        title: 'Third Task',
        description: 'This is the third task.',
        status: 'completed',
    },
];

const taskList = new TaskList('task-board', tasks);
taskList.render();

