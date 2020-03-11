import firebase from "react-native-firebase";
import TYPE, {LOGEDIN_USER} from '../Reducers/TypeConstants';
import HELPER from '../Global/Helper';
// import { FireSQL } from 'firesql';
// import FIREBASE_METHOD from '../Actions/FireBaseMethods'
export const GetUserInfo = (collection,id) => {

    const DBRef = firebase.firestore().collection(collection).doc(id);

    return (dispatch,getState) => {

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

    return (dispatch,getState) => {

        dispatch({
            type: TYPE.LOGEDIN_USER,
            payload: data,
        });

    };

};

export const GetLoginUserData = (collection,id) => {

    const DBRef = firebase.firestore().collection(collection).doc(id);

    return (dispatch,getState) => {

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

export const GetWhoToFollowList = (collection,username) => {

    debugger
    const DBRef = firebase.firestore().collection(collection)
        .where('followers','array-contains',username);

    return (dispatch,getState) => {

        return DBRef.get()
            .then(response => {
                debugger
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

