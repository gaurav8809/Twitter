import React, {Component, useEffect, useState} from 'react';
import {Image, SafeAreaView, Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {swidth} from './ScreenSetting';
import Icon from 'react-native-dynamic-vector-icons/lib/components/Icon';
import {SystemBlue} from './ColorPalate';
import {UIActivityIndicator} from 'react-native-indicators';
import {GetLoginUserData, GetUserInfo} from '../Actions/UserAction';
import {connect, useSelector, useDispatch} from 'react-redux';
import {AntDesign} from './VectorIcons';
import {withNavigation} from 'react-navigation';
import {ImageLoaderIndicator} from './Indicators';

export const AppHeader = (props) => {

    const dispatch = useDispatch();
    let {
        navigation,
    } = props;

    const LogedInUserData = useSelector(state => state.UserReducer.LogedInUserData);

    const [LogedInUser, setLogedInUserData] = useState(LogedInUserData);
    const [imageLoader, setImageLoader] = useState(false);


    useEffect(() => {
        setLogedInUserData(LogedInUserData);
        // dispatch(GetUserInfo('users', LogedInUserData.id));
    }, [LogedInUserData]);


    /*  useEffect(() => {
          debugger
          if (LogedInUserData !== props.LogedInUserData) {
              setLogedInUserData(props.LogedInUserData);
              // setImageLoader(false)
          }
      }, [props.LogedInUserData.profileImage]);
  */
    return (
        <SafeAreaView style={{backgroundColor: 'white'}}>
            <View style={{
                // marginTop: 30,
                height: swidth * 0.12,
                width: swidth,
                flexDirection: 'row',
                justifyContent: 'center',
                borderBottomWidth: 1.2,
                borderColor: 'lightgray',
                alignItems: 'center',
            }}>
                <View style={{ flex:1,marginLeft: swidth * 0.03}}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()} >

                        {/*<Image source={require('../Assets/Images/user.png')} style={{height: swidth * 0.08, width : swidth * 0.08 }}/>*/}

                        <View style={{justifyContent: 'center'}}>
                            <Image
                                source={
                                    LogedInUser && LogedInUser.profileImage && LogedInUser.profileImage
                                        ? {uri: LogedInUser.profileImage}
                                        : require('../Assets/Images/usergray.png')
                                }
                                style={Styles.profileimage}
                                onLoadStart={() => setImageLoader(true)}
                                onLoadEnd={() => setImageLoader(false)}
                            />

                            {
                                imageLoader &&
                                <ImageLoaderIndicator
                                    style={{height: swidth * 0.14,
                                        width : swidth * 0.14,}}
                                />
                            }
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{alignItems: 'center', flex:1}}>
                    <AntDesign name={'twitter'} color={SystemBlue} size={swidth * 0.07}/>
                </View>
                <View style={{flex:1, marginRight:swidth * 0.03}}>
                    <Image source={require('../Assets/Images/MagicBlue.png')}
                           style={{height: swidth * 0.06, width: swidth * 0.06, alignSelf:'flex-end'}}/>
                </View>
            </View>
        </SafeAreaView>

    );
};

const Styles = StyleSheet.create({
    profileimage: {
        height: swidth * 0.09,
        width: swidth * 0.09,
        borderRadius: 100,
    },
});


// export default CodeVerification;
export default AppHeader;
