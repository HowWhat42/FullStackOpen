import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import nofiticationReducer from './reducers/notificationReducer'

export default configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notification: nofiticationReducer,
    filter: filterReducer
  }
})