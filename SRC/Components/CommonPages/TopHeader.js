import React from "react";
import {StyleSheet, Text, View, TouchableOpacity, Image} from "react-native";
import Icon from "react-native-dynamic-vector-icons/lib/components/Icon";
import {SlateGray, SystemBlue} from "../../Global/ColorPalate";
import {swidth, SW, SH} from "../../Global/ScreenSetting";
import {DynamicTopBar} from "../../Global/Helper";
import {SlateGrayText} from "../../Global/TwitterText";

export const TopHeader = (props) => {

    let {
        text,
        nav,
        rightView,
        rightViewPress,
        rightPressEnable,
        image,
        userName
    } = props;

    let {
        screenText
    } = Styles;

    return(
        <DynamicTopBar viewStyle={{backgroundColor: 'pink'}}>
            {
                image
                ?
                    <View style={{flex:1, flexDirection:'row'}}>
                        <View style={{flex: 7, flexDirection:'row', alignItems:'center', }}>
                            <View style={{left: SW(0.04)}}>
                                <Icon
                                    name={"arrow-left"}
                                    type={"MaterialCommunityIcons"}
                                    color={SystemBlue}
                                    size={swidth * 0.06}
                                    onPress={() => nav.goBack()}
                                />
                            </View>
                            <View style={{left: SW(0.05)}}>
                                <Image
                                    source={ image ? {uri: image} : require('../../Assets/Images/usergray.png')}
                                    style={Styles.profileimage}
                                />
                            </View>
                            <View style={{left: SW(0.1)}}>
                                <View>
                                    <Text style={screenText}>
                                        {text}
                                    </Text>
                                    {
                                        userName &&
                                        <Text style={[{
                                            color: SlateGray,
                                            fontSize: swidth * 0.040,
                                        }, props.userText]}>
                                            {userName}
                                        </Text>
                                        // <SlateGrayText
                                        //     text={`${userName}`}
                                        // />
                                    }
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity
                            disabled={rightPressEnable}
                            style={{flex: 1, alignItems:'flex-end', justifyContent:'center', marginRight: SW(0.03)}}
                            onPress={rightViewPress}
                        >
                            {rightView && rightView}
                        </TouchableOpacity>
                    </View>
                :
                    <View style={{flex:1, flexDirection:'row'}}>
                        <View style={{flex: 1, flexDirection:'row', alignItems:'center'}}>
                            <Icon
                                name={"arrow-left"}
                                type={"MaterialCommunityIcons"}
                                color={SystemBlue}
                                size={swidth * 0.06}
                                onPress={() => nav.goBack()}
                                style={{marginLeft: SW(0.05)}}
                            />
                            <Text style={[screenText, {marginLeft: SW(0.07)}]}>
                                {text}
                            </Text>
                        </View>
                        <TouchableOpacity
                            disabled={rightPressEnable}
                            style={{alignItems:'flex-end', justifyContent:'center', marginRight: SW(0.03)}}
                            onPress={rightViewPress}
                        >
                            {rightView && rightView}
                        </TouchableOpacity>
                    </View>
            }

        </DynamicTopBar>
    );
};

let Styles = StyleSheet.create({

    screenText:{
        fontSize: swidth * 0.047,
        // fontWeight: Platform.OS === 'ios' ? "500" : 'bold',
        fontFamily: 'Roboto-Medium',
    },
    userNameText:{
        fontSize: swidth * 0.040,
        // color: Slat
        fontFamily: 'Roboto-Medium',
    },
    profileimage:{
        height: SW(0.1),
        width : SW(0.1),
        borderRadius: 100,
        // backgroundColor: 'lightgray',
    },

});
