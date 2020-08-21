import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Modal,
    TouchableOpacity
} from 'react-native';
import GLOBAL from '../Global/Initialization';
import {swidth, safearea, mainview} from '../Global/ScreenSetting';
import TwitterTopPanel from '../Global/TwitterTopPanel';
import {BlackBigText, BlueText, GrayText} from '../Global/TwitterText';
import TwitterTextInput from '../Global/TwitterTextInput';
import TwitterBottomPanel from '../Global/TwitterBottomPanel';
import {connect} from 'react-redux';
import {SendEmail,FireBaseSendEmail} from '../Actions/SystemAction';
import firebase from 'react-native-firebase';
import {DefaultIndicator} from '../Global/Indicators';

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
    }

    componentDidMount(){

        if(!GLOBAL.CodeSendMode)
            this.props.navigation.navigate('PasswordSetPage',this.state.signupdata);
        else
            this.SendCodeToClient();

    }

    setLoader = (flag,callback) => {
        this.setState({loader:flag},() => callback);
    };

    SendCodeToClient = () => {
        let {
            signupdata,
        } = this.state;

        var rancode = Math.floor(Math.random() * 999999) + 1;
        this.setState({
            rancode,
        },() => {
            if(GLOBAL.CodeSendMode)
            {
                if (signupdata.type === 'Phone')
                {
                    this.setLoader(true);
                    firebase.auth().signInWithPhoneNumber(`+91 ${signupdata.poe.toString()}`)
                        .then(confirmResult => {

                            console.log('Send SMS data =' + JSON.stringify(confirmResult));
                            this.setState({
                                loader: false,
                                confirmResult: confirmResult,
                            }, () => alert("Verification code successfully sent to your phone"));

                        }) // save confirm result to use with the manual verification code)
                        .catch(error => {
                            this.setLoader(false,alert("Something went wrong"));
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
                                alert("Verification code successfully sent to your mail");
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
                alert(`Code is ${this.state.rancode.toString()} `);
            }
        });
    };

    checkCode = () =>
    {
        if(GLOBAL.CodeSendMode)
        {
            if (this.state.signupdata.type === 'Phone') {
                if(this.state.confirmResult !== null && this.state.code.toString().length === 6)
                {
                    this.state.confirmResult.confirm(this.state.code.toString())
                        .then(confirmResult => {
                            this.props.navigation.navigate('PasswordSetPage',this.state.signupdata);
                            return true;
                        }) // save confirm result to use with the manual verification code)
                        .catch(error => {
                            return false;
                        });
                }
            }
            else
            {
                this.setState({
                    buttonenable: this.state.code === this.state.rancode.toString() ? true : false,
                },() => {
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
        return (
            <SafeAreaView style={{...safearea}}>
                <View style={{...mainview}}>

                    <TwitterTopPanel
                        onBackPress={() => this.props.navigation.goBack()}
                    />

                    <BlackBigText
                        textstyle={{fontSize: swidth * 0.06}}
                        text={'We sent you a code'}
                    />

                    <GrayText
                        textstyle={{fontSize: swidth * 0.04}}
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
                        <TouchableOpacity onPress={() => this.SendCodeToClient()}>
                            <BlueText
                                textstyle={{fontSize: swidth * 0.04}}
                                text={this.state.signupdata.type === 'Email' ? 'Didn\'t receive email?' : 'Didn\'t receive SMS?'}
                            />
                        </TouchableOpacity>
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

export default connect(null, mapDispatchToProps)(CodeVerification);

