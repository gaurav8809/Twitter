import firebase from "react-native-firebase";
import TYPE from '../Reducers/TypeConstants';
import {UNIQUE} from '../Global/Helper';
import {GetLoginUserData} from "./UserAction";

const FireRef = firebase.firestore();

export const chatListener = (collection) => {

    return (dispatch,getState) => {

        const DBRef = firebase.firestore().collection('chats')
            .doc('nNWjAF1SQRc220TxYfMb').collection('messages');

        let observer = DBRef.onSnapshot(docSnapshot => {
            console.log(`Received doc snapshot: ${JSON.stringify(docSnapshot.val, null, 4)}`);
            // ...
        }, err => {
            console.log(`Encountered error: ${err}`);
        });
    };


};

export const getChatIDList = () => {

    // console.log("Doc name = ",doc);
    // const DBRef = firebase.firestore().collection(collection);

    return (dispatch,getState) => {
        const {
            LogedInUserData
        } = getState().UserReducer;

        const DBRef = FireRef.collection('chats')
            .where("members", "array-contains", LogedInUserData.id);
        const UserRef = FireRef.collection('users');

        return DBRef.get()
            .then(response => {

                let chatUserIDS = [];
                let userArray = [];
                let dataArray = response._docs;
                let members = dataArray.map(i => i._data.members);
                let idList = dataArray.map(i => i.id);
                members.map(i => i.map(i => i !== LogedInUserData.id && chatUserIDS.push(i)));

                return UserRef.get()
                    .then(response => {

                        chatUserIDS.map(userID => {
                            response._docs.filter(i => userID === i.id && i._data).map(it =>
                                userArray.push(Object.assign({
                                    id: userID,
                                    ...it._data
                                }))
                            );
                        });

                        // let messageListArray = [];

                        // await idList.map(id => {
                        //     let reference = FireRef.collection('chats').doc(id).collection('messages')
                        //         .orderBy("timestamp","desc").limit(1);
                        //
                        //     reference.get()
                        //         .then(response => {
                        //
                        //             // let dataArray = response._docs;
                        //             debugger
                        //             messageListArray.push(response._docs[0]._data);
                        //
                        //         })
                        // });

                        let PAYLOAD = {
                            ChatIDList: idList,
                            ChatUsersList: userArray,
                        };

                        dispatch({
                            type: TYPE.SAVE_CHAT_ID_LIST,
                            payload: PAYLOAD,
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

export const getChatUserList = () => {

    // console.log("Doc name = ",doc);
    // const DBRef = firebase.firestore().collection(collection);

    return (dispatch,getState) => {
        const {
            LogedInUserData
        } = getState().UserReducer;

        const {
            ChatIDList,
            ChatUsersList,
        } = getState().ChatReducer;

        const UserRef = FireRef.collection('users');


        let messageListArray = [];

        let reference = FireRef.collection('chats').doc(id).collection('messages')
            .orderBy("timestamp","desc").limit(1);

        reference.get()
            .then(response => {

                // let dataArray = response._docs;
                messageListArray.push(response._docs[0]._data);

            })

        // ChatIDList.map(async id => {
        //
        //     debugger
        // });

        // if(messageListArray.length > 0)
        // {
        //     debugger
        //     dispatch({
        //         type: TYPE.SAVE_CHAT_USER_LIST,
        //         payload: messageListArray,
        //     });
        // }

    };


};

export const getChatList = () => {

    return (dispatch,getState) => {
        const {
            LogedInUserData
        } = getState().UserReducer;

        const ChatRef = FireRef.collection('chats')
            .where("members", "array-contains", LogedInUserData.id);
        const UserRef = FireRef.collection('users');

        return ChatRef.get()
            .then(chatRes => {

                let chatData = chatRes._docs;
                let members = chatData.map(i => i._data.members);
                let idList = chatData.map(i => i.id);
                // let chatUserIDS = members.filter(UNIQUE).filter(item => item !== LogedInUserData.id);
                let finalArray = [];
                // members.map(i => i.map(i => i !== LogedInUserData.id && chatUserIDS.push(i)));

                return UserRef.get()
                    .then(userRes => {

                        let userData = userRes._docs;
                        chatData.map(item => {
                            userData.filter(i => (item._data.members.includes(i.id) && i.id !== LogedInUserData.id) && i._data).map(it =>
                            {
                                let userInfo = Object.assign({
                                    id: it.id,
                                    ...it._data
                                });
                                finalArray.push({
                                    chatInfo: item._data.messages,
                                    userInfo: userInfo,
                                    channelID: item.id,
                                })
                            });
                        });

                        dispatch({
                            type: TYPE.SAVE_CHAT_LIST,
                            payload: finalArray,
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
                    message: 'Not Got chat data',
                    data: error
                });
            })

    };


};

export const saveCurrentChat = (data) => {

    return (dispatch, getState) => {

        dispatch({
            type: TYPE.SAVE_CURRENT_CHAT,
            payload: data,
        });


    };

};

export const sendMessage = (channelID, dataObj) => {

    // alert("In Action ==> Chanel ===>" + channelID);

    return (dispatch, getState) => {

        return FireRef.collection('chats').doc(channelID).update({
            messages: firebase.firestore.FieldValue.arrayUnion(dataObj)
        })
            // .then(response => {
            //
            //     return Promise.resolve({
            //         status: 200,
            //         message: "Message sent",
            //     });
            //
            // })
            // .catch(error => {
            //     console.log(error);
            //     return Promise.reject({
            //         status: 400,
            //         message: "Message not sent",
            //         data: error
            //     });
            // })
    };

};



