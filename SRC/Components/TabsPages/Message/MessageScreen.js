import React, {Component} from 'react';
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
import COLOR, {SlateGray, SystemBlue} from "../../../Global/ColorPalate";
import {ChatUserListBadge} from "../../../Global/TwitterBadges";
import {BlueWhiteButton, BubbleButton, LinerButton, SystemButton} from "../../../Global/TwitterButton";
import firebase from "react-native-firebase";

const CHAT_LIST = [
    {
        chatInfo: [
            {
                messageText: "message1",
                receiverID: "",
                senderID: "",
                timestamp: {seconds: 1591598520, nanoseconds: 0},
            },
            {
                messageText: "message2",
                receiverID: "",
                senderID: "",
                timestamp: {seconds: 1591591200, nanoseconds: 0},
            }
        ],
        userInfo: {
            bioDetails: "Your daily dose of Bollywood gossip and fashion. Instagram : https://Instagram.com/pinkvilla YouTube: https://youtube.com/pinkvilla",
            birthDate: {seconds: 1578494757, nanoseconds: 0},
            coverImage: "https://firebasestorage.googleapis.com/v0/b/twitter-13dd2.appspot.com/o/CoverPhotos%2F1586013019915?alt=media&token=417b796a-0c9e-49a8-ba40-276a579206ed",
            email: "",
            followers: (3) ["4XcrSA7nPcmhz4Ib9mbk", "hJ6W9CgIyow0z6mUoJrL", "zDlrdNXjdHvhx2E3gUx5"],
            following: (2) ["4XcrSA7nPcmhz4Ib9mbk", "bXJCmYwZcvHDZ0e9STfW"],
            id: "DTRvSbAn1HvmGqFaNWIi",
            languages: (5) ["English", "Gujarati", "Hindi", "Marathi", "Nepali"],
            location: "Mumbai",
            official: true,
            password: "pinkvilla",
            phone: "1234567890",
            profileImage: "https://firebasestorage.googleapis.com/v0/b/twitter-13dd2.appspot.com/o/UserProfiles%2FPinkvilla.png?alt=media&token=c4f4c8dc-8d29-4e96-b676-c1582cc0e4c0",
            profilename: "Pinkvilla",
            timestamp: {seconds: 1583969540, nanoseconds: 0},
            username: "@pinkv68611",
        }
    },
    {
        chatInfo: [
            {
                messageText: "message1",
                receiverID: "",
                senderID: "",
                timestamp: {seconds: 1591598520, nanoseconds: 0},
            },
            {
                messageText: "message2",
                receiverID: "",
                senderID: "",
                timestamp: {seconds: 1591591200, nanoseconds: 0},
            }
        ],
        userInfo: {
            bioDetails: "Your daily dose of Bollywood gossip and fashion. Instagram : https://Instagram.com/pinkvilla YouTube: https://youtube.com/pinkvilla",
            birthDate: {seconds: 1578494757, nanoseconds: 0},
            coverImage: "https://firebasestorage.googleapis.com/v0/b/twitter-13dd2.appspot.com/o/CoverPhotos%2F1586013019915?alt=media&token=417b796a-0c9e-49a8-ba40-276a579206ed",
            email: "",
            followers: (3) ["4XcrSA7nPcmhz4Ib9mbk", "hJ6W9CgIyow0z6mUoJrL", "zDlrdNXjdHvhx2E3gUx5"],
            following: (2) ["4XcrSA7nPcmhz4Ib9mbk", "bXJCmYwZcvHDZ0e9STfW"],
            id: "DTRvSbAn1HvmGqFaNWIi",
            languages: (5) ["English", "Gujarati", "Hindi", "Marathi", "Nepali"],
            location: "Mumbai",
            official: true,
            password: "pinkvilla",
            phone: "1234567890",
            profileImage: "https://firebasestorage.googleapis.com/v0/b/twitter-13dd2.appspot.com/o/UserProfiles%2FPinkvilla.png?alt=media&token=c4f4c8dc-8d29-4e96-b676-c1582cc0e4c0",
            profilename: "Pinkvilla",
            timestamp: {seconds: 1583969540, nanoseconds: 0},
            username: "@pinkv68611",
        }
    },
];

class MessageScreen extends Component{

    constructor(props) {
        super(props);

        this.state = {
        };

    }

    componentDidMount(){
        this.getLatest();
    }

    getLatest = () => {
        const subscriber = firebase.firestore()
            .collection('chats')
            .onSnapshot(documentSnapshot => {
                this.props.getChatList();
            });
        return () => subscriber();
    };

    renderUserBadge = ({item,index}) => {
        return (
            <View key={index}>
                <ChatUserListBadge
                    data={item}
                    onPress={() => {
                        this.props.saveCurrentChat(item);
                        this.props.navigation.navigate('PersonalChatScreen');
                    }}
                />
            </View>
        );
    };

    render(){
        return(
            <SafeAreaView style={[safearea]}>
                <View style={Styles.mainview}>
                    <FlatList
                        contentContainerStyle={{flex:1}}
                        data={this.props.ChatList}
                        keyExtractor={(item,index) => index.toString()}
                        renderItem={this.renderUserBadge}
                        ListEmptyComponent={
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                // backgroundColor: 'pink',
                                flex:1,
                            }}>
                                <Text style={{textAlign: 'center',fontSize: SW(0.055), fontWeight: 'bold'}}>
                                    {"Send a message, got a message"}
                                </Text>
                                <Text style={{marginTop: SH(0.02),textAlign: 'center',width: SW(0.85), fontSize: SW(0.04), color: COLOR.SlateGray}}>
                                    {"Direct Messages are private conversations between you and other people on Twitter. Share Tweets, media, and more!"}
                                </Text>
                                <SystemButton
                                    text={"Write a message"}
                                    styles={{
                                        button: {
                                            width: SW(0.4),
                                            height: SW(0.09),
                                        },
                                        text:{fontSize: SW(0.04)}
                                    }}
                                    // onPress={}
                                />
                            </View>
                        }
                    />
                    <BubbleButton
                        screen={'CHAT'}
                        IconDetails={{
                            type: 'MaterialCommunityIcons',
                            name: 'message-plus',
                            color: 'white',
                            size: swidth * 0.062,
                        }}
                        onPress={() => this.props.navigation.navigate("NewMessageScreen")}
                    />
                </View>
            </SafeAreaView>
        )
    }
}


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

export default connect(mapStateToProps, mapDispatchToProps)(MessageScreen);

