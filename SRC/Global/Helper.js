import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    View,
    Image,
    StyleSheet,
    Modal,
    Platform
} from 'react-native';
import COLOR, {SystemBlue} from "./ColorPalate";
import {SW, SH, sheight, swidth, RHW, SHW, NHW, TransIT, centertext} from "./ScreenSetting";
import Icon from "react-native-dynamic-vector-icons/lib/components/Icon";
import ImageZoom from 'react-native-image-pan-zoom';

const Months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const setLoader = (flag) => {
    // state.setState({
    //     loader: flag
    // });
    const [loader, set] = useState(false);
    set(flag);

};

const AsyncStore = async (key,data) => {
    try {
        let dataObj = JSON.stringify(data);
        await AsyncStorage.setItem(key, dataObj);
    } catch (e) {
        // saving error
        console.log(e);
    }
};

const AsyncFetch = async (key) => {
    try {

        let value = await AsyncStorage.getItem(key);
        return Promise.resolve(JSON.parse(value));

    } catch(e) {
        alert("Error = " + e);
        return Promise.reject(e);
    }
};

const AsyncRemove = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    } catch (e) {
        return false;
    }
};

const IS_IOS = () => {

    return Platform.OS === 'ios';

};

const parseDate = (date) => {
    let f = new Date(date);
    return {
        FULL : f,
        DATE : f.getDate(),
        M_IN_D : f.getMonth() + 1,
        M_IN_W : Months[f.getMonth()],
        YEAR : f.getFullYear(),
        TIMESTAMP : new Date(date * 1000),
    }
};

export const DismissKeyboardView = ({ children , actionCallback}) => (
    <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
        actionCallback && actionCallback
    }}>
        {children}
    </TouchableWithoutFeedback>
);

export const DynamicBottomBar = ({ children }) => (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : null}  >
        {children}
    </KeyboardAvoidingView>
);

export const OfficialSymbol = (props) => (
    <Icon
        name={"checkcircle"}
        type={"AntDesign"}
        color={SystemBlue}
        size={swidth * 0.04}
    />
);

export const DynamicTopBar = ({ children }) => (
    <View style={{
        // marginTop: 30,
        height: swidth * 0.12,
        width: swidth,
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomWidth: 1.2,
        borderColor: 'lightgray',
        alignItems: 'center',
    }}>
        {children}
    </View>
);

export const LeftButtonCircle = (props) => (
    <View style={Styles.leftButtonView}>
        <Icon
            name={"arrowleft"}
            type={"AntDesign"}
            color={'white'}
            size={swidth * 0.047}
        />
    </View>
);

export const MenuButtonCircle = (props) => (
    <View style={Styles.leftButtonView}>
        <Icon
            name={"dots-three-vertical"}
            type={"Entypo"}
            color={'white'}
            size={swidth * 0.05}
            style={{backgroundColor:'red'}}
        />
    </View>
);

export const PreviewImageView = (props) => {

    let {
        preview,
        backPress,
        PreviewImage
    } = props;

    // const [pre,setPre] = useState(preview);

    return (
        <Modal
            visible={preview}
            transparent={true}
            animationType="none"
            onRequestClose={backPress}
        >
            <View style={Styles.pImaheView}>

                <View style={{justifySelf: 'center', alignSelf: 'center', }}>
                    {
                        PreviewImage !== null &&
                        // <Image
                        //     source={{uri: PreviewImage.pImagePath}}
                        //     style={[
                        //         {
                        //             height: (sheight * PreviewImage.pImageHeight) / 1000,
                        //             width: swidth,
                        //             overlayColor: 'black',
                        //         }
                        //     ]}
                        //     resizeMode={'contain'}
                        // />
                        <ImageZoom
                            cropWidth={swidth}
                            cropHeight={sheight}
                            imageWidth={swidth}
                            imageHeight={sheight}
                        >
                            <Image style={{resizeMode:'contain', width: swidth, height:(sheight * PreviewImage.pImageWidth) / PreviewImage.pImageWidth}}
                                   source={{uri: PreviewImage.pImagePath}}
                            />
                        </ImageZoom>
                    }
                </View>
                <View style={{
                    marginLeft: swidth * 0.03,
                    alignSelf: 'flex-start',
                    top: swidth * 0.06,
                    position: 'absolute'
                }}>
                    <Icon
                        name={"arrowleft"}
                        type={"AntDesign"}
                        color={'white'}
                        size={swidth * 0.06}
                        onPress={backPress}
                    />
                </View>
            </View>
        </Modal>
    );

};

let Styles = StyleSheet.create({

    mainview:{
        flex:1,
        width: swidth,
        backgroundColor: COLOR.BackGrayColor
    },
    wholabelcontainer:{
        padding: swidth * 0.027,
        backgroundColor: 'white',
        borderBottomWidth: 0.8,
        borderColor: 'lightgray',
    },
    wholabeltext:{
        fontSize: swidth * 0.05,
        fontWeight: "bold",
    },
    seemorecontainer:{
        height: swidth * 0.13,
        padding: swidth * 0.030,
        backgroundColor: 'white',
        borderBottomWidth: 0.8,
        borderColor: 'lightgray',
        justifyContent:'center'
    },
    pImaheView:{
        flex:1,
        backgroundColor: 'rgb(0,0,0)',
        // alignItems: 'center',
        justifyContent: 'center',
        overlayColor: 'black',
    },
    leftButtonView:{
        ...RHW(0.07),
        backgroundColor: 'rgba(0,0,0,0.65)',
        ...centertext,
        // backgroundColor: 'black'
    },

});


module.exports = {
    setLoader,
    AsyncStore,
    AsyncFetch,
    AsyncRemove,
    IS_IOS,
    parseDate,
    DismissKeyboardView,
    DynamicBottomBar,
    OfficialSymbol,
    DynamicTopBar,
    PreviewImageView,
    LeftButtonCircle,
    MenuButtonCircle
};
