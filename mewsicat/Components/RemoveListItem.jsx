import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { removeFriend } from '../backend/api/amplifyDBFunctions';
import Loading from '../screens/Loading';
import { Overlay } from 'react-native-elements';


export default function SongItemInList({ profilePicture, name, active }) {
  const [isConfirmMode, setIsConfirmMode] = useState(false);
  const slideAnim = useRef(new Animated.Value(-100)).current; // Initial value for right: -100 (off-screen)

  const toggleConfirmMode = () => {
    setIsConfirmMode(!isConfirmMode);
  }

  const handleRemovePress = () => {
    setIsConfirmMode(true);
    Animated.timing(slideAnim, {
      toValue: -10, 
      duration: 100,
      useNativeDriver: false,
    }).start();
    console.log(isConfirmMode);
  };

  const handleConfirmRemoval = async () => {
    console.log("trying remove")

    setIsConfirmMode(false);
    slideAnim.setValue(-100);
  
    try {
      console.log("trying remove")
      await removeFriend(name);
      console.log("Friend removed successfully");
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  const handleOutsidePress = () => {
    console.log("cancel confimration")

    if (isConfirmMode) {
      setIsConfirmMode(false);
      slideAnim.setValue(-100); // Resetting the animation to start position
    }
  };
  return (
    <View style={styles.container}>
      <View style={[styles.innerContainer, isConfirmMode && styles.confirmMode]}>
        {/* Image */}
        <Image source={{ uri: profilePicture }} style={styles.image} />

        {/* User Name */}
        <Text style={[styles.userName, isConfirmMode && styles.confirmModeText]}>
          {name.length > 14 ? `${name.substring(0, 13)}...` : name}
        </Text>

        {/* Remove Button */}
        {!isConfirmMode && (
          <TouchableOpacity onPress={handleRemovePress} style={styles.removeButton}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        )}
        {/* Touchable area for exiting confirmation mode */}
        {isConfirmMode && (
        <View style={styles.overlayContainer}>
          <TouchableOpacity style={styles.overlay} onPress={handleOutsidePress} activeOpacity={1} />
        </View>
      )}

        {/* Slide-in Confirm Button with Trash Icon */}
        {isConfirmMode && (
          <Animated.View style={[styles.slideInView, { right: slideAnim }]}>
            <TouchableOpacity onPress={handleConfirmRemoval} style={styles.confirmButton}>
              <Ionicons name="trash-bin-outline" size={24} color="white" />
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
    backgroundColor: '#f0d396', // Normal background
  },
  confirmMode: {
    backgroundColor: '#d0a060', // Dark background for confirmation mode
  },
  confirmModeText: {
    color: '#f0d396', // Text color for confirmation mode
  },
  confirmButton:{
    // flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    backgroundColor: '#d0a060',
    borderColor: '#f0d396',
    paddingHorizontal: 8,
    borderWidth: 2,
    borderRadius: 20,
  },
  trashcanIcon: {
    position: 'absolute',
    top: 10, // Adjust as needed
    // right: 0, // Start off-screen
  },
  slideInView: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    // Adjust these as per your design
  },
  confirmButtonText:{
      color: '#f0d396',
      fontSize: 16,
      fontWeight: 'bold',
    
  },
  cancelButton:{
    // flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 7,
    backgroundColor: '#f0d396',
    borderColor: '#d0a060',
    paddingHorizontal: 8,
    borderWidth: 2,
    borderRadius: 20,
  },
  cancelButtonText:{
    buttonText: {
      color: '#783621',
      fontSize: 16,
      fontWeight: 'bold',
    },
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
  removeButton: {
      backgroundColor: '#f0d396',
      borderColor:'#d0a060',
      paddingHorizontal: 8,
      borderWidth:2,
      borderRadius: 10,
    
  },
  removeButtonText: {
    color: '#783621',
    fontWeight: '600',
  },
  confirmOverlay: {
    backgroundColor: '#f0d396',
    width: '80%',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  confirmText: {
    fontSize: 18,
    marginBottom: 20,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'flex-end', // Align the overlay to the right
    justifyContent: 'center',
  },
  overlay: {
    flex: 1, 
    width:300,
    backgroundColor: 'transparent',
  },
});
