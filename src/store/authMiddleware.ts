import { Middleware } from '@reduxjs/toolkit'

export const authMiddleware: Middleware<{}> = () => (next) => (action) => {
  switch (action.type) {
    case 'auth/logoutUser': {
      localStorage.removeItem('token')

      next(action)
      break
    }

    case 'auth/loginUser': {
      localStorage.setItem('token', action.payload.token)

      next(action)
      break
    }

    default:
      next(action)
      break
  }
}
