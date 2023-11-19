import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { acceptFriendRequest, addFriend, sendFriendRequest } from '../backend/api/amplifyDBFunctions';
import Loading from '../screens/Loading';
import { Overlay } from 'react-native-elements';
import MusicRec from '../screens/MusicRec';
import { sendSong } from '../backend/api/amplifyDBFunctions';
import SongPlayer from '../screens/SongPlayer';

import { Auth } from 'aws-amplify';

import { pauseBGM, toggleBGM } from '../App';
import { Audio } from 'expo-av';
import { generateSong } from '../screens/SongPlayer';

var soundPlaying;
const sound = new Audio.Sound()

export async function getSongPrev(musicRecURI){
  try{
  const currentUserInfo = await Auth.currentUserInfo();
    const access_token = currentUserInfo.attributes['custom:spotify_token'];
    // console.log("access token: " + access_token);
    // console.log("top tracks " + topTracks);
    // console.log("top artists: "  + topArtists);
    var result = await fetch(
        `https://api.spotify.com/v1/tracks/${musicRecURI}`,
        {
            method: "GET",
            headers: { Authorization: "Bearer " + access_token },
        },
        )
        .then((res) => res.json())
        .then((data) => {
            //console.log(data);
            // console.log(data.tracks[0].name)
            // console.log(data.tracks[0].artists[0].name)
            // console.log(data.tracks[0].album.images[0].url)
            // console.log(data.tracks[0].preview_url)
            songPrev = data.preview_url;
        });
        await sound.unloadAsync();
        await sound.loadAsync({
            uri: songPrev
        })
        // console.log("top artist: " + topArtists);
    
      } catch(err){
        console.log(err);
      }
}

export async function playPauseSong() {
  if(soundPlaying == false){
      await sound.playAsync();
      soundPlaying = true;
  }
  else if(soundPlaying == true){
      await sound.pauseAsync();
      soundPlaying = false;
  }
}


export default function FriendSongItemInList({ profilePicture, name, active, musicRecURI }) {
  const [isActive, setIsActive] = useState(active);

  const [loadVisible, setLoadVisible] = useState(false);
  const [recVisible, setRecVisible] = useState(false);

  useEffect(() => {
    soundPlaying = false;
  }, []);

  const toggleRec = () => {
    setRecVisible(!recVisible);
  }

    const toggleLoad = () => {
        setLoadVisible(!loadVisible);
    }

    const toggleLoadFalse = () => {
        setLoadVisible(loadVisible);
    }

  const handleActiveIndicatorPress = () => {
    setIsActive(!isActive);
    Toast.show({
      type: 'friendNotification',
      position: 'bottom',
      text1: `${!isActive ? 'Unmuted recommendation' : 'Muted recommendation'}`,
      text1Style: {
        fontSize: 15,
      },
      visibilityTime: 1200,
    });
  };


  return (
    <View style={styles.container}>

      {/* Image */}
      <Image source={{ uri: profilePicture }} style={styles.image} />

      {/* User Name */}
      <Text style={styles.userName}>
        {name.length > 18 ? `${name.substring(0, 16)}...` : name}
      </Text>

      {/* Notification indicator */}
      <TouchableOpacity onPress={handleActiveIndicatorPress}>
        <MaterialCommunityIcons
          name={isActive ? "fish" : "fish-off"}
          size={24}
          // color={isActive ? '#00ff00' : '#ff0000'}
          style={styles.activeIndicator}
        />
      </TouchableOpacity>

      <Overlay isVisible={loadVisible} onBackdropPress={toggleLoad} overlayStyle={{backgroundColor:'#f0d396', height:'90%', width:'80%', borderRadius: 20}}>
        <Loading />
      </Overlay>
      <Overlay isVisible={recVisible} onBackdropPress={toggleRec} overlayStyle={{backgroundColor:'#f0d396', height:'90%', width:'80%', borderRadius: 20}}>
                <SongPlayer musicRecURI={active}/>
            </Overlay>

      {/* Send Music Button */}
      <TouchableOpacity style={styles.sendMusicButton}>
        <Text style={styles.sendMusicButtonText} onPress={async () =>{toggleLoad(); console.log(active); await generateSong(active); toggleLoadFalse(); toggleRec();}}>Play!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between', 
  },
  activeIndicator: {
    marginRight: 10, 
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8, 
  },
  userName: {
    flex: 1, 
    marginLeft: 10, 
    color: '#783621',
    fontWeight: 'bold',
  },
  sendMusicButton: {
      backgroundColor: '#f0d396',
      borderColor:'#d0a060',
      paddingHorizontal: 8,
      borderWidth:2,
      borderRadius: 10,
    
  },
  sendMusicButtonText: {
    color: '#783621',
    fontWeight: '600',
  },
});
