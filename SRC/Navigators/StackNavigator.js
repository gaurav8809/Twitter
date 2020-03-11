import {createBottomTabNavigator} from 'react-navigation-tabs';
import SearchScreen from '../Components/TabsPages/SearchScreen';
import NotificationScreen from '../Components/TabsPages/NotificationScreen';
import MessageScreen from '../Components/TabsPages/MessageScreen';
import {Image, StyleSheet} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons/lib/components/Icon';
import {swidth} from '../Global/ScreenSetting';
import {SystemBlue} from '../Global/ColorPalate';
import {createStackNavigator} from 'react-navigation-stack';
import {AppHeader} from '../Global/AppHeader';
import HomeScreen from '../Components/TabsPages/HomeScreen';
import React,{Component} from 'react';
import {GetLoginUserData, GetUserInfo} from '../Actions/UserAction';
import {connect} from 'react-redux';
import DrawerView from '../Components/DrawerView'




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
        screen:HomeSwitch,
        navigationOptions: {
            // tabBarIcon:({tintColor}) => (<Image source={require('../Assets/Images/HomeBlack.png')}/>)
        },
    },
    SearchScreen:{
        screen:SearchScreen,
        navigationOptions:{
        },
    },
    NotificationScreen:{
        screen:NotificationScreen,
        navigationOptions:{
        },
    },
    MessageScreen:{
        screen:MessageScreen,
        navigationOptions:{
        },
    },
},{
    defaultNavigationOptions: ({navigation}) => ({
        tabBarIcon: ({ focused}) => {

            let {IconStyle} = Styles;
            if(!focused)
            {
                const { routeName } = navigation.state;

                if (routeName === 'HomeScreen') {
                    return <Image source={require('../Assets/Images/HomeBlack.png')} style={IconStyle}/>
                } else if (routeName === 'SearchScreen') {
                    return <Icon name={'search'} type={'FontAwesome'} color={'slategray'} size={swidth * 0.07} />
                } else if (routeName === 'NotificationScreen') {
                    return <Image source={require('../Assets/Images/BellBlack.png')} style={IconStyle} />
                } else if (routeName === 'MessageScreen') {
                    return <Image source={require('../Assets/Images/MessageBlack.png')} style={IconStyle} />
                }

            }
            else
            {
                const { routeName } = navigation.state;

                if (routeName === 'HomeScreen') {
                    return <Image source={require('../Assets/Images/HomeEnable.png')} style={IconStyle}/>
                } else if (routeName === 'SearchScreen') {
                    return <Icon name={'search'} type={'FontAwesome'} color={SystemBlue} size={swidth * 0.07}/>
                } else if (routeName === 'NotificationScreen') {
                    return <Image source={require('../Assets/Images/BellEnable.png')} style={IconStyle} />
                } else if (routeName === 'MessageScreen') {
                    return <Image source={require('../Assets/Images/MessageEnable.png')} style={IconStyle}/>
                }

            }
        },
    }),
    tabBarOptions: {
        showLabel: false
    }});

const StackNav = createStackNavigator({
        coreTabNavigator
    },
    {
        defaultNavigationOptions:({navigation,screenProps}) => ({
            header: () => <AppHeader navigation={navigation} />
        }),
    });

const mapStateToProps = state => {
    const {
        LogedInUserData,
    } = state.UserReducer;
    return {
        LogedInUserData,
    };
};

const mapDispatchToProps = {
    GetUserInfo: GetUserInfo,
    GetLoginUserData: GetLoginUserData,
};

// export default CodeVerification;
export default connect(mapStateToProps, null)(StackNav);


// export default StackNav;



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
        // backgroundColor:'rgb(242,242,242)',
        backgroundColor:'white',
    },
    bottomcontainer:{
        flexDirection:'row',
        // alignItems: 'center',
        // backgroundColor: 'pink'
    },

});
