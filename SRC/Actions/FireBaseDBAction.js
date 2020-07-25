import {MakeRequest} from '../EndPoints/ApiCall';
import API from '../EndPoints/ApiConstants';
import firebase from 'react-native-firebase';
import {Platform} from 'react-native';
import {LOGEDIN_USER} from '../Reducers/TypeConstants';
import HELPER from '../Global/Helper';

export const SendEmail = (dataobj) => {

    console.log("Here");
    return (dispatch,getState) => {
        return MakeRequest(API.FIREBASE_SENDEMAIL,'post',dataobj)
            .then(response => {
                if (response.status === 200) {
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
                return Promise.reject({
                    status: 400,
                    message: 'Verification code has not been sent yet.',
                });
            });

    }

};

export const FireBaseStoreData = (folderPath,dataobj) => {

    var timestamp = Number(new Date());

    return (dispatch,getState) => {
        return firebase
            .storage()
            .ref(`${folderPath}/${timestamp.toString()}`)
            .put(Platform === 'ios' ? dataobj.uri.replace('file://','') : dataobj.uri)
            .then(res => {
                return Promise.resolve({
                    status: 200,
                    message: 'Successfully Stored',
                    data: res.downloadURL
                });
            })
            .catch(error => {
                console.log(error);
                return Promise.reject({
                    status: 400,
                    message: 'Not Stored',
                });
            })

    }
};

export const CreateUser = (collection,dataObj) => {

    const DBRef = firebase.firestore().collection(collection);

    return (dispatch,getState) => {
        return DBRef.add(dataObj)
            .then(response => {

                return Promise.resolve({
                    status: 200,
                    message: 'Successfully created new record',
                    data: response.id
                });

                // return firebase.firestore().collection('userinfo').doc(response.id).set(userInfo)
                //     .then(res => {
                //         debugger
                //         return Promise.resolve({
                //             status: 200,
                //             message: 'Successfully created new record',
                //             data: response.id
                //         });
                //     })
                //     .catch(error => {
                //         console.log(error);
                //         return Promise.reject({
                //             status: 400,
                //             message: 'Not Stored inner',
                //             data: error
                //         });
                //     });
            })
            .catch(error => {
                console.log(error);
                return Promise.reject({
                    status: 400,
                    message: 'Not Stored outer',
                    data: error
                });
            })
    };

};

export const Update = (collection,dataObj) => {

    const DBRef = firebase.firestore().collection(collection);

    return (dispatch,getState) => {

        return DBRef.update(dataObj)
            .then(response => {

                return Promise.resolve({
                    status: 200,
                    message: 'Successfully created new user',
                    data: response
                });

            })
            .catch(error => {
                console.log(error);
                return Promise.reject({
                    status: 400,
                    message: 'Not Stored',
                    data: error
                });
            })
    };

};

export const UpdateWhere = (collection,doc,dataObj) => {

    // console.log("Doc name = ",doc);
    const DBRef = firebase.firestore().collection(collection).doc(doc);

    return (dispatch,getState) => {

        return DBRef.update(dataObj)
            .then(response => {

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

export const SelectAll = (collection) => {

    const DBRef = firebase.firestore().collection(collection);

    return (dispatch,getState) => {
        return DBRef.get()
            .then(response => {
                // console.log("Response==========================");
                // debugger
                // response.forEach(doc => {
                //     console.log(doc);
                // });
                let f = [];
                let val = null;
                response._docs.forEach(item => {
                    val = item._data;
                    val['id'] = item.id;
                    f.push(val)
                });

                return Promise.resolve({
                    status: 200,
                    message: 'Successfully Get all data',
                    data: f
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

export const SelectUserById = (collection,id) => {

    const DBRef = firebase.firestore().collection(collection).doc(id);

    return (dispatch,getState) => {

        return DBRef.get()
            .then(response => {
                dispatch({
                    type: LOGEDIN_USER,
                    payload: response._data,
                });

                let FinalData = response._data;
                FinalData['id'] = id;

                HELPER.AsyncStore('AsyncLogedInUserData',FinalData);
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

export const GetField = (collection,dataObj) => {

    const DBRef = firebase.firestore().collection(collection)
        .where(dataObj[0],dataObj[1],dataObj[2]);

    return (dispatch,getState) => {

        return DBRef.get()
            .then(response => {

                if (response.empty) {
                    return Promise.resolve({
                        status: 400,
                        message: 'No data found',
                        data: response._data
                    });
                }

                return Promise.resolve({
                    status: 200,
                    message: 'Successfully Get data',
                    data: response._data
                });

            })
            .catch(error => {
                console.log(error);
                return Promise.reject({
                    status: 500,
                    message: 'Not Got data',
                    data: error
                });
            })
    };
};
