import{ AppPinStack, AppStack} from './routes'

import { View,Button } from 'native-base';
import * as SecureStore from 'expo-secure-store';

import { store } from './app/store';
import { Provider } from 'react-redux';
import { Onboard } from './components/Onboard/Onboarding';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
// SplashScreen.preventAutoHideAsync();
// navigator.geolocation = require('@react-native-community/geolocation');
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
      if (result != null ){
        setOnboardStatus(result)
        // await SplashScreen.hideAsync()
      }
      
    }
    getValueFor('onboardStatus')
  })
   
   if(onboardStatus != true || onboardStatus === null ){
      return (
        <Onboard/>
      )
   }else{
    /**
     * should have drawer and tab navigation
     */
    return (
      <Provider store={store}>
        <AppStack />
      </Provider>
      
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
        <Tab.Screen name="Home" component={  AppPinStack } />
      </Tab.Navigator>
  
      
     
       
        
    );
  }

  