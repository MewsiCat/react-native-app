import React, { useEffect, useState, useRef } from 'react';
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

import { Overlay } from 'react-native-elements';
import Loading from './Loading';

var songName;
var artistName;
var imageName;
var topArtists;
var topArtistsGenres;
var topTracks;
var songPrev;

var musicRec;

var songID;


var soundPlaying;
const sound = new Audio.Sound()

import { Audio } from 'expo-av';
import { pauseBGM, toggleBGM } from '../App';
import SongFriendsList from './SongFriendsList';
import { increaseFishes } from '../backend/api/amplifyDBFunctions';

async function getTopTracks() {
    try {
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
    } catch (err) {
        console.log(err);
    }
}

async function getTopArtists() {
    try {
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
    } catch (err) {
        console.log(err);
    }
}

export async function stopMusic() {
    await sound.unloadAsync();
}

export async function generateSong() {
    try {
        await getTopTracks();
        await getTopArtists();
        const currentUserInfo = await Auth.currentUserInfo();
        const access_token = currentUserInfo.attributes['custom:spotify_token'];
        // console.log("access token: " + access_token);
        // console.log("top tracks " + topTracks);
        // console.log("top artists: "  + topArtists);
        var result = await fetch(
            `https://api.spotify.com/v1/recommendations?seed_artists=${topArtists}&seed_tracks=${topTracks}&linit=1`,
            {
                method: "GET",
                headers: { Authorization: "Bearer " + access_token },
            },
        )
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                // console.log(data.tracks[0].name)
                // console.log(data.tracks[0].artists[0].name)
                // console.log(data.tracks[0].album.images[0].url)
                // console.log(data.tracks[0].preview_url)
                songID = data.tracks[0].id;
                songPrev = data.tracks[0].preview_url;
                songName = data.tracks[0].name;
                musicRec = data.tracks[0].id;
                console.log("spotify id: " + data.tracks[0].id);
                artistName = data.tracks[0].artists[0].name;
                imageName = data.tracks[0].album.images[0].url;
            });
        await sound.unloadAsync();
        await sound.loadAsync({
            uri: songPrev
        })
        await increaseFishes();
        await getUserCat();
        // console.log("top artist: " + topArtists);
    } catch (err) {
        console.log(err);
    }
}

export async function addToPlaylist() {
    try {
        console.log("beginning of add to playlist");
        const currentUserInfo = await Auth.currentUserInfo();
        const access_token = currentUserInfo.attributes['custom:spotify_token'];
        var result = await fetch(
            `https://api.spotify.com/v1/me/tracks?ids=${songID}`,
            {
                method: "PUT",
                headers: { Authorization: "Bearer " + access_token },
                data: {
                    "ids": ["string"]
                }
            },
        )
        // console.log(songID);
        console.log("add to playlist done!");
    } catch (err) {
        console.log(err);
    }
}

export async function playPauseSong() {
    if (soundPlaying == false) {
        await sound.playAsync();
        soundPlaying = true;
    }
    else if (soundPlaying == true) {
        await sound.pauseAsync();
        soundPlaying = false;
    }
}

export default function MusicRec() {

    const [loadVisible, setLoadVisible] = useState(false);
    const [songFriendsVisible, setSongFriendsVisible] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const handleAddToPlaylist = async () => {
        await addToPlaylist();
        setIsLiked(true);
    }

    const toggleSongFriendsList = () => {
        setSongFriendsVisible(!songFriendsVisible);
    }

    const toggleLoad = () => {
        setLoadVisible(!loadVisible);
    }

    const toggleLoadFalse = () => {
        setLoadVisible(loadVisible);
    }

    useEffect(() => {
        pauseBGM();
        soundPlaying = false;
    }, []);

    const song = "Plaechold";
    const artist = "mommy";

    const displaySongName = songName && songName.length > 15 ? `${songName.substring(0, 15)}...` : songName;


    console.log("song name " + songName);



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Music Reccomendation!</Text>
            <Image source={{ uri: imageName, }} style={styles.img} />
            <Text style={styles.song}>{displaySongName}</Text>
            <Text style={styles.artist}>{artistName}</Text>
            <Overlay isVisible={loadVisible} onBackdropPress={toggleLoad} overlayStyle={{ backgroundColor: '#f0d396', height: '90%', width: '80%', borderRadius: 20 }}>
                <Loading />
            </Overlay>
            <Overlay isVisible={songFriendsVisible} onBackdropPress={toggleSongFriendsList} overlayStyle={{ backgroundColor: '#f0d396', height: '90%', width: '80%', borderRadius: 20 }}>
                <SongFriendsList musicRecURI={musicRec} />
            </Overlay>
            <Slider
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#d0a060"
                maximumTrackTintColor="#783621"
                thumbTintColor='#783621'
            />
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Button title='⏪' color='#783621' style={styles.button} />
                <Button title="▶️" color='#783621' style={styles.button} onPress={() => { playPauseSong() }} />
                <Button title='⏩' color='#783621' style={styles.button} />
            </View>
            <Button title='send' color='#783621' style={styles.button} onPress={async () => { toggleLoad(); await toggleSongFriendsList(); toggleLoadFalse(); }} />


            <View style={styles.containerB}>
                <Pressable
                    style={[styles.buttonContainer, isLiked ? styles.likedButton : null]}
                    onPress={handleAddToPlaylist}
                    disabled={isLiked}
                >
                    <Text style={styles.buttonText}>
                        {isLiked ? 'Liked' : 'Add to Liked Songs'}
                    </Text>
                </Pressable>
                <Pressable style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Return Home</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignSelf: 'center',
        backgroundColor: '#f0d396',
        borderColor: '#783621',
        paddingHorizontal: 8,
        borderWidth: 2,
        borderRadius: 10,
        width: '90%',
        padding: 5,
        margin: 10
    },
    likedButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    containerB: {
        marginTop: 'auto',
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
        alignSelf: 'center'
    },
    description: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#783621',
        alignSelf: 'center',
        paddingTop: 30
    },
    signout: {
        alignSelf: 'center',
        padding: 10
    },
    buttonText: {
        color: '#783621',
        padding: 5,
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    img: {
        alignSelf: 'center',
        width: 200,
        height: 250,
        margin: 50,
        marginBottom: 5
    },
    song: {
        alignSelf: 'center',
        paddingLeft: 20,
        paddingBottom: 0,
        fontSize: 30,
        color: '#783621'
    },
    artist: {
        alignSelf: 'center',
        paddingLeft: 20,
        paddingBottom: 50,
        fontSize: 15,
        color: '#d0a060'
    }
})