import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AppHeader} from '../Global/AppHeader';
import React,{Component} from 'react';
import HomeScreen from '../Components/TabsPages/HomeScreen';
import {swidth} from '../Global/ScreenSetting';
import SearchScreen from '../Components/TabsPages/SearchScreen';
import HomeSwitch from '../Navigators/HomeTabNavigator';


export default class CoreTabNavigator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            index:0,
        };
    }

    RenderScreen = (index = 0) => {

        let view = <View/>;
        if(this.state.index === 0)
        {
            view = <HomeSwitch />
        }
        else if(this.state.index === 1)
        {
            view = <SearchScreen/>;
        }
        return view;

    };

    render() {
        return (
            <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>

                <AppHeader  LogedInUserData={{profileImage: ''}}/>

                {
                    this.RenderScreen()
                }

                <View style={[Styles.bottombarview]}>
                    <View style={[Styles.bottomcontainer]}>
                        <TouchableOpacity onPress={() => this.setState({index:0})}>
                            <Text>
                                {"Home"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({index:1})}>
                            <Text>
                                {"Search"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

}


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
