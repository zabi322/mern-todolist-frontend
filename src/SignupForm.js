import React, { useState } from 'react';

function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3002/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        console.log('User signed up successfully');
        alert("User signed up successfully")
        // Redirect or perform any other action after successful signup
      } else if (response.status === 409) {
        console.log('Email already exists');
        alert("Email already exists")
        // Display an error message to the user
      } else {
        console.log('Error signing up');
        console.log(response)
        // Display an error message to the user
      }
    } catch (error) {
      console.error('Error:', error);
      // Display an error message to the user
    }
  };

  return (
    <div className="container">
      <div className="signup-form">
        <h1>Welcome</h1>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={handleEmailChange} required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" value={password} onChange={handlePasswordChange} required />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <h3>Already a User <a href='/login'>Sign In</a></h3>
      </div>
    </div>
  );
}

export default SignupForm;
