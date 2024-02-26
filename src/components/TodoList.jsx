import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onComplete, onDelete, onSort }) {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onComplete={onComplete} onDelete={onDelete} onSort={onSort} />
      ))}
    </div>
  );
}

export default TodoList;
