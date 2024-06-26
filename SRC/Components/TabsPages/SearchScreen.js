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
import AppHeader from '../../Global/AppHeader';

class SearchScreen extends Component{

    constructor(props) {
        super(props);

        this.state = {

        };

    }

    render(){

        return(
            <SafeAreaView style={[safearea]}>
                {/*<AppHeader text={'Search'} navigation={this.props.navigation}/>*/}
                <View>
                    <Text>{'Search -> Work in progress'}</Text>
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

export default connect(null, null)(SearchScreen);

