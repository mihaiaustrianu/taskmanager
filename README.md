<h1> Design </h1>
The app has a minimalist design focused on functionality while still respecting design principles, responsiveness, and user accessibility.

<h2> Desktop </h2>
On desktop the app has a simple design, consisting of a grid dispalyed in three columns.

![image](https://github.com/user-attachments/assets/065089cb-e6dd-40c7-8930-f3c0fc5b34f1)

The update and delete operations can be triggered on each individual card. The create operation is triggered from the "Add task" button.
On desktop, the status change operation can be triggered by dragging a task in the desired column.
<h2> Mobile </h2>

On mobile, the grid collapses to a single column.

![image](https://github.com/user-attachments/assets/bc02b035-f897-41bd-a211-7bca4d9f1192)


The user no longer has access to the drag functionality, so on smaller resolutions it has been replaced by a status dropdown that can trigger the update.

<h2>Color pallete</h2>
The color pallete is simple, consisting of white, grays and black for the text/borders and a neutral color scheme for backgrounds and elements

![image](https://github.com/user-attachments/assets/c3cb592d-16d2-4b31-b3b0-ee6a40e4be67)

<h1>Architecture</h2>
<h2>1. Technology stack</h2>
<ul>
  <li>HTML5</li>
  <li>CSS3</li>
  <li>Vanilla JavaScript</li>
  <li>localStorage (data persistence)</li>
</ul>

<h2>2. Component Structure</h2>
<ul>
  <li><b>TaskStore:</b> Manages task data and persistence in localStorage.</li>
  <li><b>TaskBoardView:</b> Renders tasks in their respective columns.</li>
  <li><b>ModalView:</b> Handles task creation and editing modal.</li>
  <li><b>TaskController:</b> Mediates between views and data store, handles events.</li>
  <li><b>TaskView:</b> Renders individual tasks as cards.</li>
</ul>

<h2>3. Data Flows</h2>
The app implements an MVC-inspired architecture, where the TaskController coordinates between TaskStore (model) and multiple views. 
This separation ensures maintainability, readability, and testability.
![UMLDiagram drawio](https://github.com/user-attachments/assets/af2885ae-27b5-4284-ae2e-4fc468205bd5)

Actions by users trigger actions that emit custom events. These events are captured in the AppController.
The app controller acts as a mediator between the TaskBoard and the Modal, as it listens to requests to open the latter from the former.
A different event is dispatched when a task is created or updated.

Events: 
<ul>
  <li>taskCreate - creates a task in the store </li>
  <li>taskUpdate - updates a task from the store</li>
  <li>taskDelete - deletes a task from the store</li>
  <li>taskStatusChange - updates the status of a task (used for Drag and select status updates)</li>
  <li>taskCreateRequest - opens a modal in create mode </li>
  <li>taskEditRequest - opens a modal in edit mode </li>
</ul>


