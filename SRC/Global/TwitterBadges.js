import {Animated, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState,} from 'react';
import {centertext, swidth} from './ScreenSetting';
import {LikeRed, SystemBlue} from './ColorPalate';
import {BlueWhiteButton} from './TwitterButton';
import {SlateGrayText} from './TwitterText';
import {UIActivityIndicator} from 'react-native-indicators';
import Icon from "react-native-dynamic-vector-icons/lib/components/Icon";
import {OfficialSymbol, DMYFormat} from '../Global/Helper';
import {useSelector} from "react-redux";
import firebase from "react-native-firebase";
import {SlateGray} from './ColorPalate';

export const ProfileInfoBadge = (props) => {

    let {
        imageurl,
        PROFILE_INFO,
        btnText,
        btnActiveText,
        BtnPress,
        btnStatus,
        btnFlag,
    } = props;

    let {
        OuterView,
        pimageview,
        detailsview,
        profileimage,
        deatilsupperview,
        profilenametext,
        usernametext,
        biotextview,
        biotext,
    } = Styles;

    const [imageLoader,setimageLoader] = useState(false);

    return(
        <TouchableOpacity style={OuterView} activeOpacity={1}>
            <View style={pimageview}>
                <TouchableOpacity
                    style={{justifyContent: 'center'}}
                    onPress={() => props.imagePress(imageurl)}
                >
                    {
                        imageLoader &&
                        <UIActivityIndicator
                            color={'white'}
                            size={swidth * 0.04}
                            style={{position: 'absolute',height: swidth * 0.135,
                                width : swidth * 0.135, backgroundColor:'lightgray', borderRadius: 100}}
                        />
                    }
                    <Image
                        source={ imageurl ? {uri: imageurl} : require('../Assets/Images/usergray.png')}
                        style={profileimage}
                        onLoadStart={() => setimageLoader(true)}
                        onLoadEnd={() => setimageLoader(false)}
                    />
                </TouchableOpacity>
            </View>
            <View style={detailsview}>
                <View style={deatilsupperview}>
                    <View style={{flex: 3}}>
                        <Text style={profilenametext}>
                            {`${PROFILE_INFO.profilename} `}
                            {
                                PROFILE_INFO.official &&
                                <OfficialSymbol/>
                            }
                        </Text>
                        <Text style={usernametext}>
                            {PROFILE_INFO.username}
                        </Text>
                    </View>
                    {
                        btnFlag &&
                        <View style={{flex:2, alignItems: 'flex-end'}}>
                            <BlueWhiteButton
                                text={btnText}
                                activeText={btnActiveText}
                                btnStatus={btnStatus}
                                onPress={BtnPress}
                                useColor={SystemBlue}
                            />
                        </View>
                    }
                </View>
                <View style={biotextview}>
                    <Text style={biotext}>
                        {
                            PROFILE_INFO.bio && PROFILE_INFO.bio.length > 73
                                ? PROFILE_INFO.bio.substr(0,73) + "..."
                                : PROFILE_INFO.bio
                        }
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
};

export const TweetBadge = (props) => {

    let {
        profileImage,
        profilename,
        username,
        official,
    } = props.JSONData[0];

    let {
        OuterView,
        profileimage,
        deatilsupperview,
        profilenametext,
        usernametext,
        tweettext,
        tweetimageview,
        tweetoptionview,
        tweetliketext,
        imageLoaderStyle
    } = TweetStyle;

    const [LogedInUserData, setLogedInUserData] = useState(useSelector(state => state.UserReducer.LogedInUserData));
    const [tweetProp, setTweetProp] = useState(props.JSONData);
    const [imageLoader,setimageLoader] = useState(false);
    const [imageHeight,setimageHeight] = useState(0);
    const [imageWidth,setimageWidth] = useState(0);
    const [like,setLike] = useState(LogedInUserData.likes && LogedInUserData.likes.includes(tweetProp.tweetID));
    const [likeAnimation,setLikeValue] = useState(new Animated.Value(0));
    const [lCount,setLCount] = useState(new Animated.Value(0));
    const [lOpacity,setLOpacity] = useState(new Animated.Value(1));
    const [tCount,setTCount] = useState(new Animated.Value(1));
    const [tOpacity,setTOpacity] = useState(new Animated.Value(0));

    useEffect(() => {
        const subscriber = firebase.firestore()
            .collection('tweets')
            .doc(tweetProp.tweetID)
            .onSnapshot(documentSnapshot => {
                let final = documentSnapshot._data;
                final['tweetID'] = tweetProp.tweetID;
                changeTotal(final.likes.length > tweetProp.likes.length);
                setTweetProp(documentSnapshot._data);

            });
        return () => subscriber();
    },[LogedInUserData.likes]);

    imagePath &&
    Image.getSize(imagePath, (width, height) => {
        setimageHeight(height);
        setimageWidth(width);
    });

    const startAnim=()=>{
        Animated.timing(likeAnimation, {
            toValue : 3,
            timing : 50
        }).start(() =>  setLikeValue(new Animated.Value(0)));
    };

    const changeTotal = (status) => {
        Animated.parallel([
            Animated.timing(lCount, {
                toValue : status ? 15 : 0,
                timing : 50
            }),
            Animated.timing(lOpacity, {
                toValue : status ? 0 : 1,
                timing : 50
            }),
            Animated.timing(tCount, {
                toValue : status ? 0 : 15,
                timing : 50
            }),
            Animated.timing(tOpacity, {
                toValue : status ? 1 : 0,
                timing : 50
            }),
        ]).start();

    };

    const heartScale = likeAnimation.interpolate({
        inputRange: [0, 1, 2, 3],
        outputRange: [1, 0.5, 1.2, 1],
        extrapolate: 'clamp',
    });

    // const likeCount = lCount.interpolate({
    //     inputRange: [(new Animated.Value(tweetProp.likes.length)), (new Animated.Value(tweetProp.likes.length))],
    //     outputRange: [0, 10],
    //     extrapolate: 'clamp',
    // });

    const LikePress = () => {
        if(like === false) {startAnim()}
        setLike(!like);
        props.LikePress(!like);
        changeTotal(!like);
    };

    let {
        tweetID,
        tweetValue,
        imagePath,
        comments,
        likes,
        timestamp
    } = tweetProp;
    timestamp = timestamp.toDate();

    return(
        <TouchableOpacity activeOpacity={1} style={OuterView}>
            <TouchableOpacity
                style={{justifyContent: 'flex-start', flex: 1}}
                onPress={() => props.profilePress(profileImage)}
            >
                {
                    imageLoader &&
                    <UIActivityIndicator
                        color={'white'}
                        size={swidth * 0.04}
                        style={{position: 'absolute',height: swidth * 0.135,
                            width : swidth * 0.135, backgroundColor:'lightgray', borderRadius: 100}}
                    />
                }
                <Image
                    source={ profileImage ? {uri: profileImage} : require('../Assets/Images/usergray.png')}
                    style={profileimage}
                    // onLoadStart={() => setimageLoader(true)}
                    // onLoadEnd={() => setimageLoader(false)}
                />
            </TouchableOpacity>
            <View style={{flex:5 }}>
                <View style={deatilsupperview}>
                    <Text style={profilenametext}>
                        {`${profilename} `}
                        {
                            official &&
                            <OfficialSymbol/>
                        }
                    </Text>
                    <Text style={usernametext}>
                        {` ${username}`}
                    </Text>
                </View>
                <View>
                    <Text style={tweettext}>
                        {tweetValue && tweetValue}
                    </Text>
                </View>
                {
                    imagePath &&
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => props.imagePress(imagePath)}
                    >
                        {
                            imageLoader &&
                            <UIActivityIndicator
                                color={'lightgray'}
                                size={swidth * 0.06}
                                style={[
                                    imageLoaderStyle,
                                    // {height: (swidth * imageHeight) / 1000},
                                    // imagePath.split('.').pop() !== 'gif' && {height: (swidth * imageHeight) / 1000}
                                ]}
                            />
                        }
                        <Image
                            resizeMode={'cover'}
                            style={[
                                tweetimageview,
                                // imageLoader ? {height: swidth * 0.3} :
                                // imagePath.split('.').pop() !== 'gif' && {height: (swidth * imageHeight) / 1000}
                                {height: swidth * 0.45}
                            ]}
                            source={{uri:imagePath}}
                            onLoadStart={() => setimageLoader(true)}
                            onLoadEnd={() => setimageLoader(false)}
                        />

                    </TouchableOpacity>
                }
                <View style={{flexDirection: 'row', marginTop: swidth * 0.022}}>
                    <View style={[tweetoptionview, {marginLeft: 0}]}>
                        <Icon name={"comment-o"} type={"FontAwesome"} color={'gray'} size={swidth * 0.04} />
                        <Text style={tweetliketext}> {"2k"} </Text>
                    </View>
                    <View style={tweetoptionview}>
                        <Icon name={"twitter-retweet"} type={"MaterialCommunityIcons"} color={'gray'} size={swidth * 0.055} />
                        <Text style={tweetliketext}> {"512"} </Text>
                    </View>
                    <View style={tweetoptionview}>
                        <Animated.View style={{transform : [{scale : heartScale}]}}>
                            <Icon onPress={() => LikePress()}
                                  name={like ? "ios-heart" : "ios-heart-empty"}
                                  type={"Ionicons"}
                                  color={like ? LikeRed : 'gray'}
                                  size={swidth * 0.05}
                            />
                        </Animated.View>
                        <View>
                            <Animated.View style={{transform: [{translateY: tCount}], opacity: tOpacity, position: 'absolute'}}>
                                <Text style={[tweetliketext, like && {color: LikeRed}]}> {`${likes.length}`} </Text>
                            </Animated.View>
                            <Animated.View style={{transform: [{translateY: lCount}], opacity: lOpacity, }}>
                                <Text style={[tweetliketext, like && {color: LikeRed}]}> {`${likes.length}`} </Text>
                            </Animated.View>
                        </View>
                    </View>
                    <View style={[tweetoptionview, {marginLeft: swidth * 0.02} ]}>
                        <Icon name={"share-google"} type={"EvilIcons"} color={'gray'} size={swidth * 0.06} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
};

export const ChatUserListBadge = (props) => {

    let chatArray = props.data.chatInfo;
    let {
        id,
        profileImage,
        profilename,
        username,
        official,
        bioDetails,
    } = props.data.userInfo;
    let messageObj = chatArray[chatArray.length - 1];
    let {
        messageText,
        receiverID,
        senderID,
        timestamp,
    } = messageObj;

    const [imageLoader,setimageLoader] = useState(false);

    return(
        <TouchableOpacity style={ChatStyle.OuterView} activeOpacity={1}>
            <View style={ChatStyle.pimageview}>
                <TouchableOpacity
                    style={{justifyContent: 'center'}}
                    // onPress={() => props.imagePress(imageurl)}
                >
                    {
                        imageLoader &&
                        <UIActivityIndicator
                            color={'white'}
                            size={swidth * 0.04}
                            style={{position: 'absolute',height: swidth * 0.135,
                                width : swidth * 0.135, backgroundColor:'lightgray', borderRadius: 100}}
                        />
                    }
                    <Image
                        source={ profileImage ? {uri: profileImage} : require('../Assets/Images/usergray.png')}
                        style={ChatStyle.profileimage}
                        onLoadStart={() => setimageLoader(true)}
                        onLoadEnd={() => setimageLoader(false)}
                    />
                </TouchableOpacity>
            </View>
            <View style={ChatStyle.detailsview}>
                <View style={ChatStyle.deatilsupperview}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={ChatStyle.profilenametext}>
                            {`${profilename} `}
                            {
                                official &&
                                <OfficialSymbol/>
                            }
                        </Text>
                        <Text style={ChatStyle.usernametext}>
                            {` ${username}`}
                        </Text>
                    </View>
                    <View>
                        <Text style={ChatStyle.timestamp}>
                            {` ${DMYFormat(timestamp)}`}
                        </Text>
                    </View>
            </View>
                <View style={ChatStyle.messageTextView}>
                    <Text style={ChatStyle.messageText}>
                        {/*<SlateGrayText textstyle={ChatStyle.messageText}>*/}
                        {
                            messageText && messageText.length > 35
                                ? messageText.substr(0,35) + "..."
                                : messageText
                        }
                        {/*</SlateGrayText>*/}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
};

let Styles = StyleSheet.create({

    OuterView:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'white',
        padding: 15,
        borderBottomWidth: 0.8,
        borderColor: 'lightgray',
    },
    pimageview:{
        flex:1,
        alignSelf:'flex-start'
        // backgroundColor: 'pink'
    },
    detailsview:{
        flex:4.5
    },
    profileimage:{
        height: swidth * 0.135,
        width : swidth * 0.135,
        borderRadius: 100,
        // backgroundColor: 'lightgray',
    },
    deatilsupperview:{
        flexDirection: 'row',
    },
    profilenametext:{
        fontSize: swidth * 0.04,
        fontWeight: "bold"
    },
    usernametext:{
        fontSize: swidth * 0.035,
        color:'gray'
    },
    biotextview:{
        marginTop: swidth * 0.02
    },
    biotext:{
        fontSize: swidth * 0.035,
    },

});

let TweetStyle = StyleSheet.create({

    OuterView:{
        flexDirection:'row',
        // alignItems:'center',
        backgroundColor:'white',
        padding: 13,
        borderBottomWidth: 0.8,
        borderColor: 'lightgray',
    },
    pimageview:{
        flex:1,
        alignSelf:'flex-start'
        // backgroundColor: 'pink'
    },
    detailsview:{
        flex:4.5
    },
    profileimage:{
        height: swidth * 0.135,
        width : swidth * 0.135,
        borderRadius: 100,
    },
    deatilsupperview:{
        flexDirection: 'row',
    },
    profilenametext:{
        fontSize: swidth * 0.04,
        fontWeight: "bold",
    },
    usernametext:{
        fontSize: swidth * 0.04,
        color:'slategray',
    },
    tweettextview:{
        marginTop: swidth * 0.02
    },
    tweettext:{
        fontSize: swidth * 0.04,
    },
    tweetimageview:{
        marginTop: swidth * 0.02,
        // ...SHW(0.5,0.78),
        borderRadius: 10,
        // flex: 1,
        // aspectRatio: 1,
        // resizeMode: 'contain',
        // backgroundColor: 'pink',
        width: swidth * 0.78,
        height: swidth * 0.78,
        overlayColor: 'white',
    },
    tweetoptionview:{
        ...centertext,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: swidth * 0.135,
        marginLeft: swidth * 0.065,
    },
    tweetliketext:{
        fontSize: swidth * 0.03,
        color: 'gray'
    },
    imageLoaderStyle:{
        borderRadius: 10,
        // borderWidth: 1,
        position: 'absolute',
        // justifySelf:'center',
        height: swidth * 0.3,
        width : swidth * 0.78,
        borderColor: 'lightgray'
    }

});

let ChatStyle = StyleSheet.create({

    OuterView:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'white',
        padding: 15,
        borderBottomWidth: 0.8,
        borderColor: 'lightgray',
    },
    pimageview:{
        flex:1,
        alignSelf:'flex-start'
        // backgroundColor: 'pink'
    },
    detailsview:{
        flex:4.5
    },
    profileimage:{
        height: swidth * 0.135,
        width : swidth * 0.135,
        borderRadius: 100,
        // backgroundColor: 'lightgray',
    },
    deatilsupperview:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    profilenametext:{
        fontSize: swidth * 0.04,
        fontWeight: "bold"
    },
    usernametext:{
        fontSize: swidth * 0.035,
        color:'gray'
    },
    timestamp:{
        marginRight: 0,
    },
    messageTextView:{
        marginTop: swidth * 0.005
    },
    messageText:{
        color: SlateGray,
        fontSize: swidth * 0.035,
    },
});
