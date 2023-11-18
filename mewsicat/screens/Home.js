// import React, { useState, useRef } from 'react';
import { SpotifyAPIController } from "../backend/api/spotifyAPIController";
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { StyleSheet, View, PanResponder, Animated, Image, Button, Text } from 'react-native';
import GrayScreen from './GrayScreen.js';
import LoginScreen from './LoginScreen.js';
import CustomHeader from '../Components/CustomHeader.jsx'

// Splash Screen Stuff
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import FriendsList from "./FriendsList.js";
import PlaylistButton from "./Playlist.js";

import { getSpotifyConnected } from "./Settings.js";
import { generateFriendsList } from "./FriendsList.js";

import { Audio } from 'expo-av';


import Modules from './Modules.js';

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

import { currentUserInfo, getSpotifyToken, addFriend, createUserInDB, checkUser, checkFriend, listFriends } from '../backend/api/amplifyDBFunctions'

import {
  withAuthenticator,
  useAuthenticator,
  Authenticator,
  useTheme
} from '@aws-amplify/ui-react-native';

import { Amplify, Auth } from 'aws-amplify';
import awsExports from '../src/aws-exports';
import { generateSong } from "./MusicRec.js";
import { generateFriendRequestsList } from "./FriendRequestsList.js";
Amplify.configure(awsExports);

const Stack = createStackNavigator();

export default function Home(){
    const check = true;
    return check == true ? (<NavigationContainer>

        <Stack.Navigator initialRouteName="GrayScreen" screenOptions={{header: (props) => <CustomHeader {...props} />,}}>
          {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
          <Stack.Screen name="GrayScreen" component={GrayScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="Modules" component={Modules} />
        </Stack.Navigator>
      </NavigationContainer>) : (<Text>lol nah</Text>);
}