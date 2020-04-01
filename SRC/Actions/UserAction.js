import firebase from "react-native-firebase";
import TYPE, {LOGEDIN_USER} from '../Reducers/TypeConstants';
import HELPER from '../Global/Helper';
import {FireBaseStoreData} from '../Actions/SystemAction';
import {NavigationActions, StackActions} from "react-navigation";

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

                let FinalData = response._data;
                FinalData['id'] = id;

                dispatch({
                    type: TYPE.LOGEDIN_USER,
                    payload: FinalData,
                });

                return Promise.resolve({
                    status: 200,
                    message: 'Successfully Get data',
                    data: FinalData
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

    let batch = firebase.firestore().batch();

    let followingRef = firebase.firestore().collection(collection).doc(dataObj.UserId);
    batch.update(followingRef,{following: firebase.firestore.FieldValue.arrayUnion(dataObj.OpUserId)});

    let followersRef = firebase.firestore().collection(collection).doc(dataObj.OpUserId);
    batch.update(followersRef, {followers: firebase.firestore.FieldValue.arrayUnion(dataObj.UserId)});

    return (dispatch, getState) => {

        return batch.commit()
            .then(response => {

                dispatch(GetLoginUserData('users',currentUser.id));

                return Promise.resolve({
                    status: 200,
                    message: 'Successfully follow',
                    // data: response.data
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

export const UnFollowUser = (collection, dataObj, currentUser) => {

    let batch = firebase.firestore().batch();

    let followingRef = firebase.firestore().collection(collection).doc(dataObj.UserId);
    batch.update(followingRef,{following: firebase.firestore.FieldValue.arrayRemove(dataObj.OpUserId)});

    let followersRef = firebase.firestore().collection(collection).doc(dataObj.OpUserId);
    batch.update(followersRef, {followers: firebase.firestore.FieldValue.arrayRemove(dataObj.UserId)});

    return (dispatch, getState) => {

        return batch.commit()
            .then(response => {

                dispatch(GetLoginUserData('users',currentUser.id));

                return Promise.resolve({
                    status: 200,
                    message: 'Successfully Unfollow',
                    // data: response.data
                });

            })
            .catch(error => {
                console.log(error);
                return Promise.reject({
                    status: 400,
                    message: 'Not Unfollowed',
                    data: error
                });
            })
    };

};

export const PostTweet = (collection,dataObj) => {

    const DBRef = firebase.firestore().collection(collection);

    return (dispatch,getState) => {
        return DBRef.add(dataObj)
            .then(response => {

                return Promise.resolve({
                    status: 200,
                    message: 'Successfully post a tweet',
                    data: response
                });

            })
            .catch(error => {
                console.log(error);
                return Promise.reject({
                    status: 400,
                    message: 'Not post a tweet',
                    data: error
                });
            })
    };


};



