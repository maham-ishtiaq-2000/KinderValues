import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Animated, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';



const EndScreenModals = () => {
    const navigation = useNavigation();
    const [fadeAnim] = useState(new Animated.Value(0));
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width); // State for screen width
    const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height); // State for screen height

    useEffect(() => {
        const updateDimensions = () => {
            const { width, height } = Dimensions.get('window');
            setScreenWidth(width);
            setScreenHeight(height);
        };

        updateDimensions(); // Call once to set initial dimensions

        const dimensionsListener = Dimensions.addEventListener('change', updateDimensions);

        Animated.timing(
            fadeAnim,
            {
                toValue: 1, // Final opacity is 1
                duration: 5000, // Duration of the animation
                useNativeDriver: true, // Use native driver for better performance
            }
        ).start();

        return () => {
            dimensionsListener.remove(); // Remove event listener when the component unmounts
        };
    }, [fadeAnim]);

    const handleReloadPress = () => {
        navigation.navigate('Home');
    };

    const handleHomePress = () => {
        navigation.navigate('Home');
    };

 

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <Image
                source={require('../../../assets/endScreen/endScreen.webp')}
                style={styles.backgroundImage}
                contentFit="cover"
            />
            <View style={styles.overlay} />
            <View style={styles.content}>
                <TouchableOpacity onPress={handleReloadPress}>
                    <Image
                        source={require('../../../assets/endScreen/reloadEndScreen.webp')}
                        style={{width : screenWidth*0.5 , height : screenHeight*0.9}}
                        contentFit='contain'
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleHomePress}>
                    <Image
                        source={require('../../../assets/endScreen/homeEndScreen.webp')}
                        style={{width : screenWidth*0.5 , height : screenHeight*0.9}}
                        contentFit='contain'
                    />
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        width: '100%', 
        height: '100%', 
        position: 'absolute',
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '20%',
        marginTop : 20      
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
    },
    // ... other styles ...
});


export default EndScreenModals;
