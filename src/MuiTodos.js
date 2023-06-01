import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { Input, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function MuiTodos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`http://localhost:3002/fetch/${userId}`);
        const data = await response.json();
        setTodos(data.todos);
        console.log("todos fetching",data)

      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
  };

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem = {
        title: newTodo,
      };

      fetch(`http://localhost:3002/posttodo/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTodoItem.title,
          userId: userId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setTodos((prevTodos) => [...prevTodos, data]);
          setNewTodo("");
        })
        .catch((error) => {
          console.error("Error creating todo:", error);
        });
    }
  };

  const handleDeleteTodo = (todo) => {
    const {_id:id}=todo;
    debugger;
    fetch(`http://localhost:3002/deletetodo/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        debugger
        if (data.message === "Todo item deleted successfully") {
          setTodos(todos.filter((todo) => todo._id !== id));
        } else {
          console.error("Error deleting todo:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  };
  

  const handleUpdateTodo = async (id, currentTitle) => {
    // Open the modal/dialog and get the new title from the user
    const newTitle = prompt("Enter the new title:", currentTitle);

    try {
      // Make a PUT request to update the todo item
      const response = await fetch(`http://localhost:3002/updatetodo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle }),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo item");
      }

      const updatedTodo = await response.json();
      return updatedTodo;
    } catch (error) {
      console.error("Error updating todo item:", error);
      throw error;
    }
  };

  return (
    <div className="main-div">
      <div className="center-div">
        <br />
        <h1 className="todo-name">ToDo List</h1>
        <br />
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
        <Input
          className="todo-input"
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          placeholder="Add an item"
        />
        <Button className="newBtn" variant="outlined" onClick={handleAddTodo}>
          <AddIcon />
        </Button>

        {/* Todo List rendering */}
        <ol className="todos">
          {todos.map((todo,i) => (
            <li key={i+'todo'}  >
              <span>{todo.title}</span>
              <EditIcon onClick={() => handleUpdateTodo(todo._id)} />

              <DeleteIcon onClick={() => handleDeleteTodo(todo)} />
              {/* {console.log("deleted todo id", todo._id)} */}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default MuiTodos;
