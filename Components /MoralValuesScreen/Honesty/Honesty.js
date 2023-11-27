// App.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function App() {
  return (
      <View style={styles.container}>
        <Text style={styles.text}>Hello, Montserrat!</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'RobotoSlab_400Regular',
  },
});
