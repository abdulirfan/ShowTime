import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{ padding: '1rem', background: '#111', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
      <h3>Netflix Clone</h3>
      <button onClick={handleLogout} style={{ background: '#e50914', border: 'none', padding: '0.5rem 1rem', color: 'white' }}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
