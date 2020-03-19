import {KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {centertext, swidth} from './ScreenSetting';
import {SystemBlue} from './ColorPalate';
import {AntDesign} from './VectorIcons';


let TwitterTopPanel;
export default TwitterTopPanel = (props) => {

    let {
        onBackPress,
        backenable,
    } = props;

    return (
        <View style={[Styles.twittericonview ]}>
            {
                !backenable &&
                <View style={{flex: 0.95, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <AntDesign onPress={onBackPress} name={'arrowleft'} color={SystemBlue} size={swidth * 0.07}/>
                    </View>
                    <View style={{flex: 5}}>
                    </View>
                </View>
            }
            <View style={{flex: backenable ? 1 : 1.1, alignItems: backenable ? 'center' : 'flex-start'}}>
                <AntDesign name={'twitter'} color={SystemBlue} size={swidth * 0.07}/>
            </View>
        </View>
    );
};

let Styles = StyleSheet.create({

    //       View        //

    twittericonview: {
        flexDirection: 'row',
        marginTop: swidth * 0.02,
        // backgroundColor: 'red',
        justifyContent: 'center',
    },


    //       Text        //


});
