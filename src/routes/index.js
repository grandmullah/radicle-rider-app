
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from 'react-native';
import { HomeScreen } from "../screens/HomeScreen";
import { RequestScreen } from "../screens/RequestScreen";


const { Navigator, Screen } = createNativeStackNavigator();

export function AppStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="HomeScreen" options={{headerShown:false}}component={HomeScreen} />
      <Screen name="RequestScreen" options={{headerShown:false}}component={RequestScreen} />
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
