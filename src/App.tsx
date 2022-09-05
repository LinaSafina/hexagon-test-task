import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { Login } from './pages/Login'
import { Main } from './pages/Main'
import { NotFound } from './pages/NotFound'
import { SignUp } from './pages/SignUp'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/login" element={Login} />
          <Route path="/signup" element={SignUp} />
          <Route path="/" element={Main} />
          <Route path="*" element={NotFound} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
