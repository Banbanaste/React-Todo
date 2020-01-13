import React from "react";

import TodoForm from "./components/TodoComponents/TodoForm";
import Todo from "./components/TodoComponents/Todo";

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
    console.log(todoList);
    if (todoList) {
      this.setState({ todoList, loading: false });
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
        loading: false
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

  render() {
    return (
      <div>
        <h2>Welcome to your Todo App!</h2>

        {!this.state.loading && (
          <div>
            <TodoForm
              createTodo={this.createTodo}
              clearCompleted={this.clearCompleted}
            />
            {this.state.todoList.map(todoObject => {
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
