import React, {useEffect, useState} from 'react';
import {Image, Text, SafeAreaView, View, FlatList, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons/lib/components/Icon';
import {SlateGray, SystemBlue, MyChatColor, OpChatColor} from '../../../Global/ColorPalate';
// import {GetLoginUserData} from '../Actions/UserAction';
import {useSelector, useDispatch} from 'react-redux';
import {safearea, swidth, IS_IOS, SHW, SW, SH} from "../../../Global/ScreenSetting";
import {TopHeader} from "../../CommonPages/TopHeader";
import {IOSIndicator} from "../../../Global/Indicators";
import {SystemButton} from "../../../Global/TwitterButton";
import TwitterTextInput from "../../../Global/TwitterTextInput";
import ProgressCircle from "react-native-progress-circle";
import {DynamicBottomBar} from "../../../Global/Helper";
import styles from "react-native-webview/lib/WebView.styles";
import {AntDesign} from "../../../Global/VectorIcons";
import {SlateGrayText} from "../../../Global/TwitterText";

let PersonalChatScreen;
export default PersonalChatScreen = (props) => {

    // static navigationOptions = ({ navigation }) => ({
    //     headerShown: false,
    // });

    const dispatch = useDispatch();
    let {
        navigation,
    } = props;
    let chatDataParam = props.navigation.state.params.data;
    let {
        id,
        profileImage,
        profilename,
        username,
        official,
        bioDetails,
    } = chatDataParam.userInfo;
    let chatArray = chatDataParam.chatInfo;


    const LogedInUserData = useSelector(state => state.UserReducer.LogedInUserData);
    const [LogedInUser, setLogedInUserData] = useState(LogedInUserData);
    const [imageLoader, setImageLoader] = useState(false);
    const [chatText, setChatText] = useState('');
    const [typing, setTyping] = useState(false);

    const renderBottomBar = () => {
        return (
            <DynamicBottomBar>
                <View style={Styles.bottombarview}>
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
                            {borderColor: typing ? SystemBlue : 'lightgray'}
                        ]}>
                        <TextInput
                            autoCorrect={false}
                            onFocus={() => setTyping(true)}
                            style={Styles.inputText}
                            value={chatText}
                            onChangeText={text => setChatText(text)}
                            placeholder={'Start a message'}
                            placeholderTextColor={"gray"}
                            selectionColor={SystemBlue}
                            returnKeyType={'done'}
                            // onSubmitEditing={() => this.b.current.focus()}
                        />
                    </View>
                    <Icon
                        name={"ios-send"}
                        type={"Ionicons"}
                        size={swidth * 0.067}
                        color={SystemBlue}
                        // onPress={() => this.openPhotoGallery()}
                    />
                    {/*</View>*/}
                </View>
            </DynamicBottomBar>
        );
    };

    const renderChatBox = (messageText) => {
        return (
            <View style={{
                padding: 13,
                backgroundColor: MyChatColor,
                borderRadius: 15,
                borderBottomRightRadius: 0,
                maxWidth: SW(0.65),
                width: 'auto',
                alignSelf: 'flex-end',
            }}>
                <Text style={{
                    color: 'white',
                    fontSize: SW(0.047)
                }}>
                    {messageText}
                </Text>
            </View>
        );
    };

    const renderChat = ({item, index}) => {
        return (
            <DynamicBottomBar>
                <View style={{width: swidth, backgroundColor:' pink', alignItems: 'flex-end'}}>
                    {/*<SlateGrayText*/}
                    {/*    text={item.messageText}*/}
                    {/*/>*/}
                    {renderChatBox(item.messageText)}


                </View>
            </DynamicBottomBar>
        );
    };

    return (
        <SafeAreaView style={[safearea]}>
            <View style={Styles.mainview}>
                <TopHeader
                    text={profilename}
                    image={profileImage}
                    nav={navigation}
                    userName={username}
                />

                <FlatList
                    data={chatArray}
                    keyExtractor={(item,index) => index.toString()}
                    ItemSeparatorComponent={() =>
                        <View style={{marginTop: SH(0.05)}} />
                    }
                    renderItem={renderChat}
                />
            </View>
            <View>
                {renderBottomBar()}
            </View>

            {/*<Modal visible={this.state.loader} transparent={true} onRequestClose={false}>*/}
            {/*    <IOSIndicator />*/}
            {/*</Modal>*/}
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
        height: swidth * 0.15,
        width:swidth,
        backgroundColor:'white',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 5,
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
        height: swidth * 0.09
    },
    inputText:{
        width: swidth * 0.77,
        fontSize: swidth * 0.042,
        padding: 0
    },
});

