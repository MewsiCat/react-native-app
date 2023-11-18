// import React, { useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { StyleSheet, View, PanResponder, Animated, Image, Button, Text } from 'react-native';
import GrayScreen from './GrayScreen.js';
import LoginScreen from './LoginScreen.js';
import CustomHeader from '../Components/CustomHeader.jsx'
import SpotifyLogin from './SpotifyLogin.js';
import Modules from './Modules.js';
import React from 'react';
import { Amplify} from 'aws-amplify';
import awsExports from '../src/aws-exports';


Amplify.configure(awsExports);

const Stack = createStackNavigator();

export default function Home(){
    const check = false;
    return check == true ? (<NavigationContainer>
        <Stack.Navigator initialRouteName="GrayScreen" screenOptions={{header: (props) => <CustomHeader {...props} />,}}>
          {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
          <Stack.Screen name="GrayScreen" component={GrayScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="Modules" component={Modules} />
        </Stack.Navigator>
      </NavigationContainer>) : (<SpotifyLogin/>);
}