import React, { useEffect } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import MapView ,{Marker, PROVIDER_GOOGLE}from 'react-native-maps';
import { mapStyle } from '../../globals/mapStyle';
import { VStack ,Center,Image} from 'native-base';
import * as Location from 'expo-location';
import { carsAround } from '../../globals/data';

export  function MapScreen() {
  // const checkPermissions =  async () => {
  //   const {status} = await Location.requestForegroundPermissionsAsync()
  //   if(status !== 'granted'){
  //     // const permision 
  //   }

  // }
  // const askPermision = () =>{

  // }
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('rgrant permisoi')
        // setErrorMsg('Permission to access location was denied');
        return;
      }

      let {coords} = await Location.getCurrentPositionAsync({});
      // setLocation(location);
      console.log(coords)
  }
  useEffect(()=>{
    getLocation()
  })
  return (
    <View>
        <VStack>
            <Center>
        
                <MapView style={{width: '100%',
                height: '90%',}}
                provider={PROVIDER_GOOGLE}
                customMapStyle={mapStyle}
                showsUserLocation
                followsUserLocation 
                initialRegion={{...carsAround[0],latitudeDelta:0.008,longitudeDelta:0.008}}
                >
                {carsAround.map((item,index)=>
                  <Marker size={'xs'} coordinate={item} key={index.toString()} image={require('../../../assets/carMarker.png')} style ={styles.carsAround}/>
                )}
                </MapView>
        
            </Center>
        </VStack>
     </View>
  );
}

const styles = StyleSheet.create({
  carsAround: {
    width: 28,
    height: 14,
    
    }, 
})