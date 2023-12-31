import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Pressable, Text, Button, Image} from 'react-native';
import {Overlay} from 'react-native-elements'
import FriendsList from './FriendsList';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { getCat, userByName } from '../src/graphql/queries'
import Settings from './Settings';
import MusicRec from './MusicRec';
import Jukebox from './Jukebox';
import Loading from './Loading';
import FriendRequestsList from './FriendRequestsList';
import FriendSongsList from './FriendSongsList';
import GenerateCats from './GenerateCats';
import { collectManifestSchemes } from 'expo-linking';
import { createNewCat, increaseFishes, testNotifications } from '../backend/api/amplifyDBFunctions';
import Shop from './Shop';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { useRef } from "react";
import { Audio } from 'expo-av';

import { registerForPushNotificationsAsync } from "../backend/pushNotifications.js";

var catFishes;

async function click() {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/pisseim-mund-online-audio-converter.mp3')
    );
  
    await sound.playAsync();
  }

export async function updateUserCat(){
    try{
    const currentUserInfo = await Auth.currentUserInfo();
    const currentUser = currentUserInfo.username;
  
    const params = {
        name: currentUser
    };
    const userRes = await API.graphql(graphqlOperation(userByName, params));
    const userID = userRes.data.userByName.items[0].id;
    const result = await API.graphql({
        query: getCat,
        variables: { id: userID }
    });
  
    catFishes = userRes.data.userByName.items[0].cat.items[0].fishes;
} catch(err){
    console.log(err);
}
}

export default function Modules({ navigation }) {
    const [musicVisible, setMusicVisible] = useState(false);
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [friendsVisible, setFriendsVisible] = useState(false);
    const [recVisible, setRecVisible] = useState(false);
    const [friendRequestsVisible, setFriendRequestsVisible] = useState(false);
    const [songsVisible, setSongsVisible] = useState(false);
    const [genCatVisible, setGenCatVisible] = useState(false);
    const [shopVisible, setShopVisible] = useState(false);
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    const toggleGenerateCat = () => {
        setGenCatVisible(!genCatVisible);
        click();
    }

    const toggleSongs = () => {
        setSongsVisible(!songsVisible)
        click();
    }

    const toggleMusic = () => {
        setMusicVisible(!musicVisible);
        click();
    };
    const toggleRec = () => {
        setRecVisible(!recVisible);
        click();
    };

    const toggleSettings = () => {
        testNotifications();
        setSettingsVisible(!settingsVisible);
        click();
    }

    const toggleFriends = () => {
        setFriendsVisible(!friendsVisible);
        click();
    }
    const toggleFriendRequests = () => {
        setFriendRequestsVisible(!friendRequestsVisible);
        click();
    }

    const toggleShop = () => {
        setShopVisible(!shopVisible);
        click();
    }

    useEffect(()=> {
        async function fetchData(){
            const currentUserInfo = await Auth.currentUserInfo();
            const currentUser = currentUserInfo.username;
            await updateUserCat();
            console.log("fishes " + catFishes);
            // toggleFriends();
        }
        fetchData();
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response.notification.request.content.data.responseType);
          const responseType = response.notification.request.content.data.responseType;
          console.log(responseType);
          if(responseType == 'send friend req'){
            toggleFriends();
            console.log("send friend req function done!");
          }
          if(responseType == 'accept friend req'){
            toggleFriends();
            console.log("accept friend req function done!");
          }
          if(responseType == 'song got'){
            toggleSongs();
            console.log("songs listener done!");
          }
          else{
            console.log(responseType);
          }
        // const url = response.notification.request.content.data.url;
        });

        // return () => {
        //   Notifications.removeNotificationSubscription(notificationListener.current);
        //   Notifications.removeNotificationSubscription(responseListener.current);
        // };
    }, [])

    return (
    <View style={styles.container}>
        <Pressable style={styles.currButton}>
            <Image source={require('../assets/tiff/fish.png')} style={styles.currImage}/>
            <Text>{catFishes}</Text>
        </Pressable>

        {/* Music reccomend*/}
        <Pressable onPress={toggleMusic} style={styles.buttonContainer}>
            <Image source={require('../assets/musicIcon.jpg')} style={styles.img}/>
        </Pressable>
        <Overlay isVisible={musicVisible} onBackdropPress={toggleMusic} overlayStyle={{backgroundColor:'#f0d396', height:'90%', borderRadius: 20}}>
            <Jukebox />
        </Overlay>

        {/* Settings */}
        <Pressable onPress={toggleSettings} style={styles.buttonContainer}>
            <Image source={require('../assets/tiff/settings.png')} style={styles.img}/>
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
            <Image source={require('../assets/tiff/mail_fish.png')} style={styles.img}/>
        </Pressable>
        <Overlay isVisible={songsVisible} onBackdropPress={toggleSongs} overlayStyle={{height:'90%', backgroundColor:'#f0d396', paddingBottom: 30, borderRadius: 20}}>
            <FriendSongsList />
        </Overlay>

        {/* Generate Cat
        <Pressable onPress={toggleGenerateCat} style={styles.buttonContainer}>
            <Image source={require('../assets/wife.jpg')} style={styles.img}/>
        </Pressable>
        <Overlay isVisible={genCatVisible} onBackdropPress={toggleGenerateCat} overlayStyle={{height:'90%', backgroundColor:'#f0d396', borderRadius: 20}}>
            <GenerateCats />
        </Overlay> */}

        {/* Shop */}
        <Pressable onPress={toggleShop} style={styles.buttonContainer}>
            <Image source={require('../assets/sadcat.jpg')} style={styles.img}/ >
        </Pressable>
        <Overlay isVisible={shopVisible} onBackdropPress={toggleShop} overlayStyle={{height:'90%', width:'80%', backgroundColor:'#f0d396', paddingBottom: 30, borderRadius: 20}}>
            <Shop/>
        </Overlay>
   
    </View>
    );
};

const styles = StyleSheet.create({
    currButton: {
        backgroundColor: '#f0d396',
        borderWidth: 1,
        borderColor: '#783621',
        padding: 3,
        borderRadius: 10,
        flexDirection: 'row',
        maxHeight: 40,
        maxWidth: 100,
        margin: 5,
        alignItems: 'center'
    },
    currImage: {
        maxHeight: 25,
        maxWidth: 25,
        marginRight: 'auto'
    },
    add: {
        borderWidth: 1,
        borderRadius: 10,
        maxHeight: '100%',
        maxWidth: '100%',
        textAlign: 'center',
        backgroundColor: 'green',
        marginLeft: 'auto'
    },
    addText: {
        padding: 1,
        maxWidth: 50,
        marginTop: -3,
        marginBottom: -3
    },
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
        padding: 3,
        marginLeft: 'auto',
    },
    buttonText: {
        color: 'white', 
        fontSize: 18,
    },
    img: {
        width:40,
        height:40,
        borderRadius: 20
    },
    overlay: {
        width:'50%',
        height:'50%'
    }
});