import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, Button } from 'react-native';
import Slider from '@react-native-community/slider';

export default function MusicRec() {
    const song = "Plaechold";
    const artist = "mommy"
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Music Reccomendation!</Text>
            <Image source={require('../assets/wife.jpg')} style={styles.img} />
            <Text style={styles.song}>{song}</Text>
            <Text style={styles.artist}>{artist}</Text>
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