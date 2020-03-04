import React ,{Component } from 'react';
import {Image, SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import {swidth} from './ScreenSetting';
import Icon from 'react-native-dynamic-vector-icons/lib/components/Icon';
import {SystemBlue} from './ColorPalate';

export default AppHeader = (props) => {


    let {
        text,
        navigation
    } = props;

    return (
            <View style={{height: swidth * 0.11, width: swidth ,flexDirection:'row', justifyContent:'center', borderBottomWidth: 1.2, borderColor: 'lightgray', alignItems: 'center' }}>
                <TouchableOpacity onPress={navigation.openDrawer}>
                    <Image source={require('../Assets/Images/user.png')} style={{height: swidth * 0.08, width : swidth * 0.08 }}/>
                </TouchableOpacity>
                <View style={{alignItems:'flex-start', width: swidth * 0.77}}>
                    <Text style={{fontSize: swidth * 0.05, marginLeft : swidth * 0.05, fontWeight: '500'}}>
                        {text}
                    </Text>
                </View>
                <View>
                    <Image source={require('../Assets/Images/MagicBlue.png')} style={{height: swidth * 0.07, width : swidth * 0.07 }}/>
                </View>
            </View>
    )
};
