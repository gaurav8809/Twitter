import React, {useEffect, useState, useRef, createRef} from 'react';
import {
    Image,
    Text,
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons/lib/components/Icon';
import {SlateGray, SystemBlue, MyChatColor, OpChatColor, DarkGray} from '../../../Global/ColorPalate';
import {useSelector, useDispatch, connect} from 'react-redux';
import {safearea, swidth, IS_IOS, SHW, SW, SH} from "../../../Global/ScreenSetting";
import {TopHeader} from "../../CommonPages/TopHeader";
import {DismissKeyboardView, DynamicBottomBar, DATES, PreviewImageView} from "../../../Global/Helper";
import {sendMessage, saveCurrentChat} from '../../../Actions/ChatAction';
import firebase from "react-native-firebase";
import TakePhotoPopUp from "../../../Global/TakePhotoPopUp";
import {UIActivityIndicator} from "react-native-indicators";
import {GifCategoryView} from "../../CommonPages/GifPage";
import {FireBaseStoreData} from "../../../Actions/SystemAction";

const PersonalChatScreen = (props) => {

    const dispatch = useDispatch();
    let {
        navigation,
    } = props;
    const chatListRef = useRef(null);
    const {LogedInUserData: ME} = useSelector(state => state.UserReducer);
    const {CurrentChat} = useSelector(state => state.ChatReducer);
    const [chatText, setChatText] = useState('');
    const [typing, setTyping] = useState(false);
    const [popUp, setPopUp] = useState(false);
    const [gifPopUp, setGifPopUp] = useState(false);
    // const [selectedPhoto, setSelectedPhoto] = useState({
    //     fileName: "75586126_2424022534481303_3919068421064491008_o.jpg",
    //     fileSize: 63117,
    //     height: 960,
    //     isVertical: true,
    //     originalRotation: 0,
    //     path: "/storage/0DF6-2607/Pictures/75586126_2424022534481303_3919068421064491008_o.jpg",
    //     type: "image/jpeg",
    //     uri: "content://com.google.android.apps.photos.contentprovider/-1/1/content%3A%2F%2Fmedia%2Fexternal%2Fimages%2Fmedia%2F34/ORIGINAL/NONE/1688944780",
    //     width: 539
    // });
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [selectedGif, setSelectedGif] = useState(null);
    const [imageLoader, setImageLoader] = useState(null);
    const [previewImage, setPreviewImage] = useState({
        preview: false,
        PreviewImage: {}
    });
    const SELECTED = (selectedPhoto !== null || selectedGif !== null);
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
        let {
            TODAY,
            YESTERDAY
        } = DATES(f);
        let fdate = f.getDate();
        let month = f.getMonth() + 1;
        let year = f.getFullYear() % 100;
        let hour = f.getHours();
        let minute = f.getMinutes();
        let AMPM = hour > 12 ? 'PM' : 'AM';

        const getFor = (value) => {
            return value.toString().length < 2 ? ('0' + value.toString()) : value
        };

        if(TODAY)
            return `${getFor(hour > 12 ? (hour % 12) : hour)}:${getFor(minute)} ${AMPM}`;
        else if(YESTERDAY)
            return `Yesterday, ${getFor(hour > 12 ? (hour % 12) : hour)}:${getFor(minute)} ${AMPM}`;
        else
            return `${getFor(fdate)}/${getFor(month)}/${year}` +
                `, ${getFor(hour > 12 ? (hour % 12) : hour)}:${getFor(minute)} ${AMPM}`;
    };

    const renderMyChatBox = (item) => {
        let {
            messageText,
            timestamp,
            chatImage
        } = item;
        return (
            <View style={Styles.myBoxOuter}>
                {
                    chatImage &&
                    <TouchableWithoutFeedback onPress={() => openImage(chatImage)}>
                        <Image
                            onPress={() => {alert()}}
                            style={[Styles.myChatPhotoView,
                                messageText === '' &&
                                {
                                    borderBottomLeftRadius: 10,
                                }]}
                            resizeMode="cover"
                            source={{uri: chatImage}}
                        />
                    </TouchableWithoutFeedback>
                }
                {
                    messageText !== '' &&
                    <View style={[Styles.blueBox, chatImage &&
                        {
                            width: SW(0.635),
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                        }
                    ]}>
                        <Text style={Styles.myMessageText}>
                            {messageText}
                        </Text>
                    </View>
                }
                <Text style={Styles.myDate}>
                    {DMYFormat(timestamp)}
                </Text>
            </View>
        );
    };

    const renderOpChatBox = (item) => {
        let {
            messageText,
            timestamp,
            chatImage
        } = item;
        return (
            <View style={Styles.opBoxOut}>
                <View style={Styles.opInnerContainer}>
                    <Image
                        source={{uri:profileImage}}
                        style={Styles.profileimage}
                    />
                    <View>
                        {chatImage &&
                            <TouchableWithoutFeedback onPress={() => openImage(chatImage)}>
                                <Image
                                    style={[Styles.opChatPhotoView, messageText === '' &&
                                        {
                                            borderBottomRightRadius: 10,
                                            marginLeft: SW(0.02)
                                        }
                                    ]}
                                    resizeMode="cover"
                                    source={{uri: chatImage}}
                                />
                            </TouchableWithoutFeedback>
                        }
                        {messageText !== '' &&
                            <View style={[Styles.grayBox,
                                chatImage &&
                                {
                                    width: SW(0.635),
                                    borderTopLeftRadius: 0,
                                    borderTopRightRadius: 0,
                                }
                            ]}>
                                <Text style={Styles.opMessageText}>
                                    {messageText}
                                </Text>
                            </View>
                        }
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
                <View style={{alignItems: 'center'}}>
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

        if(!SELECTED && chatText === '')
            return;

        let dataObj = {
            messageText: chatText,
            receiverID: id,
            senderID: ME.id,
            timestamp: Math.floor(Date.now() / 1000)
        };
        const cleanup = () => {
            setSelectedPhoto(null);
            setSelectedGif(null);
            setChatText('');
        };

        if(selectedPhoto !== null)
        {
            dataObj.chatImage = selectedPhoto.uri;
            chatArray.push(dataObj);
            !IS_IOS() ? selectedPhoto.uri = 'file://' + selectedPhoto.path : null;

            props.FireBaseStoreData('ChatResources',selectedPhoto)
                .then(firestoreResponse => {
                    dataObj.chatImage = firestoreResponse.data;
                    props.sendMessage(channelID, dataObj);
                    cleanup();
                })
                .catch(error => {
                    console.log("Firestore Error = ",error)
                });
        }
        else if(selectedGif !== null)
        {
            dataObj.chatImage = selectedGif.gif.url;
            chatArray.push(dataObj);
            dispatch(sendMessage(channelID, dataObj));
            cleanup();
        }
        else{
            debugger
            chatArray.push(dataObj);
            dispatch(sendMessage(channelID, dataObj));
            cleanup();
        }


        // props.sendMessage(channelID, dataObj)
        //     .then(r => {
        //         alert("Done");
        //     });
debugger
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
            <DynamicBottomBar>
                <View style={[Styles.bottombarview, {
                    flexDirection: SELECTED ? 'column' : 'row',
                    padding: SELECTED ? 10 : 8,
                }]}>
                    {
                        SELECTED ?
                            <View style={Styles.photoContainer}>
                                <Image
                                    style={Styles.selectedPhotoView}
                                    resizeMode="cover"
                                    source={{uri: selectedGif !== null ? selectedGif.gif.url : selectedPhoto.uri}}
                                    onLoadStart={() => setImageLoader(true)}
                                    onLoadEnd={() => setImageLoader(false)}
                                />
                                {
                                    imageLoader &&
                                    <UIActivityIndicator
                                        color={'gray'}
                                        size={swidth * 0.06}
                                        style={Styles.imageLoaderStyle}
                                    />
                                }
                                <View style={Styles.closebutton}
                                >
                                    <Icon
                                        onPress={() => {
                                            setSelectedPhoto(null);
                                            setSelectedGif(null);
                                        }}
                                        name={"ios-close"}
                                        type={"Ionicons"}
                                        size={swidth * 0.08}
                                        color={'white'}
                                    />
                                </View>
                            </View>
                            :
                            <View style={Styles.bottomIcons}>
                                <Icon
                                    name={"photo"}
                                    type={"Foundation"}
                                    size={swidth * 0.065}
                                    color={SystemBlue}
                                    onPress={() => setPopUp(true)}
                                />
                                <View style={Styles.gifView}>
                                    <Icon
                                        name={"gif"}
                                        type={"MaterialCommunityIcons"}
                                        size={swidth * 0.045}
                                        color={SystemBlue}
                                        onPress={() => setGifPopUp(true)}
                                    />
                                </View>
                            </View>
                    }
                    <View style={[
                            Styles.bottomRightPanel,
                            {width: SW(SELECTED ? 0.90 : 0.7)},
                            SELECTED && typing && !IS_IOS() && {bottom: SH(0.02)}
                        ]}>
                        <View
                            style={[
                                Styles.nametextview,
                                {borderColor: typing ? SystemBlue : 'lightgray'},
                                {width: SW(SELECTED ? 0.8 : 0.6)},
                            ]}>
                            <TextInput
                                onFocus={() => {
                                    chatListRef.current.scrollToEnd({animated: true});
                                    // chatListRef.current.scrollToItem({ animated: true, viewPosition: 4 });
                                    setTyping(true)
                                }}
                                onBlur={() => setTyping(false)}
                                style={[Styles.inputText,
                                    IS_IOS() && {marginBottom: SH(0.007)},
                                    {width: SW(SELECTED ? 0.8 : 0.6)}
                                ]}
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
                        <View style={{alignSelf: 'center'}}>
                            <Icon
                                name={"ios-send"}
                                type={"Ionicons"}
                                size={swidth * 0.067}
                                color={SystemBlue}
                                onPress={sendMessageAction}
                            />
                        </View>
                    </View>
                </View>
            </DynamicBottomBar>
        );
    };

    const openImage = (url) => {
        Image.getSize(url, (width, height) => {
            setPreviewImage({
                preview: true,
                PreviewImage:{
                    pImageHeight: height,
                    pImageWidth: width,
                    pImagePath: url
                }
            })
        });
    };

    const closePreviewImage = () => {
        setPreviewImage({
            preview: false,
            PreviewImage: {}
        })
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


            <TakePhotoPopUp
                visible={popUp}
                onPhotoSelect={(photo) => {
                    setSelectedPhoto(photo);
                    setSelectedGif(null);
                    setPopUp(false);
                }}
                onRequestClose={() => setPopUp(false)}
            />

            <GifCategoryView
                gifPreview={gifPopUp}
                backPress={() => setGifPopUp(false)}
                setGifState={(Gif) => {
                    setSelectedGif(Gif);
                    setSelectedPhoto(null);
                    setGifPopUp(false);
                }}
            />

            <PreviewImageView
                preview={previewImage.preview}
                PreviewImage={previewImage.PreviewImage}
                backPress={closePreviewImage}
            />

            {renderBottomBar()}

        </SafeAreaView>
    );
};

