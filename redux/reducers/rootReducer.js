import { combineReducers } from 'redux'
import {neyburhoodSliceReducer} from '../slices/neyburhoodSlice'
import {userSliceReducer} from '../slices/userSlice'

const rootReducer = combineReducers({
  neyburhood: neyburhoodSliceReducer,
  user: userSliceReducer,
  
})

export default rootReducer