<h1> Design </h1>
The app has a minimalist design focused on functionality while still respecting design principles, responsiveness, and user accessibility.

<h2>1. Desktop </h2>
On desktop the app has a simple design, consisting of a grid displayed in three columns.

![image](https://github.com/user-attachments/assets/065089cb-e6dd-40c7-8930-f3c0fc5b34f1)

The update and delete operations can be triggered on each individual card. The create operation is triggered from the "Add task" button.
On desktop, the status change operation can be triggered by dragging a task in the desired column.
<h2>2. Mobile </h2>

On mobile, the grid collapses to a single column.

![image](https://github.com/user-attachments/assets/bc02b035-f897-41bd-a211-7bca4d9f1192)


The user no longer has access to the drag functionality, so on smaller resolutions it has been replaced by a status dropdown that can trigger the update.

<h2>3. Color pallete</h2>
The color pallete is simple, consisting of white, grays and black for the text/borders and a neutral color scheme for backgrounds and elements

![image](https://github.com/user-attachments/assets/c3cb592d-16d2-4b31-b3b0-ee6a40e4be67)

<h2>4. Accessibility</h2>
The app follows accessibility principles:
<ul>
  <li>Uses semantic HTML for structure and readability.</li>
  <li>Interactive elements include aria-labels for screen readers.</li>
  <li>Responsive layouts ensure usability on all devices.</li>
</ul>

<h2>5. User Feedback</h2>
When a task is created, updated, or deleted, the UI updates dynamically to provide immediate feedback.
When a task is being dragged, the real element is blurred out. Upon hovering over a column, the border is higlighted 

<h1>Architecture</h1>

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

<h3>3.1 Events:</h3>
<ul>
  <li>taskCreate - creates a task in the store </li>
  <li>taskUpdate - updates a task from the store</li>
  <li>taskDelete - deletes a task from the store</li>
  <li>taskStatusChange - updates the status of a task (used for Drag and select status updates)</li>
  <li>taskCreateRequest - requests that a modal is opened in create mode</li>
  <li>taskEditRequest - requests that a modal is opened in edit mode </li>
  <li>openModalForCreate - opens a modal in create mode </li>
  <li>openModalForEdit - opens a modal in edit mode </li>
</ul>

Using custom events decouples the UI components from each other, allowing easy extension of functionality in the future.

<h3>3.2 Event Flow for create : </h3>

![EventFlow drawio (1)](https://github.com/user-attachments/assets/b8990ff2-6d6c-49b2-9d6a-44192489eb7a)

1. The user initiates an action (Add task).
2. A [taskCreateRequest] is emitted from the TaskBoard.
3. This event is captured by the AppController that emits a new [openModalForCreate] request to the Modal
4. If the user submits the form, a [taskCreate] request is sent back to the AppController
5. The store is updated
6. The taskBoard is refreshed with the new data

<h3>3.3 Event Flow for update</h3>
For update, the event flow is simillar

<h3>3.4 Event flow for delete</h3>
<ol>
  <li>The user initiates a delete action</li>
  <li>A [taskDelete] event is dispatched from the TaskBoard.</li>
  <li>The App Controller triggers the delete action in the store</li>
  <li> The board is rerendered with the new data</li>
</ol>

<h2>4. Extensibility</h2>
The architecture allows:
<ul>
  <li>Adding authentication and backend APIs with minimal changes to the controller.</li>
  <li>Implementing new views or filters without altering existing business logic.</li>
  <li>Enhancing rendering options through the RenderOptions pattern class.</li>
</ul>


<h1>State Management</h1>

- The state is handled in localStorage.
- The data is saved under the [tasks] key in JSON format.
- Data persistence is limited, as there is no backend





