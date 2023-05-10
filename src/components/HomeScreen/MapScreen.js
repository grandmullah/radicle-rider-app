import React, { useEffect, useState } from 'react';
import { View, Text,StyleSheet,Dimensions } from 'react-native';
import MapView ,{Marker, PROVIDER_GOOGLE}from 'react-native-maps';
import { mapStyle } from '../../globals/mapStyle';
import { VStack ,Center,Image} from 'native-base';
import * as Location from 'expo-location';
import { carsAround } from '../../globals/data';
import MapViewDirections from 'react-native-maps-directions';
import { colors,parameters } from '../../globals/styles';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateRide } from '../../app/features/locationSlice';
/**
 * A screen component that displays a map with cars around it.
 * @returns A JSX element that displays the map and cars around it.
 */
export  function MapScreen({origin,destination}) {
  const { width, height } = Dimensions.get('window');
  const dispatch = useDispatch()
  const API_MAP_KEY = process.env.API_KEY_MAP
  console.log('key', API_MAP_KEY)
  
  const [dirReady, setReady] = useState(false)

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

  const map = useRef(null)
  useEffect(()=>{ 
    
    getLocation()
    const ready = (Object.keys(origin).length != 0 && Object.keys(destination).length != 0 )
    console.log(ready)
    setReady(ready)
  },[origin,destination])
  return (
    <View style={{ flex: 1 }}>
    <View  style={styles.topLeft}>
    <Text style={styles.content}>rtt</Text>
    </View>
            <Center>
            
                <MapView style={{width: '100%',
                  height: '100%',}}

                  provider={PROVIDER_GOOGLE}
                  customMapStyle={mapStyle}
                  showsUserLocation
                  followsUserLocation 
                  zoomControlEnabled
                  ref={map}
                  initialRegion={{...carsAround[0],latitudeDelta:0.008,longitudeDelta:0.008}}
                  >
                  {carsAround.map((item,index)=>
                    <Marker  coordinate={item} key={index.toString()}  > 
                      <Image  source={require('../../../assets/carMarker.png')} style={styles.carsAround} alt='just this r' />
                    </Marker>
                  )}

                  {dirReady &&
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
                  {dirReady  &&
                    <MapViewDirections
                      origin={origin}
                      destination={destination}
                      language='en'
                      strokeWidth={4}
                      strokeColor={colors.blue}
                      apikey={API_MAP_KEY}
                      timePrecision='now'
                      mode='DRIVING'
                      onReady={result => {
                        console.log(`Distance: ${result.distance} km`)
                        console.log(`Duration: ${result.duration} min.,${result.fares},${result.waypointOrder}`)

          
                        map.current.fitToCoordinates(result.coordinates, {
                          edgePadding: {
                            right: (width / 20),
                            bottom: (height / 20),
                            left: (width / 20),
                            top: (height / 20),
                          }
                        });
                        dispatch(updateRide({
                          Distance:result.distance,
                          Duration:result.duration
                        }))
                      }}
                    />
                  } 
                </MapView>
        
            </Center>
        

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

})

