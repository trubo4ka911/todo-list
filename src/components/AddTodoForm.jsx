import React, { useState } from "react";
import styles from "./AddTodoForm.module.css";

function AddTodoForm({ onAdd }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      alert("Please enter a todo item.");
      return;
    }
    if (!dueDate) {
      alert("Please select a due date.");
      return;
    }
    onAdd(text, priority, dueDate);
    setText("");
    setDueDate(""); // Reset the dueDate
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        className={styles.input}
        placeholder="Add a new todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select
        className={styles.prioritySelect}
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input
        type="date"
        className={styles.dateInput}
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        min={today}
      />
      <button type="submit" className={styles.button}>
        Add
      </button>
    </form>
  );
}

export default AddTodoForm;
