import React,{useState,useEffect,useMemo,useCallback,useRef} from 'react';
import { View, Text,StyleSheet,Dimensions,TextInput,TouchableOpacity} from 'react-native';
import { Box, Center, VStack,Input,Pressable, Stack, Button } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import {MapScreen} from '../components/HomeScreen/MapScreen';
import { useSelector } from 'react-redux';
import BottomSheet, { BottomSheetTextInput,BottomSheetView } from '@gorhom/bottom-sheet';
import axios from 'axios';

export  function HomeScreen({navigation}) {
  const [isFocused, setIsFocused] = useState(false);
  const { height } = Dimensions.get('window');
  const {origin,destination,ride} = useSelector((state) => state.location)
  const [rideReady, setRideReady ] = useState(false)

  const handlePress = () => {
    navigation.navigate('RequestScreen');
  };
  const handlebooking = async() => {
    try {
      const jj = {origin:{...origin},destination: {...destination}, ride:{...ride},timestamp:Date.now()}
      console.log('here',jj)
      const resp = await axios.post('https://41c7-41-80-114-137.ngrok-free.app/request_ride',jj)
      console.log(resp.data)
      // dispatch  waiting 
      
    } catch (error) {
      console.log(error)
    }
    
  }

  useEffect(()=>{
    const ready = (Object.keys(ride).length != 0 )
    setRideReady(ready)
  },[ride])

  return (
    <SafeAreaView style={{ flex: 1 }} > 
    <VStack style={{ flex: 1,height:height }} alignContent={'center'} >
      <Box  h={height*0.8}>
        
        <MapScreen  origin={origin} destination={destination}  />
      </Box>
      <Box style={{flex:1, backgroundColor:'white', borderColor:'black', borderTopEndRadius:5,
      borderTopLeftRadius:5 ,height:height*0.15}}>
      
      <Center padding={5} alignContent={'center'}>
      {rideReady? 
        <Center alignItems={'center'} alignContent={'center'}>
        <Stack>
        </Stack>
        <Button onPress={handlebooking}>book Ride</Button>
      </Center>
      :
        <Stack w={'100%'} alignContent={'center'}>
          <Center>
            <Pressable w={'100%'} onPress={handlePress}>
            <Text style={styles.input}></Text>
            </Pressable>
          </Center>
        </Stack>
      }


     </Center>
      </Box>

      </VStack>
    </SafeAreaView>
    
  );
}


const styles = StyleSheet.create({
  
  input: {
    padding:5,
    margin:8,
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
  },
  topLeft: {
    flex:1,
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 10,
    backgroundColor: 'white',
  },
  topRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'white',
  },
  content: {
  
    justifyContent: 'center',
    alignItems: 'center',
  },
});


  //  const handleFocus = () => {
  //   setIsFocused(true);
  // };

  // const handleBlur = () => {
  //   setIsFocused(false);
  // }; 
  // console.log(isFocused)
  // const [panResponder, setPanResponder] = useState(
  //   PanResponder.create({
  //     onMoveShouldSetPanResponderCapture: () => true,
  //     // onPanResponderMove: (evt, gestureState) => {
  //     //   if (gestureState.dy > 0) {
  //     //     setHeight(Math.max(MIN_HEIGHT, MAX_HEIGHT - gestureState.dy));
  //     //   }
  //     // },
  //     onPanResponderRelease: (evt, gestureState) => {
  //       if (gestureState.dy > 0 && gestureState.vy > 1) {
  //         setIsFocused(false);
  //         setHeight(screenHeight * 0.1);
  //       } else {
  //         setHeight(screenHeight );
  //       }
  //     },
  //   })
  // );

  // useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener(
  //     'keyboardDidShow',
  //     () => {
  //       setIsFocused(true)
  //     }
  //   );
  //   const keyboardDidHideListener = Keyboard.addListener(
  //     'keyboardDidHide',
  //     () => {
  //       setIsFocused(false)
  //     }
  //   );
  //   return () => {
  //     keyboardDidShowListener.remove();
  //     keyboardDidHideListener.remove();
  //   };
  // }, []);
  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     () => {
  //       setIsFocused(false);
  //       return true;
  //     }
  //   );
  //   return () => {
  //     backHandler.remove();
  //   };
  // }, []);