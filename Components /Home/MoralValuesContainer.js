import React, { useRef,useState, useEffect } from 'react';
import { View, Image, ScrollView, TouchableOpacity, Dimensions, StyleSheet, Text, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { moralValuesData } from './MoralValueData';

const screenWidth = Dimensions.get('window').width;
const images = moralValuesData

const styles = StyleSheet.create({
  scrollViewContainer: {
    position: 'relative',
  },
  scrollView: {
    flexDirection: 'row',
  },
  imageContainer: {
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
    border : 1,
    borderRadius : 25,
    overflow: 'hidden'
  },
  image: {
    width: screenWidth*0.75,
    height: screenWidth*0.8, // or some other height as needed
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 20,   // No border radius on the top left
    borderTopRightRadius: 20, 
    borderWidth : 4,
    borderColor : 'white'
    // ... other styles

  },
  arrow: {
    position: 'absolute',
    top: '50%',
    padding: 10,
    fontSize: 40,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0,0.5)',
    borderRadius: 15,
  },
  leftArrow: {
    left: 10,
  },
  rightArrow: {
    right: 10,
  },
  titleCategory: {
    position: 'relative',
    width: screenWidth * 0.75,
    textAlign: 'center',
    color: 'white',
    padding: 10,
    backgroundColor: '#3D92D4',
    fontFamily : 'RobotoSlab_500Medium',
    fontSize: 25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 0,   // No border radius on the top left
    borderTopRightRadius: 0,  // No border radius on the top right
    // ... other styles
  },
});

const MoralValuesContainer = () => {
  const navigation = useNavigation(); 
  const scrollViewRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity is 0
  const translateX = useRef(new Animated.Value(screenWidth)).current; // Start off the right side of the screen

  useEffect(() => {
    // Delay the appearance of the component
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1, // Fade in to full opacity
          duration: 2000, // Duration of fade-in
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0, // Slide in to the final position
          duration: 2000, // Duration of slide-in
          useNativeDriver: true,
        })
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

  return (
    <Animated.View 
    style={[styles.scrollViewContainer, { opacity: fadeAnim, transform: [{ translateX }] }]}>
        <View style={styles.scrollViewContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleOnMomentumScrollEnd}
          style={styles.scrollView}
        >
          {images.map((img, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.imageContainer}
            onPress={() => navigation.navigate(img.name)} // Navigate to Home screen
          >
            <Image source={img.imageSource} style={styles.image} />
            <Text style={styles.titleCategory}>{img.name}</Text>
          </TouchableOpacity>
        ))}
        </ScrollView>
        {currentIndex > 0 && (
          <TouchableOpacity
            style={[styles.arrow, styles.leftArrow]}
            onPress={() => handleScroll('left')}
          >
            <Text>{'<'}</Text>
          </TouchableOpacity>
        )}
        {currentIndex < images.length - 1 && (
          <TouchableOpacity
            style={[styles.arrow, styles.rightArrow]}
            onPress={() => handleScroll('right')}
          >
            <Text>{'>'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
   
  );
};

export default MoralValuesContainer;