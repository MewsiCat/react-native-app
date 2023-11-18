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


import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
  SafeAreaView,
} from 'react-native';

import { API, graphqlOperation } from 'aws-amplify'
import { createUser, updateUser, deleteUser } from '../src/graphql/mutations'
import { listUsers, getUser, userByName } from '../src/graphql/queries'

import { currentUserInfo, getSpotifyToken, addFriend, createUserInDB, checkUser, checkFriend, listFriends, checkFirstTimeUser } from '../backend/api/amplifyDBFunctions'

import {
  withAuthenticator,
  useAuthenticator,
  Authenticator,
  useTheme
} from '@aws-amplify/ui-react-native';

Amplify.configure(awsExports);

const Stack = createStackNavigator();


export default function Home(){

    const [firstTimeUser, setFirstTimeUser] = useState(true);

    useEffect(() => {
        async function fetchData(){
            const check = await checkFirstTimeUser();
            console.log(check);
            if(check == false){
                setFirstTimeUser(false);
            }
        }
        fetchData();
    }, [])
    return firstTimeUser == true ? (<NavigationContainer>


        <Stack.Navigator initialRouteName="GrayScreen" screenOptions={{header: (props) => <CustomHeader {...props} />,}}>
          {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
          <Stack.Screen name="GrayScreen" component={GrayScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="Modules" component={Modules} />
        </Stack.Navigator>
      </NavigationContainer>) : (<SpotifyLogin/>);
}