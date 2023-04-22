import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentLocation:{},
    origin: {},
    destination:{},
}

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
  
    updateOrigin: (state,action) => {
      state.origin = action.payload
    },
    updateDestination: (state,action) =>{
        state.destination = action.payload
    }
    
  },
})

// Action creators are generated for each case reducer function
export const {updateOrigin,updateDestination } = locationSlice.actions

export default locationSlice.reducer