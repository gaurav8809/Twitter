import React from 'react';
import { PermissionsAndroid } from 'react-native';

const requestCameraAndAudioPermission = async () => {

     Promise.all([
         await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA),
         await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO)
     ])
        .then(async res => {
            if(!res[0] || !res[1])
            {
                try {
                    const granted = await PermissionsAndroid.requestMultiple([
                        PermissionsAndroid.PERMISSIONS.CAMERA,
                        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
                    ]);
                    if (
                        granted['android.permission.RECORD_AUDIO'] === 'granted' &&
                        granted['android.permission.CAMERA'] === 'granted'
                    ) {
                        console.log('You can use the cameras & mic');
                    } else {
                        console.log('Permission denied');
                    }
                } catch (err) {
                    console.warn(err);
                    console.warn(err);
                }
            }
        });
};

export default requestCameraAndAudioPermission;
