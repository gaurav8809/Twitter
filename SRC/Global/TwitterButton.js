import {StyleSheet, Text, TouchableOpacity, View, TouchableHighlight,TouchableNativeFeedback} from 'react-native';
import React, {useState,useEffect} from 'react';
import {centertext, swidth,sheight} from './ScreenSetting';
import {SystemBlue} from './ColorPalate';
import Icon from 'react-native-dynamic-vector-icons/lib/components/Icon';
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
    <View style={[Styles.sysView, styles && styles.view, {opacity: opacity}]}>
        <TouchableOpacity
            activeOpacity={aOpacity && aOpacity}
            style={[Styles.sysButton, styles && styles.button]}
            onPress={onPress}
            disabled={dis}
        >
            <Text style={[Styles.sysText, styles && styles.text]}>
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
        btnStyle
    } = props;

    return(
        <TouchableOpacity
            activeOpacity={1}
            underlayColor={useColor}
            style={[
                Styles.button,
                {
                    backgroundColor: btnStatus ? useColor : 'white' ,
                    padding: btnStatus ? 5.5 : 4.5,
                },
                btnStatus && {borderColor: useColor, borderWidth: 1.5},
                btnStyle
            ]}
            onPress={onPress}
        >
            <Text style={[Styles.btntext,{color: btnStatus ? 'white' : useColor}]}>
                {btnStatus ? activeText : text}
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

    sysView:{
        // marginTop: swidth * 0.04,
        alignItems: 'center',
    },
    sysButton:{
        backgroundColor: SystemBlue,
        borderRadius: 50,
        width: swidth * 0.85,
        height: swidth * 0.1,
        ...centertext
    },
    sysText:{
        fontSize: swidth * 0.05,
        fontFamily: 'Roboto-Bold',
        color:'white',
    },
    button:{
        minWidth: swidth * 0.27,
        width: 'auto',
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
