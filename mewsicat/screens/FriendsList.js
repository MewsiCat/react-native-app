import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback, Button } from 'react-native';
import Playlistbox from '../Components/PlaylistBox.jsx';
import { Amplify, Auth } from 'aws-amplify';
import { API, graphqlOperation } from 'aws-amplify'
import { listUsers, getUser, userByName } from '../src/graphql/queries'


import awsExports from '../src/aws-exports';
Amplify.configure(awsExports);

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

var friendsData;

async function generateFriendsList(){
    try{
    // const [friends, setFriends] = useState([]);
    // const [friendsLength, setFriendsLength] = useState();


    const currentUserInfo = await Auth.currentUserInfo();
    const currentUser = currentUserInfo.username;
  
    const params = {
    name: currentUser
    };
    const result = await API.graphql(graphqlOperation(userByName, params));
    const friendsID = result.data.userByName.items[0].id;
    // setFriends(result.data.userByName.items[0].friends);
    const friends = result.data.userByName.items[0].friends;
    console.log("Friends in friends list " + friends);
    // setFriendsLength(friends.length);
    const friendsLength = friends.length;
    console.log("Friends length: " + friendsLength);
    friendsData = Array.from({ length: friendsLength + 10 }, (_, num) => ({
        image: imagetemp[num],
        artist: friends[num],
        songName: friends[num],
      }));
    } catch(err) {
        console.log(err);
      }
}

export default function FriendsList() {
    const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
    useEffect(() => {
        generateFriendsList();
      }, []);

  
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
                <Playlistbox songs={friendsData} />
              </View>
            </View>
          </Modal>
        </TouchableWithoutFeedback>
        <Button title="Open Playlists" onPress={() => setModalVisible(true)} />
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
  