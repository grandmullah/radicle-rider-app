
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from "react";
import { NativeBaseProvider, Box,extendTheme } from "native-base";
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler'
import {store} from './src/app/store'
 

import { Home } from './src';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';


// const Tab = createBottomTabNavigator();


export default function App() {
  // const mnemonicAlice = mnemonicGenerate();
  // const seedAlice = mnemonicToMiniSecret(mnemonicAlice);

  // // Generate new public/secret keypair for Alice from the supplied seed
  // const { publicKey, secretKey } = ed25519PairFromSeed(seedAlice);
  // console.log(publicKey)
/**
 * check i fkey is existing 
 * if yes take to app stack
 * else take to onboarding 
 */
const theme = extendTheme({
  components: {

    TextArea: {
      // Can pass also function, giving you access theming tools
      baseStyle: ({ colorMode }) => {
        return {
          color: colorMode === 'dark' ? 'red.300' : 'blue.300',
          fontWeight: 'normal',
        };
      },
    },
  },
});

  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer >
            {<Home />}
          </NavigationContainer>
        </GestureHandlerRootView>
      </Provider>
    </NativeBaseProvider>
  );
}


