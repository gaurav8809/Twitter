import {KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState,useEffect} from 'react';
import {centertext, swidth} from './ScreenSetting';
import {SystemBlue} from './ColorPalate';
import {SystemButton} from './TwitterButton';
import {AntDesign} from './VectorIcons';
import Icon from 'react-native-dynamic-vector-icons';


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
    } = props;

    return(
        <View>
            <View
                style={[
                    Styles.outercontainer,
                    LabelMessage && LabelMessage !== ''
                        ? {borderColor: 'red'}
                        : {borderColor: SystemBlue}
                ]}>
                <TextInput
                    autoCorrect={false}
                    // onFocus={() => this.setState({currenttextinput:0})}
                    keyboardType={keyboardType && keyboardType}
                    style={[Styles.textinput]}
                    value={text}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={"gray"}
                    selectionColor={SystemBlue}
                    secureTextEntry={secureTextEntry && secureTextEntry}
                    // autoFocus={true}
                    // ref={this.a}
                    // returnKeyType={'next'}
                    // onSubmitEditing={() => this.b.current.focus()}
                />
                {
                    IconDetails && IconDetails.IconEnable &&
                    <TouchableOpacity style={[Styles.iconview]} onPress={IconPress}>
                        <Icon name={IconDetails.IconName} type={IconDetails.IconType} color={IconDetails.IconColor} size={IconDetails.IconSize}/>
                    </TouchableOpacity>
                }
            </View>
            <View style={[Styles.lowerpanel, {justifyContent: LabelMessage !== '' ? 'space-between' : 'flex-end'}]}>
                {
                    LabelMessage !== '' &&
                    <View>
                        <Text style={[Styles.labeltext]}>
                            {LabelMessage}
                        </Text>
                    </View>
                }
                {
                    CounterDetails &&
                    <View>
                        <Text style={[Styles.countertext]}>
                            {CounterDetails.CounterText}
                        </Text>
                    </View>
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
