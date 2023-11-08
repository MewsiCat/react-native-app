import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Button } from 'react-native';
import Slider from '@react-native-community/slider';
import { SpotifyAPIController } from '../backend/api/spotifyAPIController';

import { API, graphqlOperation } from 'aws-amplify'

import {
    withAuthenticator,
    useAuthenticator,
  } from '@aws-amplify/ui-react-native';
  
import { Amplify, Auth } from 'aws-amplify';
import awsExports from '../src/aws-exports';
Amplify.configure(awsExports);

import { createUser, updateUser, deleteUser } from '../src/graphql/mutations'
import { listUsers, getUser, userByName } from '../src/graphql/queries'

var songName;
var artistName;
var imageName;
var topArtists;
var topArtistsGenres;
var topTracks;
var songPrev;
import { Audio } from 'expo-av';

async function getTopTracks(){
    try{
    const currentUserInfo = await Auth.currentUserInfo();
    const access_token = currentUserInfo.attributes['custom:spotify_token'];
    console.log("access token: " + access_token);
    var userRes = await fetch(
        `https://api.spotify.com/v1/me/top/tracks`,
        {
            method: "GET",
            headers: { Authorization: "Bearer " + access_token },
        },
        )
        .then((res) => res.json())
        .then((data) => {
            console.log("top tracks in function: " + data.items[0].name);
            topTracks = data.items[0].uri;
            topTracks = topTracks.substring(14);
            console.log(topTracks)
        });
    }catch(err) {
        console.log(err);
      } 
}

async function getTopArtists(){
    try{
    const currentUserInfo = await Auth.currentUserInfo();
    const access_token = currentUserInfo.attributes['custom:spotify_token'];
    console.log("access token: " + access_token);
    var userRes = await fetch(
        `https://api.spotify.com/v1/me/top/artists`,
        {
            method: "GET",
            headers: { Authorization: "Bearer " + access_token },
        },
        )
        .then((res) => res.json())
        .then((data) => {
            console.log("top artist in function: " + data.items[0].name);
            topArtists = data.items[0].uri;
            topArtists = topArtists.substring(15);
            // topArtistsGenres = data.items[0].genre;
            // console.log("top artists genres in function: " + topArtistsGenres);
        });
    }catch(err) {
        console.log(err);
      } 
}

async function generateSong(){
    try{
    await getTopTracks();
    await getTopArtists();
    const currentUserInfo = await Auth.currentUserInfo();
    const access_token = currentUserInfo.attributes['custom:spotify_token'];
    console.log("access token: " + access_token);
    console.log("top tracks " + topTracks);
    console.log("top artists: "  + topArtists);
    var result = await fetch(
        `https://api.spotify.com/v1/recommendations?seed_artists=${topArtists}&seed_tracks=${topTracks}&linit=1`,
        {
            method: "GET",
            headers: { Authorization: "Bearer " + access_token },
        },
        )
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            console.log(data.tracks[0].name)
            console.log(data.tracks[0].artists[0].name)
            console.log(data.tracks[0].album.images[0].url)
            console.log(data.tracks[0].preview_url)
            songPrev = data.tracks[0].preview_url;
            songName = data.tracks[0].name;
            artistName = data.tracks[0].artists[0].name;
            imageName = data.tracks[0].album.images[0].url;
        });
        console.log("top artist: " + topArtists);
    } catch(err) {
        console.log(err);
      } 
}

async function playSong() {
    const {sound} = await Audio.Sound.createAsync(
        {uri: songPrev},
        {shouldPlay: true},
    )

    sound.setVolumeAsync(0.3)
    
    await sound.playAsync();
}


export default function MusicRec() {
    const song = "Plaechold";
    const artist = "mommy"

    console.log("song name " + songName);

    useEffect(() => {
        generateSong();
      }, []);
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Music Reccomendation!</Text>
            <Image source={{uri: imageName,}} style={styles.img} />
            <Text style={styles.song}>{songName}</Text>
            <Text style={styles.artist}>{artistName}</Text>
            <Slider
                style={{width: '90%', height: '90%', alignSelf:'center', paddingTop:0}}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#d0a060"
                maximumTrackTintColor="#783621"
                thumbTintColor='#783621'
            />
            <View style={{flexDirection:'row', justifyContent:'center'}}>
                <Button title='⏪' color='#783621' style={styles.button} />
                <Button title="▶️" color='#783621' style={styles.button} onPress={() => {playSong()}}/>
                <Button title='⏩' color='#783621' style={styles.button} />
                
            </View>
                <Pressable style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Return Home</Text>
                </Pressable>
            <View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignSelf: 'center',
        backgroundColor: '#f0d396',
        borderColor:'#783621',
        paddingHorizontal: 8,
        borderWidth:2,
        borderRadius: 10,
        width: '90%',
        marginTop: 'auto'
      },
    container: {
        backgroundColor: '#f0d396',
        padding: 20,
        flexDirection: 'column',
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#783621',
        alignSelf:'center'
    },
    description: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#783621',
        alignSelf:'center',
        paddingTop: 30
    },
    signout: {
        alignSelf: 'center',
        padding:10
    },
    buttonText: {
        color: '#783621',
        padding: 5,
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf:'center'
    },
    img: {
        alignSelf:'center',
        width: 200,
        height: 250,
        margin: 50,
        marginBottom:5
    },
    song: {
        alignSelf:'center',
        paddingLeft: 20,
        paddingBottom: 0,
        fontSize: 30,
        color:'#783621'
    },
    artist: {
        alignSelf:'center',
        paddingLeft: 20,
        paddingBottom: 50,
        fontSize: 15,
        color:'#d0a060'
    }
})