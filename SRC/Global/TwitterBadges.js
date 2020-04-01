import {Image, StyleSheet, Text, TouchableOpacity, View, Animated} from 'react-native';
import React, {useState,useEffect} from 'react';
import {centertext, swidth, SHW, sheight} from './ScreenSetting';
import {SystemBlue, LikeRed} from './ColorPalate';
import {BlueWhiteButton} from './TwitterButton';
import {UIActivityIndicator} from 'react-native-indicators';
import {ImageLoaderIndicator} from '../Global/Indicators';
import Icon from "react-native-dynamic-vector-icons/lib/components/Icon";
import {OfficialSymbol} from '../Global/Helper';

const ProfileInfoBadge = (props) => {

    let {
        imageurl,
        PROFILE_INFO,
        btnText,
        btnActiveText,
        BtnPress,
        btnStatus,
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
                    <View style={{flex:2, alignItems: 'flex-end'}}>
                        <BlueWhiteButton
                            text={btnText}
                            activeText={btnActiveText}
                            btnStatus={btnStatus}
                            onPress={BtnPress}
                            useColor={SystemBlue}
                        />
                    </View>
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

const TweetBadge = (props) => {

    let {
        tweetValue,
        imagePath,
        comments,
        likes,
    } = props.JSONData;

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

    const [imageLoader,setimageLoader] = useState(false);
    const [imageHeight,setimageHeight] = useState(0);
    const [imageWidth,setimageWidth] = useState(0);
    const [like,setLike] = useState(false);
    const [likeAnimation,setAnim] = useState(0);

    imagePath &&
    Image.getSize(imagePath, (width, height) => {
        // this.setState({ width: width, height: height, loading: false });
        setimageHeight(height);
        setimageWidth(width);
    });

    const startAnim=()=>{

        Animated.timing(likeAnimation, {
            toValue : 2,
            timing : 1200
        }).start(()=>{
            Animated.timing(likeAnimation,{
                toValue : 1,
                duration : 1200
            }).start();
        })
    };

    return(
        <TouchableOpacity activeOpacity={0.8} style={OuterView}>
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
                                imagePath.split('.').pop() !== 'gif' && {height: (swidth * imageHeight) / 1000}
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
                        {/*<Animated.View style={{transform : [*/}
                        {/*        {*/}
                        {/*            scale : likeAnimation*/}
                        {/*        }*/}
                        {/*    ]}}>*/}
                            <Icon onPress={() => {setLike(!like)}}
                                  name={like ? "ios-heart" : "ios-heart-empty"}
                                  type={"Ionicons"}
                                  color={like ? LikeRed : 'gray'}
                                  size={swidth * 0.05}
                            />
                        {/*</Animated.View>*/}
                        {/*{ like && <Image style={{height: swidth * 0.1, width: swidth * 0.1}} source={require('../Assets/GIFs/1_hRJF5CNRG6tB-SkwVU5bCw.gif')}/>}*/}
                        <Text style={tweetliketext}> {"18.3k"} </Text>
                    </View>
                    <View style={[tweetoptionview, {marginLeft: swidth * 0.02} ]}>
                        <Icon name={"share-google"} type={"EvilIcons"} color={'gray'} size={swidth * 0.06} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
};

module.exports = {
    ProfileInfoBadge,
    TweetBadge
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
