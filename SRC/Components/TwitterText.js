import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState,useEffect} from 'react';
import {centertext, swidth} from '../Global/ScreenSetting';
import {SystemBlue} from '../Global/ColorPalate';


export const TextWithLink = (props) => {

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

export const BlueText = (props) => {
    return(
        <Text style={[Styles.bluetest]}>
            {props.text}
        </Text>
    )
};

export const GrayText = (props) => {
    return(
        <View style={[Styles.graytextview]}>
            <Text style={[Styles.graytext]}>
                {props.text}
            </Text>
        </View>
    )
};

export const BlackBigText = (props) => {
    return(
        <View style={[Styles.createtextview]}>
            <Text style={[Styles.blackbigtext]}>
                {props.text}
            </Text>
        </View>
    )
};

module.extends = {
    BlueText,
    BlackBigText,
    GrayText
};

let Styles = StyleSheet.create({

    createtextview:{
        marginTop: swidth * 0.13,
        alignSelf:'flex-start',
    },
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
    graytextview:{
        marginTop: swidth * 0.04,
        alignSelf:'flex-start',
    },

//////       Text        /////////

    blackbigtext:{
        // marginLeft: swidth * 0.03,
        fontSize: swidth * 0.092,
        fontFamily: 'Roboto-Bold',

    },
    craetebtntext:{
        fontSize: swidth * 0.045,
        fontFamily: 'Roboto-Bold',
        color:'white',
        // fontWeight:"500"
    },
    graytext:{
        color:'gray',
        fontSize: swidth * 0.05,
    },
    bluetest:{
        color:SystemBlue,
        fontSize: swidth * 0.045,
    },

});
