import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import { Overlay } from 'react-native-elements';
import MusicRec from './MusicRec';
import { Audio } from 'expo-av';
import { generateSong, stopMusic } from './MusicRec';
import Loading from './Loading';
import { playBGM, toggleBGM } from '../App';
import ShopItem from '../Components/ShopItem.jsx';


const items = [
    {
        id: "hat",
        desc: "wear a hat",
        img: require("../assets/wife.jpg"),
        purchased: true
    },
    {
        id: "shoe",
        desc: "wear a shoe",
        img: require("../assets/wife.jpg"),
        purchased: false
    },
    {
        id: "wife",
        desc: "your wife",
        img: require("../assets/wife.jpg"),
        purchased: true
    },
    {
        id: "hat",
        desc: "wear a hat",
        img: require("../assets/wife.jpg"),
        purchased: false
    },
    {
        id: "shoe",
        desc: "wear a shoe",
        img: require("../assets/wife.jpg"),
        purchased: true
    },
    {
        id: "test",
        desc: "test",
        img: require("../assets/wife.jpg"),
        purchased: true
    },
    {
        id: "hat",
        desc: "wear a hat",
        img: require("../assets/wife.jpg"),
        purchased: false
    },
    {
        id: "shoe",
        desc: "wear a shoe",
        img: require("../assets/wife.jpg"),
        purchased: true
    },
    {
        id: "test",
        desc: "test",
        img: require("../assets/wife.jpg"),
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
        if (recVisible == true) {
            playBGM();
            stopMusic();
        }
        setRecVisible(!recVisible);
    };

    const renderRows = (items) => {
        let rows = [];
        for (let i = 0; i < items.length; i += 3) {
            rows.push(
                <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    {items.slice(i, i + 3).map((item, index) => (
                        <View key={index} style={{ width: '32%', margin: '0.5%', height:200 }}>
                            <ShopItem
                                itemName={item.id}
                                itemDescription={item.desc}
                                itemImg={item.img}
                                purchased={item.purchased}
                            />
                        </View>
                    ))}
                </View>
            );
        }
        return rows;
    };

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20, alignItems: "center"}} >
                <Text style={styles.title}>Cat Shack</Text>
                <Image source={require('../assets/shopKeepingCat.png')} style={styles.img} />
            </View>
            
            <View style={{marginTop:'100%', height:"40%", borderColor:"#783621", borderRadius: 10, borderWidth: 2, padding: 2, backgroundColor: "rgba(0,0,0,0.2)"}}>
            <ScrollView>

                <View style={{ padding: 0}}>
                    {renderRows(items)}
                <View style={{padding: 10}}>
                    {items.map((item) => {
                       return (
                         <View style={{flexDirection: 'row', margin: 3}} >
                           <ShopItem
                               itemName = {item.id}
                               itemDescription = {item.desc}
                               imgURI = {item.img}
                               purchased = {item.purchased}
                           />
                         </View>
                       );
                     })}
                </View>
                </View>
            </ScrollView>
            </View>
            <Overlay isVisible={recVisible} onBackdropPress={toggleRec} overlayStyle={{ backgroundColor: '#f0d396', height: '90%', width: '80%', borderRadius: 20 }}>
                <MusicRec />
            </Overlay>
            <Overlay isVisible={loadVisible} onBackdropPress={toggleLoad} overlayStyle={{ backgroundColor: '#f0d396', height: '90%', width: '80%', borderRadius: 20 }}>
                <Loading />
            </Overlay>
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
        width: '100%',
        marginTop: 'auto'
    },
    container: {
        backgroundColor: '#f0d396',
        // padding: 20,
        heigth: '90%'
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#783621',
        // alignSelf: 'center',
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
// marginLeft:10,
        width: 100,
        height: 100,

    }
})