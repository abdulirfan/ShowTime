import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/authenticate', {
        username,
        password
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role); 
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed: Invalid username or password');
    }
  };

  //Front-end Validation
  /*const handleLogin = async (e) => {
    e.preventDefault();
  
    const validUsername = 'user';
    const validPassword = 'password';
  
    if (username === validUsername && password === validPassword) {
      const fakeJwt = 'mock-jwt-token-12345';
      localStorage.setItem('token', fakeJwt);
      localStorage.setItem('role', 'user'); 
      navigate('/dashboard');
    } else {
      alert('Login failed: Invalid username or password');
    }
  };*/
  

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>ShowTime Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
