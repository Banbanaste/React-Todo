import React, { useState } from "react";
import { useForm } from "react-hook-form";

const SearchForm = props => {
  const { handleSubmit, register, errors } = useForm();
  const [todoObject, setTodoObject] = useState(props.todoObject);
  const onSubmit = value => {
    console.log(value.searchText);
    const newObj = todoObject.filter(obj => {
      let filterVal = obj.task.toLowerCase();
      return filterVal.indexOf(value.searchText.toLowerCase()) !== -1;
    });
    console.log(newObj);
    props.updateFilter(newObj);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ marginTop: "20px", display: "inline-block" }}
      >
        <input
          name="searchText"
          ref={register({
            required: "Required"
          })}
          placeholder="Search"
        />
        {errors.searchText && errors.searchText.message}

        <button type="submit">Search Todo</button>
      </form>
      <button
        onClick={() => {
          props.updateFilter([]);
        }}
      >
        Reset Filter
      </button>
    </div>
  );
};

export default SearchForm;
