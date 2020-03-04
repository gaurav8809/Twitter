import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';

export default class SplashScreen extends Component{

    constructor(props) {
        super(props);

    }

    render(){
        return(
            <SafeAreaView>
                <View>
                    <Text>
                        {"Twitter"}
                    </Text>
                </View>
            </SafeAreaView>
        )
    }
}


