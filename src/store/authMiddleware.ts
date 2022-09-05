import { Middleware } from '@reduxjs/toolkit'

export const authMiddleware: Middleware<{}> = (store) => (next) => (action) => {
  switch (action.type) {
    case 'auth/logoutUser': {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')

      next(action)
      break
    }

    case 'auth/loginUser': {
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('userId', action.payload.userId)

      next(action)
      break
    }

    default:
      next(action)
      break
  }
}
