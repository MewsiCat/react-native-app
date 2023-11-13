import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import SongItemInList from '../Components/SongItemInList.jsx';
import { Ionicons } from '@expo/vector-icons';
import { sendFriendRequest } from '../backend/api/amplifyDBFunctions.js';
import { Overlay } from 'react-native-elements';
import Loading from './Loading.js';


export default function AddOverlay (){{

    const [searchText, setSearchText] = useState('');
    console.log("addoverlay being rendered");

    const [loadVisible, setLoadVisible] = useState(false);

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
        const newFriend = searchText;
        console.log("Friend added: ", searchText);
        toggleLoad();
        await sendFriendRequest(newFriend);
        toggleLoadFalse();
      };
    return (
        <View style={styles.container}>
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
            <View style={styles.horizontalLine}/>
      <Overlay isVisible={loadVisible} onBackdropPress={toggleLoad} overlayStyle={{backgroundColor:'#f0d396', height:'90%', width:'80%', borderRadius: 20}}>
        <Loading />
      </Overlay>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Remove')}>
          <Text style={styles.buttonText}>Remove</Text>
        </TouchableOpacity>
      </View>
        </View>
    );
}}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // padding: 20,
      borderRadius: 10,
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