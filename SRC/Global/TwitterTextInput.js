import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {swidth} from './ScreenSetting';
import {SystemBlue} from './ColorPalate';
import Icon from 'react-native-dynamic-vector-icons';


let TwitterTextInput;
export default TwitterTextInput = (props) => {

    let {
        placeholder,
        text,
        onChangeText,
        IconDetails,
        keyboardType,
        secureTextEntry,
        IconPress,
        LabelMessage,
        CounterDetails,
        viewstyle,
        autoCorrect,
        textStyle
    } = props;

    return(
        <View>
            <View
                style={[
                    Styles.outercontainer,
                    LabelMessage
                        ? {borderColor: 'red'}
                        : {borderColor: SystemBlue},
                    viewstyle && viewstyle
                ]}>
                <TextInput
                    autoCorrect={autoCorrect && autoCorrect}
                    keyboardType={keyboardType && keyboardType}
                    style={[textStyle,Styles.textinput]}
                    value={text}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={"gray"}
                    selectionColor={SystemBlue}
                    secureTextEntry={secureTextEntry && secureTextEntry}
                    onFocus={props.onFocus && props.onFocus}
                />
                {
                    IconDetails && IconDetails.IconEnable &&
                    <TouchableOpacity style={[Styles.iconview]} onPress={IconPress}>
                        <Icon name={IconDetails.IconName} type={IconDetails.IconType} color={IconDetails.IconColor} size={IconDetails.IconSize}/>
                    </TouchableOpacity>
                }
            </View>
            <View style={[{marginTop: swidth * 0.02,flexDirection: 'row', justifyContent: CounterDetails ? 'space-between' : 'flex-end'}]}>
                {
                    LabelMessage ?
                        <View style={[ ]}>
                            <View>
                                <Text style={[Styles.labeltext]}>
                                    {LabelMessage}
                                </Text>
                            </View>
                        </View>
                        : <View/>
                }
                {
                    CounterDetails ?
                        <View style={{justifyContent: 'flex-end'}}>
                            <Text style={[Styles.countertext]}>
                                {CounterDetails.CounterText}
                            </Text>
                        </View>
                        : null
                }
            </View>
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
        width: swidth * 0.87,
        fontSize: swidth * 0.04,
        padding: 0
    },
    iconview:{
        alignSelf: 'flex-end',
        position:'absolute',
    },
    labeltext:{
       color:'red',
       fontSize: swidth * 0.042,
    },
    lowerpanel:{
       flexDirection: 'row',
        alignItems:'center',
        marginTop: swidth * 0.02,
        justifyContent:'space-between'
    },
    countertext:{
        color:'gray',
        fontSize: swidth * 0.042,
    },
});
