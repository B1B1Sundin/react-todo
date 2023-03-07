import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import './App.css';

type Todo = {
	id: string;
	task: string;
};

function App() {
	const [input, setInput] = useState('');
	const [todoList, setTodoList] = useState<Todo[]>([]);

	/* Use only once, since dependency list is empty */
	useEffect(() => {
		loadState();
	}, []);

	const addTodo = (task: string) => {
		if (!task) {
			return;
		}

		const newTodo: Todo = {
			id: nanoid(10),
			task: task,
		};
		const newTodoList = [...todoList, newTodo];
		setTodoList(newTodoList);
		saveState(newTodoList);
		setInput('');
	};

	const deleteTodo = (id: string) => {
		const newTodoList = todoList.filter((task) => task.id !== id);
		setTodoList(newTodoList);
		saveState(newTodoList);
	};

	const saveState = (newTodoList: Todo[]) => {
		localStorage.setItem('tasks', JSON.stringify(newTodoList));
		console.log('Should save!');
	};

	const loadState = () => {
		const todoList = localStorage.getItem('tasks');
		if (!todoList) {
			return;
		}
		const result = JSON.parse(todoList) as Todo[];
		setTodoList(result);
		console.log('Should load!');
	};
	return (
		<div>
			<h1>Todo List</h1>
			<div className="input-box">
				<input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
				<button onClick={() => addTodo(input)}>Add</button>
			</div>
			<ul className="todo">
				{todoList.map((todo) => (
					<li key={todo.id}>
						<div className="todo-item">
							{todo.task}
							<button onClick={() => deleteTodo(todo.id)}>&times;</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
