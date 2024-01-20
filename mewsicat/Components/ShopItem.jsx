import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, Dimensions } from 'react-native';
import Loading from '../screens/Loading';
import { Audio } from 'expo-av';


async function playSound() {
  const { sound } = await Audio.Sound.createAsync(
    require('../assets/mewsound.mp3')
  );

  await sound.playAsync();
}


export default function ShopItem({ itemName, itemDescription, itemImg, purchased, equipped, onEquip, price, onPurchase}) {
    return (
        <View style={[styles.container, equipped && styles.notPurchasedContainer]}>
            <Image source={itemImg} style={styles.IMG} />
            <View style={styles.textContainer}>
                <Text style={styles.name}>
                    {itemName}
                </Text>
            </View>
        
        {purchased ? (
        <Pressable style={styles.button} onPress={() => { playSound(); onEquip(); }}>
            <Text adjustsFontSizeToFit={true} style={styles.pur}>
            {equipped ? 'Unequip' : 'Equip'}
            </Text>   
        </Pressable>
        ) :
        <Pressable style={styles.button} onPress={() => { playSound(); onPurchase(); }}>
            <View style={styles.priceTag}>
            <Image source={require('../assets/tiff/fish.png')} style={styles.currImage}/>
            <Text adjustsFontSizeToFit={true} style={styles.pur}>
            {(': ' + price)}
            </Text> 
            </View>  
        </Pressable>
        }
        </View>
        

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0d396',
        borderColor: '#783621',
        borderWidth: 2,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'column',
        padding: 4,
        height:'100%'
    },
    notPurchasedContainer: {
        opacity: 0.5, 
    },
    textContainer: {
        padding: 5,
        alignItems: 'center',
        // height:"35%"
        
    },
    button: {
        backgroundColor: '#f0d396',
        borderColor:'#d0a060',
        width:"95%",
        paddingHorizontal: 8,
        alignItems: 'center',
        borderWidth:2,
        borderRadius: 10,
    },
    pur: {
        color: '#783621',
        fontWeight: 'bold',    

    },
    name: {
        fontSize: 16,
    },
    desc: {
        fontSize: 14,
        color: "gray"
    },
    IMG: {
        width: "100%",
        height: undefined,
        aspectRatio:1,
        // aspectRatio: 0.1,
        borderRadius: 10,
    },
    currImage : {
        maxHeight: 22,
        maxWidth: 25,
        marginRight: 'auto'
    },
    priceTag : {
        flexDirection: 'row'
    }
});
