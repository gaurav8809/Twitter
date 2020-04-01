import React from "react";
import {Platform, StyleSheet, Text, View} from "react-native";
import Icon from "react-native-dynamic-vector-icons/lib/components/Icon";
import {SystemBlue} from "../../Global/ColorPalate";
import {swidth} from "../../Global/ScreenSetting";
import {DynamicTopBar} from "../../Global/Helper";

export const TopHeader = (props) => {

    let {
        text,
        nav,
    } = props;

    let {
        followingText
    } = Styles;

    return(
        <DynamicTopBar>
            <View style={{flex:1, flexDirection:'row'}}>
                <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
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
                <View style={{flex:1.5, }}>
                </View>
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
