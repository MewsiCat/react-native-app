import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';

export default function Loading() {
    
    return (
        <View style={styles.container}>
            <Image source={require('../assets/loading.gif')} style={styles.img} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0d396',
        padding: 20,
        flexDirection: 'column',
        flex: 1,
    },
    img: {
        alignSelf:'center',
        width: 300,
        height: 250,
        margin: 150
    }
})