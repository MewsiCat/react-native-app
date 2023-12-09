import { StatusBar } from "expo-status-bar";
import { SpotifyAPIController } from "../backend/api/spotifyAPIController";
import * as Linking from 'expo-linking';

import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, Text } from "react-native";
import { Button, Image } from "react-native-elements";
import { useEffect, useState } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { Amplify, Auth } from 'aws-amplify';
import { Audio } from 'expo-av';

// import { useSelector, useDispatch } from "react-redux";
//import * as tokenAction from "../store/actions/token";
// import axios from "axios";
// import * as songAction from "../store/actions/topSongs";

async function click() {
  const { sound } = await Audio.Sound.createAsync(
    require('../assets/pisseim-mund-online-audio-converter.mp3')
  );

  await sound.playAsync();
}

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

const LoginScreen = ({ navigation }) => {
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

//   useEffect(() => {
//     if (token) {
//       axios("https://api.spotify.com/v1/me/top/tracks?time_range=short_term", {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + token,
//         },
//       })
//         .then((response) => {
//           dispatch(songAction.addTopSongs(response));
//         })
//         .catch((error) => {
//           console.log("error", error.message);
//         });

//       setTimeout(
//         () =>
//           navigation.replace("Home", {
//             token: token,
//             other: "blaaaa",
//           }),
//         500
//       );

//       dispatch(tokenAction.addToken(token));
//     }
//   });

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
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
          click();
        }}
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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