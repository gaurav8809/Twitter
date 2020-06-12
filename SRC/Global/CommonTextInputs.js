import {SW, IS_IOS} from "./ScreenSetting";
import React from "react";
import {View,TextInput, Text,StyleSheet} from 'react-native';
import {SlateGray} from "./ColorPalate";

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
        borderBottomWidth:0.5,
        borderColor: SlateGray,
        width: SW(0.93),
    },
    textInput:{
        fontSize: SW(0.04)
    },
    labelText:{
        fontSize: SW(0.04),
        color: SlateGray
    },

});
