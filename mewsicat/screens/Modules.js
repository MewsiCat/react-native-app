import React, { useState } from 'react';
import {StyleSheet, View, Pressable, Text, Button, Image} from 'react-native';
import {Overlay} from 'react-native-elements'
import FriendsList from './FriendsList';
import Settings from './Settings';
import MusicRec from './MusicRec';

export default function Modules({ navigation }) {
    const [musicVisible, setMusicVisible] = useState(false);
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [friendsVisible, setFriendsVisible] = useState(false);

    const toggleMusic = () => {
        setMusicVisible(!musicVisible);
    };

    const toggleSettings = () => {
        setSettingsVisible(!settingsVisible);
    }

    const toggleFriends = () => {
        setFriendsVisible(!friendsVisible);
    }

    return (
    <View style={styles.container}>
        {/* Music reccomend*/}
        <Pressable onPress={toggleMusic} style={styles.buttonContainer}>
            <Image source={require('../assets/musicIcon.jpg')} style={styles.img}/>
        </Pressable>
        <Overlay isVisible={musicVisible} onBackdropPress={toggleMusic} overlayStyle={{backgroundColor:'#f0d396', height:'90%', width:'80%', borderRadius: 20}}>
            <MusicRec />
        </Overlay>

        {/* Settings */}
        <Pressable onPress={toggleSettings} style={styles.buttonContainer}>
            <Image source={require('../assets/settingsIcon.jpg')} style={styles.img}/>
        </Pressable>
        <Overlay isVisible={settingsVisible} onBackdropPress={toggleSettings} overlayStyle={{backgroundColor:'#f0d396', height:'90%', width:'80%', borderRadius: 20}}>
            <Settings />
        </Overlay>

        {/* Friends */}
        <Pressable onPress={toggleFriends} style={styles.buttonContainer}>
            <Image source={require('../assets/friendsIcon.png')} style={styles.img}/>
        </Pressable>
        <Overlay isVisible={friendsVisible} onBackdropPress={toggleFriends} overlayStyle={{height:'90%', backgroundColor:'#f0d396', paddingBottom: 30, borderRadius: 20}}>
            <FriendsList />
        </Overlay>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap:10,
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
        padding: 5,
        marginLeft: 'auto',
    },
    buttonText: {
        color: 'white', 
        fontSize: 18,
    },
    img: {
        width:50,
        height:50,
        borderRadius: 20
    },
    overlay: {
        width:'50%',
        height:'50%'
    }
});