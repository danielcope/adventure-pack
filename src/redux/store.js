import { createStore } from 'redux'
import userReducer from './userReducer'
import charReducer from './charReducer'

import { combineReducers } from 'redux'

const reducer = combineReducers({
  userReducer,
  charReducer
})

export default createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)