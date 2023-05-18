import{ AppPinStack, AppStack, OnboardStack, SettingStack} from './routes'
// Import
import { ApiPromise, WsProvider } from '@polkadot/api';




import { View,Button } from 'native-base';
import * as SecureStore from 'expo-secure-store';

import { store } from './app/store';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();
navigator.geolocation = require('@react-native-community/geolocation');
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);


export const wsProvider = new WsProvider('ws://35.232.24.147:9944');


ApiPromise
  .create({ provider: wsProvider })
  .then((api) =>
    console.log(api.genesisHash.toHex())
  );

/**
 * will have the home screen an app scrrenn 
 * to lauch home screen will check  the onbaording and wheter we have a key 
 * @returns 
 */




 export  function Home() {

  const [onboardStatus, setOnboardStatus] = useState(null)

  useEffect(()=>{
    async function getValueFor(key) {
      let result = await SecureStore.getItemAsync(key);
      console.log(result)
      setOnboardStatus(result)
      await SplashScreen.hideAsync()
      if (result ){
        setOnboardStatus(result)
        await SplashScreen.hideAsync()
      }
      
    }
    getValueFor('onboardStatus')
  })
   
   if(onboardStatus != `true` || onboardStatus === null ){
      return (
        <SafeAreaProvider>
        <Provider store={store}>
          <OnboardStack/>
        </Provider>
        </SafeAreaProvider>
      )
   }else{
    /**
     * should have drawer and tab navigation
     */
    return (
      <SafeAreaProvider>
      <Provider store={store}>
        <App/>
      </Provider>
      </SafeAreaProvider>
      
    );
   }
  }
  

  /**
   * 
   * @returns 
   */
 
  export function App() {
    return (
      <Tab.Navigator
      tabBarHideOnKeyboard
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-list-circle' : 'ios-list';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown:false,
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
        <Tab.Screen name="Home" component={  AppStack } />
        <Tab.Screen name="Home" component={  SettingStack } />
      </Tab.Navigator>
        
    );
  }

  