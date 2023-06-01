import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import './App.css';
import { useNavigate } from 'react-router-dom';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const navigate= useNavigate()
  const { token, setToken } = useContext(AuthContext);
 
  useEffect(() =>{
    if(!token){
      navigate('/login')
    }
  }, [token, navigate])

  function handleLogout(){
    localStorage.removeItem("token")
    setToken('')
    navigate('/login')

  }

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      // Create a new todo object
      const newTodoItem = {
        id: Date.now(),
        title: newTodo,
        completed: false
      };

      // Update the todo list state
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (id) => {
    // Remove the todo item from the todo list
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    
    <div className="todo-list">
      
      <button onClick={handleLogout}>Logout</button>
      <h2>Todo List</h2>
      <div className="todo-input">
        <input type="text" value={newTodo} onChange={handleInputChange} placeholder="Add a new todo" />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <ul className="todos">
        {todos.map(todo => (
          <li key={todo.id}>
            <span className={todo.completed ? 'completed' : ''}>{todo.title}</span>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
