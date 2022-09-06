import { AuthState } from './authSlice'

export const getPreloadedUserData: () => {
  auth: AuthState
} = () => {
  const initialState = { auth: { isLoggedIn: false } }
  try {
    let token = localStorage.getItem('token')

    if (token) {
      initialState.auth.isLoggedIn = true
    }
    return initialState
  } catch (e) {
    console.log(e)
    return initialState
  }
}
