import {StyleSheet, Text, TouchableOpacity, View, TouchableHighlight,TouchableNativeFeedback} from 'react-native';
import React, {useState,useEffect} from 'react';
import {centertext, swidth,sheight} from './ScreenSetting';
import {SystemBlue} from './ColorPalate';
import Icon from 'react-native-dynamic-vector-icons/lib/components/Icon';
import Image from 'react-native-image-progress';
import {shallow} from 'react-native/jest/renderer';


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

    let {
        onPress,
        text,
        activeText,
    } = props;


    const [textcolor,settextcolor] = useState(SystemBlue);
    const [backcolor,setbackcolor] = useState('white');
    const [flag,setFlag] = useState(true);
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
            activeOpacity={1}
            underlayColor={SystemBlue}
            style={[Styles.button,{backgroundColor: backcolor}]}
            onPress={() => {
                    setFlag(!flag);
                    onPress(flag);
                    settextcolor(textcolor === 'white' ? SystemBlue : 'white');
                    setbackcolor(backcolor === SystemBlue ? 'white' : SystemBlue);
                    setText(textstate === text ? activeText : text);
                }
            }
        >
            <Text style={[Styles.btntext,{color: textcolor}]}>
                {textstate}
            </Text>
        </TouchableOpacity>
    )
};

export const BubbleButton = (props) => {

    let {
        onPress,
        IconDetails,
        uri
    } = props;

    return(
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => alert()}
            style={Styles.bubblecontainer}
        >
            {/*<Icon name={IconDetails.name} type={IconDetails.type} color={IconDetails.color} size={IconDetails.size} />*/}
            <Image style={Styles.bubbleimage} source={uri} resizeMode="cover"  />
            {/*<Image style={Styles.bubbleimage} source={{uri:'/SRC//Assets/Images/FeatherWhite.png'}}/>*/}
        </TouchableOpacity>
    )
};

module.extends = {
    SystemButton,
    BlueWhiteButton,
    BubbleButton
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
    bubblecontainer:{
        height: swidth * 0.14,
        width: swidth * 0.14,
        borderRadius: 100,
        backgroundColor: SystemBlue,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        marginTop: sheight * 0.71,
        marginLeft: swidth * 0.81,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    bubbleimage:{
        height: 20,
        width: 20,
        alignSelf: 'center',
        // backgroundColor:'red',

        // fontSize: swidth * 0.2,
    },

});
