window.addEventListener('load', () => {
	tasks = JSON.parse(localStorage.getItem('tasks')) || [];
	const newTodoForm = document.querySelector('#new-todo-form');
  
	newTodoForm.addEventListener('submit', e => {
	  e.preventDefault();
  
	  const todo = {
		id: new Date().getTime(),
		content: e.target.elements.content.value,
		done: false
	  };
  
	  tasks.push(todo);
	  localStorage.setItem('tasks', JSON.stringify(tasks));
	  e.target.reset();
  
	  displaytasks();
	});
  
	displaytasks();
  });
  
  function displaytasks() {
	const todolist = document.querySelector('#todo-list');
	todolist.innerHTML = '';
  
	tasks.forEach(todo => {
	  const todoItem = document.createElement('div');
	  todoItem.classList.add('todo-item');
	  todoItem.dataset.id = todo.id; // Agrega el ID de la tarea como un atributo "data-id"
  
	  const content = document.createElement('div');
	  const actions = document.createElement('div');
	  const edit = document.createElement('button');
	  const done = document.createElement('button');
	  const dltbtn = document.createElement('button');
  
	  content.classList.add('todo-content');
	  actions.classList.add('actions');
	  edit.classList.add('Edit');
	  done.classList.add('Done');
	  dltbtn.classList.add('Delete');
  
	  content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
	  edit.innerHTML = 'Edit';
	  done.innerHTML = 'Done';
	  dltbtn.innerHTML = 'Delete';
  
	  actions.appendChild(edit);
	  actions.appendChild(done);
	  actions.appendChild(dltbtn);
	  todoItem.appendChild(content);
	  todoItem.appendChild(actions);
	  todolist.appendChild(todoItem);
  
	  edit.addEventListener('click', (e) => {
		const input = content.querySelector('input');
		input.removeAttribute('readonly');
		input.focus();
		input.addEventListener('blur', (e) => {
		  input.setAttribute('readonly', true);
		  todo.content = e.target.value;
		  localStorage.setItem('tasks', JSON.stringify(tasks));
		  displaytasks();
		});
	  });
  
	  dltbtn.addEventListener('click', (e) => {
		tasks = tasks.filter(t => t !== todo);
		localStorage.setItem('tasks', JSON.stringify(tasks));
		displaytasks();
	  });
  
	  done.addEventListener('click', (e) => {
		const item = e.target;
		const todoItem = item.parentElement.parentElement;
		const todoId = todoItem.dataset.id;
		
		// Encontrar la tarea correspondiente en el arreglo tasks
		const todo = tasks.find(t => t.id === parseInt(todoId));
  
		// Cambiar el estado "done" de la tarea
		todo.done = !todo.done;
  
		// Actualizar el localStorage
		localStorage.setItem('tasks', JSON.stringify(tasks));
  
		// Actualizar los contadores de tareas
		
  
		// Actualizar la visualización de las tareas
		displaytasks();
		const completedTodoItem = document.querySelector(`[data-id="${todoId}"]`);
		if (completedTodoItem) {
		  const doneButton = completedTodoItem.querySelector('.Done');
		  const conte_t=completedTodoItem.querySelector('.todo-content > input[type="text"]');
		  if (todo.done) {
			completedTodoItem.style.backgroundColor = "#A9A9A9"; // Cambia el color de fondo a gris
			doneButton.textContent = "Undone"; 

			conte_t.style.textDecorationLine = "line-through";
			
		  } else {
			completedTodoItem.style.backgroundColor = ''; // Restaura el color de fondo predeterminado
		  }
		}
	  });
	});
  
	updateTaskSummary();
  }
  
  function updateTaskSummary() {
	const remainingTasks = tasks.filter(todo => !todo.done).length;
	const completedTasks = tasks.filter(todo => todo.done).length;
	const totalTasks = tasks.length;
  
	document.getElementById('Reaming-tasks').textContent = remainingTasks;
	document.getElementById('Completed-tasks').textContent = completedTasks;
	document.getElementById('Total-tasks').textContent = totalTasks;
  }
  