import firebase from "react-native-firebase";
import TYPE, {LOGEDIN_USER} from '../Reducers/TypeConstants';
import HELPER from '../Global/Helper';
import {FireBaseStoreData} from '../Actions/SystemAction';
import {NavigationActions, StackActions} from "react-navigation";
import {MakeRequest} from "../EndPoints/ApiCall";
import API from "../EndPoints/ApiConstants";
import axios from "axios";

const FireRef = firebase.firestore();
const TENOR_API_KEY = 'MOAF0HON3GCO';

export const GetTweets = (collection, currentUser) => {

    const TweetRef = FireRef.collection(collection);
    const UserRef = FireRef.collection('users');

    return (dispatch, getState) => {

        return TweetRef.get()
            .then(TResponse => {

                let tdata = TResponse._docs;
                let finalTweet = tdata
                    .filter(
                        item => {return (currentUser.following.includes(item._data.userID) ||
                        item._data.userID === currentUser.id)})
                    .map(item => Object.assign({tweetId:item.id}, item._data));

                return UserRef.get()
                    .then(UResponse => {

                        let udata = UResponse._docs;

                        let finalArray = finalTweet.map(fitem =>

                                Object.assign(
                                    // ...udata.map(i => fitem.userID === i.id && i._data).filter(item => item !== false)
                                    udata.filter(i => fitem.userID === i.id && i._data).map(it => Object.assign({id:it.id}, it._data))
                                    , fitem
                                )
                        );

                        debugger

                        // udata.map(item =>
                        //     finalTweet.map(fitem =>
                        //         fitem.userID === item.id && sendObj.push(Object.assign(item._data, fitem))
                        //     )
                        // );


                        return Promise.resolve({
                            status: 200,
                            message: 'Successfully Get users',
                            data: finalArray
                        });

                    })
                    .catch(error => {
                        console.log(error);
                        return Promise.reject({
                            status: 400,
                            message: 'Not Got user data',
                            data: error
                        });
                    })

            })
            .catch(error => {
                console.log(error);
                return Promise.reject({
                    status: 400,
                    message: 'Not Got Tweet data',
                    data: error
                });
            })
    };

};

export const GetUserTweets = (collection, currentUser) => {

    const TweetRef = FireRef.collection(collection);
    const UserRef = FireRef.collection('users');

    return (dispatch, getState) => {

        return TweetRef.get()
            .then(TResponse => {

                let tdata = TResponse._docs;
                let finalTweet = tdata
                    .filter(
                        item => {return (item._data.userID === currentUser.id || item._data.userID === currentUser.userID)})
                    .map(item => Object.assign({tweetId:item.id}, item._data));

                return UserRef.get()
                    .then(UResponse => {

                        let udata = UResponse._docs;

                        let finalArray = finalTweet.map(fitem =>

                            Object.assign(
                                // ...udata.map(i => fitem.userID === i.id && i._data).filter(item => item !== false)
                                udata.filter(i => fitem.userID === i.id && i._data).map(it => it._data)
                                , fitem
                            )
                        );

                        return Promise.resolve({
                            status: 200,
                            message: 'Successfully Get users',
                            data: finalArray
                        });

                    })
                    .catch(error => {
                        console.log(error);
                        return Promise.reject({
                            status: 400,
                            message: 'Not Got user data',
                            data: error
                        });
                    })

            })
            .catch(error => {
                console.log(error);
                return Promise.reject({
                    status: 400,
                    message: 'Not Got Tweet data',
                    data: error
                });
            })
    };

};

export const GetFollowingList = (collection, followingArray) => {

    const UserRef = FireRef.collection(collection);

    return (dispatch, getState) => {

        return UserRef.get()
            .then(response => {

                let udata = response._docs;

                let temp = [];
                let val = null;
                udata.forEach(item => {
                    val = item._data;
                    val['id'] = item.id;
                    temp.push(val)
                });

                let finalList = temp
                    .filter(item => followingArray.includes(item.id));
                    // .map(item => item._data);

                debugger
                return Promise.resolve({
                    status: 200,
                    message: 'Successfully Get users list',
                    data: finalList
                });

            })
            .catch(error => {
                console.log(error);
                return Promise.reject({
                    status: 400,
                    message: 'Not Got list data',
                    data: error
                });
            })
    };

};

export const GetGifs = (API) => {

    return (dispatch, getState) => {

        return axios.get(API)
            .then(response => {
                return Promise.resolve(response.data)
            })
            .catch((err) => {
                console.log("Error - ", err);
                return Promise.reject(err);
            });
    };

};

