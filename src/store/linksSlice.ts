import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

export type LinkType = {
  id: string | number
  name: string
  phone: string
  gender: string
  userId: string
}

export type LinksType = LinkType[]

export type LinksState = {
  Links: LinksType
}

const initialState: LinksState = {
  Links: [],
}

export const LinksSlice = createSlice({
  name: 'Links',
  initialState,
  reducers: {
    addLink: (state, action: PayloadAction<LinkType>) => {
      state.Links.push(action.payload)
    },

    editLink: (state, action: PayloadAction<LinkType>) => {
      const index = state.Links.findIndex(
        (Link) => Link.id === action.payload.id
      )
      state.Links[index] = { ...state.Links[index], ...action.payload }
    },

    deleteLink: (state, action: PayloadAction<string>) => {
      state.Links.splice(
        state.Links.findIndex((Link) => Link.id === action.payload),
        1
      )
    },

    setLinks: (state, action: PayloadAction<LinksType>) => {
      state.Links = action.payload
    },
  },
})

export const { addLink, editLink, deleteLink, setLinks } = LinksSlice.actions

export const selectLinks = (state: RootState) => state.Links.Links

export default LinksSlice.reducer
