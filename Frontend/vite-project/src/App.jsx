import React from 'react'
import UserRouter from './routes/user.router.jsx';
import { UserProvider } from './context/user.context.jsx';

const App = () => {
  return (
    <UserProvider>
      <UserRouter />
    </UserProvider>
  )
}

export default App