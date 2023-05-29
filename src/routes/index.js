
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { HomeScreen } from "../screens/HomeScreen";
import { RequestScreen } from "../screens/RequestScreen";
import { Onboard } from "../components/Onboard/Onboarding";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RegistrationScreen } from "../components/Onboard/registrationScreen";
import { Icon } from '@rneui/themed';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const { Navigator, Screen } = createNativeStackNavigator();

export function AppStack() {
 
  const isLargeScreen = Dimensions.width >= 768;
  return (

    <Tab.Navigator
      tabBarHideOnKeyboard
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'info'
              : 'info';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'info' : 'info';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        headerShown:false,
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
        <Tab.Screen name="Home" component={  HomeScreens } />
        <Tab.Screen name="Home2" component={  SettingStack } />
      </Tab.Navigator>
  );
}
export function OnboardStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Onboard" options={{headerShown:false}} component={Onboard} />
      <Screen name="Registration" component={RegistrationScreen} options={{headerShown:false}} />
      <Screen name="HomeScreen" options={{headerShown:false}} component={AppStack} />
      
    </Navigator>
  );
}
export function SettingStack() {
  //App starts from pin screen if already signed in and exited the app
  return (
    <Navigator screenOptions={{ headerShown: false }} >
      <Screen name="settings"  component={SettingsScreen} />
    
    </Navigator>
  );
}

export function HomeScreens () {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="HomeScreen" options={{headerShown:false}} component={HomeScreen} />
      <Screen name="RequestScreen" options={{headerShown:false}} component={RequestScreen} />
    </Navigator>
  )

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
