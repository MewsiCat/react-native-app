import Playlistbox from "../Components/PlaylistBox.jsx";
import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';

const tempMusic = 3;
const imagetemp = [
  "https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg",
  "https://upload.wikimedia.org/wikipedia/en/e/ee/NewJeans_-_Get_Up.png",
  "https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg",
];
const artists = ["New Jeans", "New Jeans", "New Jeans"];
const songNames = ["Hypeboy", "Super Shy", "Asdas"];

const songData = Array.from({ length: tempMusic + 10 }, (_, num) => ({
  image: imagetemp[num],
  artist: artists[num],
  songName: songNames[num],
}));

export default function Playlist() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Playlists</Text>
        </View>
        <View style={styles.playlistContainer}>
          <Playlistbox songs={songData} />
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
    },
    header: {
      alignItems: 'center',
      marginTop: 30,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#1ed760',
    },
    playlistContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 20,
    },
  });
  