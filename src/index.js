import{ AppPinStack, AppStack, OnboardStack, RegistrationStack, SettingStack} from './routes'
// Import
import { ApiPromise, Keyring, WsProvider } from '@polkadot/api';




import { View,Button } from 'native-base';
import * as SecureStore from 'expo-secure-store';

import { store } from './app/store';
import { Provider, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();
navigator.geolocation = require('@react-native-community/geolocation');
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LogBox } from 'react-native';
import { updateMnemonic } from './app/features/api_calls';
LogBox.ignoreLogs(['Warning: ...']);


export const wsProvider = new WsProvider('ws://35.232.24.147:9944');




/**
 * will have the home screen an app scrrenn 
 * to lauch home screen will check  the onbaording and wheter we have a key 
 * @returns 
 */




 export  function Home() {

  const [onboardStatus, setOnboardStatus] = useState(null)
  const [key, setKey] = useState(null)
  const dispatch = useDispatch()

  useEffect(()=>{
    async function getValueFor(key) {
      try {
        let result = await SecureStore.getItemAsync(key);
        console.log(result)

        if (result ){
          setOnboardStatus(result);
          const api = await ApiPromise.create({ provider: wsProvider });
          const mnemonic = await SecureStore.getItemAsync('mnemonic')
          const keyring = new Keyring({ type: 'sr25519' })
          const pair = keyring.createFromUri(mnemonic);
          dispatch(updateMnemonic(mnemonic))
          console.log(pair.address)
          const now = await api.query.identity.identity(pair.address)
          console.log(now.isEmpty)
          setKey(now.isEmpty)
          
          console.log(mnemonic)
        }
      } catch (error) {
        console.log(error)
      }finally {
        await SplashScreen.hideAsync()
      }
      
      
    }
    getValueFor('onboardStatus')
  })
   
   if(onboardStatus != `true` || onboardStatus == null ){
      return (
        <SafeAreaProvider>
        
          <OnboardStack/>
       
        </SafeAreaProvider>
      )
   }
   if(onboardStatus === `true` && key ){
    return (
      <SafeAreaProvider>
    
        <RegistrationStack/>
      
      </SafeAreaProvider>
    )
   }
   
   if(onboardStatus === `true` && key === false){
    /**
     * should have drawer and tab navigation
     */
    return (
      <SafeAreaProvider>
   
        <AppStack/>
     
      </SafeAreaProvider>
      
    );
   }
  }
  

  /**
   * 
   * @returns 
   */
 


  