import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:8080/search?q=${query}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(`Search result: ${res.data.length} videos found`);
    } catch (err) {
      alert('Search failed.');
    }
  };

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000, padding: '0.5rem 1rem', background: '#111', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', height: '50px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.6)', borderBottom: '1px solid white' }}>
      <h3 style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
        ShowTime
      </h3>

      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          placeholder="Search videos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '0.5rem' }}
        />
        <button type="submit" style={{ background: '#e50914', color: 'white', border: 'none', padding: '0.5rem' }}>Search</button>
      </form>

      <div style={{ display: 'flex', gap: '1rem' }}>
        {role === 'admin' && (
          <button
            onClick={() => navigate('/upload')}
            style={{ background: '#444', color: 'white', border: 'none', padding: '0.5rem' }}
          >
            Upload
          </button>
        )}
        <button
          onClick={handleLogout}
          style={{ background: '#e50914', border: 'none', padding: '0.5rem 1rem', color: 'white', marginRight: '30px' }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
