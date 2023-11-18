import React, { useState } from 'react';
import {StyleSheet, View, Pressable, Text, Button, Image} from 'react-native';
import {Overlay} from 'react-native-elements'
import FriendsList from './FriendsList';
import Settings from './Settings';
import MusicRec from './MusicRec';
import Jukebox from './Jukebox';
import Loading from './Loading';
import FriendRequestsList from './FriendRequestsList';
import FriendSongsList from './FriendSongsList';
import GenerateCats from './GenerateCats';

export default function Modules({ navigation }) {
    const [musicVisible, setMusicVisible] = useState(false);
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [friendsVisible, setFriendsVisible] = useState(false);
    const [recVisible, setRecVisible] = useState(false);
    const [friendRequestsVisible, setFriendRequestsVisible] = useState(false);
    const [songsVisible, setSongsVisible] = useState(false);
    const [genCatVisible, setGenCatVisible] = useState(false);

    const toggleGenerateCat = () => {
        setGenCatVisible(!genCatVisible);
    }

    const toggleSongs = () => {
        setSongsVisible(!songsVisible)
    }

    const toggleMusic = () => {
        setMusicVisible(!musicVisible);
    };
    const toggleRec = () => {
        setRecVisible(!recVisible);
    };

    const toggleSettings = () => {
        setSettingsVisible(!settingsVisible);
    }

    const toggleFriends = () => {
        setFriendsVisible(!friendsVisible);
    }
    const toggleFriendRequests = () => {
        setFriendRequestsVisible(!friendRequestsVisible);
    }

    return (
    <View style={styles.container}>
        {/* Music reccomend*/}
        <Pressable onPress={toggleMusic} style={styles.buttonContainer}>
            <Image source={require('../assets/musicIcon.jpg')} style={styles.img}/>
        </Pressable>
        <Overlay isVisible={musicVisible} onBackdropPress={toggleMusic} overlayStyle={{backgroundColor:'#f0d396', height:'90%', width:'80%', borderRadius: 20}}>
            <Jukebox />
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
            {/* <Loading /> */}
        </Overlay>

        {/* Friend Requests
        <Pressable onPress={toggleFriendRequests} style={styles.buttonContainer}>
            <Image source={require('../assets/friendsIcon.png')} style={styles.img}/>
        </Pressable>
        <Overlay isVisible={friendRequestsVisible} onBackdropPress={toggleFriendRequests} overlayStyle={{height:'90%', backgroundColor:'#f0d396', paddingBottom: 30, borderRadius: 20}}>
            <FriendRequestsList />
            {/* <Loading /> 
        </Overlay> */}
        
        {/* Songs */}
        <Pressable onPress={toggleSongs} style={styles.buttonContainer}>
            <Image source={require('../assets/blackcat.jpg')} style={styles.img}/>
        </Pressable>
        <Overlay isVisible={songsVisible} onBackdropPress={toggleSongs} overlayStyle={{height:'90%', backgroundColor:'#f0d396', paddingBottom: 30, borderRadius: 20}}>
            <FriendSongsList />
        </Overlay>

        {/* Generate Cat */}
        <Pressable onPress={toggleGenerateCat} style={styles.buttonContainer}>
            <Image source={require('../assets/wife.jpg')} style={styles.img}/>
        </Pressable>
        <Overlay isVisible={genCatVisible} onBackdropPress={toggleGenerateCat} overlayStyle={{height:'90%', backgroundColor:'#f0d396', borderRadius: 20}}>
            <GenerateCats />
        </Overlay>
   
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap:10,
        marginLeft: 'auto',
        marginTop: 80
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