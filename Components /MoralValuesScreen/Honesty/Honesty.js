import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ImageBackground, Button, ScrollView, Animated,TouchableOpacity } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { storySlidesArrayData,rightOptionArrayData, wrongOptionArrayData } from './Stories/Data/TheWalletAdventure';
import { storyHonesty2SlidesArrayData,rightOptionHonesty2ArrayData, wrongOptionHonesty2ArrayData } from './Stories/Data/Honesty2';
import BackButton from '../../ResusableComponents/BackButton';
import { useNavigation } from '@react-navigation/native';


const moralValuesData = [
  {
    id: '1',
    imageSource: require('../../../assets/HomeScreen/MoralValuesCategories/Kindness.webp'),
    name: 'Honesty2',
    title : 'Honesty2',
    mainArrayData : storyHonesty2SlidesArrayData,
    rightOptionData : rightOptionHonesty2ArrayData,
    wrongOptionData : wrongOptionHonesty2ArrayData
  },
  {
    id: '2',
    imageSource: require('../../../assets/HomeScreen/MoralValuesCategories/Honesty.webp'),
    name: 'TheWalletAdventure',
    title : 'TheWalletAdventure',
    mainArrayData : storySlidesArrayData,
    rightOptionData : rightOptionArrayData,
    wrongOptionData : wrongOptionArrayData
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
  };

  const renderAnimatedItem = (item, index) => {
    const navigation = useNavigation(); 
    const navigateToHonestyStory = (item) =>{
        const mainArrayData = item.mainArrayData
        const rightOptionData = item.rightOptionData
        const wrongOptionData = item.wrongOptionData
        navigation.navigate('NewHonesty' , {mainArrayData , rightOptionData , wrongOptionData});

    }
    return (
      <Animated.View
        key={item.id}
        style={{
          ...styles.itemContainer,
          transform: [{ translateY: animatedValues[index] }]
        }}
      >
        <TouchableOpacity
            key={item.id}
            onPress={() => {navigateToHonestyStory(item)}} // Replace 'Home' with the name of your home screen
            style={{...styles.itemContainer, transform: [{ translateY: animatedValues[index] }]}}
          >
            <Image source={item.imageSource} style={styles.whiteView} resizeMode='contain' />
            <View style={styles.imageCaption}>
              <Text style={{ alignSelf: "center", color: "white", fontFamily: 'RobotoSlab_700Bold' }}>
                {item.name}
              </Text>
            </View>
      </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <ImageBackground source={require('../../../assets/HomeScreen/lightSky.webp')} style={styles.backgroundImage}>
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
    backgroundColor : '#3D92D4',
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
