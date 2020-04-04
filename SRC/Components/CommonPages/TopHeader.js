import React from "react";
import {Platform, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import Icon from "react-native-dynamic-vector-icons/lib/components/Icon";
import {SystemBlue} from "../../Global/ColorPalate";
import {swidth, SW, SH} from "../../Global/ScreenSetting";
import {DynamicTopBar} from "../../Global/Helper";

export const TopHeader = (props) => {

    let {
        text,
        nav,
        rightView,
        rightViewPress,
        rightPressEnable
    } = props;

    let {
        followingText
    } = Styles;

    return(
        <DynamicTopBar>
            <View style={{flex:1, flexDirection:'row'}}>
                <View style={{flex: rightView ? 0.8 : 1, flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
                    <Icon
                        name={"arrow-left"}
                        type={"MaterialCommunityIcons"}
                        color={SystemBlue}
                        size={swidth * 0.06}
                        onPress={() => nav.goBack()}
                    />
                    <Text style={followingText}>
                        {text}
                    </Text>
                </View>
                <TouchableOpacity
                    disabled={rightPressEnable}
                    style={{flex:rightView ? 1 : 1.5, alignItems:'flex-end', justifyContent:'center', marginRight: SW(0.03)}}
                    onPress={rightViewPress}
                >
                    {rightView && rightView}
                </TouchableOpacity>
            </View>
        </DynamicTopBar>
    );
};

let Styles = StyleSheet.create({

    followingText:{
        fontSize: swidth * 0.047,
        // fontWeight: Platform.OS === 'ios' ? "500" : 'bold',
        fontFamily: 'Roboto-Medium',
    }

});
