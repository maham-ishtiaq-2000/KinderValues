import React,{useEffect,useRef} from 'react';
import { StyleSheet, ScrollView, ImageBackground, Dimensions,View,Text , Animated , Image , TouchableOpacity, Button} from 'react-native';
import SingleStory from './SingleStory';

const window = Dimensions.get('window');


const HomeScreen = () => {
    const translateY = useRef(new Animated.Value(-350)).current; // Start above the screen

    useEffect(() => {
        Animated.timing(translateY, {
            toValue: 0, // Final position on the screen
            duration: 2000, // Animation duration
            useNativeDriver: true,
        }).start();
    }, []);
  return (
      <ImageBackground 
          source={require('../../assets/HomeScreen/lightSky.webp')} // Replace with your image path
          style={styles.backgroundImage}
          resizeMode="cover"
      >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Animated.View 
                        style={[
                            styles.selectCategoryKid,
                            { transform: [{ translateY }] } // Apply the animated value here
                        ]}
                    >
                        <View style={styles.kidsName}>
                        <View style={styles.hiDiv}>
                        <Text style={styles.emojiText}>👋🏼</Text>
                        
                        </View>
                        <View style={styles.nameDiv}>
                            <Text style={{"color" : "#36454F" , fontSize : 15 ,  fontFamily: 'RobotoSlab_400Regular'}}>Hello!</Text>
                            <Text  style={{"color" : "#18516F" , fontSize : 30  , fontFamily: 'RobotoSlab_400Regular'}}>Maham Ishtiaq</Text>
                        </View>
                    </View> 
                    <View style={styles.selectCategoryKid}>
                    <View style={styles.imageDiv}>
                        <Image
                            source={require('../../assets/HomeScreen/categorySelectingKid.webp')}
                            style={styles.selectCategoryKidImage}
                            resizeMode='contain'
                        />
                    </View>
                    <View style={styles.titleDiv}>
                        <View style={styles.heading}>
                            <ImageBackground
                                    source={require('../../assets/HomeScreen/whiteBlueGradient.webp')} // Replace with your image path
                                    style={styles.background}
                                    resizeMode="cover"
                            >
                            <Text style={styles.selectCategoryText}>Your Playtime, Your Choices</Text>
                            </ImageBackground>
                    </View>
                    </View>
                    <SingleStory></SingleStory>
                </View>   
            </Animated.View>  
          </ScrollView>
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
      flex: 1,
      width: '100%',
      height: '100%',
  },
  scrollViewContent: {
      flexGrow: 1,
  },
  kidsName: {
    flexDirection: 'row', // Align children in a row
    marginTop: 45,       // Margin top
    marginLeft: 10,      // Margin left
    marginRight: 10,     // Margin right
    height: window.height * 0.13, // 10% of screen height
    width : window.width * 1.0
  },
  hiDiv:{
    width : window.width*0.2,
    marginRight : 10,
    alignItems : 'center'
  },
  nameDiv: {
      flex: 1,             // Each child takes up equal width
  },
  emojiText: {
    fontSize: window.height*0.065, // Adjust this value to change the size of the emoji
  },
  selectCategoryKidImage: {
    alignSelf : 'center',
    width: window.width*0.5, // Set as per your requirement
    height: window.height*0.15, // Set as per your requirement
    marginBottom:0
  },
  imageDiv: {
      height: window.height*0.15, 
      marginBottom: 0, // No margin at the bottom
  },
  titleDiv: {
      height: 100, // Adjust the height as needed
      marginTop: 0, // No margin at the top
  },
  heading: {
    width: window.width*0.8, // Set the width you want
    height: window.height*0.1, // Set the height you want
    overflow: 'hidden', // To make sure the background image is contained within the button boundaries
    alignSelf : 'center'
  },
  background: {
      flex: 1,
      justifyContent: 'center', // Center the content vertically
      alignItems: 'center', // Center the content horizontally
  },
  selectCategoryText: {
      color: '#3072A8', 
      fontSize : 18,// Set the text color that contrasts well with your background
      fontFamily: 'RobotoSlab_700Bold'
  },
});

export default HomeScreen;




