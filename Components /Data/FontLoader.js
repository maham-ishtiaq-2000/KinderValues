import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts, RobotoSlab_400Regular, RobotoSlab_700Bold, RobotoSlab_500Medium, RobotoSlab_800ExtraBold } from '@expo-google-fonts/roboto-slab';

const FontLoaderComponent = ({ children }) => {
  let [fontsLoaded] = useFonts({
    RobotoSlab_400Regular,
    RobotoSlab_700Bold,
    RobotoSlab_500Medium,
    RobotoSlab_800ExtraBold, // Make sure this font is imported correctly
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <>{children}</>;
};

export default FontLoaderComponent;
