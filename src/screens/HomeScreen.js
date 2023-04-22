import React,{useState,useEffect,useMemo,useCallback,useRef} from 'react';
import { View, Text,StyleSheet,Dimensions,TextInput,TouchableOpacity} from 'react-native';
import { Box, Center, VStack,Input } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import {MapScreen} from '../components/HomeScreen/MapScreen';
import { useSelector } from 'react-redux';
import BottomSheet from '@gorhom/bottom-sheet';

export  function HomeScreen({navigation}) {
  const [isFocused, setIsFocused] = useState(false);
  const screenHeight = Dimensions.get('window').height;
  const {origin,destination} = useSelector((state) => state.location)
  

    // ref
    const bottomSheetRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['5%', '10%'], []);
  
    // callbacks
    const handleSheetChanges = useCallback((index) => {
      console.log('handleSheetChanges', index);
    }, []);

  

  return (
    <SafeAreaView style={{ flex: 1 }} >
      <VStack  style={{ flex: 1 }} >
       
            <MapScreen origin={origin} destination={destination}  style={{ flex: 1 }}/>
          

      <VStack style={{ flex: 1 }} >
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          >
            <View style={styles.contentContainer}>
              <Text>Awesome 🎉</Text>
            </View>
        </BottomSheet>
      </VStack>
      
      </VStack>
    </SafeAreaView>
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  div: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    elevation: 5,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  // input: {
  //   height: 40,
  //   borderColor: '#ccc',
  //   borderWidth: 1,
  //   borderRadius: 5,
  //   marginVertical: 5,
  //   paddingHorizontal: 10,
  //   backgroundColor: '#f9f9f9',
  //   marginLeft:5
  // },
  container1: {
    flex:1,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
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