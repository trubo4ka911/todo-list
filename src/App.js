import React, { useState, useEffect } from "react";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";

import styles from "./App.module.css";

function App() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text, priority, dueDate) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
      priority: priority,
      dueDate: dueDate,
    };
    setTodos([...todos, newTodo]);
  };

  const completeTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const sortTodosByPriority = () => {
    // Toggle sort order between ascending and descending
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);

    const sortedTodos = [...todos].sort((a, b) => {
      const priorities = { high: 3, medium: 2, low: 1 };
      return (
        (newSortOrder === "asc" ? 1 : -1) *
        (priorities[b.priority] - priorities[a.priority])
      );
    });
    setTodos(sortedTodos);
  };

  const sortTodosByDueDate = () => {
    // Assume newer dates should appear first; adjust as necessary for your app
    const sortedTodos = [...todos].sort(
      (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
    );
    setTodos(sortedTodos);
  };

  return (
    <div className={styles.appContainer}>
      <AddTodoForm onAdd={addTodo} />
      {/* Include a button to sort the todos */}
      <button
        onClick={sortTodosByPriority}
        className={sortOrder === "asc" ? styles.sortAsc : styles.sortDesc}
      >
        Sort by Priority
      </button>
      <button onClick={sortTodosByDueDate} className={styles.sortButton}>
        Sort by Due Date
      </button>
      <TodoList todos={todos} onComplete={completeTodo} onDelete={deleteTodo} />
    </div>
  );
}

export default App;
