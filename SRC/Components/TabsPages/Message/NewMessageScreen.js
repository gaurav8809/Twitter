import React, {useEffect, useState, useRef, createRef} from 'react';

import {
    SafeAreaView,
    StyleSheet,
    View,
    FlatList,
    Text
} from 'react-native';
import {safearea, swidth, SW, SH, centertext} from '../../../Global/ScreenSetting'
import {connect} from 'react-redux';
import {getChatIDList, getChatUserList, getChatList, saveCurrentChat} from '../../../Actions/ChatAction';
import {SelectAll} from '../../../Actions/FireBaseDBAction';
import COLOR, {SlateGray, SystemBlue} from "../../../Global/ColorPalate";
import {ChatUserListBadge} from "../../../Global/TwitterBadges";
import {BlueWhiteButton, BubbleButton, LinerButton, SystemButton} from "../../../Global/TwitterButton";
import firebase from "react-native-firebase";

const NewMessageScreen = (props) => {

    useEffect(() => {
        getLatest();
    },[]);

    const getLatest = () => {
        const subscriber = firebase.firestore()
            .collection('users')
            .where("timestamp",">", Math.floor(Date.now() / 1000))
            .onSnapshot(documentSnapshot => {

                debugger
                alert("adw");

                // props.SelectAll('users')
                //     .then(response => {
                //         let wtfList = [];
                //         for(let item of response.data)
                //         {
                //             if(!item.followers.includes(this.state.currentUser.id))
                //             {
                //                 if(item.id !== this.state.currentUser.id)
                //                     wtfList.push(item);
                //             }
                //         }
                //
                //         this.setState({wtfList,refreshLoader:false},() =>  this.getTweetList());
                //     })
                //     .catch(error => {
                //         console.log(error)
                //     });

            });
        return () => subscriber();
    };

    // renderUserBadge = ({item,index}) => {
    //     return (
    //         <View key={index}>
    //             <ChatUserListBadge
    //                 data={item}
    //                 onPress={() => {
    //                     this.props.saveCurrentChat(item);
    //                     this.props.navigation.navigate('PersonalChatScreen');
    //                 }}
    //             />
    //         </View>
    //     );
    // };

    return(
        <SafeAreaView style={[safearea]}>
            <View style={Styles.mainview}>
                {/*<FlatList*/}
                {/*    contentContainerStyle={{flex:1}}*/}
                {/*    data={this.props.ChatList}*/}
                {/*    keyExtractor={(item,index) => index.toString()}*/}
                {/*    renderItem={this.renderUserBadge}*/}
                {/*/>*/}
            </View>
        </SafeAreaView>
    )
};


let Styles = StyleSheet.create({

    mainview:{
        flex:1,
        width: swidth,
        backgroundColor: COLOR.BackGrayColor
    },

});

const mapStateToProps = state => {
    const {
        ChatList,
    } = state.ChatReducer;
    return {
        ChatList
    };
};

const mapDispatchToProps = {
    getChatIDList,
    getChatUserList,
    getChatList,
    saveCurrentChat
};

export default NewMessageScreen;

