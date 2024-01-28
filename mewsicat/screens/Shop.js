import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView, Dimensions, Animated, PanResponder } from 'react-native';
import Slider from '@react-native-community/slider';
import { Overlay } from 'react-native-elements';
import MusicRec from './MusicRec';
import { Audio } from 'expo-av';
import { generateSong, stopMusic } from './MusicRec';
import Loading from './Loading';
import { Amplify, Auth, API, graphqlOperation } from 'aws-amplify';

import { playBGM, toggleBGM } from '../App';
import ShopItem from '../Components/ShopItem.jsx';
import { decreaseFishes, addAccessory, equipAccessory, dequipAccessory } from '../backend/api/amplifyDBFunctions';
import { listUsers, getUser, userByName, getFriend, getCat, catByName } from '../src/graphql/queries'
import { parse } from 'expo-linking';



const spriteSheet0 = require('../assets/black_0.png');
const spriteSheet1 = require('../assets/blue_0.png');
const spriteSheet2 = require('../assets/brown_0.png');
const spriteSheet3 = require('../assets/calico_0.png');
const spriteSheet4 = require('../assets/grey_0.png');
const outfit_christmasHat = require('../assets/christmasHatForCat.png');

var purchasedItems = [];
var equippedItems = [];


const items = [
    {
        id: "hat",
        desc: "wear a hat",
        img: require("../assets/purchasables/santaHatForCatFrame.png"),
        purchased: false,
        equipped: false,
        price: 5,
    },
    {
        id: "shoe",
        desc: "wear a shoe",
        img: require("../assets/wife.jpg"),
        purchased: false,
        equipped: false,
        price: 10,
    },
    {
        id: "wife",
        desc: "your wife",
        img: require("../assets/wife.jpg"),
        purchased: false,
        equipped: false,
        price: 5,
    },
    {
        id: "hat1",
        desc: "wear a hat",
        img: require("../assets/wife.jpg"),
        purchased: false,
        equipped: false,
        price: 10,
    },
    {
        id: "shoe1",
        desc: "wear a shoe",
        img: require("../assets/wife.jpg"),
        purchased: false,
        equipped: false,
        price: 5,
    },
    {
        id: "test",
        desc: "test",
        img: require("../assets/wife.jpg"),
        purchased: false,
        equipped: false,
        price: 15,
    },
    {
        id: "hat2",
        desc: "wear a hat",
        img: require("../assets/wife.jpg"),
        purchased: false,
        equipped: false,
        price: 5,
    },
    {
        id: "shoe2",
        desc: "wear a shoe",
        img: require("../assets/wife.jpg"),
        purchased: false,
        equipped: false,
        price: 5,
    },
    {
        id: "test1",
        desc: "test",
        img: require("../assets/wife.jpg"),
        purchased: false,
        equipped: false,
        price: 15,
    }
];



async function playMeow() {
    const { sound } = await Audio.Sound.createAsync(
        require('../assets/mewsound.mp3')
    );

    await sound.playAsync();
}

