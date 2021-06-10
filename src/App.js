import React from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos].concat(newTodo));
    setTodo("");
  }

  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function submitEdit(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }

  return (
    <div id="todo-list">
      <div class="row">
        <div class="col-1 col-sm-3"></div>
        <div class="col-10 col-sm-6">
          <h1>Your Todo List</h1>
          <form onSubmit={handleSubmit}>
            <input
              class="form-control"
              type="text"
              onChange={(e) => setTodo(e.target.value)}
              value={todo}
            />
            <button class="btn btn-success" type="submit">Add Todo</button>
          </form>
        </div>
        <div class="col-1 col-sm-3"></div>
      </div>
      {todos.map((todo) => (
        <div class="row">
          <div class="col-sm-3"></div>
          <div class="col-sm-6">
            <div key={todo.id} className="todo">
              <div className="todo-text">
                <input
                  type="checkbox"
                  id="completed"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                />
                {todo.id === todoEditing ? (
                <input
                  type="text"
                  onChange={(e) => setEditingText(e.target.value)}
                />
                ) : (
                <div>{todo.text}</div>
                )}
              </div>
            <div className="todo-actions">
              {todo.id === todoEditing ? (
                <button class="btn btn-warning" onClick={() => submitEdit(todo.id)}>Submit Edit</button>
                ) : (
                <button class="btn btn-warning" onClick={() => setTodoEditing(todo.id)}>Edit</button>
                )}
                <button class="btn btn-danger" onClick={() => deleteTodo(todo.id)}>Delete</button>
              </div>
            </div>
          </div>
        <div class="col-sm-3"></div>
      </div>
      ))}
    </div>
  );
};

export default App;