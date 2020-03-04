import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState,useEffect} from 'react';
import {centertext, swidth} from './ScreenSetting';
import {SystemBlue} from './ColorPalate';


export const SystemButton = (props) => {

    // const [myop, ch] = useState(props.opacity);

    let {
        styles,
        onPress,
        opacity,
        text
    } = props;
    // useEffect(()=>{
    //     ch(props.opacity);
    //
    // },[props.opacity])
    //

    const dis = opacity === 0.5;

    return(
    <View style={[styles.view, {opacity: opacity}]}>
        <TouchableOpacity
            style={[styles.button, ]}
            onPress={onPress}
            disabled={dis}
        >
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
