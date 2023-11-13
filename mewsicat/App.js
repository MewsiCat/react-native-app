// import React, { useState, useRef } from 'react';
import { SpotifyAPIController } from "./backend/api/spotifyAPIController";
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { StyleSheet, View, PanResponder, Animated, Image, Button, Text } from 'react-native';
import GrayScreen from './screens/GrayScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import CustomHeader from './Components/CustomHeader.jsx'

// Splash Screen Stuff
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import FriendsList from "./screens/FriendsList.js";
import PlaylistButton from "./screens/Playlist.js";

import { getSpotifyConnected } from "./screens/Settings.js";
import { generateFriendsList } from "./screens/FriendsList.js";

import { Audio } from 'expo-av';


import Modules from './screens/Modules.js';

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
import { createUser, updateUser, deleteUser } from './src/graphql/mutations'
import { listUsers, getUser, userByName } from './src/graphql/queries'

import { currentUserInfo, getSpotifyToken, addFriend, createUserInDB, checkUser, checkFriend, listFriends } from './backend/api/amplifyDBFunctions'

import {
  withAuthenticator,
  useAuthenticator,
} from '@aws-amplify/ui-react-native';

import { Amplify, Auth } from 'aws-amplify';
import awsExports from './src/aws-exports';
import { generateSong } from "./screens/MusicRec.js";
import { generateFriendRequestsList } from "./screens/FriendRequestsList.js";
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

const bgmSound = new Audio.Sound();

async function getBGM(){
  await bgmSound.loadAsync(require('./assets/spring-time.wav'))
  console.log("get bgm done.")
}

export async function playBGM(){
  await bgmSound.setVolumeAsync(0.1);
  await bgmSound.playAsync();
  await bgmSound.setIsLoopingAsync(true);
}

export async function pauseBGM(){
    await bgmSound.pauseAsync();
}

const App = () => {

  const [spotifyToken, setSpotifyToken] = useState("");

  const [sound, setSound] = React.useState();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( require('./assets/mewsound.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        await checkUser();
        getSpotifyConnected();
        await generateFriendRequestsList();
        await generateFriendsList();
        await getBGM();
        playBGM();
        playSound();
        //generateSong();
        // addFriend("bbbbbb");
        listFriends();
        checkFriend("bbbbbb");
        //updateFriends();
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  
  
  // const [formState, setFormState] = useState(initialFormState);
  //handleSignUp();
  //console.log(currentUserInfo());
  //getSpotifyToken();
  //console.log("Spotify token!: " + spotifyToken);
  //spotifyController.getUser(spotifyToken);
  return (
    
    <NavigationContainer>

      <Stack.Navigator initialRouteName="GrayScreen" screenOptions={{header: (props) => <CustomHeader {...props} />,}}>
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        <Stack.Screen name="GrayScreen" component={GrayScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Modules" component={Modules} />
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
      <Button 
        onPress={() => {
          navigation.navigate('Modules');
        }}
        title="Modules"
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

