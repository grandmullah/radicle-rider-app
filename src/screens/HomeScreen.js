import React,{useState,useEffect,useMemo,useCallback,useRef} from 'react';
import { View, Text,StyleSheet,Dimensions,TextInput,TouchableOpacity} from 'react-native';
import { Box, Center, VStack,Input,Pressable, Stack, Button } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import {MapScreen} from '../components/HomeScreen/MapScreen';
import { useSelector } from 'react-redux';
import BottomSheet, { BottomSheetFlatList, BottomSheetTextInput,BottomSheetView } from '@gorhom/bottom-sheet';
import axios from 'axios';
import { Avatar } from '@rneui/base';

export  function HomeScreen({navigation}) {
  const [isFocused, setIsFocused] = useState(false);
  const { height } = Dimensions.get('window');
  const {origin,destination,ride,currentLocation} = useSelector((state) => state.location)
  const [rideReady, setRideReady ] = useState(false)
  const API_MAP_KEY = process.env.API_KEY_MAP
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(()=>['10%','20%','30%'], [])
  const [mapHeight, setMapHeight] = useState('90%');



  const handlePress = () => {
    navigation.navigate('RequestScreen');
  };
  const handlebooking = async() => {
    try {
      const jj = {origin:{...origin},destination: {...destination}, ride:{...ride},timestamp:Date.now()}
      console.log('here',origin,)
      const resp = await axios.post('https://41c7-41-80-114-137.ngrok-free.app/request_ride',jj)
      console.log(resp.data)
      // dispatch  waiting 
      
    } catch (error) {
      console.log(error)
    }
    
  }
  const handleSheetChanges = useCallback((index)=>{
    if (index === 0 ) {
      setMapHeight('90%');
    } else if(index === 1 ) {
      setMapHeight('80%');
    }else if(index ===2 ){
      setMapHeight('70%');
    }
  },[])

  const handleRefresh = useCallback(() => {
    console.log("handleRefresh");
  }, []);

  useEffect(()=>{
    const ready = (Object.keys(ride).length != 0 )
    setRideReady(ready)
  },[ride])

  const renderItem = useCallback(({ item }) => {
        const current = currentLocation
    return(
      <Stack marginX={10} padding={2} >
        <Avatar 
        size={32}
        rounded
        title={item.name}
        containerStyle={{ backgroundColor: "blue" }}
        />
        <VStack>
          <Text>{}</Text>
        </VStack>
      </Stack>
    )
      
    });

  // const calc =  (loc,item) =>{
   
      
  //     const origin1 = `${loc.latitude},${loc.longitude}`;
  //     const destination1 = `${item.latitude},${item.longitude}`;
  //     console.log('hapa',origin1,destination1)
  //     return axios.get(
  //       `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin1}&mode=driving&destinations=${destination1}&key=${API_MAP_KEY}`
  //     ).then((resp)=>{
  //       // console.log(resp.data)
  //       if(resp.data.status === 'OK'){
  //         return resp.data.rows[0].elements[0].duration.text
  //       }
  //     }).catch((error)=>{
  //       console.log('error' ,error)
  //     })

  // }

  // calc()

  return (
   
    <VStack style={{ flex: 1,height:height }} alignContent={'center'} >
      
      <View style={{height:mapHeight}}>
        <MapScreen  origin={origin} destination={destination}  />
      </View>
      

      <BottomSheet  refreshing={false}
        onRefresh={handleRefresh} index={0}  
        keyboardBehavior="fillParent"  
        ref={bottomSheetRef} 
        snapPoints={snapPoints} 
        onChange={handleSheetChanges}
      >
       {
        rideReady?
          <BottomSheetFlatList
            data={data}
            keyExtractor={(i) => i.name}
            renderItem={renderItem}
          />
          :
          <Stack w={'100%'} alignContent={'center'}>
            <Center>
              <Pressable w={'100%'} onPress={handlePress}>
              <Text style={styles.input}></Text>
              </Pressable>
            </Center>
          </Stack>
       }
      </BottomSheet>
    </VStack>
  );
}


const styles = StyleSheet.create({
  
  input: {
    padding:5,
    margin:18,
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
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
});
const data = [
  {name:'JD',latitude:-1.233270,longitude:36.882714 },
  {name:'Jk', latitude:-1.233881,longitude:36.884303 },
  {name:'Jl', latitude:-1.232498,longitude:36.883991},
  {name:'Jx', latitude:-1.232927,longitude:36.884228},
  {name:'Jy', latitude:-1.231117,longitude:36.880814}
]
   
    //   <Box style={{flex:1, backgroundColor:'white', borderColor:'black', borderTopEndRadius:5,
    //   borderTopLeftRadius:5 ,height:height*0.15}}>
      
    //   <Center padding={5} alignContent={'center'}>
    //   {rideReady? 
    //     <BottomSheet snapPoints={snapPoints} >
    //     </BottomSheet>
    //   :
    //     <Stack w={'100%'} alignContent={'center'}>
    //       <Center>
    //         <Pressable w={'100%'} onPress={handlePress}>
    //         <Text style={styles.input}></Text>
    //         </Pressable>
    //       </Center>
    //     </Stack>
    //   }


    //  </Center>
      // </Box>


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