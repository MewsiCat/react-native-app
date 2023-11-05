import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function SongItemInList({ number, image, artist, songName }) {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{number}</Text>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.details}>
        {songName ? (
          <Text style={styles.songName}>{songName}</Text>
        ) : (
          <View style={styles.placeholderSong} />
        )}
        {artist ? (
          <Text style={styles.artist}>{artist}</Text>
        ) : (
          <View style={styles.placeholderArtist} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  number: {
    color: '#783621',
    fontWeight: 'bold',
    fontSize: 18,
    width: 30,
    textAlign: 'center',
  },
  image: {
    width: 56,
    height: 56,
    marginHorizontal: 10,
    borderRadius: 7,
  },
  details: {
    flex: 1,
  },
  songName: {
    color: '#783621',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  artist: {
    color: '#d0a060',
    fontSize: 14,
  },
  placeholderSong: {
    backgroundColor: '#783621',
    borderRadius: 5,
    width: 96,
    height: 20,
    marginBottom: 5,
  },
  placeholderArtist: {
    backgroundColor: '#d0a060',
    borderRadius: 5,
    width: 80,
    height: 16,
  },
});
