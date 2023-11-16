import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import SongItemInList from './SongItemInList.jsx';
import { Ionicons } from '@expo/vector-icons';
import AddOverlay from '../screens/AddOverlay.js';
import { Overlay } from 'react-native-elements';
import FriendItemInList from './FriendItemInList.jsx';


export default function FriendBox({ friendlist }) {
  const [searchText, setSearchText] = useState('');
  const [addOverlayVisible, setAddOverlayVisible] = useState(false);

  const toggleAddOverlay = () => {
    setAddOverlayVisible(!addOverlayVisible);
}

  const filteredFriends = searchText
    ? friendlist.filter(friend =>
      friend.name.toLowerCase().includes(searchText.toLowerCase())
    )
    : friendlist;


  const handleInputChange = (value) => {
    setSearchText(value);
  };

  const handleSubmit = () => {
    console.log("Search submitted for: ", searchText);
  };

  return (
    <View style={styles.container}>
      {/* Search bar at the top */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search a friend..."
          placeholderTextColor={'#d0a060'}
          onChangeText={handleInputChange}
          value={searchText}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.searchButton}>
          <Ionicons name="ios-search" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.horizontalLine} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredFriends}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <FriendItemInList
            profilePicture={item.profilePicture}
            name={item.name}
            active={item.active}
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No friends found</Text>}
      />
      <View style={styles.horizontalLine}/>
      <View style={styles.buttonsContainer}>
      <Overlay isVisible={addOverlayVisible} onBackdropPress={toggleAddOverlay} overlayStyle={{height:'90%', backgroundColor:'#f0d396', paddingBottom: 30, borderRadius: 20}}>
            <AddOverlay />
            {/* <Loading /> */}
        </Overlay>
        <TouchableOpacity style={styles.button} onPress={toggleAddOverlay}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Remove')}>
          <Text style={styles.buttonText}>Remove</Text>
        </TouchableOpacity>
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
  emptyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#783621',
    textAlign: 'center',
    marginVertical: 20,
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
    paddingHorizontal: 20,
    marginHorizontal: 30,
    backgroundColor: '#f0d396',
      borderColor:'#d0a060',
      paddingHorizontal: 8,
      borderWidth:2,
      borderRadius: 30,
  },
  buttonText: {
    color: '#783621',
    fontSize: 16,
    fontWeight: 'bold',
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
});
