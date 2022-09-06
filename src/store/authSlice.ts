import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

export type AuthState = {
  isLoggedIn: boolean
  username: string
}

const initialState: AuthState = {
  isLoggedIn: false,
  username: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (
      state,
      action: PayloadAction<{ token: string; username: string }>
    ) => {
      state.username = action.payload.username
      state.isLoggedIn = true
    },

    logoutUser: () => initialState,
  },
})

export const { loginUser, logoutUser } = authSlice.actions

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn
export const selectUsername = (state: RootState) => state.auth.username

export default authSlice.reducer
