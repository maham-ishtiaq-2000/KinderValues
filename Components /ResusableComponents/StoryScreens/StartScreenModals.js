import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import backgroundImage from '../../../assets/MoralValues/startModalBackground.webp';


const StartScreenModals = ({ closeStartModal }) => {
    const data = [
        { id: '1', title: 'Click the "Next" arrow to go forward in the story.' },
        { id: '2', title: 'Click the "Back" arrow to go backward in the story.' },
        { id: '3', title: 'When you see choices, pick one to keep the story going!' }
    ];

    return (
        <View style={styles.modalView}>
            <Text style={styles.instructionHeading}>Instructions</Text>
            <FlatList
                data={data}
                renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>}
                keyExtractor={item => item.id}
            />
                <TouchableOpacity onPress={closeStartModal}>
                    <ImageBackground source={backgroundImage} style={styles.image}>
                       <Text style={styles.buttonText}>OK</Text>
                    </ImageBackground>
                </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    modalView: {
        flex: 1, // Added flex here
        margin: 20,
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingTop: 5,
        paddingBottom : 5,
        borderRadius: 10,
        borderWidth: 5,
        borderColor: 'grey',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 4,
    },
    instructionHeading: {
        fontSize : 20,
        marginTop : 5,
        marginBottom : 25,
        fontFamily : 'RobotoSlab_800ExtraBold',
        color : '#228B22'
    },
    item: {
        fontSize: 15,
        height: 30,
        color : '#fda63a',
        fontFamily : 'RobotoSlab_500Medium',
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        // Set your desired width and height for the button
        width: 180,
        height: 50,
        resizeMode : 'cover'
      },
    
    button:{
        marginBottom : 20
    },
    
    buttonText: {
        color: 'white', // Set your desired text color
        textAlign: 'center',
        fontFamily : 'RobotoSlab_800ExtraBold'
        // Add any other styling you need for the text
    },

})

export default StartScreenModals;
