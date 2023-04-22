import{ AppPinStack, AppStack} from './routes'

import { View,Button } from 'native-base';

import { store } from './app/store';
import { Provider } from 'react-redux';

// navigator.geolocation = require('@react-native-community/geolocation');

 export function Home() {
    /**
     * should have drawer and tab navigation
     */
    return (
      <Provider store={store}>
        <AppStack />
      </Provider>
      
    );
  }
 
  export function Setting() {
    return (
  
        <AppPinStack />
     
       
        
    );
  }

  