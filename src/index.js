import{ AppPinStack, AppStack} from './routes'
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
import { View,Button } from 'native-base';

 export function Home() {
    /**
     * should have drawer and tab navigation
     */
    return (
      <AppStack />
    );
  }
 
  export function Setting() {
    return (
   
        // <Drawer.Navigator>
        // <Drawer.Screen name="Home3" component={HomeScreen3} />
        // </Drawer.Navigator>
        <AppPinStack />
     
       
        
    );
  }



  function HomeScreen3({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          onPress={() => navigation.navigate('Notifications')}
          title="Go to notifications"
        />
      </View>
    );
  }
  
  function NotificationsScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button onPress={() => navigation.goBack()} title="Go back home" />
      </View>
    );
  }
  