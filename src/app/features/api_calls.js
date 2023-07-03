import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Keyring } from '@polkadot/api';

const initialState = {
    state :'',
    mnemonic:'',
    key:{}
}

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
  
    updateMnemonic: (state,action) => {
      const keyring = new Keyring({ type: 'sr25519' });
      const newPair = keyring.addFromUri(action.payload);
      state.key=newPair
      state.mnemonic = action.payload

    },
   
    
  },
})


// Action creators are generated for each case reducer function
export const {updateMnemonic } = cryptoSlice.actions

export default cryptoSlice.reducer

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



  