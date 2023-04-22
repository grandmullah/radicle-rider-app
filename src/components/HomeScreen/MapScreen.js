import React, { useEffect } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import MapView ,{Marker, PROVIDER_GOOGLE}from 'react-native-maps';
import { mapStyle } from '../../globals/mapStyle';
import { VStack ,Center,Image} from 'native-base';
import * as Location from 'expo-location';
import { carsAround } from '../../globals/data';
import MapViewDirections from 'react-native-maps-directions';
import { colors,parameters } from '../../globals/styles';
/**
 * A screen component that displays a map with cars around it.
 * @returns A JSX element that displays the map and cars around it.
 */
export  function MapScreen({origin,destination}) {

  const getLocation = async () => {

    let { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) {
        console.log('rgrant permisoi',granted,)
        const permission = Location.useForegroundPermissions()
        console.log(permission)
        // setErrorMsg('Permission to access location was denied');
        return permission;

      }

      let {coords} = await Location.getCurrentPositionAsync({});
      // setLocation(location);
      console.log(coords)
  }
  useEffect(()=>{
    getLocation()
  })
  return (
    <View style={{ flex: 1 }}>
        <VStack>
            <Center>
        
                <MapView style={{width: '100%',
                  height: '100%',}}

                  provider={PROVIDER_GOOGLE}
                  customMapStyle={mapStyle}
                  showsUserLocation
                  followsUserLocation 
                  zoomControlEnabled
                  initialRegion={{...carsAround[0],latitudeDelta:0.008,longitudeDelta:0.008}}
                  >
                  {carsAround.map((item,index)=>
                    <Marker  coordinate={item} key={index.toString()}  > 
                      <Image  source={require('../../../assets/carMarker.png')} style={styles.carsAround} alt='just this r' />
                    </Marker>
                  )}

                  {Object.keys(origin).length != 0 &&
                    <Marker coordinate={origin} anchor = {{x:0.5,y:0.5}}>
                      <Image 
                        source={require('../../../assets/location.png')}
                        alt='location'
                        style={styles.markerOrigin2}
                      />
                    </Marker>
                  } 
                  {Object.keys(destination).length != 0 &&
                    <Marker coordinate={destination} anchor = {{x:0.5,y:0.5}}>
                      <Image 
                        source={require('../../../assets/location.png')}
                        alt='location'
                        style={styles.markerOrigin2}
                      />
                    </Marker>
                  } 
                  {Object.keys(origin).length != 0 &&
                    <MapViewDirections
                      origin={origin}
                      destination={destination}
                      language='en'
                      strokeWidth={4}
                      strokeColor={colors.blue}
                      apikey={'AIzaSyAh11NQ4gsCdBBtNgA-it4oqDsJP6_7-Zo'}
                      timePrecision='now'
                      mode='DRIVING'
                      onReady={result => {
                        console.log(`Distance: ${result.distance} km`)
                        console.log(`Duration: ${result.duration} min.`)
          
                        
                      }}
                    />
                  } 
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
    markerOrigin2: {
      width: 20,
      height:20,
      borderRadius:10
     },
})