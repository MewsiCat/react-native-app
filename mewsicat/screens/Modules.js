import React, { useState } from 'react';
import {StyleSheet, View, Pressable, Text, Button, Image} from 'react-native';
import {Overlay} from 'react-native-elements'

export default function Modules({ navigation }) {
    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    return (
    <View style={styles.container}>
        <Pressable onPress={toggleOverlay}>
            <Image source={require('../assets/MagGlass.png')} style={styles.img}/>
        </Pressable>
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
            <Text style={styles.textPrimary}>Hello!</Text>
            <Text style={styles.textSecondary}>
                Welcome to React Native Elements
            </Text>
            <Pressable style={styles.button} onPress={toggleOverlay}>
            </Pressable>
        </Overlay>

        <Button
        onPress={() => {
          navigation.navigate('GrayScreen');
        }}
        title="Press Me"
      />
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        padding: 10,
        backgroundColor: '#fff',
    },
    button: {
    margin: 10,
    },
    textPrimary: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 20,
    },
    textSecondary: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 17,
    },
    buttonContainer: {
        backgroundColor: 'black',
        padding: 15,
        alignContent: 'center'
    },
    buttonText: {
        color: 'white', 
        fontSize: 18,
    },
    img: {
        width:50,
        height:50
    }
});