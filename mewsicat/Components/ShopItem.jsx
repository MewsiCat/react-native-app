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

export default function ShopItem({ itemName, itemDescription, itemImg, purchased }) {
    return (
        <View style={[styles.container, !purchased && styles.notPurchasedContainer]}>
            <Image source={itemImg} style={styles.IMG} />
            <View style={styles.textContainer}>
                <Text style={styles.name}>
                    {itemName}
                </Text>
                {/* <Text style={styles.desc}>
                    {itemDescription}
                </Text> */}
            </View>
            {purchased && (
                <Pressable style={styles.button} onPress={async() => {playSound()}}>
                    <Text adjustsFontSizeToFit={true} style={styles.pur}>
                        Equip
                    </Text>   
                </Pressable>
            )}
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
        opacity: 0.5, // Makes the component look darker
    },
    textContainer: {
        padding: 5,
        alignItems: 'center',
        height:"35%"
        
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
    }
});
