import React, { useState } from "react";
import styles from "./AddTodoForm.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons';

function AddTodoForm({ onAdd }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [reminder, setReminder] = useState(false);

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
    onAdd(text, priority, dueDate, reminder);
    setText("");
    setDueDate(""); // Reset the dueDate
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label>
        Set Reminder:
        <input
          type="checkbox"
          checked={reminder}
          onChange={(e) => setReminder(e.target.checked)}
        />
      </label>
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
      <div className={styles.dateInputContainer}>
        <input
          type="date"
          className={styles.dateInput}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          min={today}
        />
        <label className={styles.calendarIcon}>
        <FontAwesomeIcon icon={faCalendarCheck} />
        </label>
      </div>

      <button type="submit" className={styles.button}>
        Add
      </button>
    </form>
  );
}

export default AddTodoForm;
