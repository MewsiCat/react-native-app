// import React, { useState, useRef } from 'react';
import { SpotifyAPIController } from "./backend/api/spotifyAPIController";
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { StyleSheet, View, PanResponder, Animated, Image, Button, Text } from 'react-native';
import GrayScreen, { getUserCat } from './screens/GrayScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import CustomHeader from './Components/CustomHeader.jsx'

// Splash Screen Stuff
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import FriendsList from "./screens/FriendsList.js";
import PlaylistButton from "./screens/Playlist.js";

import { generateFriendsList } from "./screens/FriendsList.js";

import { Audio } from 'expo-av';
import blackCatImage from './assets/blackcat.jpg'; 
import { useFonts } from "expo-font";
import { I18n } from "aws-amplify";


import Modules, { updateCat, updateUserCat } from './screens/Modules.js';

import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
  SafeAreaView,
  ImageBackground,
} from 'react-native';

import { API, graphqlOperation } from 'aws-amplify'
import { createUser, updateUser, deleteUser } from './src/graphql/mutations'
import { listUsers, getUser, userByName } from './src/graphql/queries'

import { currentUserInfo, getSpotifyToken, addFriend, createUserInDB, checkUser, checkFriend, listFriends, getSpotifyConnected, checkTokenStatus } from './backend/api/amplifyDBFunctions'

import {
  withAuthenticator,
  useAuthenticator,
  Authenticator,
  useTheme,
  defaultDarkModeOverride,
  ThemeProvider
} from '@aws-amplify/ui-react-native';

import { useColorScheme } from 'react-native';

import { Image } from "react-native-elements";

import { Amplify, Auth } from 'aws-amplify';
import awsExports from './src/amplifyconfiguration.json';
import { generateSong } from "./screens/MusicRec.js";
import { generateFriendRequestsList } from "./screens/FriendRequestsList.js";
import Home from "./screens/Home.js";
import { SignIn } from "@aws-amplify/ui-react-native/dist/Authenticator/Defaults/index.js";
Amplify.configure(awsExports);

// SplashScreen.preventAutoHideAsync();

const spotifyController = new SpotifyAPIController();


// retrieves only the current value of 'user' from 'useAuthenticator'
const userSelector = (context) => [context.user]

const SignOutButton = () => {
  const { user, signOut } = useAuthenticator(userSelector);
  return (
    <Pressable onPress={signOut} style={styles.buttonContainer}>
      <Text style={styles.buttonText} >
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

I18n.putVocabulariesForLanguage('en', {
  'Sign In' : 'Sign In',
  'Sign in': 'Log in', // Button label
  'Sign in to your account': 'Welcome Back!',
  'Username': 'bruh',
  Username: 'Enter your username', // Username label
  Password: 'Enter your password', // Password label
  'Forgot your password?': 'Reset Password',
});

const MyAppHeader = () => {
  const {
    tokens: { space, fontSizes },
  } = useTheme();
  return (
    <View padding={space.large}>
        <Text style={{ fontSize: fontSizes.xxxl, color: "#783621", textAlign: "center", fontFamily: 'Creamy-Sugar'}}>
        Mewsicat!
      </Text>
      </View>
  );
};
const MySignInHeader = () => {
  const {
    tokens: { space, fontSizes },
  } = useTheme();
  return(
    <View padding={space.large}>
      <Text style={{fontSize: fontSizes.xxl, color: "#783621", textAlign: "center", fontFamily: 'Creamy-Sugar'}}>Login!</Text>
    </View>
  );
}

const MySignUpHeader = () => {
  const {
    tokens: { space, fontSizes },
  } = useTheme();
  return(
    <View padding={space.large}>
      <Text style={{fontSize: fontSizes.xxl, color: "#783621", textAlign: "center", fontFamily: 'Creamy-Sugar'}}>Create an account!</Text>
    </View>
  );
}

// SplashScreen.preventAutoHideAsync();

const App = () => {

  const [spotifyToken, setSpotifyToken] = useState("");

  const [sound, setSound] = React.useState();
  const [firstTimeUser, setFirstTimeUser] = useState(true);
  const colorMode = useColorScheme();

  async function loadFont(){
    try{
      console.log("starting font res");
      const fontRes = await Font.loadAsync({
        'Creamy-Sugar': require('./assets/fonts/RustyHooks.ttf'),
      });
      console.log("result below: ");
      console.log(fontRes);
    } catch(err){
      console.log(err);
    }
  }

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( require('./assets/mewsound.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }
  const {
    tokens: { colors },
  } = useTheme();

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await loadFont();
        await playSound();
        await getBGM();
        playBGM();
        await checkUser();
        await generateFriendRequestsList();
        await generateFriendsList();
        await updateUserCat();
        await getSpotifyConnected();
        await checkTokenStatus();
        await getUserCat();
        console.log("setup done!");
        //generateSong();
        // addFriend("bbbbbb");
        listFriends();
        checkFriend("bbbbbb");
        //updateFriends();
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        //await new Promise(resolve => setTimeout(resolve, 10000));
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


  const Myimage = () =>{
    <ImageBackground
      source={blackCatImage}
    >
    </ImageBackground>

  }

  // if (!fontsLoaded && !fontError) {
  //   return null;
  // }
  
  
  // const [formState, setFormState] = useState(initialFormState);
  //handleSignUp();
  //console.log(currentUserInfo());
  //getSpotifyToken();
  //console.log("Spotify token!: " + spotifyToken);
  //spotifyController.getUser(spotifyToken);
  return(
    <ThemeProvider
      colorMode={colorMode}
      theme={{
        tokens: {
          colors: {
            brand: {
              primary: {
                10: '{colors.pink.10}',
                20: '{colors.pink.20}',
                40: '{colors.pink.40}',
                60: '{colors.pink.60}',
                80: '{colors.pink.80}',
                90: '{colors.pink.90}',
                100: '{colors.pink.100}',
              },
            },
          },
          fontFamily: 'Creamy-Sugar'
        },
      }}>
    <Authenticator.Provider>
    <Authenticator components={{
      SignUp: (props) => (
        <Authenticator.SignUp {...props} style={{fontFamily: 'Creamy-Sugar'}}Header={MySignUpHeader}/>
      ),
      SignIn: (props) => (
        // will render only on the SignIn subcomponent
        <Authenticator.SignIn {...props} Header={MySignInHeader} style={{fontColor: "#783621"}}/>
      ),}}Container={(props) => (
          // reuse default `Container` and apply custom background
          <Authenticator.Container
            {...props}
            style={{ backgroundColor: "#f0d396", fontFamily: 'Creamy-Sugar'
            }}
          />
        )}
        // will render on every subcomponent
        Header={MyAppHeader}
      >
      <Home />
    </Authenticator>

    </Authenticator.Provider>
    </ThemeProvider>
    
  );
}

export default App;


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

