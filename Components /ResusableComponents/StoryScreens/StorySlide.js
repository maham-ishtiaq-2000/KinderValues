import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Modal, View, Dimensions, StyleSheet, Text, TouchableOpacity, Button } from 'react-native';
import { Image } from 'expo-image';
import Swiper from 'react-native-swiper';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useNavigation } from '@react-navigation/native';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;



const PrevButton = () => (
    <Text style={[styles.button, { left: 0.01 }]}>&lsaquo;</Text>
);

const NextButton = () => (
    <Text style={[styles.button, { right: 0.01 }]}>&rsaquo;</Text>
);

const StorySlide = ({storySlidesArrayData,rightOptionSlidesData,wrongOptionSlidesData}) => {
  const storySlidesArray = storySlidesArrayData
  const rightOptionSlides = rightOptionSlidesData
  const wrongOptionSlides = wrongOptionSlidesData
  const navigation = useNavigation(); 
    const [activeSwiper, setActiveSwiper] = useState('main');
    const [showModal, setShowModal] = useState(false);
    const [containerColor, setContainerColor] = useState("blue");
    const [currentIndex, setCurrentIndex] = useState(0);
    const swiperRef = useRef(null);
    const [dimensions, setDimensions] = useState({
        screenWidth: Dimensions.get('window').width,
        screenHeight: Dimensions.get('window').height,
    });
    const getModalDimensions = () => ({
      modalWidth: Dimensions.get('window').width * 0.7,
      modalHeight: Dimensions.get('window').height * 0.7,
  });
  const [modalDimensions, setModalDimensions] = useState(getModalDimensions());

  // Function to reset the component
 
    const onLayout = (event) => {
        const { width, height } = event.nativeEvent.layout;
        setDimensions({ screenWidth: width, screenHeight: height });
    };
   

    useEffect(() => {
        const lockOrientation = async () => {
            try {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
            } catch (e) {
                console.error("Failed to lock orientation:", e);
            }
        };
        const updateModalDimensions = () => {
          setModalDimensions({
              modalWidth: Dimensions.get('window').width * 0.7,
              modalHeight: Dimensions.get('window').height * 0.7,
          });
      };

      // Update the dimensions initially and on screen resize
      updateModalDimensions();

        lockOrientation();
         // Update modal dimensions whenever screen dimensions change
      const subscription = Dimensions.addEventListener('change', ({ window }) => {
          setDimensions({ screenWidth: window.width, screenHeight: window.height });
          updateModalDimensions();
      });

    

        return () => {
            subscription?.remove();
            ScreenOrientation.unlockAsync();
        };
    }, []);

    const key = dimensions.screenWidth + dimensions.screenHeight;
    const dynamicSlideStyle = {
        width: dimensions.screenWidth * 0.9,
        height: dimensions.screenHeight,
        marginLeft: dimensions.screenWidth * 0.05,
        marginRight: dimensions.screenWidth * 0.05,
    };

    const dynamicModalStyle = useMemo(() => ({
      width: dimensions.screenWidth * 0.7,
      height: dimensions.screenHeight * 0.7,
  }), [dimensions]);


   
    const handleIndexChanged = (index) => {
      let currentSlideId;
  
      // Check the active swiper and set the currentSlideId based on it
      if (activeSwiper === 'main') {
          setContainerColor(storySlidesArray[index]?.color || '#FFFFFF');
          currentSlideId = storySlidesArray[index]?.id;
      } else if (activeSwiper === 'right') {
          setContainerColor(rightOptionSlides[index]?.color || '#FFFFFF');
          currentSlideId = rightOptionSlides[index]?.id;
      } else if (activeSwiper === 'wrong') {
          setContainerColor(wrongOptionSlides[index]?.color || '#FFFFFF');
          currentSlideId = wrongOptionSlides[index]?.id;
      }
  
      // Check if the current slide is the endScreen
      if (currentSlideId === 'endScreen') {
        console.log('"endScreen" is called');
        // Set a timer to show the modal after 1 second
        setTimeout(() => setShowModal(true), 1000);
    }
  
      setCurrentIndex(index);
  };
  
    



    const handleOptionPress = (option) => {
      if (option === 'A') {
          console.log('Option "A" is pressed');
          setActiveSwiper('right');
          setContainerColor(rightOptionSlides[0].color);  // Set background color for the right options swiper
      } else if (option === 'B') {
          console.log('Option "B" is pressed');
          setActiveSwiper('wrong');
          setContainerColor(wrongOptionSlides[0].color);  // Set background color for the wrong options swiper
      }
  };
  
  const dynamicImageStyle = useMemo(() => ({
    width: modalDimensions.modalWidth * 0.5,
    height: modalDimensions.modalHeight * 0.3,
    resizeMode: 'contain'
}), [modalDimensions]);

const resetComponent = () => {
  console.log("ALLAH U AKBAR")
};


  const renderModal = () => (
    <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={5000}  // 1000 milliseconds for a slower animation
        animationOutTiming={5000}
        onRequestClose={() => setShowModal(false)}
    >
        <View style={styles.centeredView}>
            <View style={[styles.modalView, dynamicModalStyle]}>
                <TouchableOpacity  onPress={() => navigation.navigate('Honesty')}>
                    <Image 
                        style={dynamicImageStyle} 
                        source={require('../../../assets/endScreen/GoHome.webp')} 
                    />
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => navigation.navigate('Honesty')}>
                    <Image 
                        style={dynamicImageStyle} 
                        source={require('../../../assets/endScreen/PlayAgain.webp')} 
                    />
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
  );
  


  const renderSwiper = (slides) => (
    <Swiper
        style={{ height: dimensions.screenHeight }}
        showsButtons={true}
        ref={swiperRef}
        loop={false}
        showsPagination={false}
        onIndexChanged={handleIndexChanged}
        prevButton={<PrevButton />}
        nextButton={<NextButton />}
    >
        {slides.map((slide, index) => (
                        <View 
                        key={slide.id} 
                        style={[
                            styles.slide, 
                            dynamicSlideStyle,
                            { backgroundColor: slide.color } 
                        ]}
                    >
                {slide.id === 'options' ? (
                    <View>
                    <View style={[styles.optionsContainer, dynamicSlideStyle]}>
                         <TouchableOpacity onPress={() => handleOptionPress('A')} style={[styles.option, { backgroundColor: '#93C572' }]}>
                             <Text style={[styles.optionText, { backgroundColor: '#5B7F3E' }]}>Option A</Text>
                             <Text style={styles.optionDescription}>{slide.correctOptionDescription}</Text>
                             <Image
                                 source={slide.optionAImageSource}
                                 style={styles.optionImage}
                                 resizeMode="contain"
                             />
                         </TouchableOpacity>
                         <TouchableOpacity onPress={() => handleOptionPress('B')} style={[styles.option, { backgroundColor: '#FB8DA0' }]}>
                             <Text style={[styles.optionText, { backgroundColor: '#FB4570' }]}>Option B</Text>
                             <Text style={styles.optionDescription}>{slide.wrongOptionDescription}</Text>
                             <Image
                                 source={slide.optionBImageSource}
                                 style={styles.optionImage}
                                 resizeMode="contain"
                             />
                         </TouchableOpacity>
                     </View>

                     <View style={[styles.textContainer , {width : '100%'}]}>
                                 <Text style={styles.textStyle}>{slide.description}</Text>
                             </View>
                     </View>
                ) : (
                    <>
                        <Image source={slide.imageSource} style={styles.image} resizeMode="cover" />
                        {slide.description ? (
                              <View style={styles.textContainer}>
                                  <Text style={[styles.textStyle , {color : 'black'}]}>{slide.description}</Text>
                              </View>
                          ) : null}
                    </>
                )}
            </View>
        ))}
    </Swiper>
);

   

  return (
      <View style={[styles.container, { backgroundColor: containerColor }]} onLayout={onLayout}>
          {activeSwiper === 'main' && renderSwiper(storySlidesArray)}
          {activeSwiper === 'right' && renderSwiper(rightOptionSlides)}
          {activeSwiper === 'wrong' && renderSwiper(wrongOptionSlides)}
          {renderModal()}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  slide: {
      flex: 1,
      backgroundColor: 'blue',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft : screenWidth*0.05,
      marginRight : screenWidth*0.05
  },
  image: {
      width: '100%',
      height: '100%'
  },
  textContainer: {
      position: 'absolute', // Positioning text over the image
      bottom: 0, // Aligning at the bottom of the slide
      width: '100%', // Text container takes the full width of the slide
      backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white background
      padding: 5, // Padding around the text for better 
      alignSelf :'center'
  },
  textStyle: {
      color: 'black', // Black text color
      textAlign: 'center', // Center-aligned text
      fontFamily: 'RobotoSlab_800ExtraBold'
  },
  optionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor : 'white'
  },
  option: {
      alignItems: 'center', // Center align the items
      width: '45%', // Adjust width as needed,
      height : '90%',
      borderWidth: 1, // Set the border width
      borderColor: 'green', // Set the border color
      borderRadius: 10,
  },
  optionImage: {
      width: '100%', // Adjust width as needed
      height: 250, // Adjust height as needed
      marginBottom : 20,
      resizeMode: 'contain'
  },
  optionText: {
      color: 'white', // Set text color
      textAlign: 'center', // Center-align text
      width : '100%',
      height : '10%',
      fontFamily : 'RobotoSlab_800ExtraBold',
      paddingBottom : '2%',
      paddingTop : '2%',
      borderTopLeftRadius : 10,
      borderTopRightRadius : 10
      // Space between text and image
      // Add more styling as needed
  },
  optionDescription:{
      color : 'black',
      textAlign : 'center',
      fontFamily : 'RobotoSlab_500Medium',
      marginTop : '1%',
      marginBottom : '1%',
      color : 'white'
  },
  button: {
      position: 'absolute', // Position the button absolutely within its container
      color: 'white',
      fontSize: 80,
      top: '50%', // Adjust the vertical position as needed
      zIndex: 10, // Make sure the button is above other elements
      transform: [{ translateY: -50 }],
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingTop : 30,
    borderRadius: 20,
    borderWidth : 5,
    borderColor : 'grey',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    // Remove width and height from here, as they will be dynamically set
},
  imageStyle: {
    marginTop : 10,
    resizeMode: 'contain',
  }
 
});

export default StorySlide;