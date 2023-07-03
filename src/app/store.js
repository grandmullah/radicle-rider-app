import { configureStore } from '@reduxjs/toolkit'
import locationReducer from './features/locationSlice'
import cryptoReducer  from './features/api_calls'

export const store = configureStore({
  reducer: {
    location:locationReducer,
    crypto:cryptoReducer
  },
})