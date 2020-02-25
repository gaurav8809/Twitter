import {KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState,useEffect} from 'react';
import {centertext, swidth} from '../Global/ScreenSetting';
import {SystemBlue} from '../Global/ColorPalate';
import {AntDesign} from '../Global/VectorIcons';


export default TwitterTopPanel = (props) => {

    let {
        onBackPress
    } = props;

    return(
        <View style={[Styles.twittericonview]}>
            <View style={{flex:1, flexDirection: 'row'}}>
                <View style={{flex:1}}>
                    <AntDesign onPress={onBackPress} name={'arrowleft'} color={SystemBlue} size={swidth * 0.07}/>
                </View>
                <View style={{flex:5}}>
                </View>
            </View>
            <View style={{flex:1.1}}>
                <AntDesign name={'twitter'} color={SystemBlue} size={swidth * 0.07}/>
            </View>
        </View>
    )
};

let Styles = StyleSheet.create({

                //       View        //

    twittericonview:{
        flexDirection: 'row',
        marginTop: swidth * 0.02,
        // backgroundColor: 'red',
        justifyContent:'center'
    },


                //       Text        //


});
