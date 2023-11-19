import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import Loading from '../screens/Loading';
import { Audio } from 'expo-av';

async function playSound() {
  const { sound } = await Audio.Sound.createAsync(
    require('../assets/mewsound.mp3')
  );

  await sound.playAsync();
}

export default function ShopItem({ itemName, itemDescription, itemImg, purchased }) {

    return (!purchased) ? (
        <View style={styles.container}>
            <View>
                <Image source={{ uri: itemImg }} style={styles.IMG} />
            </View>
            <View style={{padding: 5}}>
                <Text style={styles.name}>
                    {itemName}
                </Text>
                <Text style={styles.desc}>
                    {itemDescription}
                </Text>
            </View>
            <View style={{marginLeft: 'auto', alignSelf: 'center'}}>
                <Pressable style={styles.button} onPress={async() => {playSound()}}>
                    <Text style={styles.pur}>
                        Purchase
                    </Text>
                </Pressable>
            </View>
        </View>
    ) : (
        <View style={styles.container}>
            <View>
                <Image source={{ uri: itemImg }} style={styles.IMG} />
            </View>
            <View style={{padding: 5}}>
                <Text style={styles.name}>
                    {itemName}
                </Text>
                <Text style={styles.desc}>
                    {itemDescription}
                </Text>
            </View>
            <View style={{marginLeft: 'auto', alignSelf: 'center'}}>
                <Pressable style={styles.buttonD} disabled={true}>
                    <Text style={styles.pur}>
                        Purchased
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        backgroundColor: '#f0d396',
        borderColor: '#783621',
        paddingHorizontal: 8,
        borderWidth: 2,
        borderRadius: 10,
        height: '100%',
        width: '100%',
        padding: 3,
        flexDirection: 'row'
    },
    button: {
        padding: 10,
        paddingHorizontal: 14,
        borderRadius: 20,
        backgroundColor: '#ffffff'
    },
    buttonD:  {
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'gray'
    },
    pur: {
        fontSize: 10
    },
    name: {

    },
    desc: {

    },
    IMG: {
        height: 30,
        width: 30
    }
});