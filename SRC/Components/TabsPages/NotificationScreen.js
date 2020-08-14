import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Platform,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';
import GLOBAL from '../../Global/Initialization';
import {safearea,mainview} from '../../Global/ScreenSetting'
import {connect} from 'react-redux';

class NotificationScreen extends Component{

    constructor(props) {
        super(props);

        this.state = {

        };

    }

    render(){

        return(
            <SafeAreaView style={[safearea]}>
                <View style={{...mainview}}>
                    <Text>{'Notification -> Work in progress'}</Text>
                </View>
            </SafeAreaView>
        )
    }
}


let Styles = StyleSheet.create({



});

const mapStateToProps = state => {
    return {
        SystemData: state.SystemState.SystemData,
    };
};

const mapDispatchToProps = {

};

export default connect(null, null)(NotificationScreen);

