import { configureStore } from '@reduxjs/toolkit'
import logsReducer from './logSlice'
export const store = configureStore({
  reducer: {
    logStore: logsReducer,
  },
})