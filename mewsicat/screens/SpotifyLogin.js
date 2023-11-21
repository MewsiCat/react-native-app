import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Pressable, Image} from 'react-native';
import { Button } from 'react-native-elements';
import { SpotifyAPIController } from "../backend/api/spotifyAPIController";
import { ResponseType, exchangeCodeAsync, useAuthRequest } from "expo-auth-session";
import { Auth } from 'aws-amplify';
import { refreshAsync } from 'expo-auth-session';
import * as Linking from 'expo-linking';
import GenerateCats from './GenerateCats';
import { updateSpotifyConnected, getSpotifyConnected, updateUserAttributes, getNewToken, getToken } from '../backend/api/amplifyDBFunctions';
import * as Font from 'expo-font';
import Loading from './Loading';
import { Overlay } from 'react-native-elements';

const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };

const SpotifyLogin = ({ navigation }) => {
    const spotifyController = new SpotifyAPIController();
    const [token, setToken] = useState("");
    const [loadVisible, setLoadVisible] = useState(false);

    const toggleLoad = () => {
        setLoadVisible(!loadVisible);
    }

    const toggleLoadFalse = () => {
        setLoadVisible(loadVisible);
    }

    const [spotifyConnected, setSpotifyConnected] = useState(false);
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
  async function loadFont(){
    try{
      const fontRes = await Font.loadAsync({
        'Creamy-Sugar': require('../assets/fonts/RustyHooks.ttf'),
      });
      console.log(fontRes);
    } catch(err){
      console.log(err);
    }
  }


    useEffect(() => {
        async function fetchData(){
          await loadFont();
          const res = await getSpotifyConnected();
          if(res == true){
            setSpotifyConnected(!spotifyConnected);
          }
          console.log("spotify connected var " + spotifyConnected);
          if(!spotifyConnected){
              if (response?.type === "success") {
              console.log("using auth code");
              const { code } = response.params;
              console.log("code " + code);
              getToken(code);
              updateSpotifyConnected("1");
              setSpotifyConnected(!spotifyConnected);
              }
          }
          else{
              getNewToken();
          }
        }
        fetchData();
    }, [response]);
  
  console.log("spotifyConnected: " + spotifyConnected);
  return spotifyConnected == false ? (
    <View style={styles.container}>
      <Overlay isVisible={loadVisible} overlayStyle={{backgroundColor:'#f0d396', height:'90%', width:'80%', borderRadius: 20}}>
                <Loading />
            </Overlay>
        <View style={styles.stuff}>
          <Image source={require('../assets/welcome.gif')} style={styles.img} />
          <View style={styles.alertBox}>
              <Text style={styles.alertText} >
                    Mewsicat requires you to login to Spotify for its full capabilities.
                    Please click on the button below to get started.
              </Text>
          </View>
          <Pressable style={styles.button} onPress={async () => {toggleLoad(); await promptAsync(); toggleLoadFalse();}}>
            <Text style={styles.spotifyText}>
                Login with Spotify
            </Text>
          </Pressable>
        </View>
    </View>
  ) : (<GenerateCats/>);
};

export default SpotifyLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#debf85',
    justifyContent: "center",
    width: '100%',
    height: '100%',
  },
  stuff: {
    width: '90%',
    height: '90%',
    backgroundColor: '#f0d396',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 20
  },
  spotifyText: {
    alignSelf: 'center',
    color: 'white',
    padding: 10,
    fontFamily: 'Creamy-Sugar'
  },
  button: {
    width: '70%',
    backgroundColor: '#1ed760',
    alignSelf: 'center',
    borderRadius: 20
  },
  alertBox: {
    width: '100%',
    borderRadius: 40,
    alignSelf: 'center',
    margin: 30
  },
  alertText: {
    padding: 10,
    color: '#783621',
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'Creamy-Sugar'
  },
  img: {
    width: '100%',
    height: '30%',
    padding: 50,
    borderRadius: 30
  }
});