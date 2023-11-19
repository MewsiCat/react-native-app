import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Button, ImageBackground, TouchableOpacity, Dimensions, Easing } from 'react-native';
const scale = 3;
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
import Modules from './Modules';
import { Audio } from 'expo-av';
import { generateFriendRequestsList } from './FriendRequestsList';
import Home from './Home';

import { Text, Image, Overlay } from 'react-native-elements';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import App from '../App';
import { updateFirstTimeUser } from '../backend/api/amplifyDBFunctions';

import Loading from './Loading';
import { createNewCat } from '../backend/api/amplifyDBFunctions';

const listOfCats = ["blackcat.jpg", "chaewoncat.png", "default_user.jpg", "friendsIcon.png", "musicIcon.jpg", "sadcat.jpg", "settingsIcon.jpg", "wife.jpg"];
var catImage = require('../assets/blackcat.jpg');
var catString

export default function GenerateCats({ navigation }) {
    const [touches, setTouches] = useState([]);
    const [image, setImage] = useState();
    const [goHome, setGoHome] = useState(false);

  
    useEffect(() => {
        setImage(require('../assets/blackcat.jpg'));
    }, []);

    function toggleSetGoHome(){
        setGoHome(!goHome)
    }

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
    const home = false
    return goHome == false ? (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/catgenbg.jpeg')} style={styles.bg}>
                <Text adjustsFontSizeToFit={true} style={styles.title}>Cat Lottery</Text>
                <View style={{alignSelf:'center'}} >
                    <Image source={image} style={styles.img} />
                </View>
                <View style={{marginTop:'auto', margin: 30}}>
                    <Pressable style={styles.buttonContainer} onPress={async () => {
                        createNewCat("bob", "stupid")
                    }}>
                        <Text style={styles.buttonText}>Get Cat!</Text>
                    </Pressable>
                    <Pressable style={styles.buttonContainer} onPress={async () => {console.log("beginning update first time");await updateFirstTimeUser(); console.log("ending update first time");setGoHome(!goHome);}}>
                        <Text style={styles.buttonText}>Return Home</Text>
                    </Pressable>
                </View>
            </ImageBackground>
       </View>
    ) : (<Home/>)
  }

  const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0d396',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
    bg: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    buttonContainer: {
        alignSelf: 'center',
        backgroundColor: '#f0d396',
        borderColor:'#783621',
        paddingHorizontal: 8,
        borderWidth:2,
        borderRadius: 10,
        width: '90%',
        padding: 5,
        margin: 10
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#783621',
        alignSelf:'center',
        justifyContent: 'center',
        padding: 30,
        marginTop: 30
    },
    buttonText: {
        color: '#783621',
        padding: 5,
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf:'center'
    },
    img: {
        width: 200,
        height: 250,
    },
})