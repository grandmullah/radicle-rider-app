import { Alert, StatusBar } from 'react-native';
import React from 'react';

import { Button, Icon } from '@rneui/themed';
import Onboarding from 'react-native-onboarding-swiper';
import { generateMnemonic } from '../Helpers/helpers';

export const Onboard = ({navigation}) => (
  <Onboarding
    showDone={false}
    onSkip={async() => {
      await generateMnemonic()
      navigation.navigate('Registration')
    } }
    pages={[
      {
        title: 'Hey!',
        subtitle: 'Welcome to $App!',
        backgroundColor: '#03353C',
        image: (
          <Icon
            name="hand-peace-o"
            type="font-awesome"
            size={100}
            color="white"
          />
        ),
      },
      {
        title: 'Send Messages',
        subtitle: 'You can reach everybody with us',
        backgroundColor: '#03353C',
        image: (
          <Icon
            name="paper-plane-o"
            type="font-awesome"
            size={100}
            color="white"
          />
        ),
      },
      {
        title: 'Get Notified',
        subtitle: 'We will send you notification as soon as something happened',
        backgroundColor: '#03353C',
        image: (
          <Icon name="bell-o" type="font-awesome" size={100} color="white" />
        ),
      },
      {
        title: "That's Enough",
        subtitle: (
          <Button
            title={'Get Started'}
            containerViewStyle={{ marginTop: 20 }}
            backgroundColor={'white'}
            borderRadius={5}
            textStyle={{ color: '#003c8f' }}
            onPress={async () => {
              await generateMnemonic()
              navigation.navigate('Registration')
            }}
          />
        ),
        backgroundColor: '#449342',
        image: (
          <Icon name="rocket" type="font-awesome" size={100} color="white" />
        ),
      },
    ]}
  />
);

