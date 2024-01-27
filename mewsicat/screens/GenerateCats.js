import React, { useState, useEffect, useRef, createRef } from 'react';
import { StyleSheet, View, Animated, Button, ImageBackground, TouchableOpacity, Dimensions, Easing } from 'react-native';
const scale = 3;
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
import Modules from './Modules';
import { Audio } from 'expo-av';
import { generateFriendRequestsList } from './FriendRequestsList';
import Home from './Home';

import { Text, Image, Overlay } from 'react-native-elements';
import { Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import App from '../App';
import { updateFirstTimeUser } from '../backend/api/amplifyDBFunctions';
import { Auth } from 'aws-amplify';
import { getUserCat } from './GrayScreen';
import Loading from './Loading';
import { createNewCat } from '../backend/api/amplifyDBFunctions';

const listOfCats = ["classicalcat.png", "countrycat.png", "edmcat.png", "hiphopcat.png", "kpopcat.png", "mysterycat.png", "punkcat.png", "rockandrollcat.png"];
var catString;
var currentUser;

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const AnimatedCarousel = () => {
  const CatImages = [
    require('../assets/cats/classicalcat.png'),
    require('../assets/cats/countrycat.png'),
    require('../assets/cats/edmcat.png'),
    require('../assets/cats/hiphopcat.png'),
    require('../assets/cats/kpopcat.png'),
    require('../assets/cats/mysterycat.png'),
    require('../assets/cats/punkcat.png'),
    require('../assets/cats/rockandrollcat.png'),
  ];

  const scrollX = useRef(new Animated.Value(0)).current;
  const windowWidth = Dimensions.get('window').width;
  const numItems = CatImages.length;
  const scrollViewRef = useRef(null);

  const [carouselItems, setCarouselItems] = useState([...CatImages, ...CatImages, ...CatImages]);
  const currentIndex = useRef(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      currentIndex.current = (currentIndex.current + 1) % (2 * numItems);

      // Animate the scroll without abrupt changes
      scrollViewRef.current.scrollTo({
        x: windowWidth * currentIndex.current,
        animated: true,
      });
    }, 300); // Adjust the interval duration to control the speed

    return () => {
      clearInterval(intervalId);
    };
  }, [windowWidth]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleScrollEndDrag = (event) => {
    const offset = event.nativeEvent.contentOffset.x;

    if (offset >= windowWidth * (2 * numItems - 1)) {
      // Smoothly update the content offset to continue scrolling to the right and loop around
      Animated.timing(scrollX, {
        toValue: windowWidth * (currentIndex.current + 1),
        duration: 0, // No animation
        useNativeDriver: false,
      }).start(() => {
        // Update the current index
        currentIndex.current += 1;
        // Check if the current index exceeds the number of items
        if (currentIndex.current >= numItems) {
          scrollViewRef.current.scrollToEnd({ animated: false });
          currentIndex.current = 0;
        }
      });
    }
  };

  return (
    <View style={styles.ccontainer}>
      <AnimatedScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onTouchStart={() => {}}
        onTouchMove={() => {}}
        onTouchEnd={() => {}}
        onScroll={handleScroll}
        onScrollEndDrag={handleScrollEndDrag}
        scrollEventThrottle={16}
      >
        {carouselItems.map((image, index) => (
          <View key={index} style={styles.cimageContainer}>
            <Image source={image} style={styles.cimage} />
          </View>
        ))}
      </AnimatedScrollView>
    </View>
  );
};

  async function click() {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/pisseim-mund-online-audio-converter.mp3')
    );
  
    await sound.playAsync();
  }

export default function GenerateCats({ navigation }) {
    const [touches, setTouches] = useState([]);
    const [image, setImage] = useState();
    const [goHome, setGoHome] = useState(false);
    const [loadVisible, setLoadVisible] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const toggleLoad = () => {
        setLoadVisible(!loadVisible);
    }

    const toggleLoadFalse = () => {
        setLoadVisible(loadVisible);
    }

    const toggleVisible = () => {
        setIsVisible(false);
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
            <ImageBackground source={require('../assets/catbg.png')} style={styles.bg}>
                <Text adjustsFontSizeToFit={true} style={styles.title}>Cat Lottery</Text>
                <AnimatedCarousel />
                <View style={{marginTop:'auto', margin: 30}}>
                    {isVisible && (
                        <Pressable style={styles.buttonContainer} onPress={async () => {
                            toggleLoad();
                            await createNewCat();
                            toggleLoadFalse();
                            toggleVisible();
                            click();
                        }}>
                            <Text style={styles.buttonText}>Get Cat!</Text>
                        </Pressable>
                    )}

                    {!isVisible && (
                        <Text style={styles.buttonText}>Cat Generated!</Text>
                    )}

                    <Pressable style={styles.buttonContainer} onPress={async () => { toggleLoad();console.log("beginning update first time"); await updateFirstTimeUser(); await getUserCat(); console.log("ending update first time");toggleLoadFalse(); setGoHome(!goHome); click()}}>
                        <Text style={styles.buttonText}>Return Home</Text>
                    </Pressable>
                </View>
            </ImageBackground>
       </View>
    ) : (<Home/>)
  }

  const styles = StyleSheet.create({
    ccontainer: {
        height: '50%'
      },
    cimageContainer: {
        width: Dimensions.get('window').width,
    },
    cimage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
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