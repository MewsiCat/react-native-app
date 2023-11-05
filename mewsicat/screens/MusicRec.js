import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import Slider from '@react-native-community/slider';

export default function MusicRec() {
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Judebox</Text>
            <Image source={require('../assets/judebox.gif')} style={styles.img} />
            <Pressable style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Get Song</Text>
            </Pressable>
        </View>
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
        backgroundColor: '#f0d396',
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