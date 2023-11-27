// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FontLoader from './Components /Data/FontLoader';
import SplashScreen from './Components /Splash/SplashScreen'
import WelcomeScreen from './Components /Welcome /WelcomeScreen';
import HomeScreen from './Components /Home/HomeScreen';
import Honesty from './Components /MoralValuesScreen/Honesty/Honesty';
import Kindness from './Components /MoralValuesScreen/Kindness/Kindness'
import Cooperation from './Components /MoralValuesScreen/Cooperation/Cooperation';
import Respect from './Components /MoralValuesScreen/Respect/Respect';
import Patience from './Components /MoralValuesScreen/Patience/Patience';


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
        <Stack.Screen name="Kindness" component={Kindness}></Stack.Screen>
        <Stack.Screen name="Cooperation" component={Cooperation}></Stack.Screen>
        <Stack.Screen name="Respect" component={Respect}></Stack.Screen>
        <Stack.Screen name="Patience" component={Patience}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    </FontLoader>
  );
};

export default App;
