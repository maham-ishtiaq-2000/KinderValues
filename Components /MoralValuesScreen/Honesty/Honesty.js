import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ImageBackground, Button, ScrollView, Animated } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import BackButton from '../../ResusableComponents/BackButton';


const moralValuesData = [
  {
    id: '1',
    imageSource: require('../../../assets/HomeScreen/MoralValuesCategories/Kindness.png'),
    name: 'Kindness'
  },
  {
    id: '2',
    imageSource: require('../../../assets/HomeScreen/MoralValuesCategories/Honesty.png'),
    name: 'Honesty'
  },
  {
    id : '3',
    imageSource: require('../../../assets/HomeScreen/MoralValuesCategories/respect.png'),
    name: 'Respect'
  },
  {
      id : '4',
      imageSource: require('../../../assets/HomeScreen/MoralValuesCategories/cooperation.png'),
      name: 'Cooperation'
  },
  {
      id : '4',
      imageSource: require('../../../assets/HomeScreen/MoralValuesCategories/patience.png'),
      name: 'Patience'
  }
];


const { width, height } = Dimensions.get('window');

const Honesty = ({ navigation }) => {
  const animatedValues = moralValuesData.map(() => new Animated.Value(height)); // Start off-screen

  useEffect(() => {
    const lockOrientation = async () => {
      try {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      } catch (e) {
        console.error("Failed to lock orientation:", e);
      }
    };
    lockOrientation();

    // Sequentially animate items
    const animations = animatedValues.map(animatedValue => {
      return Animated.timing(animatedValue, {
        toValue: 0, // End at their position
        duration: 2000,
        useNativeDriver: true
      });
    });

    Animated.stagger(300, animations).start(); // Start animations with a stagger

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  const handlePress = () => {
    console.log('Button pressed!');
    // Add your button press handling logic here
  };
  const renderAnimatedItem = (item, index) => {
    return (
      <Animated.View
        key={item.id}
        style={{
          ...styles.itemContainer,
          transform: [{ translateY: animatedValues[index] }]
        }}
      >
        <Image source={item.imageSource} style={styles.whiteView} resizeMode='contain' />
        <View style={styles.imageCaption}>
          <Text style={{ alignSelf: "center", color: "black", fontFamily: 'RobotoSlab_700Bold', fontSize: 15 }}>
            {item.name}
          </Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <ImageBackground source={require('../../../assets/HomeScreen/lightSky.png')} style={styles.backgroundImage}>
      <BackButton navigation={navigation}></BackButton>
      <ScrollView style={styles.scrollView}>
        {moralValuesData.map(renderAnimatedItem)}
      </ScrollView>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  whiteView: {
    backgroundColor: 'white',
    width: width * 0.8, // 80% of screen width
    height: height * 0.5, // 50% of screen height
    alignSelf: 'center', // Centers the view
    alignItems: 'center', // Centers the image horizontally
    justifyContent: 'center', // Centers the image vertically
    borderTopLeftRadius: 10, // Adjust radius as needed
    borderTopRightRadius: 10, 
    borderWidth: 4, // Width of the border
    borderColor: 'white', // Color of the border
  },
  
  imageCaption : {
    alignSelf : 'center',
    width : width*0.8,
    backgroundColor : 'rgba(255, 255, 255, 0.7)',
    padding : 10,
    borderBottomLeftRadius: 10, // Adjust radius as needed
    borderBottomRightRadius: 10, 
    marginBottom : 20
  },
  scrollView: {
    width: width * 0.9,
    alignSelf: 'center',
    marginBottom : 5,
    marginTop : 40
  },
});

export default Honesty;
