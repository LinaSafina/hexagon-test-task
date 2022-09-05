import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { Login } from './pages/Login'
import { Main } from './pages/Main'
import { NotFound } from './pages/NotFound'
import { SignUp } from './pages/SignUp'

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/main" element={<Main />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}

export default App
