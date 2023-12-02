import React, {useEffect} from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';

export default function Loading() {

    // useEffect(() => {
    //     moveToNewPosition();
    
    //     return () => {
    //       stopAnimationAndListeners();
    //     };
    //   }, []);
    
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image source={require('../assets/loading.gif')} style={styles.img} />
                <Text style={styles.text}>Loading...</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0d396',
        padding: 20,
        flex: 1,
        justifyContent: 'center',
    },
    img: {
        alignSelf:'center',
        width: 300,
        height: 250,
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        alignSelf: 'center',
        padding: 10,
        color: '#783621',
        fontFamily: 'Creamy-Sugar'
    },
})