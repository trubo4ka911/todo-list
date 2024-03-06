import React, { useState } from "react";
import styles from "./TodoItem.module.css";

function TodoItem({
  todo,
  onComplete,
  onDelete,
  onAddSubtask,
  onCompleteSubtask,
  onDeleteSubtask,
}) {

  const [subtaskText, setSubtaskText] = useState("");
  
  // Create a new Date object for the start of today
const startOfToday = new Date();
startOfToday.setHours(0, 0, 0, 0);

// Determine if the due date has passed, only comparing the date parts
const isOverdue = todo.dueDate && new Date(todo.dueDate) < startOfToday;

  // Determine the class for the complete button when the todo is completed
  const completeButtonClass = todo.completed
    ? `${styles.button} ${styles.completeButton} ${styles.completedButton}`
    : `${styles.button} ${styles.completeButton}`;

 // Function to handle completing a main task
  const handleCompleteMainTask = () => {
    onComplete(todo.id);
  };

  // Function to handle deleting a main task
  const handleDeleteMainTask = () => {
    onDelete(todo.id);
  };

  // Function to handle the submission of a new subtask
  const handleAddSubtaskKeyPress = (event) => {
    if (event.key === 'Enter' && subtaskText.trim() !== '') {
      onAddSubtask(todo.id, subtaskText);
      setSubtaskText(''); // Clear input after adding
      event.preventDefault(); // Prevent the default action to avoid form submission
    }
  };
  

  // Function to handle completing a subtask
  const handleCompleteSubtask = (subtaskId) => {
    onCompleteSubtask(todo.id, subtaskId);
  };

  // Function to handle deleting a subtask
  const handleDeleteSubtask = (subtaskId) => {
    onDeleteSubtask(todo.id, subtaskId);
  };

  return (
    <div className={`${styles.todoItem} ${todo.reminderSet ? styles.reminderActive : ''}`}>
    {todo.reminderSet && <span className={styles.reminderIndicator}>⏰</span>}
    <span className={`${styles.todoText} ${todo.completed ? styles.completed : ''}`}>
      {todo.text}
    </span>
    <div className={`${styles.dueDate} ${isOverdue ? styles.overdueDate : ''}`}>
      {todo.dueDate && <span>Due: {new Date(todo.dueDate).toLocaleDateString("en-US")}</span>}
    </div>
    <span className={`${styles.priority} ${styles[`priority${todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}`]}`}>
    </span>
    {todo.subtasks && todo.subtasks.map((subtask) => (
      <div key={subtask.id} className={styles.subtask}>
        <input
          type="checkbox"
          checked={subtask.completed}
          onChange={() => handleCompleteSubtask(subtask.id)}
        />
        <span className={subtask.completed ? styles.subtaskCompleted : ''}>
          {subtask.text}
        </span>
        <button className={styles.deleteSubtaskButton}  onClick={() => handleDeleteSubtask(subtask.id)}>
          Delete
        </button>
      </div>
    ))}
    <input
      type="text"
      className={styles.subtaskInput}
      placeholder="Add subtask"
      value={subtaskText}
      onChange={(e) => setSubtaskText(e.target.value)}
      onKeyDown={handleAddSubtaskKeyPress}
    />
    <div className={styles.buttonGroup}>
      <button
        className={completeButtonClass}
        onClick={handleCompleteMainTask}
      >
        {todo.completed ? "Completed" : "Complete"}
      </button>
      <button
        className={`${styles.button} ${styles.deleteButton}`}
        onClick={handleDeleteMainTask}
      >
        Delete
      </button>
    </div>
  </div>
);
}

export default TodoItem;
