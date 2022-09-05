import { configureStore } from '@reduxjs/toolkit'
import authReducer, { AuthState } from './authSlice'
import LinksReducer, { LinksState, LinkType } from './linksSlice'
import { authMiddleware } from './authMiddleware'
import { getPreloadedUserData } from './getPreloadedData'

const preloadedState = {
  ...getPreloadedUserData(),
  Links: { Links: [] },
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    Links: LinksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
  preloadedState: preloadedState,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
