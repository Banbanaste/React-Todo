import React, { useState } from "react";

import TodoForm from "./components/TodoComponents/TodoForm";
import Todo from "./components/TodoComponents/Todo";

import SearchForm from "./components/SearchComponents/SearchForm";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todoList: [
        {
          task: "Organize Garage",
          id: 1528817077286,
          completed: false
        },
        {
          task: "Bake Cookies",
          id: 1528817084358,
          completed: false
        }
      ],
      loading: true
    };
  }

  componentDidMount() {
    const todoList = JSON.parse(localStorage.getItem("todoList"));
    if (todoList) {
      this.setState({ todoList, loading: false, filter: [] });
    } else {
      this.setState({
        todoList: [
          {
            task: "Organize Garage",
            id: 1528817077286,
            completed: false
          },
          {
            task: "Bake Cookies",
            id: 1528817084358,
            completed: false
          }
        ],
        loading: false,
        filter: []
      });
    }
  }

  componentDidUpdate() {
    this.setLocalStorage();
  }

  createTodo = todoObject => {
    this.setState(prevState => ({
      todoList: [...prevState.todoList, todoObject]
    }));
  };

  updateTodo = todoObject => {
    const updatedTodoObject = {
      ...todoObject,
      completed: !todoObject.completed
    };

    this.setState(prevState => {
      const newState = prevState.todoList.filter(todoObject => {
        return todoObject.id !== updatedTodoObject.id;
      });
      return { todoList: [...newState, updatedTodoObject] };
    });
  };

  clearCompleted = () => {
    this.setState(prevState => ({
      todoList: prevState.todoList.filter(todoObject => !todoObject.completed)
    }));
  };

  setLocalStorage = () => {
    localStorage.clear();
    localStorage.setItem("todoList", JSON.stringify(this.state.todoList));
  };

  renderTodoList = searchInput => {
    this.state.todoList.map(todoObject => {
      if (todoObject.task === searchInput.task) {
        return (
          <Todo
            todoObject={todoObject}
            handleClick={this.updateTodo}
            key={todoObject.id}
          />
        );
      }
    });
  };

  updateFilter = filterObject => {
    this.setState({ filter: filterObject });
  };

  render() {
    return (
      <div>
        <h2>Welcome to your Todo App!</h2>

        {!this.state.loading && (
          <div>
            <TodoForm
              createTodo={this.createTodo}
              clearCompleted={this.clearCompleted}
              setLocalStorage={this.setLocalStorage}
            />
            <SearchForm
              todoObject={this.state.todoList}
              updateFilter={this.updateFilter}
            />
            {this.state.filter.length > 0
              ? this.state.filter.map(todoObject => {
                  return (
                    <Todo
                      todoObject={todoObject}
                      handleClick={this.updateTodo}
                      key={todoObject.id}
                    />
                  );
                })
              : this.state.todoList.map(todoObject => {
                  return (
                    <Todo
                      todoObject={todoObject}
                      handleClick={this.updateTodo}
                      key={todoObject.id}
                    />
                  );
                })}
          </div>
        )}
      </div>
    );
  }
}

export default App;
