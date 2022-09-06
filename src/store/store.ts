import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import linksReducer from './linksSlice'
import { authMiddleware } from './authMiddleware'
import { getPreloadedUserData } from './getPreloadedData'

const preloadedState = {
  ...getPreloadedUserData(),
  links: { links: [] },
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    links: linksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
  preloadedState: preloadedState,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
