import React, { useState,useRef, useEffect } from 'react';
import { Animated, StyleSheet, View, ImageBackground, Image, Dimensions, TextInput, Button, Text, ScrollView , TouchableOpacity,KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const window = Dimensions.get('window');
const WelcomeScreen = () => {
    const navigation = useNavigation(); 
    const [name, setName] = useState('');
    const storeText = async (value) => {
        try {
          await AsyncStorage.setItem('childName', value);
          console.log('Text saved');
        } catch (e) {
          // saving error
          console.log('Failed to save the text to the storage');
        }
      };
      const screenOpacity = useRef(new Animated.Value(0)).current;
        //Handling opacity of the entire screen
        useEffect(() => {
            Animated.timing(screenOpacity, {
                toValue: 1,
                duration: 2000, // Duration for fade-in
                useNativeDriver: true,
            }).start();
        }, []);


        const handlePress = () => {
            console.log(name);
            storeText(name);
        
            // Start the fade-out animation
            Animated.timing(screenOpacity, {
                toValue: 0,
                duration: 2000, // Duration for fade-out
                useNativeDriver: true,
            }).start(() => {
                // Navigate after fade-out completes
                navigation.navigate('Home');
            });
        };


    return (
        <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
                <View style={styles.container}>
                    <KeyboardAvoidingView style={styles.container}
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                            keyboardVerticalOffset={-90}>
                            <ScrollView style={styles.scrollViewStyle}>
                            <ImageBackground 
                                source={require('../../assets/WelcomeScreen/Stars.png')} 
                                style={styles.backgroundImage}
                                resizeMode='cover'
                            />
                                <Image
                                    source={require('../../assets/WelcomeScreen/planets.png')}
                                    style={styles.rocketImage}
                                    resizeMode='contain'
                                />
                                <Image
                                    source={require('../../assets/WelcomeScreen/rocket.png')}
                                    style={styles.planetImage}
                                    resizeMode='contain'
                                />
                                <View style={styles.nameInputBox}>
                                    <Text style={styles.welcomeText}>WELCOME</Text>
                                        <TextInput
                                            style={styles.inputBox}
                                            placeholder="Enter your name"
                                            placeholderTextColor="grey"
                                            onChangeText={text => setName(text)}
                                            value={name}
                                        />
                                        <TouchableOpacity onPress={handlePress} style={styles.button}>
                                        <ImageBackground
                                            source={require('../../assets/WelcomeScreen/backgroundGradient.jpg')} // Replace with your image path
                                            style={styles.background}
                                            resizeMode="cover"
                                        >
                                            <Text style={styles.buttonText}>Get Started</Text>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                    
                                </View>
                                <Image
                                    source={require('../../assets/WelcomeScreen/flippedKid.png')}
                                    style={styles.kidImage}
                                    resizeMode='contain'
                                />
                                <View style={styles.extraSpace}/>
                            </ScrollView>
                    </KeyboardAvoidingView>
                </View>
        </Animated.View>
        
    );
};

const styles = StyleSheet.create({
    scrollViewStyle: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    backgroundImage: {
        ...StyleSheet.absoluteFillObject, // This ensures the image covers the whole area
    },
    rocketImage: {
        top : window.height*0.01,
        right : window.width*0.1,
        position: 'absolute',
        width: window.width*0.5, // Set as per your requirement
        height: window.height*0.3, // Set as per your requirement
    },
    planetImage:{
        top : window.height*0.25,
        left : window.width*0.05,
        position: 'absolute',
        width: window.width*0.3, // Set as per your requirement
        height: window.height*0.2, // Set as per your requirement
    },
    kidImage:{
        width: window.width * 0.5,
        height: window.height * 0.27,
        alignSelf: 'center',
        marginBottom: window.height * 0.01,
        marginRight : window.width*0.6,
        marginTop : window.height*0.01
    },
    nameInputBox:{
        backgroundColor : 'rgba(28, 57, 187, 0.5)',
        padding: 10,
        borderWidth: 4,
        borderColor: 'yellow',
        borderRadius: 7,
        width: window.width * 0.9,
        height : window.height * 0.3,
        alignSelf: 'center',
        marginTop: window.height * 0.45, // Adjust as needed
    },
    welcomeText:{
        color : 'yellow',
        fontFamily : 'RobotoSlab_700Bold',
        fontSize : 30,
        textAlign : 'center',
        marginTop : 1,
        marginBottom : 10
    },
    inputBox:{
        marginTop : 15,
        backgroundColor : 'white',
        marginBottom : 10,
        padding : 10,
        fontSize : 20,
        color : '#3D92D4',
        borderRadius : 5,
        fontFamily : 'RobotoSlab_400Regular'
    },
    extraSpace: {
        height: 10, // Add extra space if needed for scrolling
    },
    button: {
        marginTop : 10,
        width: 200, // Set the width you want
        height: 50, // Set the height you want
        overflow: 'hidden', // To make sure the background image is contained within the button boundaries
        alignSelf : 'center'
    },
    background: {
        flex: 1,
        justifyContent: 'center', // Center the content vertically
        alignItems: 'center', // Center the content horizontally
    },
    buttonText: {
        color: 'white', 
        fontSize : 18,
        fontFamily : 'RobotoSlab_400Regular'
    },
});
   
   


export default WelcomeScreen;
