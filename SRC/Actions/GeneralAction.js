import firebase from "react-native-firebase";
import TYPE, {LOGEDIN_USER} from '../Reducers/TypeConstants';
import HELPER from '../Global/Helper';
import {FireBaseStoreData} from '../Actions/SystemAction';
import {NavigationActions, StackActions} from "react-navigation";

export const GetTweets = (collection, followingArray, currentUserData) => {

    const DBRef = firebase.firestore().collection(collection)
        .where('userID','in', followingArray);

    return (dispatch, getState) => {

        return DBRef.get()
            .then(response => {

                debugger
                return Promise.resolve({
                    status: 200,
                    message: 'Successfully Get tweets',
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
