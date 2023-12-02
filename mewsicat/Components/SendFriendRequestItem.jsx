import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { acceptFriendRequest, addFriend } from '../backend/api/amplifyDBFunctions';
import Loading from '../screens/Loading';
import { Overlay } from 'react-native-elements';
import { sendFriendRequest } from '../backend/api/amplifyDBFunctions.js';


export default function SongItemInList({ profilePicture, name, active }) {
  const [isActive, setIsActive] = useState(active);

  const [loadVisible, setLoadVisible] = useState(false);

    const toggleLoad = () => {
        setLoadVisible(!loadVisible);
    }

    const toggleLoadFalse = () => {
        setLoadVisible(loadVisible);
    }
    const sendRequest = async () => {
        toggleLoad();
        await sendFriendRequest(name);
        toggleLoadFalse();
      };

  return (
    <View style={styles.container}>

      {/* Image */}
      <Image source={{ uri: profilePicture }} style={styles.image} />

      {/* User Name */}
      <Text style={styles.userName}>
        {name.length > 10 ? `${name.substring(0, 9)}...` : name}
      </Text>

      <Overlay isVisible={loadVisible} onBackdropPress={toggleLoad} overlayStyle={{backgroundColor:'#f0d396', height:'90%', width:'80%', borderRadius: 20}}>
        <Loading />
      </Overlay>

      {/* Send Music Button */}
      <TouchableOpacity style={styles.sendMusicButton}>
        <AntDesign name={"adduser"} size={24} style={styles.iconStyle}/>
        <Text style={styles.sendMusicButtonText} onPress={sendRequest}>Add Friend</Text>
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
    // fontWeight: 'bold',
    fontSize: 20,
  },
  sendMusicButton: {
      backgroundColor: '#f0d396',
      borderColor:'#d0a060',
      paddingHorizontal: 8,
      borderWidth:2,
      borderRadius: 10,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    
  },
  sendMusicButtonText: {
    color: '#783621',
    fontWeight: '600',
  },
});
