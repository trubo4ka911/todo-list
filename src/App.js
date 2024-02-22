import React, { useState } from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';

import styles from './App.module.css';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  const completeTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className={styles.appContainer}>
      <AddTodoForm onAdd={addTodo} />
      <TodoList todos={todos} onComplete={completeTodo} onDelete={deleteTodo} />
    </div>
  );
}

export default App;
