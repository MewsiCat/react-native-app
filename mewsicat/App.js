// import React, { useState, useRef } from 'react';
import { SpotifyAPIController } from "./backend/api/spotifyAPIController";
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { StyleSheet, View, PanResponder, Animated, Image, Button, Text } from 'react-native';
import GrayScreen from './screens/GrayScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import React, {useEffect, useState} from 'react';
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
import { createUser, updateUser, deleteUser } from './src/graphql/mutations'
import { listUsers, getUser, userByName } from './src/graphql/queries'

import { currentUserInfo, getSpotifyToken, addFriend, createUserInDB, checkUser } from './backend/api/amplifyDBFunctions'

import {
  withAuthenticator,
  useAuthenticator,
} from '@aws-amplify/ui-react-native';

import { Amplify, Auth } from 'aws-amplify';
import awsExports from './src/aws-exports';
Amplify.configure(awsExports);

const spotifyController = new SpotifyAPIController();


// retrieves only the current value of 'user' from 'useAuthenticator'
const userSelector = (context) => [context.user]

const SignOutButton = () => {
  const { user, signOut } = useAuthenticator(userSelector);
  return (
    <Pressable onPress={signOut} style={styles.buttonContainer}>
      <Text style={styles.buttonText}>
        Hello, {user?.username}! Click here to sign out!
      </Text>
    </Pressable>
  );
};
// const initialFormState = {name: '', description: ''};


const Stack = createStackNavigator();

const App = () => {

  const [spotifyToken, setSpotifyToken] = useState("");


  useEffect(() => {
    //getSpotifyToken();
    checkUser();
    addFriend("babeboop");
    //updateFriends();
  }, []);
  
  // const [formState, setFormState] = useState(initialFormState);
  //handleSignUp();
  //console.log(currentUserInfo());
  //getSpotifyToken();
  //console.log("Spotify token!: " + spotifyToken);
  //spotifyController.getUser(spotifyToken);
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="GrayScreen" component={GrayScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container2}>

    <View style={styles.container2}>
      <SignOutButton />
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button
        onPress={() => {
          navigation.navigate('GrayScreen');
        }}
        title="Press Me"
      />
      <Button
        onPress={() => {
          navigation.navigate('LoginScreen');
        }}
        title="Beepbap"
      />
    </View>
    </SafeAreaView>

  );
}

export default withAuthenticator(App);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#785',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grayContainer: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchCircle: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container2: {width: 400, flex: 1, padding: 20, alignSelf: 'center'},
  todo: {marginBottom: 15},
  input: {backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18},
  todoName: {fontSize: 20, fontWeight: 'bold'},
  buttonContainer: {
    alignSelf: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 8,
  },
  buttonText: {color: 'white', padding: 16, fontSize: 18},
});

