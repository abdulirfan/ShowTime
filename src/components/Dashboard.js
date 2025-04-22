import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8080/protected', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setMessage(res.data))
    .catch(err => setMessage("You are not authorized."));
  }, []);

  return (
    <div style={{ padding: '2rem', color: 'white', background: '#141414' }}>
      <h1>Welcome to the Dashboard</h1>
      <p>{message}</p>
    </div>
  );
};

export default Dashboard;
