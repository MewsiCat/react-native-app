import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Pressable, Image} from 'react-native';
import Slider from '@react-native-community/slider';
import {
    withAuthenticator,
    useAuthenticator,
} from '@aws-amplify/ui-react-native';
import { Button } from 'react-native-elements';
import { SpotifyAPIController } from "../backend/api/spotifyAPIController";
import { ResponseType, exchangeCodeAsync, useAuthRequest } from "expo-auth-session";
import { Amplify, Auth } from 'aws-amplify';
// import { checkSpotifyConnected } from '../backend/api/amplifyDBFunctions';
import Loading from './Loading.js';
import { Audio } from 'expo-av';
import { TokenResponse, refreshmAsync} from 'expo-auth-session';
import { refreshAsync } from 'expo-auth-session';
import defaultUser from '../assets/default_user.jpg'
import * as Linking from 'expo-linking';

const default_user_uri = Image.resolveAssetSource(defaultUser).uri;






const client_id = "88c17d6f25cc43eaad226930c216ae5b";
const client_secret = "55c8fe6737b44bf39b7671aec4572402";
const redirect_uri = Linking.createURL("/spotify-auth-callback");

async function playSound() {
  const { sound } = await Audio.Sound.createAsync(
    require('../assets/mewsound.mp3')
  );

  await sound.playAsync();
}

const userSelector = (context) => [context.user]

const SignOutButton = () => {
    const { user, signOut } = useAuthenticator(userSelector);
    return (
      <Pressable onPress={signOut} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>
          Sign Out
        </Text>
      </Pressable>
    );
  };

  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };

  var spotifyConnected = false;

  async function updateSpotifyConnected (val) {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const result = await Auth.updateUserAttributes(user, {
        "custom:spotifyConnected"	: val,
      });
      console.log(result); // SUCCESS
    } catch(err) {
      console.log(err);
    }
  };

  export async function getSpotifyConnected(){
    try{
    const currentUserInfo = await Auth.currentUserInfo();
    const spotify_connected = currentUserInfo.attributes["custom:spotifyConnected"];
    console.log("spotify connected: " + spotify_connected);
    if(spotify_connected == "1"){
      spotifyConnected = true;
    }
    else{
      spotifyConnected = false;
    }
    }catch(err) {
      console.log(err);
    } 
}

async function checkTokenStatus(){
    const currentUserInfo = await Auth.currentUserInfo();
    const access_token = currentUserInfo.attributes['custom:spotify_token'];
    const tokenStatus = await isTokenFresh(access_token);
    if(tokenStatus){
      console.log("token fresh");
      return true;
    }
    else{
      console.log("token not fresh");
      return false;
    }
}


async function updateUserAttributes (access_token, refresh_token) {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const result = await Auth.updateUserAttributes(user, {
        "custom:spotify_token" : access_token,
        "custom:refresh_token" : refresh_token
      });
      console.log(result); // SUCCESS
    } catch(err) {
      console.log(err);
    }
  };

  var userName = "";
  var userPic = "";


async function getUser(){
    try{
    const currentUserInfo = await Auth.currentUserInfo();
    const access_token = currentUserInfo.attributes['custom:spotify_token'];
    
    var result = await fetch(
        `https://api.spotify.com/v1/me`,
        {
            method: "GET",
            headers: { Authorization: "Bearer " + access_token },
        },
        )
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            console.log(data.display_name)
            console.log(data.images[0].url)
            userName = data.display_name;
            userPic = data.images[0].url;
        });
    } catch(err) {
        console.log(err);
      } 
}

async function getNewToken(){
  const currentUserInfo = await Auth.currentUserInfo();
  const refresh_token = currentUserInfo.attributes['custom:refresh_token'];
  const codeRes = await refreshAsync(
    {
        clientId: client_id,
        clientSecret: client_secret,
        refreshToken: refresh_token
    },
    discovery
)
  const tokenConfig = codeRes?.getRequestConfig();
  console.log("access token in new token func: " + tokenConfig.accessToken);
  console.log("refresh token in new token func: " + refresh_token);
  updateUserAttributes(tokenConfig.accessToken, refresh_token);
}

