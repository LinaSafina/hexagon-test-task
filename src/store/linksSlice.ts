import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

export type LinkType = {
  id: number
  short: string
  target: string
  counter: number
}

export type LinksType = LinkType[]

export type LinksState = { links: LinksType }

const initialState: LinksState = {
  links: [],
}

export const linksSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {
    addLink: (state, action: PayloadAction<LinkType>) => {
      state.links.push(action.payload)
      console.log(state)
    },

    setLinks: (state, action: PayloadAction<LinksType>) => {
      state.links = action.payload
      console.log(state)
    },
  },
})

export const { addLink, setLinks } = linksSlice.actions

export const selectLinks = (state: RootState) => state.links.links

export default linksSlice.reducer
