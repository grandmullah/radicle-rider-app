import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentLocation:{},
    origin: {},
    destination:{},
    ride:{}
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
    },
    updateRide(state,action){
      state.ride =action.payload
    }
    
  },
})

// Action creators are generated for each case reducer function
export const {updateOrigin,updateDestination,updateRide } = locationSlice.actions

export default locationSlice.reducer