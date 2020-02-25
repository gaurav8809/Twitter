import {KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState,useEffect} from 'react';
import {centertext, swidth} from '../Global/ScreenSetting';
import {SystemBlue} from '../Global/ColorPalate';
import {SystemButton} from './TwitterButton';
import {AntDesign} from '../Global/VectorIcons';


export default TwitterTextInput = (props) => {

    let {
        placeholder,
        code,
        onChangeText,
        IconDetails,
        keyboardType
    } = props;

    return(
        <View
            style={[
                Styles.outercontainer,
                // this.state.totalnumber < 0
                //     ? {borderColor: 'red'}
                //     : {borderColor: this.state.currenttextinput === 0 ? SystemBlue : 'lightgray'}
            ]}>
            <TextInput
                autoCorrect={false}
                // onFocus={() => this.setState({currenttextinput:0})}
                keyboardType={keyboardType}
                style={[Styles.textinput]}
                value={code}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={"gray"}
                selectionColor={SystemBlue}
                // autoFocus={true}
                // ref={this.a}
                // returnKeyType={'next'}
                // onSubmitEditing={() => this.b.current.focus()}
            />
            {
                IconDetails.IconEnable &&
                <View style={[Styles.iconview]}>
                    <AntDesign name={IconDetails.IconName} color={IconDetails.IconColor} size={IconDetails.IconSize}/>
                </View>
            }
        </View>
    )
};

let Styles = StyleSheet.create({

   outercontainer:{
       marginTop: swidth * 0.08,
       width: swidth * 0.9,
       borderBottomWidth: 2,
       borderColor: SystemBlue,
       fontSize: swidth * 0.06,
       height: swidth * 0.095
   },
    textinput:{
        // height: swidth * 0.05,
        width: swidth * 0.77,
        fontSize: swidth * 0.06,
        // backgroundColor: 'pink',
        padding: 0
    },
    iconview:{
        alignSelf: 'flex-end',
        position:'absolute',
    },

});
