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
        text,
        aOpacity
    } = props;

    const dis = opacity === 0.5;

    return(
    <View style={[styles.view, {opacity: opacity}]}>
        <TouchableOpacity
            activeOpacity={aOpacity && aOpacity}
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
        btnStatus,
        useColor,
    } = props;


    const [textcolor,settextcolor] = useState(btnStatus ? 'white' : useColor);
    const [backcolor,setbackcolor] = useState(btnStatus ? useColor : 'white');
    const [borderColor,setbordercolor] = useState(btnStatus ? 'white' : useColor);
    const [flag,setFlag] = useState(btnStatus);
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
            underlayColor={useColor}
            style={[
                Styles.button,
                {
                    backgroundColor: backcolor ,
                    padding: flag ? 5.5 : 4.5,
                    borderWidth: flag ? 0 : 1.5,
                    borderColor: useColor,
                },
                btnStatus && {borderColor: borderColor}
            ]}
            onPress={() => {
                    setFlag(!flag);
                    onPress(flag);
                    settextcolor(textcolor === 'white' ? useColor : 'white');
                    setbackcolor(backcolor === useColor ? 'white' : useColor);
                    setbordercolor(borderColor === useColor ? 'white' : useColor);
                    setText(textstate === text ? activeText : text);
                }
            }
        >
            <Text style={[Styles.btntext,{color: textcolor}]}>
                {`${textstate}`}
            </Text>
        </TouchableOpacity>
    )
};

export const LinerButton = (props) => {

    let {
        onPress,
        text,
        useColor,
        btnStyle,
        activeOpacity,
        textStyle,
    } = props;


    return(
        <TouchableOpacity
            activeOpacity={activeOpacity ? activeOpacity : 1}
            style={[Styles.button, {borderColor: useColor} , btnStyle ]}
            onPress={onPress}
        >
            <Text style={[Styles.btntext, {color: useColor} , textStyle]}>
                {`${text}`}
            </Text>
        </TouchableOpacity>
    )
};

export const BubbleButton = (props) => {

    let {
        onPress,
        IconDetails,
        screen,
    } = props;
    let component;

    const renderForHome = () => {
        return (
            <View style={{marginTop: swidth * 0.04, marginLeft: swidth * 0.04}}>
                <Icon name={'plus'}
                      type={'MaterialCommunityIcons'}
                      color={'white'}
                      size={swidth * 0.04}
                      style={{ position:'absolute'}}
                />
                <Icon
                    name={IconDetails.name}
                    type={IconDetails.type}
                    color={IconDetails.color}
                    size={IconDetails.size}
                    style={{ marginTop: swidth * 0.001, marginLeft: swidth * 0.008}}
                />
            </View>
        );
    };

    const renderForChat = () => {
        return (
            <View style={{marginTop: swidth * 0.04, marginLeft: swidth * 0.04}}>
                {/*<Icon name={'plus'}*/}
                {/*      type={'MaterialCommunityIcons'}*/}
                {/*      color={'white'}*/}
                {/*      size={swidth * 0.04}*/}
                {/*      style={{ position:'absolute'}}*/}
                {/*/>*/}
                <Icon
                    name={IconDetails.name}
                    type={IconDetails.type}
                    color={IconDetails.color}
                    size={IconDetails.size}
                    // style={}
                />
            </View>
        );
    };

    switch(screen)
    {
        case 'HOME':
            component = renderForHome();
            break;
        case 'CHAT':
            component = renderForChat();
            break;
    }

    return(
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress && onPress}
            style={Styles.bubblecontainer}
        >
            {component}
            {/*<Image style={Styles.bubbleimage} source={uri} resizeMode="cover"  />*/}
            {/*<Image style={Styles.bubbleimage} source={{uri:'/SRC//Assets/Images/FeatherWhite.png'}}/>*/}
        </TouchableOpacity>
    )
};

module.extends = {
    SystemButton,
    BlueWhiteButton,
    BubbleButton,
    LinerButton
};

let Styles = StyleSheet.create({

    button:{
        width: swidth * 0.27,
        // padding:5,
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
        flexDirection: 'row',
        height: swidth * 0.14,
        width: swidth * 0.14,
        borderRadius: 100,
        backgroundColor: SystemBlue,
        // alignItems: 'center',
        // justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        // marginTop: sheight * 0.71,
        // marginLeft: swidth * 0.81,

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
