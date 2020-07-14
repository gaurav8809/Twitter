import React, {useEffect, useState, useRef, createRef} from 'react';

import {
    SafeAreaView,
    StyleSheet,
    View,
    FlatList,
    TextInput
} from 'react-native';
import {safearea, swidth, SW, SH, IS_IOS} from '../../../Global/ScreenSetting'
import {connect} from 'react-redux';
import {SelectAll} from '../../../Actions/FireBaseDBAction';
import {saveCurrentChat, getChatIDList} from '../../../Actions/ChatAction';
import COLOR, {SlateGray, SystemBlue} from "../../../Global/ColorPalate";
import {ChatUserListBadge, SimpleUserBadge} from "../../../Global/TwitterBadges";
import {TopHeader} from "../../CommonPages/TopHeader";
import Icon from "react-native-dynamic-vector-icons/lib/components/Icon";

const NewMessageScreen = (props) => {

    let CurrentUser = props.LogedInUserData;
    const [usersList, setUsersList] = useState([]);
    const [AllUsers, setAllUsers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        getLatest();
        props.getChatIDList();
    },[]);

    useEffect(() => {
        props.getChatIDList();
    },[props.CurrentChat.channelID]);

    useEffect(() => searchAction(),[searchText]);

    const getLatest = () => {
        props.SelectAll('users')
            .then(response => {
                let finalArray = response.data.filter(item => item.id !== CurrentUser.id);
                setUsersList(finalArray);
                setAllUsers(finalArray);
                setRefresh(false);
            })
            .catch(error => {
                console.log(error);
                setRefresh(false);
            });
    };

    const renderUserBadge = ({item,index}) => {
        return (
            <View key={index}>
                <SimpleUserBadge
                    data={item}
                    onPress={() => {
                        let IDS = props.ChatIDsList.filter(i => i.userID === item.id);
                        let dataObj = {
                            userInfo: item,
                            chatInfo: [],
                            channelID: IDS.length > 0 ? IDS[0].channelID : null,
                        };
                        props.saveCurrentChat(dataObj);
                        props.navigation.navigate('PersonalChatScreen');
                    }}
                />
            </View>
        );
    };

    const searchAction = () => {
        if(searchText === '')
        {
            setUsersList(AllUsers);
            return;
        }

        let data = [];
        usersList.map(i => i.profilename.toLowerCase().includes(searchText.toLowerCase()) && data.push(i))
        setUsersList(data);
    };

    return(
        <SafeAreaView style={[safearea]}>
            <View style={Styles.mainview}>

                <TopHeader
                    text={"New Message"}
                    nav={props.navigation}
                />

                <View style={{alignItems: 'center',padding: SH(IS_IOS() ? 0.02 : 0.01), flexDirection: 'row', backgroundColor: COLOR.BackGrayColor}}>
                    <Icon
                        name={"search1"}
                        type={"AntDesign"}
                        color={SlateGray}
                        size={SW(0.06)}
                        style={{marginLeft: SW(0.025)}}
                    />
                    <TextInput
                        style={{marginLeft: SW(0.04), fontSize: SW(0.05)}}
                        placeholder={"Search for people and groups"}
                        placeholderTextColor={SlateGray}
                        value={searchText}
                        onChangeText={text => setSearchText(text)}
                    />
                </View>

                <FlatList
                    refreshing={refresh}
                    onRefresh={() => {
                        setRefresh(true);
                        getLatest();
                    }}
                    contentContainerStyle={{flex:1}}
                    data={usersList}
                    keyExtractor={(item,index) => index.toString()}
                    renderItem={renderUserBadge}
                />
            </View>
        </SafeAreaView>
    )
};


let Styles = StyleSheet.create({

    mainview:{
        flex:1,
        width: swidth,
    },

});

const mapStateToProps = state => {
    const {
        LogedInUserData
    } = state.UserReducer;

    const {
        ChatIDsList,
        CurrentChat
    } = state.ChatReducer;

    return {
        LogedInUserData,
        ChatIDsList,
        CurrentChat
    };
};

const mapDispatchToProps = {
    SelectAll,
    saveCurrentChat,
    getChatIDList
};

NewMessageScreen.navigationOptions = {
    headerShown: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewMessageScreen);
