import { Center, Input, Stack, VStack,Text, Button, KeyboardAvoidingView } from 'native-base';
import React,{useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions,SafeAreaView,Platform} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import PhoneInput from 'react-phone-number-input'
import { wsProvider } from '../..';
 export const RegistrationScreen = () => {
     

    
    const [value, setValue] = useState()
    useEffect(()=>{
        async function save() {
            let r = await SecureStore.getItemAsync('mnemonic');
            console.log(r)
            setValue(r)
        }
        save()
    })
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <Center style={styles.con}>
            
            <VStack w="100%">
                <Center w={'100%'} padding={5}>
                    <Text fontFamily={'monospace'} fontSize={'30'} color={'white'}>{`${value}`}</Text>
                </Center>
                <Center padding={6}>
                    <Input padding='2' variant={'rounded'} color={'black'} backgroundColor={'white'} />
                </Center>
                <Center padding={4}>
                    <Button  size={'md'}>proceed with signup</Button>
                </Center>
                <Text>{value}</Text>
            </VStack>
        </Center>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    con:{
        height:'100%',
        width:Dimensions.get('window').width,
        backgroundColor:"#003c8f"
        
    }
})


