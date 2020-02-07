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
    TouchableOpacity
} from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
// import HomeNavigator from './HomeNavigator';
// import AppConfig from '../AppConfig/AppConfig'
import {createStackNavigator} from 'react-navigation-stack';




const CoreStackkNavigator = createStackNavigator({
    HelloScreen:HelloScreen,
    SignUp:SignUp,
    SignUpFinalPage:SignUPFinalPage

},{
    headerMode:'none'
});


export default createAppContainer(CoreStackkNavigator);


