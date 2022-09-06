import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ErrorBoundary } from './components/error-boundary/ErrorBoundary'

import { Navbar } from './components/navbar/Navbar'
import { Login } from './pages/Login'
import { Main } from './pages/Main'
import { NotFound } from './pages/NotFound'
import { SignUp } from './pages/SignUp'
import { logoutUser } from './store/authSlice'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { selectLinks } from './store/linksSlice'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const links = useAppSelector(selectLinks)

  useEffect(() => {
    const minutes = 5
    const now = new Date().getTime()
    const setupTime = localStorage.getItem('setupTime')

    if (setupTime == null) {
      localStorage.setItem('setupTime', now.toString())
    } else {
      if (now - +setupTime > minutes * 60 * 1000) {
        localStorage.setItem('setupTime', now.toString())
        dispatch(logoutUser())
      }
    }
  }, [links])

  return (
    <>
      <Navbar />
      <main>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Navigate to="/main" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/main" element={<Main />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </main>
    </>
  )
}

export default App
