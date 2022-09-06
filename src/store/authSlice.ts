import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

export type AuthState = {
  isLoggedIn: boolean
}

const initialState: AuthState = {
  isLoggedIn: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true
      console.log(state)
    },
    logoutUser: () => initialState,
  },
})

export const { loginUser, logoutUser } = authSlice.actions

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn

export default authSlice.reducer
