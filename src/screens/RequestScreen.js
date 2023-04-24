import React,{useEffect, useRef,useState} from 'react';
import {View, Text,StyleSheet, Dimensions,ToastAndroid,PermissionsAndroid,Platform,Linking,Alert} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from 'native-base';
import { colors,parameters } from '../globals/styles';
import { useDispatch } from 'react-redux';
import { updateOrigin,updateDestination } from '../app/features/locationSlice';
// import Geolocation from '@react-native-community/geolocation';



export const RequestScreen = ({navigation}) => {
    const[destination,setDestination] = useState(false)
    const dispatch = useDispatch()
    const API_MAP_KEY = process.env.API_KEY_MAP

    // useEffect(()=>{
    //     Geolocation.getCurrentPosition(info => console.log(info));

    // })

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff', padding: 20, marginTop:10}}>
            <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>
                Where are you going?
            </Text>
            
            {destination === false &&  
                <GooglePlacesAutocomplete
                    placeholder="Enter pickup location"
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(details.geometry.location);
                        dispatch(updateOrigin({
                            latitude:details.geometry.location.lat,
                            longitude:details.geometry.location.lng,
                            address:details.formatted_address,
                            name:details.name
                        }))
                        setDestination(true)
                    }}
                    enablePoweredByContainer = {false}
                    currentLocationLabel='Current location'
                    autoFocus ={true}
                    minLength ={2}
                    fetchDetails ={true}
                    // currentLocation ={true}
                    nearbyPlacesAPI = 'GooglePlacesSearch'
                    query={{
                        key: API_MAP_KEY,
                        language: 'en',
                        components: 'country:ke',
                    }}
                    styles = {autoComplete}
                />
            }
            {destination === true && 
                <GooglePlacesAutocomplete
                    placeholder="Enter destination"
                    enablePoweredByContainer = {false}
                    onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                        console.log(data, details.geometry);
                        dispatch(updateDestination({
                            latitude:details.geometry.location.lat,
                            longitude:details.geometry.location.lng,
                            address:details.formatted_address,
                            name:details.name
                        }))
                        navigation.navigate('HomeScreen')
                    }}
                    autoFocus ={true}
                    minLength ={2}
                    fetchDetails ={true}
                    nearbyPlacesAPI = 'GooglePlacesSearch'
                    query={{
                        key: API_MAP_KEY,
                        language: 'en',
                        components: 'country:ke',
                    }}
                    styles = {autoComplete}
                /> 
            }

           
         
        
      </SafeAreaView>
    );
  };
  
  const autoComplete = {
    
    textInput:{
        backgroundColor: colors.grey6,
        height: 50,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 15,
        flex: 1,
        borderWidth:1,
        marginHorizontal:15,
    },
    container: {
       paddingTop:20,
      flex: 1,
      backgroundColor:colors.white
          },
  
    textInputContainer: {
      flexDirection: 'row',
    },

}