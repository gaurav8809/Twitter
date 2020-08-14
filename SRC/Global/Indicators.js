import {
    DotIndicator,
    MaterialIndicator,
    UIActivityIndicator,
} from 'react-native-indicators';
import {SystemBlue} from './ColorPalate';
import {View, Text} from 'react-native';
import React from 'react';
import {swidth} from '../Global/ScreenSetting';
import {AntDesign} from './VectorIcons';

export const DefaultIndicator = (props) => {
    return (
        <View style={[{flex:1, backgroundColor:'rgba(0,0,0,0)', justifyContent: 'flex-start'}, props.viewStyle]}>
            <MaterialIndicator color={SystemBlue} size={swidth * 0.04} trackWidth={2}/>
        </View>
    );
};

export const TwitterCircleIndicator = () => {
    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <View style={{ position:'absolute', alignItems:'center'}}>
                <MaterialIndicator color={SystemBlue} size={swidth * 0.2} trackWidth={3}/>
                <AntDesign name={'twitter'} color={SystemBlue} size={swidth * 0.1} style={{position:'absolute',marginTop: swidth * 0.055}}/>
            </View>
            <Text style={{color: SystemBlue, fontSize : swidth * 0.04, fontWeight: "bold", marginLeft: swidth * 0.04, marginTop: swidth * 0.3}}>
                {"Loading ..."}
            </Text>
        </View>
    );
};


export const ImageLoaderIndicator = (props) => {
    return(
        <UIActivityIndicator
            color={SystemBlue}
            size={swidth * 0.04}
            style={[{
                position: 'absolute',
                justifySelf: 'center',
            },props.style]}
        />
    );
};

export const RefreshIndicator = (props) => {
    return(
        <UIActivityIndicator
            color={SystemBlue}
            size={swidth * 0.05}
            style={[{
                position: 'absolute',
                justifySelf: 'center',
            },props.style]}
        />
    );
};

export const IOSIndicator = (props) => {
    return (
        <View style={[{flex:1, backgroundColor:'rgb(0,0,0,0)'}, props.viewStyle]} >
            <UIActivityIndicator
                color={SystemBlue}
                size={swidth * 0.09}
                // count={20}
                // style={[{
                //     position: 'absolute',
                //     justifySelf: 'center',
                // },props.style]}
            />
        </View>
    );
};

export const SideLoader = (props) => {
    return (
        <View style={[{flex:1, backgroundColor:'rgb(0,0,0,0)'}, props.viewStyle]} >
            <UIActivityIndicator
                color={SystemBlue}
                size={swidth * 0.05}
            />
        </View>
    );
};

export const WaveLoader = (props) => {
    return (
        <View style={[{flex:1, backgroundColor:'rgb(0,0,0,0)'}, props.viewStyle]} >
            <DotIndicator
                color={SystemBlue}
                size={swidth * 0.01}
            />
        </View>
    );
};

