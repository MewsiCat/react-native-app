import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback, Button, Dimensions, useWindowDimensions } from 'react-native';
import Playlistbox from '../Components/PlaylistBox.jsx';
import { Amplify, Auth } from 'aws-amplify';
import { API, graphqlOperation } from 'aws-amplify'
import { listUsers, getUser, userByName, getFriend } from '../src/graphql/queries'
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import awsExports from '../src/aws-exports';
import { addFriend } from '../backend/api/amplifyDBFunctions.js';
import Loading from './Loading.js';
import { Overlay } from 'react-native-elements';
import FriendBox from '../Components/FriendBox.jsx';

Amplify.configure(awsExports);

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'pink' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  ),
  friendNotification: ({ text1, props }) => (
    <View style={{
      backgroundColor: 'white',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 25,
      padding: 10,
      paddingHorizontal: 10,
      marginVertical: -20, 
    }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>{text1}</Text>
    </View>
  )

};

const tempMusic = 3;
const imagetemp = [
  "https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg",
  "https://upload.wikimedia.org/wikipedia/en/e/ee/NewJeans_-_Get_Up.png",
  "https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg",
  "https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg",
  "https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg",
  "https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg",
  "https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg",
  "https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg",
  "https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg",
  "https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg",
  "https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg",
  "https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg",
  "https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg",
  "https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg",
  "https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg",
];
const artists = ["New Jeans", "abcdefghigklmnopqrstuvwxyz", "patrick", "addy ", "hajin", "albert", "random name", "long nameeeeeeeeeee", "micahel", "miguel", "tofulati", "jhba;sdf", "kajsbdjasd", "qphnda", "kjbasdubhkjqwn"];
const songNames = [true, false, true, true, false, true, true, false, true, true, false, true];

const songData = Array.from({ length: tempMusic + 10 }, (_, num) => ({
  image: imagetemp[num],
  artist: artists[num],
  songName: songNames[num],
}));

var friendsData;


export async function generateFriendsList(){
    try{
    // const [friends, setFriends] = useState([]);
    // const [friendsLength, setFriendsLength] = useState();
    console.log("beginning of friends list function!");
    const currentUserInfo = await Auth.currentUserInfo();
    const currentUser = currentUserInfo.username;

    const params = {
      name: currentUser
    };
    const userRes = await API.graphql(graphqlOperation(userByName, params));
    const userID = userRes.data.userByName.items[0].id;
    const result = await API.graphql({
      query: getFriend,
      variables: { id: userID }
    });
    // setFriends(result.data.userByName.items[0].friends);

    const friends = userRes.data.userByName.items[0].friends;
    console.log("Friends in friends list " + friends);
    // setFriendsLength(friends.length);
    const friendsLength = friends.items.length;

    console.log("Friends length: " + friendsLength);
    if(friendsLength == undefined){
      friendsLength = 0;
    }
    console.log("generate friends list done!");
    friendsData = Array.from({ length: friendsLength }, (_, num) => ({
      profilePicture: imagetemp[num],
      name: friends.items[num].name,
      active: songNames[num],
    }));
  } catch (err) {
    console.log(err);
  }
}

export default function FriendsList() {
  const [modalVisible, setModalVisible] = useState(true); 

  const [loadVisible, setLoadVisible] = useState(false);

    const toggleLoad = () => {
        setLoadVisible(!loadVisible);
    }

    const toggleLoadFalse = () => {
        setLoadVisible(loadVisible);
    }

  useEffect(async () => {
    toggleLoad();
      await generateFriendsList();
      // await addFriend("beepbop");
    toggleLoadFalse();
  }, []);


  return (
    <View style={styles.container}>
      <Overlay isVisible={loadVisible} onBackdropPress={toggleLoad} overlayStyle={{backgroundColor:'#f0d396', height:'90%', width:'80%', borderRadius: 20}}>
        <Loading />
      </Overlay>
      <View style={styles.playlistContainer}>
        <FriendBox friendlist={friendsData} />
      </View>
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} style={{ zIndex: 1000, elevation: 1000 }} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0d396',
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.875,
  },
  playlistContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f0d396',
    height: '100%',
  }
});
