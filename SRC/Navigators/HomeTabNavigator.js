import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import HomeScreen from '../Components/TabsPages/HomeScreen';
import SearchScreen from '../Components/TabsPages/SearchScreen';
import React,{Component} from 'react';

// let HomeSwitch;
const Root = createStackNavigator({
    HomeScreen:{
        screen:HomeScreen,
    }
},
{
    headerMode:'none',
    initialRouteName: 'HomeScreen',
});
// let HomeSwitch = createAppContainer(Root);
export  default  createAppContainer(Root);
