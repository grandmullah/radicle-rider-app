import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    currentLocation:{},
    origin: {},
    destination:{},
    ride:{},
    availableRiders:[]
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
    updateRide:(state,action)=>{
      state.ride =action.payload
    },
    updatecurrentLocation: (state,action) => {
      state.currentLocation =  action.payload
    }
    
  },
})


// Action creators are generated for each case reducer function
export const {updateOrigin,updateDestination,updateRide,updatecurrentLocation } = locationSlice.actions

export default locationSlice.reducer

export const updatedrivers = location => {
  return  async (dispatch, getState) => {
    const stateBefore = getState()
    console.log(`Counter before: ${stateBefore.availableRiders}`)
    const resp = await axios.post('https://36bd-41-80-114-214.ngrok-free.app/request_ride',location)
    console.log(resp.data)
    // const stateAfter = getState()
    // console.log(`Counter after: ${stateAfter.counter}`)
  }
}