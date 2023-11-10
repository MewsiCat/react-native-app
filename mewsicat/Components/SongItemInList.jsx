import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';


export default function SongItemInList({ profilePicture, name, active }) {
  const [isActive, setIsActive] = useState(active);
  const handleActiveIndicatorPress = () => {
    setIsActive(!isActive);
    Toast.show({
      type: 'friendNotification',
      position: 'bottom',
      text1: `${!isActive ? 'Unmuted recommendation' : 'Muted recommendation'}`,
      text1Style: {
        fontSize: 15,
      },
      visibilityTime: 1200,
    });
  };


  return (
    <View style={styles.container}>

      {/* Image */}
      <Image source={{ uri: profilePicture }} style={styles.image} />

      {/* User Name */}
      <Text style={styles.userName}>
        {name.length > 18 ? `${name.substring(0, 16)}...` : name}
      </Text>

      {/* Notification indicator */}
      <TouchableOpacity onPress={handleActiveIndicatorPress}>
        <MaterialCommunityIcons
          name={isActive ? "fish" : "fish-off"}
          size={24}
          // color={isActive ? '#00ff00' : '#ff0000'}
          style={styles.activeIndicator}
        />
      </TouchableOpacity>

      {/* Send Music Button */}
      <TouchableOpacity style={styles.sendMusicButton}>
        <Text style={styles.sendMusicButtonText}>Send</Text>
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
    fontWeight: 'bold',
  },
  sendMusicButton: {
      backgroundColor: '#f0d396',
      borderColor:'#d0a060',
      paddingHorizontal: 8,
      borderWidth:2,
      borderRadius: 10,
    
  },
  sendMusicButtonText: {
    color: '#783621',
    fontWeight: '600',
  },
});
