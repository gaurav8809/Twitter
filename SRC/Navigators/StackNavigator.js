import {createBottomTabNavigator} from 'react-navigation-tabs';
import SearchScreen from '../Components/TabsPages/SearchScreen';
import NotificationScreen from '../Components/TabsPages/NotificationScreen';
import MessageScreen from '../Components/TabsPages/Message/MessageScreen';
import NewMessageScreen from '../Components/TabsPages/Message/NewMessageScreen';
import VideoCallTab from '../Components/TabsPages/VideoCall';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons/lib/components/Icon';
import {swidth} from '../Global/ScreenSetting';
import {SystemBlue} from '../Global/ColorPalate';
import {createStackNavigator} from 'react-navigation-stack';
import {AppHeader} from '../Global/AppHeader';
import HomeScreen from '../Components/TabsPages/HomeScreen';
import PersonalChatScreen from '../Components/TabsPages/Message/PersonalChatScreen';
import React from 'react';
import CreateTweetPage from "../Components/CreateTweetPage";
import ProfilePage from '../Components/CommonPages/ProfilePage';
import FollowingListPage from '../Components/CommonPages/FollowingListPage';
import FollowersListPage from '../Components/CommonPages/FollowersListPage';
import EditProfilePage from '../Components/CommonPages/EditProfilePage';
import Video from '../Agora-Setup/Video';

const HomeSwitch = createStackNavigator({
    HomeScreen:{
        screen:HomeScreen,
    }
},
{
    // defaultNavigationOptions: {
    //     header:<View style={{backgroundColor: "red",height: 100, width: 100}}/>,
    //     // headerStyle: {
    //     //     backgroundColor: '#f4511e',
    //     // },
    //     // headerTintColor: '#fff',
    //     // headerTitleStyle: {
    //     //     fontWeight: 'bold',
    //     // },
    // },
    headerMode:'none'
});

const coreTabNavigator = createBottomTabNavigator({
    HomeScreen:{
        screen:HomeScreen,
        navigationOptions: {
            // tabBarIcon:({tintColor}) => (<Image source={require('../Assets/Images/HomeBlack.png')}/>)
        },
    },
    SearchScreen:{
        screen: SearchScreen,
        navigationOptions: {
        },
    },
    NotificationScreen:{
        screen: NotificationScreen,
        navigationOptions: {
        },
    },
    MessageScreen:{
        screen: MessageScreen,
        navigationOptions: {
        },
    },
},{
    initialRouteName:"MessageScreen",
    defaultNavigationOptions: ({navigation}) => ({
        tabBarIcon: ({ focused}) => {

            let {IconStyle} = Styles;
            let name,type,color,size;
            const { routeName } = navigation.state;

            if (routeName === 'HomeScreen') {
                name = 'home';
                type = 'Octicons';
                size = swidth * 0.06;
            } else if (routeName === 'SearchScreen') {
                name = 'search1';
                type = 'AntDesign';
                size = swidth * 0.06;
            } else if (routeName === 'NotificationScreen') {
                name = 'bell';
                type = 'Entypo';
                size = swidth * 0.06;
            } else if (routeName === 'MessageScreen') {
                name = 'envelope-o';
                type = 'FontAwesome';
                size = swidth * 0.06;
            } else if (routeName === 'VideoScreen') {
                name = 'video-camera';
                type = 'FontAwesome';
                size = swidth * 0.06;
            }


            if(!focused)
                color = 'slategray';
            else
                color = SystemBlue;

            return <Icon name={name} type={type} color={color} size={size} />
        },
    }),
    tabBarOptions: {
        showLabel: false
    }});

const StackNav = createStackNavigator({
        coreTabNavigator:{
            screen: coreTabNavigator,
            header: () => <AppHeader navigation={navigation} />
        },
        CreateTweetPage,
        ProfilePage,
        FollowingListPage,
        FollowersListPage,
        EditProfilePage,
        PersonalChatScreen,
        NewMessageScreen,
        Video,
    },
    {
        defaultNavigationOptions:({navigation}) => ({
            header: () => <AppHeader navigation={navigation}/>
        }),
        headerMode:'screen'
    });


export default StackNav;

const Styles = StyleSheet.create({

    IconStyle:{
        height: swidth * 0.07,
        width: swidth * 0.07
    },
    bottombarview:{
        padding:10,
        position:'absolute',
        bottom:0,
        borderTopWidth:1,
        borderColor:'lightgray',
        height: swidth * 0.12,
        width:swidth,
        justifyContent: 'center',
        backgroundColor:'white',
    },
    bottomcontainer:{
        flexDirection:'row',
    },

});
