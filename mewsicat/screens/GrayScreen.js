import React, { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, PanResponder, Animated, Image, Button, Text } from 'react-native';

export default function GrayScreen({ navigation }) {
    const [touches, setTouches] = useState([]);
      const opacities = useRef([]).current;
  
    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => false,
        onPanResponderGrant: (evt) => {
          const { pageX, pageY } = evt.nativeEvent;
          setTouches((prevTouches) => [...prevTouches, { x: pageX, y: pageY }]);
        },
      })
    ).current;
    return (
      <View 
        style={styles.grayContainer} 
        {...panResponder.panHandlers}
      >
        {touches.map((touch, index) => (
          <View
            key={index}
            style={[
              styles.touchCircle,
              { top: touch.y - 100, left: touch.x - 15 },
            ]}
          />
        ))}
        <Text>This is the Gray Screen</Text>
        <Button
          onPress={() => {
            navigation.navigate('Home');
          }}
          title="Press Me"
        />
      </View>
      
    );
    
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#785',
      alignItems: 'center',
      justifyContent: 'center',
    },
    grayContainer: {
      flex: 1,
      backgroundColor: 'gray',
      alignItems: 'center',
      justifyContent: 'center',
    },
    touchCircle: {
      position: 'absolute',
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
  });