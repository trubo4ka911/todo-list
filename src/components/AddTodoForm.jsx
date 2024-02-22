import React, { useState } from 'react';
import styles from './AddTodoForm.module.css';

function AddTodoForm({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText('');
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
      <button type="submit" className={styles.button}>Add</button>
    </form>
  );
}

export default AddTodoForm;
