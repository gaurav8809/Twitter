import firestore from '@react-native-firebase/firestore';
import TYPE from '../Reducers/TypeConstants';
import axios from "axios";

const FireRef = firestore();
const TENOR_API_KEY = 'MOAF0HON3GCO';

export const LogOutSystem = () => {
    return dispatch => {
        // Your code here...
        dispatch({ type: TYPE.RESET_STORE });
    };
};

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
                    .map(item => Object.assign({tweetID:item.id}, item._data));

                return UserRef.get()
                    .then(UResponse => {

                        let udata = UResponse._docs;

                        let finalArray = finalTweet.map(fitem =>
                            Object.assign(
                            {userData:
                                    udata.filter(i => fitem.userID === i.id && i._data)
                                        .map(it => Object.assign({id:it.id}, it._data))[0]}
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
                    .map(item => Object.assign({tweetID:item.id}, item._data));

                return UserRef.get()
                    .then(UResponse => {

                        let udata = UResponse._docs;

                        let finalArray = finalTweet.map(fitem =>
                            Object.assign(
                                {userData:
                                        udata.filter(i => fitem.userID === i.id && i._data)
                                            .map(it => Object.assign({id:it.id}, it._data))[0]}
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

export const GetLocation = (option,q) => {

    let path = 'https://autosuggest.search.hereapi.com/v1/';
    let at = 'at=1,1';
    let key = 'apiKey=hzn97vGsAnNEy1SmuV6gFTe5zjkMHpkmXtxevo-FM5Y';
    let final = `${path}/${option}?${at}&${key}&q=${q}`;
    return (dispatch, getState) => {

        return axios.get(final)
            .then(response => {
                return Promise.resolve(response.data.items)
            })
            .catch((err) => {
                console.log("Error - ", err);
                return Promise.reject(err);
            });
    };

};

