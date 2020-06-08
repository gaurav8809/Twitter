import React, {Component, useEffect, useState} from 'react';
import {Image, SafeAreaView, Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {swidth} from './ScreenSetting';
import Icon from 'react-native-dynamic-vector-icons/lib/components/Icon';
import {SystemBlue, SlateGray} from './ColorPalate';
import {UIActivityIndicator} from 'react-native-indicators';
import {GetLoginUserData, GetUserInfo} from '../Actions/UserAction';
import {connect, useSelector, useDispatch} from 'react-redux';
import {AntDesign} from './VectorIcons';
import {NavigationActions, StackActions, withNavigation} from 'react-navigation';
import {ImageLoaderIndicator} from './Indicators';
import { EventRegister } from 'react-native-event-listeners'
import HELPER from "./Helper";


export const AppHeader = (props) => {

    const dispatch = useDispatch();
    let {
        navigation,
    } = props;

    const LogedInUserData = useSelector(state => state.UserReducer.LogedInUserData);

    const [LogedInUser, setLogedInUserData] = useState(LogedInUserData);
    const [imageLoader, setImageLoader] = useState(false);


    useEffect(() => {
        HELPER.AsyncFetch('AsyncLogedInUserData')
            .then(response => {
                if(response !== null)
                {
                    dispatch(
                        GetLoginUserData('users',response.id)
                    )
                }
                else
                {
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({routeName:'HelloScreen'})
                        ],
                    });

                    setTimeout(() => this.props.navigation.dispatch(resetAction),1500);
                }
            })
            .catch(error => {
                console.log(error)
            });
        setLogedInUserData(LogedInUserData);
    },[LogedInUserData.profileImage]);


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
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                        EventRegister.emit('UpdateUserListener');
                        navigation.openDrawer();
                    }} >

                        {/*<Image source={require('../Assets/Images/user.png')} style={{height: swidth * 0.08, width : swidth * 0.08 }}/>*/}

                            <View style={{justifyContent: 'center'}}>
                                {
                                    imageLoader &&
                                    <ImageLoaderIndicator
                                        style={{height: swidth * 0.09,
                                            width : swidth * 0.09,}}
                                    />
                                }
                                {
                                    LogedInUser && LogedInUser.profileImage &&
                                    <Image
                                    source={{uri: LogedInUser.profileImage}}
                                    style={Styles.profileimage}
                                    onLoadStart={() => setImageLoader(true)}
                                    onLoadEnd={() => setImageLoader(false)}
                                    />
                                }

                            </View>
                    </TouchableOpacity>
                </View>
                <View style={{alignItems: 'center', flex:1}}>
                    <AntDesign name={'twitter'} color={SystemBlue} size={swidth * 0.07}/>
                </View>
                <View style={{flex:1, marginRight:swidth * 0.03}}>
                    {/*<Image source={require('../Assets/Images/MagicBlue.png')}*/}
                    {/*       style={{height: swidth * 0.06, width: swidth * 0.06, alignSelf:'flex-end'}}/>*/}
                           <Icon name={'react'}
                                 type={'MaterialCommunityIcons'}
                                 color={SystemBlue}
                                 size={swidth * 0.06}
                                 style={{alignSelf:'flex-end'}}
                                 onPress={() => alert("Work in progress")}
                           />
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
        // backgroundColor: SlateGray
    },
});


// export default CodeVerification;
export default AppHeader;
