
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import MuiTodos from './MuiTodos';


function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const {setToken}= useContext(AuthContext)
  const[todolist,setTodoList]=useState("")
 

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      email,
      password
    };


    fetch('http://localhost:3002/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
      .then(response =>{
        if (response.status === 401) {
          alert("Invalid password");
          throw new Error("Invalid password");
        }
        
       return response.json()
      }
        )
      .then(data => {
        // Assuming the login is successful and a token is returned from the backend
        // console.log(data)
        const { token, userId, title } = data;



        // Store the token and user ID in local storage or state for further use
        // ...
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId)
        setToken(token)
   
     

            console.log("userId" ,userId, '\n' ,"token" ,token, '\n','\n', title)
            // login(token);
            
        // Redirect or perform any other actions after successful login
        



         navigate('/todos');
        // ...
      })

  
      .catch(error => {
        if (error.response && error.response.status === 401) {
          console.log("Invalid password");
        } else {
        // Handle error responses from the backend
        console.error(error);
  }});
  };

  return (
    <div className="container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={handleEmailChange} required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" value={password} onChange={handlePasswordChange} required />
          </div>
          <button type="submit">Login</button>
        </form>
        <h3>Don't have an account <a href='/signup'>Sign Up</a></h3>
      </div>
    </div>
  );
}

export default LoginForm;