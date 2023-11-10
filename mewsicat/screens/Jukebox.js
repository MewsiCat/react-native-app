import React, {useState} from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import { Overlay } from 'react-native-elements';
import MusicRec from './MusicRec';
import { Audio } from 'expo-av';
import { generateSong, stopMusic } from './MusicRec';
import Loading from './Loading';

async function playMeow() {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/mewsound.mp3')
    );
  
    await sound.playAsync();
}

export default function Jukebox() {

    const [recVisible, setRecVisible] = useState(false);
    const [loadVisible, setLoadVisible] = useState(false);

    const toggleLoad = () => {
        setLoadVisible(!loadVisible);
    }

    const toggleLoadFalse = () => {
        setLoadVisible(loadVisible);
    }


    const toggleRec = async () => {
        if(recVisible == true){
            stopMusic();
        }
        setRecVisible(!recVisible);
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Jukebox</Text>
            <Image source={require('../assets/judebox.gif')} style={styles.img} />
            <Pressable style={styles.buttonContainer} onPress={async () => {
                toggleLoad();
                await generateSong();
                toggleLoadFalse();
                toggleRec(); 
                playMeow();
            }}>
                <Text style={styles.buttonText}>Get Song</Text>
            </Pressable>
            <Overlay isVisible={recVisible} onBackdropPress={toggleRec} overlayStyle={{backgroundColor:'#f0d396', height:'90%', width:'80%', borderRadius: 20}}>
                <MusicRec />
            </Overlay>
            <Overlay isVisible={loadVisible} onBackdropPress={toggleLoad} overlayStyle={{backgroundColor:'#f0d396', height:'90%', width:'80%', borderRadius: 20}}>
                <Loading />
            </Overlay>
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
        fontSize: 40,
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
        width: 300,
        height: 250,
        margin: 150
    }
})