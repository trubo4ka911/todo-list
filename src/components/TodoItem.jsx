import React from "react";
import styles from "./TodoItem.module.css";

function TodoItem({ todo, onComplete, onDelete }) {
  // Determine the class for the complete button when the todo is completed
  const completeButtonClass = todo.completed
    ? `${styles.button} ${styles.completeButton} ${styles.completedButton}`
    : `${styles.button} ${styles.completeButton}`;

  return (
    <div className={`${styles.todoItem} ${todo.reminderSet ? styles.reminderActive : ''}`}>
      {/* Apply the completed class to the text if the todo is marked as completed */}
      {todo.reminderSet && <span className={styles.reminderIndicator}>⏰</span>}
      <span
        className={`${styles.todoText} ${
          todo.completed ? styles.completed : ""
        }`}
      >
        {todo.text}
      </span>
      <div className={styles.buttonGroup}>
        <button
          className={completeButtonClass}
          onClick={() => onComplete(todo.id)}
        >
          {todo.completed ? "Completed" : "Complete"}
        </button>
        <button
          className={`${styles.button} ${styles.deleteButton}`}
          onClick={() => onDelete(todo.id)}
        >
          Delete
        </button>
      </div>
      <div className={styles.dueDate}>
        {todo.dueDate && (
          <span>Due: {new Date(todo.dueDate).toLocaleDateString('en-US')}</span>
        )}

      </div>
      <span
        className={`${styles.priority} ${
          todo.priority === "high"
            ? styles.priorityHigh
            : todo.priority === "medium"
            ? styles.priorityMedium
            : styles.priorityLow
        }`}
      >        
      </span>
    </div>
  );
}

export default TodoItem;
