import firebase from "react-native-firebase";
import TYPE, {LOGEDIN_USER} from '../Reducers/TypeConstants';
import HELPER from '../Global/Helper';
// import { FireSQL } from 'firesql';
// import FIREBASE_METHOD from '../Actions/FireBaseMethods'
export const GetUserInfo = (collection, id) => {

    const DBRef = firebase.firestore().collection(collection).doc(id);

    return (dispatch, getState) => {

        return DBRef.get()
            .then(response => {
                dispatch({
                    type: TYPE.USER_INFO,
                    payload: response._data,
                });


            })
            .catch(error => {
                console.log(error);
                return Promise.reject({
                    status: 400,
                    message: 'Not Got data',
                    data: error
                });
            })
    };

};

export const SetLoginUserData = (data) => {

    return (dispatch, getState) => {

        dispatch({
            type: TYPE.LOGEDIN_USER,
            payload: data,
        });

    };

};

export const GetLoginUserData = (collection, id) => {

    const DBRef = firebase.firestore().collection(collection).doc(id);

    return (dispatch, getState) => {

        return DBRef.get()
            .then(response => {
                dispatch({
                    type: LOGEDIN_USER,
                    payload: response._data,
                });

                return Promise.resolve({
                    status: 200,
                    message: 'Successfully Get data',
                    data: response._data
                });

            })
            .catch(error => {
                console.log(error);
                return Promise.reject({
                    status: 400,
                    message: 'Not Got data',
                    data: error
                });
            })
    };

};


export const FollowUser = (collection, dataObj, currentUser) => {

    debugger

    let batch = firebase.firestore().batch();

    let followingRef = firebase.firestore().collection(collection).doc(dataObj.UserId);
    batch.update(followingRef,{following: firebase.firestore.FieldValue.arrayUnion(dataObj.OpUsername)});

    let followersRef = firebase.firestore().collection(collection).doc(dataObj.OpUserId);
    batch.update(followersRef, {followers: firebase.firestore.FieldValue.arrayUnion(dataObj.Username)});

    return (dispatch, getState) => {

        return batch.commit()
            .then(response => {
                debugger
                currentUser['following'].push(dataObj.OpUsername);
                debugger
                dispatch({
                    type: LOGEDIN_USER,
                    payload: currentUser,
                });

                return Promise.resolve({
                    status: 200,
                    message: 'Successfully follow',
                    data: currentUser
                });
            })
            .catch(error => {
                console.log(error);
                return Promise.reject({
                    status: 400,
                    message: 'Not followed',
                    data: error
                });
            })
    };

};



