import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState,useEffect} from 'react';
import {centertext, swidth} from './ScreenSetting';
import {SystemBlue, SlateGray} from './ColorPalate';


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

    let {
        text,
        onPress,
        textstyle
    } = props;

    return(
        <Text style={[Styles.bluetest,textstyle ]} onPress={onPress && onPress}>
            {text && text}
        </Text>
    )
};

export const GrayText = (props) => {
    return(
        <View style={[Styles.graytextview, props.viewstyle && props.viewstyle]}>
            <Text style={[Styles.graytext, props.textstyle && props.textstyle]}>
                {props.text && props.text}
            </Text>
        </View>
    )
};

export const BlackBigText = (props) => {
    return(
        <View style={[Styles.createtextview, props.style && props.style]}>
            <Text style={[Styles.blackbigtext, props.textstyle && props.textstyle]}>
                {props.text && props.text}
            </Text>
        </View>
    )
};

export const SlateGrayText = (props) => {
    return(
        <Text style={[Styles.slateGrayText, props.textstyle && props.textstyle]}>
            {props.text}
        </Text>
    )
};

module.extends = {
    BlueText,
    BlackBigText,
    GrayText,
    SlateGrayText
};

let Styles = StyleSheet.create({

    createtextview:{
        marginTop: swidth * (Platform.OS === 'ios' ? 0.13 : 0.09),
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
        marginTop: swidth * 0.03,
        alignSelf:'flex-start',
    },

//////       Text        /////////

    blackbigtext:{
        // marginLeft: swidth * 0.03,
        fontSize: swidth * 0.08,
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
        fontWeight: "400"
    },
    bluetest:{
        color:SystemBlue,
        fontSize: swidth * 0.045,
    },
    slateGrayText:{
        color: SlateGray,
        fontSize: swidth * 0.040,
    },

});
