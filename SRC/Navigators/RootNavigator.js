import React,{Component} from 'react';
import {createAppContainer, createSwitchNavigator} from "react-navigation";
import { createDrawerNavigator } from 'react-navigation-drawer';
import HelloScreen from '../Components/HelloScreen';
import SignUp from '../Components/SignUp';
import SignUPFinalPage from '../Components/SignUPFinalPage';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    StyleSheet, Platform,
} from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
// import HomeNavigator from './HomeNavigator';
// import AppConfig from '../AppConfig/AppConfig'
import Icon from 'react-native-dynamic-vector-icons';
import {swidth,sheight} from '../Global/ScreenSetting';
import {SystemBlue} from '../Global/ColorPalate';
import {createStackNavigator} from 'react-navigation-stack';
import CodeVerification from '../Components/CodeVerification';
import PasswordSetPage from '../Components/PasswordSetPage';
import ProfilePictureSetPage from '../Components/ProfilePictureSetPage';
import BioSetPage from '../Components/BioSetPage';
import LanguageSetPage from '../Components/LanguageSetPage';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import HomeScreen from '../Components/TabsPages/HomeScreen';
import SearchScreen from '../Components/TabsPages/SearchScreen';
import NotificationScreen from '../Components/TabsPages/NotificationScreen';
import MessageScreen from '../Components/TabsPages/MessageScreen';
import DrawerView from '../Components/DrawerView';
import StartUpLoader from '../Components/StartUpLoader';
import LoginPage from '../Components/LoginPage';
import {SystemButton} from '../Global/TwitterButton';
import {AppHeader} from '../Global/AppHeader';
import StackNav from '../Navigators/StackNavigator'

const header = (text) => {
    return (
        <SafeAreaView >
            <View style={{flexDirection:'row' ,  justifyContent:'center', alignItems:'center'}}>
                <View>
                    <Image source={require('../Assets/Images/user.png')} style={{height: swidth * 0.08, width : swidth * 0.08 }}/>
                </View>
                <View style={{alignItems:'flex-start', width: swidth * 0.75}}>
                    <Text style={{fontSize: swidth * 0.05, marginLeft : swidth * 0.05}}>
                        {text}
                    </Text>
                </View>
                <View>
                    <Icon name={'star-four-points-outline'} type={'MaterialCommunityIcons'} color={SystemBlue} size={swidth * 0.08} />
                </View>
            </View>
        </SafeAreaView>
    )
};

const coreDrawerNavigator = createDrawerNavigator(
    {
        StackNav,
        // coreTabNavigator,
        // CoreTabNavigator,
    },
    {
        contentComponent:DrawerView,
        drawerWidth:swidth * 0.8
    }
);

const CoreStackNavigator = createStackNavigator({
    StartUpLoader:StartUpLoader,
    HelloScreen:HelloScreen,
    SignUp:SignUp,
    SignUpFinalPage:SignUPFinalPage,
    CodeVerification:CodeVerification,
    PasswordSetPage:PasswordSetPage,
    ProfilePictureSetPage:ProfilePictureSetPage,
    BioSetPage:BioSetPage,
    LanguageSetPage:LanguageSetPage,
    coreDrawerNavigator:coreDrawerNavigator,

    //Login
    LoginPage:LoginPage,
    // CoreTabNavigator:CoreTabNavigator

},{
    headerMode:'none'
});


// export default createAppContainer(CoreStackNavigator);
export default createAppContainer(CoreStackNavigator);

