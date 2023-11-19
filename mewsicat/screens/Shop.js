import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import { Overlay } from 'react-native-elements';
import MusicRec from './MusicRec';
import { Audio } from 'expo-av';
import { generateSong, stopMusic } from './MusicRec';
import Loading from './Loading';
import { playBGM, toggleBGM } from '../App';
import ShopItem from '../Components/ShopItem.jsx';

const items= [
    {
        id: "hat",
        desc: "wear a hat",
        img: "../assets/wife.jpg",
        purchased: true
    },
    {
        id: "shoe",
        desc: "wear a shoe",
        img: "../assets/wife.jpg",
        purchased: false
    },
    {
        id: "test",
        desc: "test",
        img: "../assets/wife.jpg",
        purchased: true
    },
    {
        id: "hat",
        desc: "wear a hat",
        img: "../assets/wife.jpg",
        purchased: false
    },
    {
        id: "shoe",
        desc: "wear a shoe",
        img: "../assets/wife.jpg",
        purchased: true
    },
    {
        id: "test",
        desc: "test",
        img: "../assets/wife.jpg",
        purchased: true
    },
    {
        id: "hat",
        desc: "wear a hat",
        img: "../assets/wife.jpg",
        purchased: false
    },
    {
        id: "shoe",
        desc: "wear a shoe",
        img: "../assets/wife.jpg",
        purchased: true
    },
    {
        id: "test",
        desc: "test",
        img: "../assets/wife.jpg",
        purchased: true
    }
];

async function playMeow() {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/mewsound.mp3')
    );

    await sound.playAsync();
}

export default function Shop() {

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
            playBGM();
            stopMusic();
        }
        setRecVisible(!recVisible);
    };

    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row', justifyContent: 'space-evenly', marginBottom: 20}} >
                <Text style={styles.title}>The Cat Shack</Text>
                <Image source={require('../assets/judebox.gif')} style={styles.img} />
            </View>
            <ScrollView>
                <View style={{padding: 10}}>
                    {items.map((item) => {
                        return (
                          <View style={{flexDirection: 'row', margin: 3}} >
                            <ShopItem
                                itemName = {item.id}
                                itemDescription = {item.desc}
                                itemImg = {item.img}
                                purchased = {item.purchased}
                            />
                          </View>
                        );
                      })}
                </View>
            </ScrollView>
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
        alignSelf:'center',
        paddingRight: 10
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
        width: 110,
        height: 80,
    }
})