async function getToken (code) {
  const codeRes = await exchangeCodeAsync(
      {
          code: code,
          redirectUri: redirect_uri,
          clientId: client_id,
          clientSecret: client_secret
      },
      discovery
    
  )
  const tokenConfig = codeRes?.getRequestConfig();
  console.log("access token: " + tokenConfig.accessToken);
  updateUserAttributes(tokenConfig.accessToken, tokenConfig.refreshToken)
}
export default function Settings() {
    const spotifyController = new SpotifyAPIController();
    const [token, setToken] = useState("");
      const [request, response, promptAsync] = useAuthRequest(
      {
        responseType: ResponseType.Code,
        clientId: "88c17d6f25cc43eaad226930c216ae5b",
        scopes: [
          "user-read-currently-playing",
          "user-read-recently-played",
          "user-read-playback-state",
          "user-top-read",
          "user-modify-playback-state",
          "streaming",
          "user-read-email",
          "user-read-private",
          "user-library-modify",
        ],
        // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
        // this must be set to false
        usePKCE: false,
        // In the future will do this: Linking.createURL("/spotify-auth-callback"), as it changes the IP address depending on your wifi, 
        // also be sure to check the warnings if there are issues before production
        redirectUri: Linking.createURL("/spotify-auth-callback"),
  
      },
      discovery
    );
    //const dispatch = useDispatch();

    useEffect(() => {
      getSpotifyConnected();
      console.log("spotify connected var " + spotifyConnected);
       if(!spotifyConnected){
         if (response?.type === "success") {
          console.log("using auth code");
           const { code } = response.params;
           console.log("code " + code);
           getToken(code);
           updateSpotifyConnected("1");
         }
        }
        else{
          getNewToken();
        }
      }, [response]);
  

      getUser();

      var isLoggedIn = false;
      var logText = "";

      if(userPic == ""){
        userPic = default_user_uri;
      }
    
      if (spotifyConnected) {
        logText = "Logged in as: " + userName;
        isLoggedIn = true;
      } else {
        logText = "Log into Spotify"
        isLoggedIn = false;
      }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <Text style={styles.description}>
                Volume
            </Text>
            <Slider
                style={{width: '80%', height: '80%', alignSelf:'center', padding:50, paddingTop:0}}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#d0a060"
                maximumTrackTintColor="#d0a060"
                thumbTintColor='#783621'
            />

            <Text style={styles.description}>
                Effects
            </Text>
            <Slider
                style={{width: '80%', height: '80%', alignSelf:'center', padding:50, paddingTop:0}}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#d0a060"
                maximumTrackTintColor="#d0a060"
                thumbTintColor='#783621'
            />

            <View style={styles.toBottom}>
                <Pressable style={styles.welcome} onPress={() => {promptAsync(); playSound();}} disabled={isLoggedIn}>
                  <Text style={styles.buttonText}>{logText}</Text>
                  <Image source={{uri: userPic }} style={styles.img}/>
                </Pressable>

                <SignOutButton style={styles.signout} onPress={() => {playSound();}}/>
              
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignSelf: 'center',
        backgroundColor: '#f0d396',
        borderColor:'#d0a060',
        paddingHorizontal: 8,
        borderWidth:2,
        borderRadius: 10,
        width: '90%'
      },
    welcome: {
      alignSelf: 'center',
      flexDirection: 'row',
      backgroundColor: '#f0d396',
      borderColor:'#d0a060',
      paddingHorizontal: 8,
      borderWidth: 2,
      borderRadius: 10,
      width: '90%',
      // padding: 5,
      justifyContent: 'space-evenly'
    },
    container: {
        backgroundColor: '#f0d396',
        padding: 20,
        flexDirection: 'column',
        flex: 1
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#783621',
        alignSelf:'center'
    },
    description: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#783621',
        alignSelf:'center',
        paddingTop: 30
    },
    signout: {
        alignSelf: 'center',
        padding:10
    },
    buttonText: {
        color: '#783621',
        padding: 5,
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf:'center'
    },
    toBottom: {
        gap: 20,
        marginTop: 'auto'
    },
    img: {
      width: 40,
      height: 40,
      borderRadius: 30,
  },
})