export default function Shop() {

    const spriteSheets = [spriteSheet0, spriteSheet1, spriteSheet2, spriteSheet3, spriteSheet4];
    const [spriteSheetSource, setSpriteSheetSource] = useState(spriteSheets[Math.floor(Math.random() * spriteSheets.length)]);

    const [spriteStartX, setSpriteStartX] = useState(384);
    const [spriteStartY, setSpriteStartY] = useState(32);


    const [recVisible, setRecVisible] = useState(false);
    const [loadVisible, setLoadVisible] = useState(false);
    const [shopItems, setShopItems] = useState(items);
    const [equipmentChanged, setEquipmentChanged] = useState(false);
    let directionIndex = 0;
    let sumvx = 0;


    useEffect(() => {
        const fetchFriends = async () => {
            await getUserCat();
        };
        fetchFriends();
    }, []);
    async function getUserCat() {
        const currentUserInfo = await Auth.currentUserInfo();
        const currentUser = currentUserInfo.username;
        const currUserParams = {
            name: currentUser
        };
        const userCatResult = await API.graphql(graphqlOperation(catByName, currUserParams));
        purchasedItems = userCatResult.data.catByName.items[0].availableAccessories;
        equippedItems = userCatResult.data.catByName.items[0].equippedAccessories;
        let updatedShopItems = shopItems.map(item => {
            let updatedItem = { ...item };
                if (purchasedItems.includes(item.id)) {
                updatedItem.purchased = !item.purchased;
            }

            if (equippedItems.includes(item.id)) {
                updatedItem.equipped = !item.equipped;
            }    
            return updatedItem;
        });

    setShopItems(updatedShopItems);
    console.log(updatedShopItems);

    setEquipmentChanged(prev => !prev);
    }

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gestureState) => {
                // Check the movement to determine the swipe direction
                const { vx } = gestureState;
                const velocityThreshold = 0.5;
                console.log(vx + "           " + sumvx);
                if (Math.abs(vx) > velocityThreshold) {
                    const rotationAmount = parseInt(vx * 2);
                    console.log(rotationAmount);

                    directionIndex -= rotationAmount;
                    if (directionIndex > 7) {
                        directionIndex -= 8;
                    }
                    if (directionIndex < 0) {
                        directionIndex += 8;
                    }
                    setSpriteStartY(32 + directionIndex * 64);
                }
                else {
                    sumvx += vx;
                    if (Math.abs(sumvx) > 2) {
                        directionIndex -= parseInt(sumvx / 2);
                        if (directionIndex > 7) {
                            directionIndex -= 8;
                        }
                        if (directionIndex < 0) {
                            directionIndex += 8;
                        }
                        setSpriteStartY(32 + directionIndex * 64);
                        sumvx = 0;
                    }
                }

            },
            onPanResponderRelease: () => {
                // Handle the end of the touch event
            },
        })
    ).current;


    const handlePurchase = async (itemId) => {
        // Find the item
        const itemToPurchase = shopItems.find(item => item.id === itemId);
        if (!itemToPurchase) return; // Exit if item not found

        // Perform the async operation
        await decreaseFishes(itemToPurchase.price);

        // Update the items
        const updatedItems = shopItems.map(item => {
            if (item.id === itemId) {
                return { ...item, purchased: !item.purchased };
            }
            return item;
        });

        // Update the state
        setShopItems(updatedItems);
        const alreadyhave = purchasedItems.find(item => item.id === itemId);
        if (alreadyhave ===  undefined) {
            await addAccessory(itemId);
        }
    };


    const handleEquip = async (itemId) => {
        let isItemEquippedOrDequipped = null;
        const updatedItems = shopItems.map(item => {
            if (item.id === itemId) {
                isItemEquippedOrDequipped = !item.equipped
                return { ...item, equipped: !item.equipped };
            }
            return item;
        });
        setShopItems(updatedItems);
        isItemEquippedOrDequipped ? await equipAccessory(itemId) : await dequipAccessory(itemId);
        setEquipmentChanged(prev => !prev);
    };

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

    const renderRows = () => {
        let rows = [];
        for (let i = 0; i < shopItems.length; i += 3) {
            rows.push(
                <View key={"row-" + i} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    {shopItems.slice(i, i + 3).map((item, index) => (
                        <View key={item.id + "-" + index} style={{ width: '32%', margin: '0.5%', height: 160 }}>
                            <ShopItem
                                itemName={item.id}
                                itemDescription={item.desc}
                                itemImg={item.img}
                                purchased={item.purchased}
                                equipped={item.equipped}
                                onPurchase={() => handlePurchase(item.id)}
                                onEquip={() => handleEquip(item.id)}
                                price={item.price}
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
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20, alignItems: "center" }} >
                <Text style={styles.title}>Cat Shack</Text>
                <Image source={require('../assets/shopKeepingCat.png')} style={styles.img} />
            </View>


            <View style={{ height: "40%", borderColor: "#783621", borderRadius: 10, borderWidth: 2, backgroundColor: "rgba(0,0,0,0.2)", alignItems: "center" }}
                {...panResponder.panHandlers}
            >
                <SpriteDisplay
                    source={spriteSheetSource}
                    startX={spriteStartX}
                    startY={spriteStartY}
                    resetAnimation={equipmentChanged}
                />
                {shopItems[0] && shopItems[0].equipped && (
                    <SpriteDisplay
                        source={outfit_christmasHat}
                        startX={spriteStartX}
                        startY={spriteStartY}
                        resetAnimation={equipmentChanged}
                    />
                )}
            </View>

            <View style={{ marginTop: '10%', height: "40%", borderColor: "#783621", borderRadius: 10, borderWidth: 2, padding: 2, backgroundColor: "rgba(0,0,0,0.2)" }}>
                <ScrollView>

                    <View style={{ padding: 0 }}>
                        {renderRows(items)}
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

const SpriteDisplay = ({ source, startX, startY, resetAnimation }) => {
    const animation = useState(new Animated.Value(0))[0];
    const frameCount = 4;
    const frameWidth = 32;
    const frameHeight = 32;
    const frameDuration = 150;
    const scale = 8;

    useEffect(() => {
        animation.setValue(0);
    }, [startX, startY]); //reset animation when these 3 change

    const inputRange = Array.from({ length: frameCount }, (_, i) => i);
    const translateXOutputRange = inputRange.map(index => -(startX + (index % 4) * frameWidth));
    const translateYOutputRange = inputRange.map(index => -(startY + Math.floor(index / 4) * frameHeight));

    useEffect(() => {
        let currentFrame = 0;
        if (frameCount > 1) {
            const frameUpdateInterval = setInterval(() => {
                currentFrame = (currentFrame + 1) % frameCount;
                animation.setValue(currentFrame);
            }, frameDuration);
            return () => clearInterval(frameUpdateInterval);
        } else {
            animation.setValue(frameCount - 1);
        }

    }, [animation, frameCount, frameDuration, resetAnimation]);


    const adjustedInputRange = frameCount > 1 ? inputRange : [0, 1];

    const adjustedTranslateXOutputRange = frameCount > 1 ? translateXOutputRange : [translateXOutputRange[0], translateXOutputRange[0]];
    const adjustedTranslateYOutputRange = frameCount > 1 ? translateYOutputRange : [translateYOutputRange[0], translateYOutputRange[0]];


    const frameStyle = {
        height: frameHeight * scale,
        width: frameWidth * scale,
        marginTop: '10%',
        position: 'absolute',
        overflow: 'hidden',
    };

    const imageStyle = {
        width: 1024 * scale,
        height: 544 * scale,
        marginTop: -5,
        position: 'absolute',
        transform: [
            {
                translateX: animation.interpolate({
                    inputRange: adjustedInputRange,
                    outputRange: adjustedTranslateXOutputRange.map(value => value * scale),
                    extrapolate: 'clamp'
                }),
            },
            {
                translateY: animation.interpolate({
                    inputRange: adjustedInputRange,
                    outputRange: adjustedTranslateYOutputRange.map(value => value * scale),
                    extrapolate: 'clamp'
                }),
            },
        ],
    };

    return (
        <Animated.View style={frameStyle}>
            <Animated.Image source={source} style={imageStyle} />
        </Animated.View>
    );
};

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