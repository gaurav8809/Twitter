import {
    StyleSheet,
    Modal,
    Text,
    TouchableOpacity,
    View,
    TouchableHighlight,
    TouchableNativeFeedback,
    Platform, PermissionsAndroid
} from 'react-native';
import React, {useState,useEffect} from 'react';
import {centertext, swidth,sheight, SW} from './ScreenSetting';
import {SystemBlue, TransColor} from './ColorPalate';
import Icon from 'react-native-dynamic-vector-icons/lib/components/Icon';
import Image from 'react-native-image-progress';
import {shallow} from 'react-native/jest/renderer';
import {SafeAreaView} from "react-native-safe-area-context";
import ImagePicker from "react-native-image-picker";


let TakePhotoPopUp;
export default TakePhotoPopUp = (props) => {

    let {
        visible,
        onPhotoSelect,
        onRequestClose,
    } = props;

    let STY = Styles;

    const handleChoosePhoto = async () => {

        let flag = false;
        if(Platform.OS === 'android')
        {
            await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)
                .then(async res => {
                    if(res)
                    {
                        flag = true;
                    }
                    else {
                        try {
                            const granted = await PermissionsAndroid.request(
                                PermissionsAndroid.PERMISSIONS.CAMERA,
                            );
                            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                                console.log('You can use the camera');
                                flag = true;
                            } else if(granted === 'never_ask_again') {
                                alert('You have already selected \"Never ask me again\" before');
                            } else {
                                console.log('Camera permission denied');
                            }
                        } catch (err) {
                            console.warn(err);
                        }
                    }
                });
        }
        else {
            flag = true;
        }

        if(flag)
        {
            const options = {
                noData: true,
                // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
                storageOptions: {
                    skipBackup: true,
                    // path: 'images',
                },
            };

            ImagePicker.launchCamera(options, (response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                    alert(response.customButton);
                } else {
                    if (response.uri) {
                        // setPhoto(response)
                        onPhotoSelect(response);
                    }
                }
            });
        }
    };

    const openPhotoGallery = async () => {
        let flag = false;
        if(Platform.OS === 'android')
        {
            await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
                .then(async res => {
                    if(res)
                    {
                        flag = true;
                    }
                    else {
                        try {
                            const granted = await PermissionsAndroid.request(
                                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                            );
                            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                                console.log('You can use the camera');
                                flag = true;
                            } else if(granted === 'never_ask_again') {
                                alert('You have already selected \"Never ask me again\" before');
                            } else {
                                console.log('Camera permission denied');
                            }
                        } catch (err) {
                            console.warn(err);
                        }
                    }
                });
        }
        else {
            flag = true;
        }

        if(flag)
        {
            const options = {
                noData: true,
                // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
                storageOptions: {
                    skipBackup: true,
                    // path: 'images',
                },
            };

            ImagePicker.launchImageLibrary(options, (response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                    alert(response.customButton);
                } else {
                    if (response.uri) {
                        onPhotoSelect(response);
                    }
                }
            });
        }
    };

    return(
        <Modal transparent={true} visible={visible} onRequestClose={onRequestClose}>
            {/*<SafeAreaView style={[STY.mainview,]}>*/}
                <TouchableOpacity onPressOut={onRequestClose} style={STY.mainview}>
                    <View style={STY.container}>
                        <TouchableOpacity style={STY.optionView} onPress={handleChoosePhoto}>
                            <Text style={STY.optionText}>
                                {"Take photo"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={STY.optionView} onPress={openPhotoGallery}>
                            <Text style={STY.optionText}>
                                {"Choose existing photo"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            {/*</SafeAreaView>*/}
        </Modal>
    )
};


let Styles = StyleSheet.create({

    mainview:{
        // height: SW(0)
        flex:1,
        ...centertext,
        backgroundColor: TransColor(0.7)
    },
    container:{
        backgroundColor: 'white',
        width: SW(0.75),
        padding: 10,
        borderRadius: 15
    },
    optionView:{
        padding:10,
        // backgroundColor: 'white'
    },
    optionText:{
        fontSize: SW(0.04)
    },

});
