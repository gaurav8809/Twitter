import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {centertext, swidth} from '../Global/ScreenSetting';
import {SystemBlue} from '../Global/ColorPalate';


export const SystemButton = (props) => {

    let {
        styles,
        onPress,
        opacity,
        text
    } = props;

    return(
    <View style={styles.view}>
        <TouchableOpacity style={[styles.button, {opacity: opacity}]} onPress={onPress}>
            <Text style={styles.text}>
                {text}
            </Text>
        </TouchableOpacity>
    </View>
    )
};

module.extends = {
    SystemButton
};

let Styles = StyleSheet.create({
    createbtnview:{
        marginTop: swidth * 0.15,
        alignItems: 'center'
    },
    createbtn:{
        backgroundColor: SystemBlue,
        borderRadius: 50,
        width: swidth * 0.75,
        height: swidth * 0.15,
        ...centertext
    },

//////       Text        /////////


    craetebtntext:{
        fontSize: swidth * 0.065,
        fontFamily: 'Roboto-Bold',
        color:'white',
        // fontWeight:"500"
    },

});
