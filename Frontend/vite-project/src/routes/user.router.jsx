import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Hero } from '../screen/Hero.jsx';
import LoginPage from '../screen/login.jsx';
import RegisterPage from '../screen/register.jsx';

const UserRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user" element={<div>User Profile</div>} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};

export default UserRouter;
