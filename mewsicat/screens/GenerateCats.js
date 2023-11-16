import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Button, ImageBackground, TouchableOpacity, Dimensions, Easing } from 'react-native';
const scale = 3;
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
import Modules from './Modules';
import { Audio } from 'expo-av';
import { generateFriendRequestsList } from './FriendRequestsList';

import { Text, Image, Overlay } from 'react-native-elements';
import { Pressable } from 'react-native';

const listOfCats = ["blackcat.jpg", "chaewoncat.png", "default_user.jpg", "friendsIcon.png", "musicIcon.jpg", "sadcat.jpg", "settingsIcon.jpg", "wife.jpg"];
var catImage = require('../assets/blackcat.jpg');
var catString




export default function GenerateCats({ navigation }) {
    const [touches, setTouches] = useState([]);
    const [image, setImage] = useState();
  
    useEffect(() => {
        setImage(require('../assets/blackcat.jpg'));
    }, []);

    function generateCat(){
        const randomNum = Math.floor(Math.random() * (listOfCats.length-1));
        //console.log("random cat image url: " + listOfCats[randomNum]);
        catString = "../assets/" + listOfCats[randomNum];
        if(listOfCats[randomNum] == "blackcat.jpg"){
            setImage(require('../assets/blackcat.jpg'));
        }
        if(listOfCats[randomNum] == "chaewoncat.png"){
            setImage(require('../assets/chaewoncat.png'));
        }
        if(listOfCats[randomNum] == "default_user.jpg"){
            setImage(require('../assets/default_user.jpg'));
        }
        if(listOfCats[randomNum] == "friendsIcon.png"){
            setImage(require('../assets/friendsIcon.png'));
        }
        if(listOfCats[randomNum] == "musicIcon.jpg"){
            setImage(require('../assets/musicIcon.jpg'));
        }
        if(listOfCats[randomNum] == "sadcat.jpg"){
            setImage(require('../assets/sadcat.jpg'));
        }
        if(listOfCats[randomNum] == "settingsIcon.jpg"){
            setImage(require('../assets/settingsIcon.jpg'));
        }
        if(listOfCats[randomNum] == "wife.jpg"){
            setImage(require('../assets/wife.jpg'));
        }
    
        // setImage(require(`${catString}`));
    }
  
    return (
      <ImageBackground
        source={require('../assets/catgenbg.jpeg')}
        style={styles.container}
      >
        <View style={styles.container}>
        <Image source={image} style={styles.img} />
        <Text style={styles.title}>Generate your cat!</Text>
            <Pressable style={styles.buttonContainer} onPress={async () => {
                generateCat();
            }}>
                <Text style={styles.buttonText}>Get Cat!</Text>
            </Pressable>
        </View>
      </ImageBackground>
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