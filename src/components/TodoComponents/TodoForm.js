import React from "react";
import { useForm } from "react-hook-form";

const TodoForm = props => {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = value => {
    const todoObject = { ...value, id: Date.now(), completed: false };
    console.log(todoObject);
    props.createTodo(todoObject);
    props.setLocalStorage();
  };

  return (
    <div style={{ display: "inline-block" }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "inline-block" }}
      >
        <input
          name="task"
          ref={register({
            required: "Required"
          })}
          placeholder="todo"
        />
        {errors.task && errors.task.message}

        <button type="submit">Add Todo</button>
      </form>
      <button onClick={props.clearCompleted}>Clear Completed</button>
    </div>
  );
};

export default TodoForm;
