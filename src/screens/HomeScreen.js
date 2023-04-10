import React from 'react';
import { View, Text } from 'react-native';
import { Box, Center, VStack } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import {MapScreen} from '../components/HomeScreen/MapScreen';

export  function HomeScreen() {
  return (
    <SafeAreaView>
        <Box>

          <MapScreen />
        </Box>
    </SafeAreaView>
    
  );
}
