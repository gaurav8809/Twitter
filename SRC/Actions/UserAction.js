import firestore from '@react-native-firebase/firestore';
import TYPE from '../Reducers/TypeConstants';

export const GetUserInfo = (collection, id) => {

    const DBRef = firestore().collection(collection).doc(id);

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

    const DBRef = firestore().collection(collection).doc(id);

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

    let batch = firestore().batch();

    let followingRef = firestore().collection(collection).doc(dataObj.UserId);
    batch.update(followingRef,{following: firestore.FieldValue.arrayUnion(dataObj.OpUserId)});

    let followersRef = firestore().collection(collection).doc(dataObj.OpUserId);
    batch.update(followersRef, {followers: firestore.FieldValue.arrayUnion(dataObj.UserId)});

    return (dispatch, getState) => {

        return batch.commit()
            .then(response => {

                dispatch(GetLoginUserData('users',currentUser.id));

                return Promise.resolve({
                    status: 200,
                    message: 'Successfully follow',
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

    let batch = firestore().batch();

    let followingRef = firestore().collection(collection).doc(dataObj.UserId);
    batch.update(followingRef,{following: firestore.FieldValue.arrayRemove(dataObj.OpUserId)});

    let followersRef = firestore().collection(collection).doc(dataObj.OpUserId);
    batch.update(followersRef, {followers: firestore.FieldValue.arrayRemove(dataObj.UserId)});

    return (dispatch, getState) => {

        return batch.commit()
            .then(response => {

                dispatch(GetLoginUserData('users',currentUser.id));

                return Promise.resolve({
                    status: 200,
                    message: 'Successfully Unfollow',
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

    const DBRef = firestore().collection(collection);

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

export const UpdateProfileInfo = (collection,userID,dataObj) => {

    const DBRef = firestore().collection(collection).doc(userID);

    return (dispatch,getState) => {

        return DBRef.update(dataObj)
            .then(response => {

                dispatch(GetLoginUserData('users',userID));

                console.log(response);
                return Promise.resolve({
                    status: 200,
                    message: 'Successfully updated',
                    data: response
                });

            })
            .catch(error => {
                console.log(error);
                return Promise.reject({
                    status: 400,
                    message: 'Not Updated',
                    data: error
                });
            })
    };

};

export const LikeUnlikeTweet = (status, dataObj, currentUser) => {

    let batch = firestore().batch();

    if (status) {
        let tweetRef = firestore().collection('tweets').doc(dataObj.tweetID);
        batch.update(tweetRef, {likes: firestore.FieldValue.arrayUnion(currentUser.id)});

        let userRef = firestore().collection('users').doc(currentUser.id);
        batch.update(userRef, {likes: firestore.FieldValue.arrayUnion(dataObj.tweetID)});
    }
    else{
        let tweetRef = firestore().collection('tweets').doc(dataObj.tweetID);
        batch.update(tweetRef,{likes: firestore.FieldValue.arrayRemove(currentUser.id)});

        let userRef = firestore().collection('users').doc(currentUser.id);
        batch.update(userRef, {likes: firestore.FieldValue.arrayRemove(dataObj.tweetID)});
    }

    return (dispatch, getState) => {

        return batch.commit()
            .then(response => {

                dispatch(GetLoginUserData('users',currentUser.id));

                return Promise.resolve({
                    status: 200,
                    message: status ? 'Successfully Like' : 'Successfully DisLike',
                });

            })
            .catch(error => {
                console.log(error);
                return Promise.reject({
                    status: 400,
                    message: status ? 'Not Liked' : 'Not DisLike',
                    data: error
                });
            })
    };

};

