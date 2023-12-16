import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  // Animated values for images
  const opacity1 = useRef(new Animated.Value(0)).current;
  const opacity2 = useRef(new Animated.Value(0)).current;
  const opacity3 = useRef(new Animated.Value(0)).current;
  // Animated value for the entire screen
  const screenOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Start the fade-in animations for images
    Animated.timing(opacity1, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacity2, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacity3, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    // Set the timer for navigation
    const timer = setTimeout(() => {
      // Start the fade-out animation
      Animated.timing(screenOpacity, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        // Navigate after the fade-out completes
        navigation.navigate('WelcomeScreen');
      });
    }, 2000); // 2 seconds delay for initial fade-in

    return () => clearTimeout(timer); // Cleanup the timer
  }, [navigation, opacity1, opacity2, opacity3, screenOpacity]);

  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
      <Animated.Image
        source={require('../../assets/AnimatedLogo/BoyRunning.webp')}
        style={[styles.backgroundImage, { opacity: opacity1 }]}
        resizeMode="contain"
      />
      <Animated.Image
        source={require('../../assets/AnimatedLogo/Grass.webp')}
        style={[styles.foregroundImage, { opacity: opacity2 }]}
      />
      <Animated.Image
        source={require('../../assets/AnimatedLogo/Stars.webp')}
        style={[styles.newImage, { opacity: opacity3 }]}
      />
    </Animated.View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
    alignItems: 'center'
  },
  backgroundImage: {
    width: '50%',
    height: '33%',
    marginTop: 250,
  },
  foregroundImage: {
    position: 'absolute',
    bottom: 100,
    right: 60,
    width: '77%',
    height: '50%',
    resizeMode: 'contain',
  },
  newImage: {
    position: 'absolute',
    width: '77%',
    height: '25%',
    resizeMode: 'contain',
    top: 130,
  }
});

export default SplashScreen;