PersonalChatScreen.navigationOptions = {
    headerShown: false,
};

const mapDispatchToProps = {
    sendMessage,
    FireBaseStoreData
};

export default connect(null, mapDispatchToProps)(PersonalChatScreen);

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
        // bottom: SH(0.007),
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
        padding: 10,
        backgroundColor: OpChatColor,
        borderRadius: 15,
        borderBottomLeftRadius: 0,
        maxWidth: SW(0.65),
        width: 'auto',
        marginLeft: SW(0.015)
    },
    opInnerContainer:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'flex-start',
        alignItems: 'flex-end',
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
    photoContainer:{
        alignSelf:'flex-start',
        marginBottom: SH(0.03),
    },
    selectedPhotoView:{
        height: SW(0.63),
        width: SW(0.63),
        borderRadius: 10,
        overlayColor: 'white',
    },
    myChatPhotoView:{
        height: SW(0.63),
        width: SW(0.635),
        borderRadius: 15,
        overlayColor: 'white',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    opChatPhotoView:{
        height: SW(0.63),
        width: SW(0.635),
        borderRadius: 15,
        overlayColor: 'white',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        alignSelf: 'flex-end',
    },
    imageLoaderStyle:{
        borderRadius: 10,
        borderWidth: 1,
        position: 'absolute',
        height: SW(0.65),
        width: SW(0.65),
        borderColor: 'lightgray'
    },
    closebutton:{
        height: swidth * 0.08,
        width: swidth * 0.08,
        backgroundColor: 'black',
        borderRadius: 100,
        alignItems: 'center',
        position: 'absolute',
        right: swidth * 0.03,
        top: swidth * 0.03
    },
    bottomIcons:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: SW(0.16)
    },
    bottomRightPanel:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
    }
});


