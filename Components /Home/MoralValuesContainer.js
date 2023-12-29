import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Text,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { moralValuesData } from './MoralValueData';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const images = moralValuesData;

// Modify the styles to arrange two items per row
const styles = StyleSheet.create({
  scrollViewContainer: {
    position: 'relative',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  imageContainer: {
    width: screenWidth * 0.4, // Adjusted width to fit two items in a row with spacing
    marginBottom: 20, // Added margin for spacing between rows
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: screenWidth * 0.4, // or some other height as needed
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 4,
    borderColor: 'white',
    // ... other styles
  },
  titleCategory: {
    width: '100%',
    textAlign: 'center',
    color: 'white',
    padding: 10,
    backgroundColor: '#3D92D4',
    fontFamily: 'RobotoSlab_500Medium',
    fontSize : 11,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    // ... other styles
  },
  storyCategory:{
    backgroundColor : '#FF6F61',
    padding : 5,
    color : 'white',
    fontFamily : 'RobotoSlab_500Medium'
  }
});

const MoralValuesContainer = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(screenHeight)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, { // Change from translateX to translateY
          toValue: 0, // Animate to the top of the screen
          duration: 2000,
          useNativeDriver: true,
        }),
      ]).start();
    }, 2000);
  }, []);

  const handleScroll = (direction) => {
    let newIndex = currentIndex;
    if (direction === 'left' && currentIndex > 0) {
      newIndex = currentIndex - 1;
    } else if (direction === 'right' && currentIndex < images.length - 1) {
      newIndex = currentIndex + 1;
    }
    scrollViewRef.current.scrollTo({
      x: screenWidth * newIndex,
      animated: true,
    });
    setCurrentIndex(newIndex);
  };

  const handleOnMomentumScrollEnd = (e) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / screenWidth);
    setCurrentIndex(newIndex);
  };

  const navigateToHonestyStory = (item) => {
    const storyName = item.storyName;
    navigation.navigate('Honesty', { storyName });
  };

  // Render two items per row inside ScrollView
  const renderImageRows = () => {
    const rows = [];
    for (let i = 0; i < images.length; i += 2) {
      const rowItems = (
        <View key={i} style={styles.rowContainer}>
          {renderImage(images[i])}
          {i + 1 < images.length && renderImage(images[i + 1])}
        </View>
      );
      rows.push(rowItems);
    }
    return rows;
  };

  const renderImage = (item) => {
    let backgroundColour;
    if(item.name == "Kindness"){
        backgroundColour = "#DC4731"
    }
    else if(item.name == "Honesty"){
      backgroundColour = "#7A871E"
    }
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.imageContainer}
        onPress={() => {
          navigateToHonestyStory(item);
        }}
      >
        <Text style={[styles.storyCategory, { backgroundColor : backgroundColour }]}>
          {item.name}
        </Text>
        <Image source={item.imageSource} style={styles.image} resizeMode='contain' />
        <Text style={styles.titleCategory}>{item.storyTitle}</Text>
      </TouchableOpacity>
    );
  };
  

  return (
    <Animated.View style={[styles.scrollViewContainer, { opacity: fadeAnim, transform: [{ translateY }] }]}>
      <ScrollView
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleOnMomentumScrollEnd}
        style={styles.scrollView}
      >
        {renderImageRows()}
      </ScrollView>
    </Animated.View>
  );
};

export default MoralValuesContainer;
