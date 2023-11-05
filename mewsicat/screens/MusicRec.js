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

async function generateSong(){
    try{
    const currentUserInfo = await Auth.currentUserInfo();
    const access_token = currentUserInfo.attributes['custom:spotify_token'];
    console.log("access token: " + access_token);

    var result = await fetch(
        `https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA&limit=1`,
        {
            method: "GET",
            headers: { Authorization: "Bearer " + access_token },
        },
        )
        .then((res) => res.json())
        .then((data) => {
            console.log(data.tracks[0].name)
            console.log(data.tracks[0].artists[0].name)
            console.log(data.tracks[0].album.images[0].url)
            songName = data.tracks[0].name;
            artistName = data.tracks[0].artists[0].name;
            imageName = data.tracks[0].album.images[0].url;
        });
    } catch(err) {
        console.log(err);
      } 
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
                <Button title="▶" color='#783621' style={styles.button} />
                <Button title='⏩' color='#783621' style={styles.button} />
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