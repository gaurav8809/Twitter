import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';
import {SystemBlue} from './ColorPalate';
import {View,Image,Text} from 'react-native';
import React from 'react';
import {swidth,sheight,centertext} from '../Global/ScreenSetting';
import {AntDesign} from './VectorIcons';

export const DefaultIndicator = () => {
    return (
        <View style={{flex:1, backgroundColor:'rgba(0,0,0,0.1)'}}>
            <MaterialIndicator color={SystemBlue} size={swidth * 0.15}/>
        </View>
    );
};

export const TwitterCircleIndicator = () => {
    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            {/*<Image source={require('../Assets/Images/TwitterBlueLogo.png')} style={{height: swidth * 0.2, width: swidth * 0.2}}/>*/}

            <View style={{ position:'absolute', alignItems:'center'}}>
                <MaterialIndicator color={SystemBlue} size={swidth * 0.23} trackWidth={3}/>
                <AntDesign name={'twitter'} color={SystemBlue} size={swidth * 0.12} style={{position:'absolute',marginTop: swidth * 0.06}}/>
            </View>
            <Text style={{color: SystemBlue, fontSize : swidth * 0.05, fontWeight: "bold", marginLeft: swidth * 0.04, marginTop: swidth * 0.37}}>
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

