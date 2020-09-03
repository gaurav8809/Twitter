import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import {safearea} from "../../../Global/ScreenSetting";
import {IS_IOS} from '../../../Global/Helper';
import requestCameraAndAudioPermission from '../../../Agora-Setup/Permission';
import style from './style';
import Video from "../../../Agora-Setup/Video";

const VideoCallTab = () => {

    const [appID, setAppID] = useState('f9c84db8385946fa9e6a27a1099279ac');
    const [channelName, setChannelName] = useState('TEST');
    const [call, setCall] = useState(false);

    useEffect(() => {
        !IS_IOS() && requestCameraAndAudioPermission()
    },[]);

    const handleSubmit = () => {
        if (appID !== '' && channelName !== '') {
            setCall(true);
        }
    };

    return(
        <SafeAreaView style={[safearea]}>
            <View style={style.mainView}>
                {
                    !call
                    ?
                    <ScrollView>
                        <View style={style.container}>
                            <Text style={style.formLabel}>App ID</Text>
                            <TextInput
                                style={style.formInput}
                                onChangeText={(text) => setAppID(text)}
                                value={appID}
                            />
                            <Text style={style.formLabel}>Channel Name</Text>
                            <TextInput
                                style={style.formInput}
                                onChangeText={(text) => setChannelName(text)}
                                value={channelName}
                            />
                            <View style={style.buttonContainer}>
                                <TouchableOpacity
                                    title='Start Call!'
                                    onPress={handleSubmit}
                                    style={style.submitButton}
                                >
                                    <Text style={{ color: '#ffffff' }}> Start Call </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                    :
                    <Video
                        appID={appID}
                        channelName={channelName}
                        setCall={_ => setCall(false)}
                    />

                }
            </View>
        </SafeAreaView>
    );
};

export default VideoCallTab;
