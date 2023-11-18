import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Pressable, Image} from 'react-native';
import { Button } from 'react-native-elements';
import { SpotifyAPIController } from "../backend/api/spotifyAPIController";
import { ResponseType, exchangeCodeAsync, useAuthRequest } from "expo-auth-session";
import { Auth } from 'aws-amplify';
import { refreshAsync } from 'expo-auth-session';
import * as Linking from 'expo-linking';
import GenerateCats from './GenerateCats';

const client_id = "88c17d6f25cc43eaad226930c216ae5b";
const client_secret = "55c8fe6737b44bf39b7671aec4572402";
const redirect_uri = Linking.createURL("/spotify-auth-callback");

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

const SpotifyLogin = ({ navigation }) => {
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

    const check = spotifyConnected;

  return check == false ? (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "white",
          marginBottom: "20%",
        }}
      >
        top song player
      </Text>
      <Button
        title="Login with Spotify"
        style={styles.button}
        onPress={() => {
          promptAsync();
        }}
      />
      <View style={{ height: 100 }} />
    </View>
  ) : (<GenerateCats/>);
};

export default SpotifyLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },

  button: {
    width: 200,
    marginTop: 50,
  },
});