import {StyleSheet, Text, TouchableOpacity, View, TouchableHighlight} from 'react-native';
import React, {useState,useEffect} from 'react';
import {centertext, swidth} from './ScreenSetting';
import {SystemBlue} from './ColorPalate';


export const SystemButton = (props) => {

    let {
        styles,
        onPress,
        opacity,
        text
    } = props;

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

export const BlueWhiteButton = (props) => {

    debugger;

    let {
        onPress,
        text,
        activeText,
    } = props;


    const [textcolor,settextcolor] = useState(SystemBlue);
    const [backcolor,setbackcolor] = useState('white');
    const [textstate,setText] = useState(text);

    return(
        <TouchableOpacity
            // onShowUnderlay={() =>
            //     [
            //         settextcolor(textcolor === 'white' ? SystemBlue : 'white'),
            //         setbackcolor(backcolor ===SystemBlue ? 'white' : SystemBlue),
            //         setText(textstate === text ? activeText : text)
            //     ]
            // }
            underlayColor={SystemBlue}
            style={[Styles.button,{backgroundColor: backcolor}]}
            onPress={[onPress,() => {
                settextcolor(textcolor === 'white' ? SystemBlue : 'white');
                setbackcolor(backcolor === SystemBlue ? 'white' : SystemBlue);
                setText(textstate === text ? activeText : text);
            }]}
        >
            <Text style={[Styles.btntext,{color: textcolor}]}>
                {textstate}
            </Text>
        </TouchableOpacity>
    )
};

module.extends = {
    SystemButton,
    BlueWhiteButton
};

let Styles = StyleSheet.create({

    button:{
        width: swidth * 0.27,
        padding:6,
        backgroundColor:'white',
        borderColor: SystemBlue,
        borderWidth:1.5,
        borderRadius: 100,
        alignItems:'center'
    },
    btntext:{
        fontSize: swidth * 0.04,
        fontWeight: "700",
        color: SystemBlue,
    },

});
