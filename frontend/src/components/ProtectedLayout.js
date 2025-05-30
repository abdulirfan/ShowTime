import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const ProtectedLayout = () => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
