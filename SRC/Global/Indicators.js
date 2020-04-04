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
            <MaterialIndicator color={SystemBlue} size={swidth * 0.15} trackWidth={5}/>
        </View>
    );
};

export const TwitterCircleIndicator = () => {
    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            {/*<Image source={require('../Assets/Images/TwitterBlueLogo.png')} style={{height: swidth * 0.2, width: swidth * 0.2}}/>*/}

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
            {/*<View style={{}}>*/}
                <UIActivityIndicator
                    color={SystemBlue}
                    size={swidth * 0.05}
                />
            {/*</View>*/}
        </View>
    );
};

export const WaveLoader = (props) => {
    return (
        <View style={[{flex:1, backgroundColor:'rgb(0,0,0,0)'}, props.viewStyle]} >
            {/*<View style={{}}>*/}
            <DotIndicator
                color={SystemBlue}
                size={swidth * 0.01}
            />
            {/*</View>*/}
        </View>
    );
};

