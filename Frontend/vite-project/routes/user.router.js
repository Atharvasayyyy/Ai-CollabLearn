import React from 'react'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';

const UserRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user" element={<div>User Profile</div>} />
        <Route path="/login" element={<div>Login Page</div>} />
        <Route path="/register" element={<div>Register Page</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default UserRouter