import React from "react";

const Todo = props => {
  return props.todoObject.completed ? (
    <h2
      key={props.todoObject.id}
      style={{ textDecoration: "line-through", width: "max-content" }}
      onClick={() => {
        props.handleClick(props.todoObject);
      }}
    >
      {props.todoObject.task}
    </h2>
  ) : (
    <h2
      key={props.todoObject.id}
      style={{ width: "max-content" }}
      onClick={() => {
        props.handleClick(props.todoObject);
      }}
    >
      {props.todoObject.task}
    </h2>
  );
};

export default Todo;
