import {swidth, SW, IS_IOS} from "./ScreenSetting";
import React from "react";
import {View,TextInput, Text,StyleSheet} from 'react-native';
import {SystemBlue,SlateGray} from "./ColorPalate";

export const TextInputWithLabel = (props) => {

    let {
        label,
        placeholder,
        text,
        onChangeText,
        returnKeyType,
        mainViewStyle,
        multiline,
        maxLength,
        onFocus,
    } = props;

    let STY = Styles;

    return(
        <View style={[mainViewStyle]}>
            <View>
                <Text style={STY.labelText}>
                    {label}
                </Text>
            </View>
            <View style={[STY.textInputView, IS_IOS() && {marginTop: SW(0.03)} ]}>
                <TextInput
                    value={text}
                    placeholder={placeholder && placeholder}
                    onChangeText={onChangeText}
                    returnKeyType={returnKeyType}
                    style={STY.textInput}
                    multiline={multiline && multiline}
                    maxLength={maxLength && maxLength}
                    onFocus={onFocus && onFocus}
                />
            </View>
        </View>
    );

};

let Styles = StyleSheet.create({

    textInputView:{
        // marginTop: SW(0.03),
        borderBottomWidth:0.5,
        borderColor: SlateGray,
        // backgroundColor:'red',
        // fontSize: swidth * 0.06,
        // height: swidth * 0.095,
        width: SW(0.93),

    },
    textInput:{
        // backgroundColor:'pink',
        // height: SW(0.07),
        fontSize: SW(0.04)
    },
    labelText:{
        fontSize: SW(0.04),
        color: SlateGray
    },


});
