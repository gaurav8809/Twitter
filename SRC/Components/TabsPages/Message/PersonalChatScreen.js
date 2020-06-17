import React, {useEffect, useState, useRef, createRef} from 'react';
import {
    Image,
    Text,
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons/lib/components/Icon';
import {SlateGray, SystemBlue, MyChatColor, OpChatColor, DarkGray} from '../../../Global/ColorPalate';
import {useSelector, useDispatch} from 'react-redux';
import {safearea, swidth, IS_IOS, SHW, SW, SH} from "../../../Global/ScreenSetting";
import {TopHeader} from "../../CommonPages/TopHeader";
import {DismissKeyboardView, DynamicBottomBar} from "../../../Global/Helper";
import {sendMessage, saveCurrentChat} from '../../../Actions/ChatAction';
import firebase from "react-native-firebase";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

let PersonalChatScreen;
export default PersonalChatScreen = (props) => {

    const dispatch = useDispatch();
    let {
        navigation,
    } = props;
    const chatListRef = useRef(null);
    const {LogedInUserData: ME} = useSelector(state => state.UserReducer);
    const {CurrentChat} = useSelector(state => state.ChatReducer);
    const [chatText, setChatText] = useState('');
    const [typing, setTyping] = useState(false);

    // let chatDataParam = props.navigation.state.params.data;
    let chatDataParam = CurrentChat;
    let {
        id,
        profileImage,
        profilename,
        username,
    } = chatDataParam.userInfo;
    let chatArray = chatDataParam.chatInfo;
    let channelID = chatDataParam.channelID;

    const DMYFormat = (date) => {

        let f = new Date((typeof date === 'object' ? date.seconds : date) * 1000);
        let fdate = f.getDate();
        let month = f.getMonth() + 1;
        let year = f.getFullYear() % 100;
        let hour = f.getHours();
        let minute = f.getMinutes();
        let AMPM = hour > 12 ? 'PM' : 'AM';

        const getFor = (value) => {
            return value.toString().length < 2 ? ('0' + value.toString()) : value
        };

        return `${getFor(fdate)}/${getFor(month)}/${year}` +
            `, ${getFor(hour > 12 ? (hour % 12) : hour)}:${getFor(minute)} ${AMPM}`;
    };

    const renderMyChatBox = (item) => {
        let {
            messageText,
            timestamp
        } = item;
        return (
            <View style={Styles.myBoxOuter}>
                <View style={Styles.blueBox}>
                    <Text style={Styles.myMessageText}>
                        {messageText}
                    </Text>
                </View>
                <Text style={Styles.myDate}>
                    {DMYFormat(timestamp)}
                </Text>
            </View>
        );
    };

    const renderOpChatBox = (item) => {
        let {
            messageText,
            timestamp
        } = item;
        return (
            <View style={Styles.opBoxOut}>
                <View style={Styles.opInnerContainer}>
                    <Image
                        source={{uri:profileImage}}
                        style={Styles.profileimage}
                    />
                    <View style={Styles.grayBox}>
                        <Text style={Styles.opMessageText}>
                            {messageText}
                        </Text>
                    </View>
                </View>
                <Text style={Styles.opDate}>
                    {DMYFormat(timestamp)}
                </Text>
            </View>
        );
    };

    const renderChat = ({item, index}) => {
        return (
            <DynamicBottomBar>
                <View style={{backgroundColor:' pink', alignItems: 'center'}}>
                    {
                        item.senderID === ME.id
                            ?
                            renderMyChatBox(item)
                            :
                            renderOpChatBox(item)
                    }

                </View>
            </DynamicBottomBar>
        );
    };

    const sendMessageAction = () => {

        let dataObj = {
            messageText: chatText,
            receiverID: id,
            senderID: ME.id,
            timestamp: Math.floor(Date.now() / 1000)
        };

        dispatch(sendMessage(channelID, dataObj));

        setChatText('');
    };

    useEffect(() => {
        setTimeout(() => {
            if(chatListRef) {
                chatListRef.current.scrollToEnd({animated: true})
            }
        }, 1);
        // chatListRef.scrollTo({x:0, y:this.props.defaultValues.scrollY, animated: true});
        const subscriber = firebase.firestore()
            .collection('chats')
            .doc(CurrentChat.channelID)
            .onSnapshot(documentSnapshot => {
                let messagesArray = documentSnapshot._data.messages;
                let dataObj = {
                    chatInfo: messagesArray,
                    userInfo: chatDataParam.userInfo,
                    channelID: channelID,
                };
                dispatch(saveCurrentChat(dataObj))
            });
        return () => subscriber();
    },[]);

    const renderBottomBar = () => {
        return (
            <DynamicBottomBar keyboardVerticalOffset={64}>
                <View style={[Styles.bottombarview]}>
                    {/*<View style={Styles.bottomcontainer}>*/}
                    <Icon
                        name={"photo"}
                        type={"Foundation"}
                        size={swidth * 0.065}
                        color={SystemBlue}
                        // onPress={() => this.openPhotoGallery()}
                    />
                    <View style={Styles.gifView}>
                        <Icon
                            name={"gif"}
                            type={"MaterialCommunityIcons"}
                            size={swidth * 0.045}
                            color={SystemBlue}
                            // onPress={() => this.toggleGifPage(!gifPreview)}
                        />
                    </View>
                    <View
                        style={[
                            Styles.nametextview,
                            {borderColor: typing ? SystemBlue : 'lightgray'},
                        ]}>
                        <TextInput
                            onFocus={() => {
                                chatListRef.current.scrollToEnd({animated: true});
                                // chatListRef.current.scrollToItem({ animated: true, viewPosition: 4 });
                                setTyping(true)
                            }}
                            onBlur={() => setTyping(false)}
                            style={[Styles.inputText, IS_IOS() && {marginBottom: SH(0.007)}]}
                            value={chatText}
                            onChangeText={text => setChatText(text)}
                            placeholder={'Start a message'}
                            placeholderTextColor={"gray"}
                            selectionColor={SystemBlue}
                            returnKeyType={'next'}
                            multiline
                            spellCheck
                            autoCorrect={false}
                            // onSubmitEditing={() => this.b.current.focus()}
                        />
                    </View>
                    <Icon
                        name={"ios-send"}
                        type={"Ionicons"}
                        size={swidth * 0.067}
                        color={SystemBlue}
                        onPress={chatText !== '' ? sendMessageAction : null}
                    />
                    {/*</View>*/}
                </View>
            </DynamicBottomBar>
        );
    };

    return (
        <SafeAreaView style={[safearea]}>

            <TopHeader
                text={profilename}
                image={profileImage}
                nav={navigation}
                userName={username}
            />

                    {/*<DismissKeyboardView >*/}
                    {/*    <KeyboardAvoidingView*/}
                    {/*        behavior={IS_IOS() ? "position" : 'padding'}*/}
                    {/*        style={{flex: 1}}*/}
                    {/*        // keyboardVerticalOffset={-150}*/}
                    {/*    >*/}
                            <View style={{flex:1, width: SW(0.94), alignSelf: 'center'}}>
                                <FlatList
                                    // contentContainerStyle={{flex:1,  }}
                                    // style={{flex:1, bottom: typing ? SH(0.25) : 0}}
                                    ref={chatListRef}
                                    data={chatArray}
                                    keyExtractor={(item,index) => index.toString()}
                                    ListHeaderComponent={
                                        <View style={{marginTop: SH(0.02)}} />
                                    }
                                    ListFooterComponent={
                                        <View style={{marginTop: SH(0.02)}} />
                                    }
                                    ItemSeparatorComponent={() =>
                                        <View style={{marginTop: SH(0.02)}} />
                                    }
                                    renderItem={renderChat}
                                    showsVerticalScrollIndicator={false}
                                />
                            </View>
                        {/*</KeyboardAvoidingView>*/}
                    {/*</DismissKeyboardView>*/}


                {renderBottomBar()}
        </SafeAreaView>
    );
};

PersonalChatScreen.navigationOptions = {
    headerShown: false,
};

const Styles = StyleSheet.create({
    mainview:{
        flex: 1,
    },
    profileimage: {
        height: swidth * 0.09,
        width: swidth * 0.09,
        borderRadius: 100,
    },
    bottombarview:{
        flexDirection:'row',
        borderTopWidth:1,
        borderColor:'lightgray',
        height: 'auto',
        minHeight: swidth * 0.15,
        width:swidth,
        backgroundColor:'white',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 8,
    },
    bottomcontainer:{
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection:'row',
    },
    gifView:{
        ...SHW(IS_IOS() ? 0.05 : 0.05,0.055 ),
        backgroundColor: 'white',
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: SystemBlue
    },
    nametextview:{
        width: swidth * 0.65,
        borderBottomWidth: 2,
        fontSize: swidth * 0.12,
        height: 'auto',
        bottom: SH(0.007),
        alignSelf: 'flex-end',
    },
    inputText:{
        width: swidth * 0.65,
        fontSize: swidth * 0.040,
        padding: 0,
        maxHeight: SH(0.08),
        height: 'auto',
        backgroundColor: 'white',
        justifyContent: 'flex-end'
    },
    myBoxOuter:{
        alignSelf: 'flex-end',
        alignItems: 'flex-end'
    },
    opBoxOut:{
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
    },
    blueBox:{
        padding: 10,
        backgroundColor: MyChatColor,
        borderRadius: 15,
        borderBottomRightRadius: 0,
        maxWidth: SW(0.65),
        width: 'auto',
    },
    grayBox:{
        padding: 11,
        backgroundColor: OpChatColor,
        borderRadius: 15,
        borderBottomLeftRadius: 0,
        maxWidth: SW(0.65),
        width: 'auto',
        marginLeft: SW(0.015)
    },
    opInnerContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'flex-start',
        alignItems: 'center',
    },
    myDate:{
        color: DarkGray,
        fontSize: SW(0.035),
        marginTop: SH(0.003),
    },
    opDate:{
        color: DarkGray,
        fontSize: SW(0.035),
        marginLeft: SW(0.115),
        marginTop: SH(0.003),
    },
    myMessageText:{
        color: 'white',
        fontSize: SW(0.035)
    },
    opMessageText:{
        color: 'black',
        fontSize: SW(0.035),
    },
});

