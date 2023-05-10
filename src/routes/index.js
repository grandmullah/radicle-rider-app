
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { HomeScreen } from "../screens/HomeScreen";
import { RequestScreen } from "../screens/RequestScreen";
import { Onboard } from "../components/Onboard/Onboarding";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const { Navigator, Screen } = createNativeStackNavigator();

export function AppStack() {
 

  const isLargeScreen = Dimensions.width >= 768;
  return (
    <Tab.Navigator  useLegacyImplementation defaultStatus="open"
    screenOptions={{
      drawerType: isLargeScreen ? 'permanent' : 'back',
      drawerStyle: isLargeScreen ? null : { width: '40%' },
      overlayColor: 'transparent',
    }}>
      <Tab.Screen name="HomeScreen" options={{headerShown:false}} component={HomeScreen} />
      <Screen name="RequestScreen" options={{headerShown:false}} component={RequestScreen} />
    </Tab.Navigator>
  );
}
export function OnboardStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Onboard" options={{headerShown:false}} component={Onboard} />
      <Screen name="HomeScreen" options={{headerShown:false}} component={AppStack} />
      
    </Navigator>
  );
}
export function AppPinStack() {
  //App starts from pin screen if already signed in and exited the app
  return (
    <Navigator screenOptions={{ headerShown: false }} >
      <Screen name="settings"  component={SettingsScreen} />
    
    </Navigator>
  );
}







// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home!</Text>
//     </View>
//   );
// }

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

// export default { AppStack, AppPinStack };
