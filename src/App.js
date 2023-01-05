import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function Todo({ todo, index, markTodo, removeTodo }) {
  return (
    <div className="todo">
      <span style={{ textDecoration: todo.completed ? "line-through" : "" }}>
        {todo.title}
      </span>
      <div>
        <Button variant="outline-success" onClick={() => markTodo(index)}>
          ✓
        </Button>{" "}
        <Button variant="outline-danger" onClick={() => removeTodo(index)}>
          ✕
        </Button>
      </div>
    </div>
  );
}

function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo({ title: value, completed: false });
    // setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>
          <b>Add Todo</b>
        </Form.Label>
        <Form.Control
          type="text"
          className="input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add new todo"
        />
      </Form.Group>
      <Button variant="primary mb-3" type="submit">
        Submit
      </Button>
    </Form>
  );
}

function App() {
  const [todos, setTodos] = React.useState([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    setFlag(false);
    axios
      .get("http://localhost:8000/api/task-list/")
      .then(({ data }) => {
        setTodos(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [flag]);

  const addTodo = (data) => {
    // const newTodos = [...todos, { text }];
    // setTodos(newTodos);

    axios
      .post("http://localhost:8000/api/task-create/", data)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setFlag(true);
        } else Promise.reject();
      })
      .catch((err) => alert(err));
  };

  const markTodo = (index) => {
    // const newTodos = [...todos];
    // newTodos[index].completed = !newTodos[index].completed;
    let obj = todos.find((o) => o.id === index);
    obj.completed = !obj.completed;
    axios
      .post("http://localhost:8000/api/task-update/" + index, obj)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setFlag(true);
        } else Promise.reject();
      })
      .catch((err) => alert(err));

    //
    // setTodos(newTodos);
  };

  const removeTodo = (index) => {
    // const newTodos = [...todos];
    // newTodos.splice(index, 1);
    // setTodos(newTodos);
    axios
      .delete("http://localhost:8000/api/task-delete/" + index)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setFlag(true);
        } else Promise.reject();
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Todo List</h1>
        <FormTodo addTodo={addTodo} />
        <div>
          {todos.map((todo) => (
            <Card>
              <Card.Body>
                <Todo
                  key={todo.id}
                  index={todo.id}
                  todo={todo}
                  markTodo={markTodo}
                  removeTodo={removeTodo}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
