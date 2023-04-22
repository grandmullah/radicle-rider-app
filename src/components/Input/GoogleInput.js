

import React from 'react';
import {View, StyleSheet} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GoogleInput = ({focus}) => {
    
    return (
        
        <GooglePlacesAutocomplete
            placeholder='Enter Location1'
            minLength={2}
            autoFocus={false}
            returnKeyType={'default'}
            fetchDetails={false}
            nearbyPlacesAPI='googlePlacesSearch'
            listViewDisplayed={focus}
            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
            }}
            query={{
                key: 'AIzaSyAh11NQ4gsCdBBtNgA-it4oqDsJP6_7-Zo',
                language: 'en',
            }}
            styles={{
                textInputContainer: {
                  height: focus ? undefined : 1,
                },
              }}
            
            
        />
        
    );
}



export default GoogleInput;


// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//     },
//     textInputContainer: {
//       flexDirection: 'row',
//     },
//     textInput: {
//       backgroundColor: '#FFFFFF',
//       height: 44,
//       borderRadius: 5,
//       paddingVertical: 5,
//       paddingHorizontal: 10,
//       fontSize: 15,
//       flex: 1,
//     },
//     poweredContainer: {
//       justifyContent: 'flex-end',
//       alignItems: 'center',
//       borderBottomRightRadius: 5,
//       borderBottomLeftRadius: 5,
//       borderColor: '#c8c7cc',
//       borderTopWidth: 0.5,
//     },
//     powered: {},
//     listView: {},
//     row: {
//       backgroundColor: '#FFFFFF',
//       padding: 13,
//       height: 44,
//       flexDirection: 'row',
//     },
//     separator: {
//       height: 0.5,
//       backgroundColor: '#c8c7cc',
//     },
//     description: {},
//     loader: {
//       flexDirection: 'row',
//       justifyContent: 'flex-end',
//       height: 20,
//     },
//   })