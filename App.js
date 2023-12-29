// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FontLoader from './Components /Data/FontLoader';
import SplashScreen from './Components /Splash/SplashScreen'
import WelcomeScreen from './Components /Welcome /WelcomeScreen';
import HomeScreen from './Components /Home/HomeScreen';
import StoryHome from './Components /StoryHome/StoryHome';
import Honesty from './Components /MoralValuesScreen/Honesty/Honesty';
import HonestyScreen from './Components /MoralValuesScreen/Honesty/Stories/HonestyScreen';
import EndScreenModals from './Components /ResusableComponents/StoryScreens/EndScreenModals';

const Stack = createStackNavigator();

const App = () => {
  return (
    <FontLoader>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" headerMode="none">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}></Stack.Screen>
        <Stack.Screen name="Honesty" component={Honesty}></Stack.Screen>
        <Stack.Screen name="NewHonesty" component={HonestyScreen}></Stack.Screen>
        <Stack.Screen name="EndScreen" component={EndScreenModals}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    </FontLoader>
  );
};

export default App;
