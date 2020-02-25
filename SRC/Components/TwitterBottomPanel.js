import {KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState,useEffect} from 'react';
import {centertext, swidth} from '../Global/ScreenSetting';
import {SystemBlue} from '../Global/ColorPalate';
import {SystemButton} from './TwitterButton';


export default TwitterBottomPanel = (props) => {

    let {
        text,
        textenable,
        textpress,
        buttonopacity,
        buttontext,
        buttonpress
    } = props;

    return(
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : null}  >
            <View style={[Styles.bottombarview, Platform.OS === 'ios' && {padding: swidth * 0.03 }]}>
                <View style={[Styles.bottomcontainer, {justifyContent: textenable ? 'space-between' : 'flex-end',}]}>

                    { textenable &&
                        <TouchableOpacity
                            onPress={textpress}
                        >
                            <Text style={[Styles.dynamiclabeltext]}>
                                {text}
                            </Text>
                        </TouchableOpacity>
                    }

                    <SystemButton
                        opacity={buttonopacity}
                        text={buttontext}
                        styles={btnstyles}
                        onPress={buttonpress}
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    )
};

const btnstyles = {
    view:{
        // marginTop: swidth * 0.15,
        alignItems: 'center',
        marginRight: swidth * 0.03,
        // position: 'relative'
        // justifySelf: this.state.currenttextinput == 1 && 'flex-end'
    },
    button:{
        backgroundColor: SystemBlue,
        borderRadius: 50,
        width: swidth * 0.14,
        height: swidth * 0.08,
        ...centertext
    },
    text:{
        fontSize: swidth * 0.04,
        fontFamily: 'Roboto-Bold',
        color:'white',
        // fontWeight:"500"
    }
};

let Styles = StyleSheet.create({

    bottombarview:{
        borderTopWidth:1,
        borderColor:'lightgray',
        height: swidth * 0.12,
        width:swidth,
        justifyContent: 'center',
        backgroundColor:'rgb(242,242,242)',
    },
    bottomcontainer:{
        flexDirection:'row',
        // alignItems: 'center',
        // backgroundColor: 'pink'
    },

//////       Text        /////////


    dynamiclabeltext:{
        marginLeft: swidth * 0.03,
        color: SystemBlue,
        fontSize: swidth * 0.05
    },

});
