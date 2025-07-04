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
        status: 'in progress',
    },
    {
        id: 3,
        title: 'Third Task',
        description: 'This is the third task.',
        status: 'completed',
    },
];

const taskList = new TaskList('task-container', tasks);
taskList.render();

setTimeout(() => {
    taskList.addTask({
        id: 4,
        title: 'Forth Task',
        description: 'This is the forth task.',
    });
}, 2000);
