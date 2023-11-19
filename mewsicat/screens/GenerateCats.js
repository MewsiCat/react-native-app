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
import { Auth } from 'aws-amplify';

import Loading from './Loading';
import { createNewCat } from '../backend/api/amplifyDBFunctions';

const listOfCats = ["classicalcat.png", "countrycat.png", "edmcat.png", "hiphopcat.png", "kpopcat.png", "mysterycat.png", "punkcat.png", "rockandrollcat.png"];
var catImage = require('../assets/blackcat.jpg');
var catString
var currentUser;

export default function GenerateCats({ navigation }) {
    const [touches, setTouches] = useState([]);
    const [image, setImage] = useState();
    const [goHome, setGoHome] = useState(false);
    const [loadVisible, setLoadVisible] = useState(false);

    const toggleLoad = () => {
        setLoadVisible(!loadVisible);
    }

    const toggleLoadFalse = () => {
        setLoadVisible(loadVisible);
    }


  
    useEffect(() => {
        async function fetchData(){
            const currentUserInfo = await Auth.currentUserInfo();
            currentUser = currentUserInfo.username;
        }
        fetchData();
        setImage(require('../assets/blackcat.jpg'));
    }, []);

    function toggleSetGoHome(){
        setGoHome(!goHome)
    }

    function generateCat(){
        const randomNum = Math.floor(Math.random() * (listOfCats.length-1));
        //console.log("random cat image url: " + listOfCats[randomNum]);
        catString = "../assets/" + listOfCats[randomNum];
        if(listOfCats[randomNum] == "classicalcat.png"){
            setImage(require('../assets/cats/classicalcat.png'));
        }
        if(listOfCats[randomNum] == "countrycat.png"){
            setImage(require('../assets/cats/countrycat.png'));
        }
        if(listOfCats[randomNum] == "edmcat.png"){
            setImage(require('../assets/cats/edmcat.png'));
        }
        if(listOfCats[randomNum] == "hiphopcat.png"){
            setImage(require('../assets/cats/hiphopcat.png'));
        }
        if(listOfCats[randomNum] == "kpopcat.png"){
            setImage(require('../assets/cats/kpopcat.png'));
        }
        if(listOfCats[randomNum] == "mysterycat.png"){
            setImage(require('../assets/cats/mysterycat.png'));
        }
        if(listOfCats[randomNum] == "wife.jpg"){
            setImage(require('../assets/wife.jpg'));
        }
        if(listOfCats[randomNum] == "rockandrollcat.png"){
            setImage(require('../assets/cats/rockandrollcat.png'));
        }
    
        // setImage(require(`${catString}`));
    }
    return goHome == false ? (
        <View style={styles.container}>
            <Overlay isVisible={loadVisible} overlayStyle={{backgroundColor:'#f0d396', height:'90%', width:'80%', borderRadius: 20}}>
                <Loading />
            </Overlay>
            <ImageBackground source={require('../assets/catgenbg.jpeg')} style={styles.bg}>
                <Text adjustsFontSizeToFit={true} style={styles.title}>Cat Lottery</Text>
                <View style={{alignSelf:'center'}} >
                    <Image source={image} style={styles.img} />
                </View>
                <View style={{marginTop:'auto', margin: 30}}>
                    <Pressable style={styles.buttonContainer} onPress={async () => {
                        toggleLoad();
                        await createNewCat();
                        toggleLoadFalse();
                    }}>
                        <Text style={styles.buttonText}>Get Cat!</Text>
                    </Pressable>
                    <Pressable style={styles.buttonContainer} onPress={async () => { toggleLoad();console.log("beginning update first time"); await updateFirstTimeUser(); console.log("ending update first time");toggleLoadFalse(); setGoHome(!goHome); }}>
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