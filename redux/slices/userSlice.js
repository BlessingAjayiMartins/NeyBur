import { createSlice } from '@reduxjs/toolkit'


const userSlice = createSlice({
  name: 'user',
  state: {
    UID: '',
    signedIn: false,
    postID: 0,
  },
  reducers: {
    setUID: (state, action) => {
      const uid = action.payload
      state.UID = uid
      state.signedIn = true
    },
    incrementId: (state) => {
      state.postID += 1
    }
  }
})

export const userSliceReducer = userSlice.reducer
export const { setUID, incrementId } = userSlice.actions