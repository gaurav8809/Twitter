import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    FlatList,
    Text, Modal
} from 'react-native';
import {safearea, swidth, SW, SH, centertext} from '../../../Global/ScreenSetting'
import {connect} from 'react-redux';
import {getChatList, saveCurrentChat} from '../../../Actions/ChatAction';
import COLOR, {SlateGray, SystemBlue} from "../../../Global/ColorPalate";
import {ChatUserListBadge} from "../../../Global/TwitterBadges";
import {BlueWhiteButton, BubbleButton, LinerButton, SystemButton} from "../../../Global/TwitterButton";
import firebase from "react-native-firebase";
import {DefaultIndicator} from "../../../Global/Indicators";
import {MaterialIndicator} from "react-native-indicators";

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
            chatLoader: true,
        };
    }

    componentDidMount(){
        this.getLatest();
    }

    getLatest = () => {
        const subscriber = firebase.firestore()
            .collection('chats')
            .onSnapshot(documentSnapshot => {
                this.props.getChatList()
                    .then(res => {
                        this.setState({chatLoader: false});
                    })
                    .catch(err => {
                        this.setState({chatLoader: false});
                    });
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
        let STD = this.state;
        let CHAT_DATA = this.props.ChatList;
        return(
            <SafeAreaView style={[safearea]}>
                <View style={Styles.mainview}>
                    {
                        STD.chatLoader
                        ?
                            <DefaultIndicator viewStyle={{marginTop: SH(0.06),backgroundColor: 'pink', flex:0,justifyContent: 'flex-start'}}/>
                        :
                            <FlatList
                                contentContainerStyle={{flex:1}}
                                data={CHAT_DATA}
                                keyExtractor={(item,index) => index.toString()}
                                renderItem={this.renderUserBadge}

                                ListEmptyComponent={
                                    <View style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
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
                                                    marginTop: SH(0.03),
                                                    width: SW(0.4),
                                                    height: SW(0.09),
                                                },
                                                text:{fontSize: SW(0.04)}
                                            }}
                                            onPress={() => this.props.navigation.navigate("NewMessageScreen")}
                                        />
                                    </View>
                                }
                            />
                    }

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
    getChatList,
    saveCurrentChat
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageScreen);

