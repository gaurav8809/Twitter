import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Platform,
    Modal,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import {swidth, sheight, centertext, safearea, mainview} from '../Global/ScreenSetting';
import {AntDesign,MCI} from '../Global/VectorIcons';
import {SystemBlue} from '../Global/ColorPalate';
import TwitterTopPanel from '../Global/TwitterTopPanel';
import {BlackBigText, BlueText, GrayText} from '../Global/TwitterText';
import TwitterTextInput from '../Global/TwitterTextInput';
import TwitterBottomPanel from '../Global/TwitterBottomPanel';
import {connect} from 'react-redux';
import {SendEmail,FireBaseSendEmail} from '../Actions/SystemAction';
import firebase from 'react-native-firebase';
import {DefaultIndicator} from '../Global/Indicators';
import GLOBAL from '../Global/Initialization';
import {UpdateWhere} from '../Actions/FireBaseDBAction';
import {StackActions,NavigationActions} from "react-navigation";



class BioSetPage extends Component {

    static navigationOptions = ({navigation}) => {
        return {gestureEnabled: false}
    };

    constructor(props) {
        super(props);

        this.state = {
            signupdata: this.props.navigation.state.params,
            bio:'',
            loader: false,
            photo:null,
            label:'',
            counter: 160,
            // ref:
        };

        if(!GLOBAL.BioSetMode)
        {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName:'LanguageSetPage',params:this.state.signupdata})
                ],
            });

            this.props.navigation.dispatch(resetAction);
        }
    }

    setLoader = (flag) => {
        this.setState({loader:flag});
    };

    onBioTextChange = () => {

        this.setState({
            counter: 160 - this.state.bio.length,
            label : (this.state.bio.length > 160 &&
                this.state.bio !== '')
                ? 'Your bio must be less than 160 characters.'
                : ''
        })

    };

    setBioData = () => {


        if(GLOBAL.BioSetMode)
        {
            console.log(this.state.signupdata.id)
            this.setLoader(true);
            this.props.UpdateWhere(`users`,this.state.signupdata.id,{'bioDetails':this.state.bio})
                .then(response => {
                    this.setLoader(false);
                    // alert("Success");
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({routeName:'LanguageSetPage',params:this.state.signupdata})
                        ],
                    });

                    this.props.navigation.dispatch(resetAction);
                    // this.props.navigation.navigate('LanguageSetPage',this.state.signupdata);
                })
                .catch(error => {
                    this.setLoader(false);
                    alert("Fail");
                    console.log(error)
                })
        }
        else{
            this.props.navigation.navigate('LanguageSetPage',this.state.signupdata);
        }


    };

    render() {

        return (
            <SafeAreaView style={{...safearea}}>
                <View style={{...mainview}}>

                    <TwitterTopPanel
                        onBackPress={() => this.props.navigation.goBack()}
                        backenable={true}
                    />

                    <BlackBigText
                        text={'Describe yourself'}
                    />

                    <GrayText
                        text={'What makes you special? Dont\' think too hard, just have fun with it.'}
                    />

                    <TwitterTextInput
                        placeholder={'Your bio'}
                        text={this.state.bio}
                        onFocus={() => this.setState()}
                        // keyboardType={''}
                        onChangeText={text => this.setState({bio: text},() => this.onBioTextChange())}
                        LabelMessage={this.state.label}
                        CounterDetails={
                            {
                                CounterEnable: true,
                                CounterText: this.state.counter
                            }
                        }
                    />
                </View>

                <TwitterBottomPanel
                    text={'Skip for now'}
                    textenable={true}
                    textpress={() => this.props.navigation.navigate('LanguageSetPage',this.state.signupdata)}
                    buttonopacity={(this.state.bio !== '' && this.state.bio.length < 160) ? 1 : 0.5}
                    buttontext={'Next'}
                    buttonpress={() => this.setBioData()}
                />

                <Modal visible={this.state.loader} transparent={true} onRequestClose={false}>
                    <DefaultIndicator />
                </Modal>
            </SafeAreaView>
        );
    }
}


let Styles = StyleSheet.create({

    popupview:{
        height: swidth * 0.48,
        width: swidth * 0.48,
        borderWidth: 3,
        borderRadius: 15,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent:'center',
    },


});

const mapStateToProps = state => {
    return {
        SystemData: state.SystemState.SystemData,
    };
};

const mapDispatchToProps = {
    UpdateWhere
};

// export default CodeVerification;
export default connect(null, mapDispatchToProps)(BioSetPage);

