import React, { useEffect, useState, useRef, useMemo } from 'react';
import { View, Dimensions, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';
import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useNavigation } from '@react-navigation/native';
import LoadingScreen from './LoadingScreen';
import StartScreenModals from './StartScreenModals';
import EndScreenModals from './EndScreenModals';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;



const PrevButton = ({style}) => (
    <Image 
        style={style}
        source={require('../../../assets/MoralValues/prevArrowFinal.webp')} 
        contentFit='contain'
    />
);

const NextButton = ({style}) => (
    <Image 
        style={style}
        source={require('../../../assets/MoralValues/nextArrowFinal.webp')}
        contentFit='contain'
    />
);


const StorySlide = ({storySlidesArrayData,rightOptionSlidesData,wrongOptionSlidesData}) => {
  const storySlidesArray = storySlidesArrayData
  const rightOptionSlides = rightOptionSlidesData
  const wrongOptionSlides = wrongOptionSlidesData
  const navigation = useNavigation(); 
  const fadeIn = useRef(new Animated.Value(0)).current;
  const [isLoading, setIsLoading] = useState(true);
    const [activeSwiper, setActiveSwiper] = useState('main');
    const [showModal, setShowModal] = useState(false);
    const [showStartModal, setShowStartModal] = useState(true);
    const [containerColor, setContainerColor] = useState("#37B6FF");
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
  const closeStartModal = () =>{
    setShowStartModal(false)
  }
  const renderBlurredBackground = () => {
    if (!showStartModal) return null;
    return (
      <BlurView
        style={StyleSheet.absoluteFill} // Make sure it covers the whole screen
        intensity={100} // Adjust the intensity of the blur
        tint="default" 
      />
    );
  };
  
  const renderStartModal = () => (
    <Modal
      isVisible={showStartModal}
      onBackdropPress={() => setShowStartModal(false)}
      onBackButtonPress={() => setShowStartModal(false)}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={3000} // 3000 milliseconds for a slower animation
      animationOutTiming={3000}
      backdropOpacity={0} // Set to 0 since the BlurView is used
    >
      <View style={styles.centeredView}>
        <View style={[dynamicModalStyle]}>
        <TouchableOpacity onPress={closeStartModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          {showStartModal && (
            <StartScreenModals closeStartModal={closeStartModal} />
          )}
        </View>
      </View>
    </Modal>
  );
  


  const [modalDimensions, setModalDimensions] = useState(getModalDimensions());

  // Function to reset the component
 
    const onLayout = (event) => {
        const { width, height } = event.nativeEvent.layout;
        setDimensions({ screenWidth: width, screenHeight: height });
    };
   

    useEffect(() => {
        // Lock the screen orientation to landscape
        const lockOrientation = async () => {
            try {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
            } catch (e) {
                console.error("Failed to lock orientation:", e);
            }
        };
    
        // Update modal dimensions
        const updateModalDimensions = () => {
            setModalDimensions({
                modalWidth: Dimensions.get('window').width * 0.7,
                modalHeight: Dimensions.get('window').height * 0.7,
            });
        };
    
        // Simulate data fetching
        const fetchData = async () => {
            try {
                // Replace this with your actual data fetching logic
                await new Promise(resolve => setTimeout(resolve, 5000)); // Simulated delay
                setIsLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false); // Ensure loading is set to false in case of error
            }
        };

        fetchData();
        lockOrientation();
        updateModalDimensions();
    
        // Update modal dimensions and unlock orientation when screen dimensions change
        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            setDimensions({ screenWidth: window.width, screenHeight: window.height });
            updateModalDimensions();
        });
    
        // Cleanup function
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
        setTimeout(() => navigation.navigate('EndScreen'), 1000);
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



const renderModal = () => (
    <Modal
        isVisible={showModal}
        onBackdropPress={() => setShowModal(false)}
        onBackButtonPress={() => setShowModal(false)}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={3000}
        animationOutTiming={3000}
        backdropOpacity={0.7}
        style={styles.fullScreenModalContainer}
    >
        <View style={styles.fullScreenModal}>
            <TouchableOpacity onPress={closeStartModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            {showModal && (
                <StartScreenModals closeStartModal={closeStartModal} />
            )}
        </View>
    </Modal>
);

  

  const FadeSlide = ({ children, style }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }
      ).start();
    }, [fadeAnim]);
  
    return (
      <Animated.View style={{ ...style, opacity: fadeAnim }}>
        {children}
      </Animated.View>
    );
  };
  
  

  const renderSwiper = (slides) => (
    <Swiper
    style={{ height: dimensions.screenHeight }}
    showsButtons={true}
    loop={false}
    showsPagination={false}
    onIndexChanged={handleIndexChanged}
    prevButton={<PrevButton style={styles.prevButtonStyle}/>}
    nextButton={<NextButton style={styles.nextButtonStyle}/>}
    scrollEnabled={false}
    fade={true}
   >
        {slides.map((slide, index) => (
                        <FadeSlide 
                        key={slide.id} 
                        slide={slide}
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
                                 contentFit="contain"
                             />
                         </TouchableOpacity>
                         <TouchableOpacity onPress={() => handleOptionPress('B')} style={[styles.option, { backgroundColor: '#FB8DA0' }]}>
                             <Text style={[styles.optionText, { backgroundColor: '#FB4570' }]}>Option B</Text>
                             <Text style={styles.optionDescription}>{slide.wrongOptionDescription}</Text>
                             <Image
                                 source={slide.optionBImageSource}
                                 style={styles.optionImage}
                                 contentFit="contain"
                             />
                         </TouchableOpacity>
                     </View>

                     <View style={[styles.textContainer , {width : '100%'}]}>
                                 <Text style={styles.textStyle}>{slide.description}</Text>
                             </View>
                     </View>
                ) : (
                    <>
                        <Image source={slide.imageSource} style={styles.image} contentFit="cover" />
                        {slide.description ? (
                              <View style={styles.textContainer}>
                                  <Text style={[styles.textStyle , {color : 'black'}]}>{slide.description}</Text>
                              </View>
                          ) : null}
                    </>
                )}
            </FadeSlide>
        ))}
    </Swiper>
);

  // Modify the loading screen to use Animated.View
  const renderLoadingScreen = () => (
    <Animated.View
      style={{
        ...styles.centered,
        transform: [{ translateY: loadingScreenPosition }], // Apply the animated value
      }}>
      <Text>Loading...</Text>
    </Animated.View>
  );

