import { configuireStore } from '@reduxjs/toolkit'
import rootReducer from './reducers/rootReducer'

const store = configuireStore({
  reducer: rootReducer
})

export default store