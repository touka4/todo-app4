import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 


function TodoPage() {
  const [todos, setTodos] = useState([
    { id: 1, title: 'destroy the psyche', completed: false },
    { id: 2, title: 'feed the guinea pig', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo) return;
    const newTodoItem = {
      id: Date.now(),
      title: newTodo,
      completed: false,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'incomplete') return !todo.completed;
    return true; 
  });

  return (
    <div>
      <h1>
        my t0d0 !!1!
      </h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo.."
        />
        <button type="submit">Add new</button>
      </form>
      <div className="task">
        <label htmlFor="filter">Filter:</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">Done</option>
          <option value="incomplete">In progress</option>
        </select>
      </div>
      <div className="todo-list-container">
        {filteredTodos.map((todo) => (
          <div key={todo.id} className="todo-item">
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)} className="delete-button">
              Удалить
            </button>
          </div>
        ))}
      </div>
      <div className="navigation">
        <Link to="/dnd" className="nav-button">Dnd страница</Link> 
      </div>
    </div>
  );
}

export default TodoPage;