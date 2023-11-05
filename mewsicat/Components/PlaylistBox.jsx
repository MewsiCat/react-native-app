import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import SongItemInList from '../Components/SongItemInList.jsx';

export default function PlaylistBox({ songs }) {
  const [playlistArtists, setPlaylistArtists] = useState([]);

  const handleInputChange = (value) => {
    // Handle input change if needed
    console.log(value);
  };

  const handleSubmit = () => {
    // Handle submit logic here
    console.log("Submitted");
  };

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={'false'}
        data={songs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <SongItemInList
            number={index + 1}
            image={item.image}
            artist={item.artist}
            songName={item.songName}
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No playlist selected</Text>}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your playlist URL here."
          placeholderTextColor={'#d0a060'}
          onChangeText={handleInputChange}
        />
        <Button title="➪" onPress={handleSubmit} color='#783621' style={styles.button} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: '#783621',
  },
  emptyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#783621',
    textAlign: 'center',
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#783621',
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 15,
    marginLeft: 10,
  },
});
