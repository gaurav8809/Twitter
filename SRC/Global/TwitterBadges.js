import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState,useEffect} from 'react';
import {centertext, swidth} from './ScreenSetting';
import {SystemBlue} from './ColorPalate';
import {BlueWhiteButton} from './TwitterButton';
import {UIActivityIndicator} from 'react-native-indicators';
import {ImageLoaderIndicator} from '../Global/Indicators';

const ProfileInfoBadge = (props) => {

    let {
        imageurl,
        PROFILE_INFO,
        BtnPress
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
                <View style={{justifyContent: 'center'}}>
                    <Image
                        source={ imageurl ? {uri: imageurl} : require('../Assets/Images/usergray.png')}
                        style={profileimage}
                        // onLoadStart={() => setimageLoader(true)}
                        // onLoadEnd={() => setimageLoader(false)}
                    />

                    {
                        imageLoader &&
                            <ImageLoaderIndicator
                                style={{height: swidth * 0.14,
                                    width : swidth * 0.14,}}
                            />
                    }
                </View>
            </View>
            <View style={detailsview}>
                <View style={deatilsupperview}>
                    <View style={{flex: 3}}>
                        <Text style={profilenametext}>
                            {PROFILE_INFO.profilename}
                        </Text>
                        <Text style={usernametext}>
                            {PROFILE_INFO.username}
                        </Text>
                    </View>
                    <View style={{flex:2, alignItems: 'flex-end'}}>
                        <BlueWhiteButton
                            text={'Follow'}
                            activeText={"Following"}
                            onPress={BtnPress}
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
        imageurl,
        PROFILE_INFO,
        BtnPress
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
        <TouchableOpacity style={OuterView}>
            <View style={pimageview}>
                <View style={{justifyContent: 'center'}}>
                    <Image
                        source={ imageurl ? {uri: imageurl} : require('../Assets/Images/usergray.png')}
                        style={profileimage}
                        onLoadStart={() => setimageLoader(true)}
                        onLoadEnd={() => setimageLoader(false)}
                    />

                    {
                        imageLoader &&
                        <ImageLoaderIndicator
                            style={{height: swidth * 0.14,
                                width : swidth * 0.14,}}
                        />
                    }
                </View>
            </View>
            <View style={detailsview}>
                <View style={deatilsupperview}>
                    <View style={{flex: 3}}>
                        <Text style={profilenametext}>
                            {PROFILE_INFO.profilename}
                        </Text>
                        <Text style={usernametext}>
                            {PROFILE_INFO.username}
                        </Text>
                    </View>
                    <View style={{flex:2, alignItems: 'flex-end'}}>
                        <BlueWhiteButton
                            text={'Follow'}
                            activeText={"Following"}
                            onPress={BtnPress}
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
        height: swidth * 0.14,
        width : swidth * 0.14,
        borderRadius: 100,
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
