import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import SongItemInList from '../Components/SongItemInList.jsx';
import RequestListItem from '../Components/RequestListItem.jsx';
import RemoveListItem from '../Components/RemoveListItem.jsx';
import SendFriendRequestItem from '../Components/SendFriendRequestItem.jsx';
import { Ionicons } from '@expo/vector-icons';
import AddOverlay from '../screens/AddOverlay.js';
import { Amplify, Auth } from 'aws-amplify';
import { API, graphqlOperation } from 'aws-amplify'
import { Overlay } from 'react-native-elements';
import { sendFriendRequest } from '../backend/api/amplifyDBFunctions.js';
import { listUsers, getUser, userByName } from '../src/graphql/queries'

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

export async function generateAllUsersList() {
  try {

    const currentUserInfo = await Auth.currentUserInfo();
    const currentUser = currentUserInfo.username;
    console.log(currentUser);
    const result = await API.graphql(graphqlOperation(listUsers));
    const users = result.data.listUsers.items;
    console.log("All users: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" + users);
    return users.map(user => ({
      profilePicture: user.profilePicture,
      name: user.name,
      active: user.activeStatus, 
    }));
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function generateFriendRequestsList(){
  try{
  // const [friends, setFriends] = useState([]);
  // const [friendsLength, setFriendsLength] = useState();

  const currentUserInfo = await Auth.currentUserInfo();
  const currentUser = currentUserInfo.username;
  console.log("current user " + currentUser);

  const params = {
    name: currentUser
  };
  const result = await API.graphql(graphqlOperation(userByName, params));
  const friendsID = result.data.userByName.items[0].id;
  // setFriends(result.data.userByName.items[0].friends);
  var friendRequests = result.data.userByName.items[0].friendRequests;
  if(friendRequests == null){
    friendRequests = 0;
  }
  console.log("FriendRequests list " + friendRequests);
  // setFriendsLength(friends.length);
  var friendRequestsLength = friendRequests.length;
  if (friendRequestsLength == null) {
    friendRequestsLength = 0;
  }

  return Array.from({ length: friendRequestsLength }, (_, num) => ({
    profilePicture: imagetemp[num],
    name: friendRequests[num],
    active: songNames[num],
  }));
} catch (err) {
  console.log(err);
  return [];
}
}

export default function PlaylistBox({ friendlist }) {
  const [searchText, setSearchText] = useState('');
  const [addOverlayVisible, setAddOverlayVisible] = useState(false);
  const [loadVisible, setLoadVisible] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [friendRequestsData, setFriendRequestsData] = useState([]);


  useEffect(() => {    
    const fetchUsers = async () => {
      const users = await generateAllUsersList();
      setAllUsers(users);
    };
    fetchUsers();

    const fetchFriendRequests = async () => {
      const requests = await generateFriendRequestsList();
      setFriendRequestsData(requests);
    };

    fetchFriendRequests();
  }, []);

  const toggleAddOverlay = () => {
    setAddOverlayVisible(!addOverlayVisible);
  }

  const filteredFriends = searchText
    ? friendlist.filter(friend =>
      friend.name.toLowerCase().includes(searchText.toLowerCase())
    )
    : friendlist;

  const filteredAdd = searchText
  ? allUsers.filter(user =>
      user.name.toLowerCase().includes(searchText.toLowerCase())
    )
  : allUsers;


  const toggleLoad = () => {
    setLoadVisible(!loadVisible);
  }

  const toggleLoadFalse = () => {
    setLoadVisible(loadVisible);
  }


  const handleInputChange = (value) => {
    setSearchText(value);
  };

  const handleSubmit = async () => {
    switch (activeTab) {
      case 'add':
        const newFriend = searchText;
        console.log("Friend added: ", searchText);
        toggleLoad();
        await sendFriendRequest(newFriend);
        toggleLoadFalse();
      case 'remove':
        console.log("Search submitted for: ", searchText);
      case 'requests':
        console.log("Search submitted for: ", searchText);
      default:
        console.log("Search submitted for: ", searchText);
    }
  };

  const toggleTab = (tab) => {
    setActiveTab(activeTab === tab ? 'all' : tab);
  };

  const [activeTab, setActiveTab] = useState('all');
  const getFlatList = () => {
    switch (activeTab) {
      case 'add':
        return <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredAdd}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <SendFriendRequestItem
              profilePicture={item.profilePicture}
              name={item.name}
              active={item.active}
            />
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>search up your friends name or username</Text>}
        />
      case 'remove':
        return <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredFriends}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <RemoveListItem
              profilePicture={item.profilePicture}
              name={item.name}
              active={item.active}
            />
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No friends found</Text>}
        />
      case 'requests':
        return <FlatList
          showsVerticalScrollIndicator={false}
          data={friendRequestsData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <RequestListItem
              profilePicture={item.profilePicture}
              name={item.name}
              active={item.active}
            />
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No friends found</Text>}
        />
      default:
        return <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredFriends}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <SongItemInList
              profilePicture={item.profilePicture}
              name={item.name}
              active={item.active}
            />
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No friends found</Text>}
        />
    }
  };

  const RedDot = () => {
    if (friendRequestsData.length < 1) return null;
    return (
      <View style={styles.redDotNotify}>
        <Text style={{color:"white"}}>{friendRequestsData.length}</Text>
      </View>
    );
  };

  const getPlaceholderForSearchBar = () => {
    switch (activeTab) {
      case 'add':
        return "Enter friend's username...";
      case 'remove':
        return "Search a friend to remove.. ";
      case 'requests':
        return "No friend requests";
      default:
        return "Search a friend ..";
    }
  };

  return (
    <View style={styles.container}>
      {/* Search bar at the top */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder= {getPlaceholderForSearchBar()}
          placeholderTextColor={'#d0a060'}
          onChangeText={handleInputChange}
          value={searchText}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.searchButton}>
          <Ionicons name="ios-search" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.horizontalLine} />
      {getFlatList()}
      <View style={styles.horizontalLine} />
      <View style={styles.buttonsContainer}>
        <Overlay isVisible={addOverlayVisible} onBackdropPress={toggleAddOverlay} overlayStyle={{ height: '90%', backgroundColor: '#f0d396', paddingBottom: 30, borderRadius: 20 }}>
          <AddOverlay />
          {/* <Loading /> */}
        </Overlay>
        <TouchableOpacity
          style={[styles.button, activeTab === 'add' && styles.activeButton]}
          onPress={() => toggleTab('add')}
        >
          <Text adjustsFontSizeToFit={true} style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, activeTab === 'remove' && styles.activeButton]}
          onPress={() => toggleTab('remove')}
        >
          <Text adjustsFontSizeToFit={true} style={styles.buttonText}>Remove</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, activeTab === 'requests' && styles.activeButton]}
          onPress={() => toggleTab('requests')}
        >
          <Text adjustsFontSizeToFit={true} style={styles.buttonText}>Requests</Text>
        </TouchableOpacity>
        <RedDot/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: '#783621',
  },
  redDotNotify: {
    position: 'absolute',
    right: "2%",
    marginTop: 3,
    backgroundColor: 'red',
    borderRadius: 30,
    paddingHorizontal:6,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#783621',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'Creamy-Sugar'
  },
  inputContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#783621',
    marginRight: 10,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 7,
    backgroundColor: '#f0d396',
    borderColor: '#d0a060',
    paddingHorizontal: 8,
    borderWidth: 2,
    borderRadius: 20,
    maxHeight: 40,
    maxWidth: 100,
  },
  buttonText: {
    color: '#783621',
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Creamy-Sugar'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 7,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 30,
  },
  searchButton: {
    backgroundColor: '#783621',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalLine: {
    borderBottomColor: '#783621',
    borderBottomWidth: 1,
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#d0a060', // Example active button color
  },
});
