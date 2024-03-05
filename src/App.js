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

  useEffect(() => {
    const checkReminders = () => {
      const currentTimestamp = new Date().getTime();
      todos.forEach((todo) => {
        const dueTimestamp = new Date(todo.dueDate).getTime();
        const timeLeft = dueTimestamp - currentTimestamp;
        // Check if the due date is within the next 24 hours and if a reminder is set
        if (timeLeft > 0 && timeLeft <= 24 * 3600 * 1000 && todo.reminderSet) {
          alert(`Reminder: The task "${todo.text}" is due soon!`);
        }
      });
    };
    // Set an interval to check reminders every hour
    const intervalId = setInterval(checkReminders, 3600 * 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [todos]);

  const addTodo = (text, priority, dueDate, reminderSet) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
      priority: priority,
      dueDate: dueDate,
      reminderSet: reminderSet,
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
