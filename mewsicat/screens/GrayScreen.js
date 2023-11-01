import React, { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, PanResponder, Animated, Image, Button, Text } from 'react-native';

export default function GrayScreen({navigation}) {
    const [touches, setTouches] = useState([]);
  
    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => false,
        onPanResponderGrant: (evt) => {
          const { pageX, pageY } = evt.nativeEvent;
          const opacity = new Animated.Value(1);
          const scale = new Animated.Value(1);
          
          setTouches((prevTouches) => [...prevTouches, { x: pageX, y: pageY, opacity, scale }]);
          
          // Fade out and scale up animation
          Animated.parallel([
            Animated.timing(opacity, {
              toValue: 0,
              duration: 200, // 0.2 seconds
              useNativeDriver: true,
            }),
            Animated.timing(scale, {
              toValue: 1.5, // scale up to double the size
              duration: 200, // 0.2 seconds
              useNativeDriver: true,
            }),
          ]).start();
        },
      })
    ).current;
  
    return (
      <View 
        style={styles.container} 
        {...panResponder.panHandlers}
      >
        <Text style={styles.welcomeText}>Welcome!</Text>
        <Image 
          source={require('../assets/blackcat.jpg')} 
          style={styles.catImage} 
        /><View {...panResponder.panHandlers}>
        <Button
            onPress={() => {
              navigation.navigate('Home');
            }}
            title="Press Me"
          /></View>
        {touches.map((touch, index) => (
          <Animated.Image
            key={index}
            source={require('../assets/catpaw.png')}
            style={[
              styles.touchCircle,
              {
                top: touch.y - 30,
                left: touch.x,
                opacity: touch.opacity,
                transform: [{ scale: touch.scale }],
              },
            ]}
          />
        ))}
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
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
      width: 40,
      height: 36,
      resizeMode: 'cover',
    },
    catImage: {
      marginBottom: 20,
      width: 450,  
      height: 450, 
      resizeMode: 'contain',
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      position: 'absolute',
      top: 40,
    },
  });