import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback, Button } from 'react-native';
import Playlistbox from '../Components/PlaylistBox.jsx';

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

export default function PlaylistButton() {
    const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.header}>
                <Text style={styles.title}>Your Playlists</Text>
              </View>
              <View style={styles.playlistContainer}>
                <Playlistbox songs={songData} />
              </View>
            </View>
          </Modal>
        </TouchableWithoutFeedback>
        <Button title="Open Playlists" onPress={() => {setModalVisible(true); click()}} />
      </View>
    );
}
  
  
  const styles = StyleSheet.create({
    container: {

      backgroundColor: 'black',
    },
    header: {
      alignItems: 'center',
    //   marginTop: 30,
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
    modalContainer: {
        flex: 1,
        backgroundColor: 'black',
        // marginTop: 50, 
        // marginBottom: 50, 
        // marginLeft: 20, 
        // marginRight: 20,
        // borderRadius: 20,
      },
  });
  