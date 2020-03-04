import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Platform, Modal,
} from 'react-native';
import GLOBAL from '../Global/Initialization';
import {swidth, sheight, centertext, safearea, mainview} from '../Global/ScreenSetting';
import {AntDesign} from '../Global/VectorIcons';
import {SystemBlue} from '../Global/ColorPalate';
import {SystemButton} from '../Global/TwitterButton';
import {emailValidation} from '../Global/validationHelper';
import TwitterTopPanel from '../Global/TwitterTopPanel';
import {BlackBigText, BlueText, GrayText} from '../Global/TwitterText';
import TwitterTextInput from '../Global/TwitterTextInput';
import TwitterBottomPanel from '../Global/TwitterBottomPanel';
import {connect} from 'react-redux';
import {SendEmail,FireBaseSendEmail} from '../Actions/SystemAction';
import firebase from 'react-native-firebase';
import {DefaultIndicator} from '../Global/Indicators';

// let signupdata;

class CodeVerification extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            phoneoremail: '',
            code: '',
            signupdata: this.props.navigation.state.params,
            rancode: 0,
            confirmResult: null,
            buttonenable: false,
            loader: false,
        };
        // signupdata = this.props.navigation.state.params;


    }

    componentDidMount(){

        if(!GLOBAL.CodeSendMode)
            this.props.navigation.navigate('PasswordSetPage',this.state.signupdata);
        else
            this.SendCodeToClient();

        // alert(rancode);

    }

    setLoader = (flag) => {
        this.setState({loader:flag});
    };

    SendCodeToClient = () => {
        let {
            signupdata,
        } = this.state;

        if(GLOBAL.CodeSendMode)
        {
            if (signupdata.type === 'Phone')
            {
                this.setLoader(true);
                firebase.auth().signInWithPhoneNumber(`+91 ${signupdata.poe.toString()}`)
                    .then(confirmResult => {
                        this.setLoader(false);
                        this.setState({
                            confirmResult: confirmResult,
                        });
                        console.log('Send SMS data =' + JSON.stringify(confirmResult));

                    }) // save confirm result to use with the manual verification code)
                    .catch(error => {
                        this.setLoader(false);
                        console.log('Send SMS data error =' + error);
                    });

            }
            else {

                let DataObj = {
                    to: signupdata.poe.toLowerCase(),
                    subject: 'Verification Code',
                    body: this.state.rancode.toString(),
                };

                this.setLoader(true);
                this.props.FireBaseSendEmail(DataObj)
                    .then(res => {
                        this.setLoader(false);
                        if(res.status === 200)
                        {
                            alert("Verfication code has been successfully sent to your mail");
                        }
                    })
                    .catch(err => {
                        this.setLoader(false);
                        console.log(err);
                        alert(err.message);
                    });
            }
        }
        else
        {
            var rancode = Math.floor(Math.random() * 999999) + 1;
            this.setState({
                rancode: rancode,
            },() => alert(`Code is ${this.state.rancode.toString()} `));
        }


    };

    checkCode = () =>
    {
        if(GLOBAL.CodeSendMode)
        {
            if (signupdata.type === 'Phone') {
                this.state.confirmResult !== null && this.state.code.toString().length === 6 &&
                this.state.confirmResult.confirm(this.state.code.toString())
                    .then(confirmResult => {
                        this.setState({
                            buttonenable: true,
                        });
                        return true;
                        // console.log("Result data =" + JSON.stringify(confirmResult));
                    }) // save confirm result to use with the manual verification code)
                    .catch(error => {
                        return false;
                        // console.log("Result Error =" + error);
                    });
            }
            else
            {
                this.setState({
                    buttonenable: this.state.code === this.state.rancode.toString() ? true : false,
                },() => {
                    // this.props.navigation.navigate("");
                    if(this.state.code === this.state.rancode.toString())
                        this.props.navigation.navigate('PasswordSetPage',this.state.signupdata);
                });
            }
        }
        else
        {
            if(this.state.code === this.state.rancode.toString())
                this.props.navigation.navigate('PasswordSetPage',this.state.signupdata);
        }

    };


    render() {


        // let

        return (
            <SafeAreaView style={{...safearea}}>
                <View style={{...mainview}}>

                    <TwitterTopPanel
                        onBackPress={() => this.props.navigation.goBack()}
                    />

                    <BlackBigText
                        text={'We sent you a code'}
                    />

                    <GrayText
                        text={`Enter it below to verify \n${this.state.signupdata.poe}`}
                    />

                    <TwitterTextInput
                        placeholder={'Verification code'}
                        text={this.state.code}
                        keyboardType={'number-pad'}
                        onChangeText={text => this.setState({code: text},() => this.checkCode())}
                        IconDetails={
                            {
                                IconEnable: false,
                            }
                        }
                    />

                    <View style={[Styles.linkview]}>
                        <BlueText
                            text={'Didn\'t receive email?'}
                        />
                    </View>
                </View>

                <TwitterBottomPanel
                    textenable={false}
                    buttonopacity={this.state.buttonenable ? 1 : 0.5}
                    buttontext={'Next'}
                    buttonpress={() => {
                        if(this.state.code === this.state.rancode.toString())
                            this.props.navigation.navigate('PasswordSetPage',this.state.signupdata);
                    }}
                />

                <Modal visible={this.state.loader} transparent={true} onRequestClose={false}>
                    <DefaultIndicator />
                </Modal>
            </SafeAreaView>
        );
    }
}


let Styles = StyleSheet.create({

    //             Container              //

    createtextview: {
        marginTop: swidth * 0.13,
    },
    linkview: {
        marginTop: swidth * 0.02,
        width: swidth * 0.9,
        // backgroundColor:'pink',
        alignItems: 'flex-start',
    },

    //             Text              //


});

const mapStateToProps = state => {
    return {
        SystemData: state.SystemState.SystemData,
    };
};

const mapDispatchToProps = {
    SendEmail,
    FireBaseSendEmail
};

// export default CodeVerification;
export default connect(null, mapDispatchToProps)(CodeVerification);

