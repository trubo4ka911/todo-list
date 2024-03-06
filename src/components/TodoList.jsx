import React from "react";
import TodoItem from "./TodoItem";

function TodoList({
  todos,
  onComplete,
  onDelete,
  onAddSubtask,
  onCompleteSubtask,
  onDeleteSubtask,
}) {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onComplete={onComplete}
          onDelete={onDelete}
          onAddSubtask={onAddSubtask}
          onCompleteSubtask={onCompleteSubtask}
          onDeleteSubtask={onDeleteSubtask}
        />
      ))}
    </div>
  );
}

export default TodoList;
