import { createSlice } from '@reduxjs/toolkit'

const neyburhoodSlice = createSlice({
  name: 'neyburhood',
  state: {
    country: '',
    administrativeAreaLevel1: '',
    sublocality: '',
    locality: '',
    doc: ''
  },
  reducers: {
    setLocation: (state, action) => {
      // const {country, administrativeAreaLevel1, sublocality, locality} = action.payload
      for (const prop in state) {
        
        state[prop] = action.payload[prop]
      }
    }
  }
})

export const neyburhoodSliceReducer = neyburhoodSlice.reducer
export const {setLocation} = neyburhoodSlice.actions