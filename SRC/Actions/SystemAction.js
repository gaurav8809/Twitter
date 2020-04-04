import AsyncStorage from '@react-native-community/async-storage';
import {MakeRequest} from '../EndPoints/ApiCall';
import API from '../EndPoints/ApiConstants';
import firebase from 'react-native-firebase';
import {Platform} from 'react-native';

export const SendEmail = (dataobj) => {


    console.log("Here");
    return (dispatch,getState) => {
        return MakeRequest(API.FIREBASE_SENDEMAIL,'post',dataobj)
            .then(response => {
                if (response.status === 200) {
                    // dispatch({
                    //     type: VERIFYREGISTER,
                    //     payload: response.data,
                    // });
                    return Promise.resolve({
                        data: response.data,
                        status: response.status,
                        message: 'Successfully Verify',
                    });
                } else {
                    return Promise.reject(JSON.stringify(response.status));
                }
            })
            .catch(error => {
                return Promise.reject({
                    message: error.response.data.message,
                    status: error.response.status,
                });
            });

    }


};

export const FireBaseSendEmail = (dataobj) => {


    return (dispatch,getState) => {
        return MakeRequest(API.FIREBASE_SENDEMAIL,'post',dataobj)
            .then(response => {
                debugger
                if(response.accepted !== '')
                {
                    // dispatch({
                    //     type: VERIFYREGISTER,
                    //     payload: response.data,
                    // });
                    return Promise.resolve({
                        status: 200,
                        message: 'Successfully sent',
                    });
                } else {
                    return Promise.reject(JSON.stringify("Verification code has not been sent yet."));
                }
            })
            .catch(error => {
                debugger
                return Promise.reject({
                    status: 400,
                    message: 'Verification code has not been sent yet.',
                });
            });

    }

};

export const FireBaseStoreData = (folderPath,dataobj) => {

    var timestamp = Number(new Date());

    debugger
    return (dispatch,getState) => {
        return firebase
            .storage()
            .ref(`${folderPath}/${timestamp.toString()}`)
            // .child('myfile')
            .put(Platform === 'ios' ? dataobj.uri.replace('file://','') : dataobj.uri)
            .then(res => {
                debugger
                return Promise.resolve({
                    status: 200,
                    message: 'Successfully Stored',
                    data: res.downloadURL
                });
            })
            .catch(error => {
                debugger
                console.log(error);
                return Promise.reject({
                    status: 400,
                    message: 'Not Stored',
                    data: error
                });
            })

    }
};
