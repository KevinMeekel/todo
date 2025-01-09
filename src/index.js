import { format, set } from 'date-fns';
import './assets/style.css';

const now = new Date();
console.log(format(now, 'yyyy-MM-dd'));

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");

    const pageDiv = document.querySelector('.page-content');
    console.log(pageDiv);

    const newTask = createNewTaskElement(pageDiv);

    newTask.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent event propagation to document
        handleNewTaskClick(newTask);
    });

    // TOGGLE EVENT
    document.addEventListener('click', () => {
        const formContainer = newTask.querySelector('.grid');
        if (formContainer && formContainer.classList.contains('active')) {
            formContainer.style.display = 'none';
            formContainer.classList.remove('active');
        }
    });
});

// Called in DOM content loaded event
function createNewTaskElement(pageDiv) {
    const newTask = document.createElement('div');
    newTask.classList.add('new');
    pageDiv.appendChild(newTask);

    const placeholderTask = document.createElement('span');
    placeholderTask.textContent = 'Create New Task';
    
    newTask.appendChild(placeholderTask);

    return newTask;
}

// Called in newTask click event
// Takes newTask parameter because that is parent of .grid
function handleNewTaskClick(newTask) {
    let formContainer = newTask.querySelector('.grid');
  
    if (!formContainer) {
        formContainer = createTaskForm();
        newTask.appendChild(formContainer);
    }

    formContainer.style.display = 'grid';
    formContainer.classList.add('active');

    useData();
}

// Called in handleNewTaskClick()
// Provides the grid form structure to handleNewTaskClick()
function createTaskForm() {
    const formContainer = document.createElement('div');
    formContainer.classList.add('grid');

    formContainer.innerHTML = `
        <form action="" class="task-input" id="title-form">
            <label for="title">Title</label>
            <input type="text" id="title">
        </form>
        <form action="" class="task-input" id="description-form">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter a description..."></textarea>
        </form>
        <form action="" class="task-input" id="date-form">
            <label for="date">Date and Time</label>
            <input type="datetime-local" id="date">
        </form>
        <form action="" class="task-input" id="priority-form">
            <label for="priority">Priority</label>
            <select id="priority" name="priority">
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>    
            </select>
        </form>
        <button id="set">Set</button>
    `;

    formContainer.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent clicks inside the form from closing it
    });

    return formContainer;
}

// Called in useData()
function collectFormData() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    const priority = document.getElementById('priority').value;

    return { title, description, date, priority };
}

function createTask(inputValue) {
    
    if (inputValue.title !== '') {
        console.log(`Task created with value:`, inputValue);
        console.log(`inputValue.title = ${inputValue.title}`);
        let dateString = '';
        if (inputValue.date) {
            dateString = format(new Date(inputValue.date), 'yyyy-MM-dd HH:mm');
        } else {
            dateString = 'No Date';
        }
        
        const pendingContainer = document.querySelector('.pending-container');

        const pendingTask = document.createElement('div');
        pendingTask.classList.add('pending');

        const pendingTitle = document.createElement('div');
        pendingTitle.classList.add('pending-title');        

        const pendingTitleSpan = document.createElement('span');
        pendingTitleSpan.textContent = inputValue.title;

        const pendingCloseButton = document.createElement('button');
        pendingCloseButton.innerHTML = 'Complete Task';

        const pendingSecondary = document.createElement('div');
        pendingSecondary.classList.add('pending-secondary');

        const pendingDescriptionSpan = document.createElement('span');
        if (inputValue.description !== '') {
          pendingDescriptionSpan.textContent = inputValue.description;
        } else pendingDescriptionSpan.textContent = '';

        const pendingDateSpan = document.createElement('span');
        if (inputValue.date !== '') {
          pendingDateSpan.textContent = `Date and Time: ${dateString}`;
        } else pendingDateSpan.textContent = 'No Date';

        const pendingPrioritySpan = document.createElement('span');
        if (inputValue.priority !== '') {
          pendingPrioritySpan.textContent = `Priority: ${inputValue.priority}`;
          pendingPrioritySpan.setAttribute('data-priority', inputValue.priority);
        } else pendingPrioritySpan.textContent = '';

        pendingContainer.appendChild(pendingTask);
        pendingTask.appendChild(pendingTitle);
        pendingTask.appendChild(pendingSecondary);

        pendingTitle.appendChild(pendingTitleSpan);
        pendingTitle.appendChild(pendingCloseButton);
        
        pendingSecondary.appendChild(pendingDescriptionSpan);
        pendingSecondary.appendChild(pendingDateSpan);
        pendingSecondary.appendChild(pendingPrioritySpan);

    } else {
        console.log('Title is required');
        requireTitle();
        return;
    }    
}

function useData() {
  let setButton = document.querySelector('#set');

  if (setButton) {
    const newSetButton = setButton.cloneNode(true);
    setButton.replaceWith(newSetButton);
    setButton = newSetButton;
    
    setButton.addEventListener('click', () => {
      const data = collectFormData();
      createTask(data);
    })    
  } else {
    console.log('nooo');
  }
}

function requireTitle() {
  const titleInput = document.getElementById('title');

  // Highlight the title input
  titleInput.style.border = '2px solid red';
  titleInput.style.backgroundColor = '#ffe6e6'; // Light red background for emphasis

  // Add a helper text to inform the user
  let errorText = document.querySelector('#title-error');
  if (!errorText) {
      errorText = document.createElement('span');
      errorText.id = 'title-error';
      errorText.textContent = 'Title is required';
      errorText.style.color = 'red';
      errorText.style.fontSize = '14px';
      errorText.style.marginTop = '5px';
      errorText.style.display = 'block';
      titleInput.parentNode.appendChild(errorText); // Add error text below the input
  }

  // Remove highlight and error text when user starts typing
  titleInput.addEventListener('input', () => {
      titleInput.style.border = '';
      titleInput.style.backgroundColor = '';
      if (errorText) errorText.remove();
  });
}

// 1. page-content is hard-coded
// 2. DOM content loads, listener creates newTask element and adds some more listeners
// 3. Clicking newTask element calls handleNewTaskClick(newTask) & createTaskForm()
// 4. 
