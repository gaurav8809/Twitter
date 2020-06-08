import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
} from 'react-native';
import GLOBAL from '../../../Global/Initialization';
import {safearea,mainview} from '../../../Global/ScreenSetting'
import {connect} from 'react-redux';
import firebase from "react-native-firebase";
import {getChatIDList, getChatUserList, getChatList} from '../../../Actions/ChatAction';

class MessageScreen extends Component{

    constructor(props) {
        super(props);

        this.state = {

        };

    }

    componentDidMount(){
        this.props.getChatList();
    }

    render(){

        return(
            <SafeAreaView style={[safearea]}>
                <View style={{...mainview}}>
                    <Text>
                        {"Messages"}
                    </Text>
                </View>
            </SafeAreaView>
        )
    }
}


let Styles = StyleSheet.create({



});

const mapStateToProps = state => {
    const {
        ChatIDList,
        ChatUsersList
    } = state.ChatReducer;
    return {
        ChatIDList,
        ChatUsersList
    };
};

const mapDispatchToProps = {
    getChatIDList,
    getChatUserList,
    getChatList
};

// export default CodeVerification;
export default connect(mapStateToProps, mapDispatchToProps)(MessageScreen);

