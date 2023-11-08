import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Pressable, Image} from 'react-native';
import Slider from '@react-native-community/slider';
import {
    withAuthenticator,
    useAuthenticator,
} from '@aws-amplify/ui-react-native';
import { Button } from 'react-native-elements';
import { SpotifyAPIController } from "../backend/api/spotifyAPIController";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { Amplify, Auth } from 'aws-amplify';
import { checkSpotifyConnected } from '../backend/api/amplifyDBFunctions';
import Loading from './Loading.js';
import { Audio } from 'expo-av';

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
  
  async function updateUserAttributes (access_token) {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const result = await Auth.updateUserAttributes(user, {
        "custom:spotify_token" : access_token
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

export default function Settings() {
    const spotifyController = new SpotifyAPIController();
    //const dispatch = useDispatch();
    const [token, setToken] = useState("");
    const [request, response, promptAsync] = useAuthRequest(
      {
        responseType: ResponseType.Token,
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
        ],
        // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
        // this must be set to false
        usePKCE: false,
        // In the future will do this: Linking.createURL("/spotify-auth-callback"), as it changes the IP address depending on your wifi, 
        // also be sure to check the warnings if there are issues before production
        redirectUri: "exp://localhost:19002/--/spotify-auth-callback", 
  
      },
      discovery
    );

    useEffect(() => {
        if (response?.type === "success") {
          const { access_token } = response.params;
          console.log(access_token);
          updateUserAttributes(access_token);
          spotifyController.getUser(access_token);
          setToken(access_token);
        }
      }, [response]);

      getUser();

      var isLoggedIn = false;
      var logText = "";
    
      if (checkSpotifyConnected) {
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
                <Pressable style={styles.welcome} onPress={() => {promptAsync(); playSound();}}>
                  <Text style={styles.buttonText}>{logText}</Text>
                  <Image source={{uri: userPic}} style={styles.img}/>
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