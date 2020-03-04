import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Platform
} from 'react-native';
import {swidth,sheight,centertext} from '../Global/ScreenSetting';
import {AntDesign} from '../Global/VectorIcons';
import {SystemBlue} from '../Global/ColorPalate'
import {SystemButton} from '../Global/TwitterButton'
import {safearea,mainview} from '../Global/ScreenSetting';
import {MaterialIndicator} from 'react-native-indicators';
import {DefaultIndicator, TwitterCircleIndicator} from '../Global/Indicators';
import HELPER from '../Global/Helper';
import {NavigationActions, StackActions} from 'react-navigation';

class StartUpLoader extends Component{

    constructor(props) {
        super(props);

        this.LoginCheck();
    }

    LoginCheck = () => {
        HELPER.AsyncFetch('AsyncLogedInUserData')
            .then(response => {
                debugger
                if(response !== null)
                {
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({routeName:'coreDrawerNavigator'})
                        ],
                    });

                    setTimeout(() => this.props.navigation.dispatch(resetAction),1500);
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
    };

    render(){

        return(
            <SafeAreaView style={{...safearea}}>
                <TwitterCircleIndicator/>
            </SafeAreaView>
        )
    }
}


let Styles = StyleSheet.create({

    //             Container              //

    twittericonview:{
        marginTop: swidth * 0.14,
        height: swidth * 0.15
    },
    hellotextview:{
        marginTop: swidth * 0.2,
    },
    createbtnview:{
        marginTop: swidth * 0.15,
        alignItems: 'center'
    },
    createbtn:{
        backgroundColor: SystemBlue,
        borderRadius: 50,
        width: swidth * 0.75,
        height: swidth * 0.15,
        ...centertext
    },
    questionview:{
        marginTop: swidth * (Platform.OS == 'ios' ? 0.5 : 0.3),
        flexDirection:'row'
    },

    //             Text              //


    hellotext:{
        fontSize: swidth * 0.09,
        fontFamily: 'Roboto-Bold',
        // flexWrap:'wrap-reverse'
    },
    craetebtntext:{
        fontSize: swidth * 0.065,
        fontFamily: 'Roboto-Bold',
        color:'white',
        // fontWeight:"500"
    },
    questiontext:{
        fontSize: swidth * 0.05,
        fontFamily: 'Roboto',
        color:'gray',
    },
    logintext:{
        fontSize: swidth * 0.05,
        fontFamily: 'Roboto',
        color:SystemBlue
    },

});

export default StartUpLoader;

