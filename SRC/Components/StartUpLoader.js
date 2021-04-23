import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Platform
} from 'react-native';
import {swidth, centertext} from '../Global/ScreenSetting';
import {SystemBlue} from '../Global/ColorPalate'
import {safearea} from '../Global/ScreenSetting';
import {TwitterCircleIndicator} from '../Global/Indicators';
import HELPER from '../Global/Helper';
import {NavigationActions, StackActions} from 'react-navigation';
import crashlytics from '@react-native-firebase/crashlytics';

class StartUpLoader extends Component{

    constructor(props) {
        super(props);

        this.LoginCheck();
        // crashlytics().crash();
    }

    LoginCheck = () => {
        HELPER.AsyncFetch('AsyncLogedInUserData')
            .then(response => {

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

export default StartUpLoader;