return (
    <View style={[styles.container , {backgroundColor : containerColor}]} onLayout={onLayout}>
      {isLoading ? <LoadingScreen screenHeight={screenHeight} backgroundColor="red"></LoadingScreen> : (
          <>
          <View style={{backgroundColor : containerColor}}>
                {activeSwiper === 'main' && renderSwiper(storySlidesArray)}
                {activeSwiper === 'right' && renderSwiper(rightOptionSlides)}
                {activeSwiper === 'wrong' && renderSwiper(wrongOptionSlides)}
                {renderBlurredBackground()}
                {renderStartModal()}
                {renderModal()}
          </View>
      </>
      )}
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
  prevButtonStyle: {
    width: 60, // adjust the width
    height: 60, // adjust the height
    },
    nextButtonStyle: {
        width: 60, // adjust the width
        height: 60, // adjust the height
        // other styling as needed
    },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    marginTop : 10,
    resizeMode: 'contain',
  },
  helloTextStyle: {
    fontSize: 24, // Adjust font size as needed
    color: 'black', // Adjust text color as needed
    marginBottom: 20, // Space below the text
    // Other styling as needed
    },
    closeButton: {
        position: 'absolute',
        top: 30,
        right: 30,
        backgroundColor: '#E5E4E2', // Optional: style as needed
        borderRadius: 5,
        borderWidth: 3, // Specify the border width
        borderColor: 'green', // Specify the border color
        padding: 2,
        width: 30,
        justifyContent : 'center',
        alignItems : 'center',
        zIndex: 1, // Make sure it's above other elements
    },
    closeButtonText: {
        fontSize: 16,
        color: '#F28C28', // Choose color as needed
        justifyContent : 'center',
        fontWeight : 'bold'
    },
    fullScreenModalContainer: {
        flex: 1,
        width: '100%', 
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    fullScreenModal: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
        // Add other styling as needed
    },
 
});

export default StorySlide; 