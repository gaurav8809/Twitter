import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Platform,
} from 'react-native';
import {swidth, sheight, centertext, safearea, mainview} from '../Global/ScreenSetting';
import {AntDesign} from '../Global/VectorIcons';
import {SystemBlue} from '../Global/ColorPalate';
import {SystemButton} from './TwitterButton';
import {emailValidation} from '../Global/validationHelper';
import TwitterTopPanel from './TwitterTopPanel';
import {BlackBigText, BlueText, GrayText} from './TwitterText';
import TwitterTextInput from './TwitterTextInput';
import TwitterBottomPanel from './TwitterBottomPanel';
import {connect} from 'react-redux';
import {SendEmail,FireBaseSendEmail} from '../Actions/SystemAction';
import firebase from 'react-native-firebase';

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
        };
        // signupdata = this.props.navigation.state.params;

        global.sample = "a";

    }

    componentDidMount(): void {

       this.SendCodeToClient();

        // alert(rancode);

    }

    SendCodeToClient = () => {
        let {
            signupdata,
        } = this.state;

        if (signupdata.type === 'Phone') {
            firebase.auth().signInWithPhoneNumber(`+91 ${signupdata.poe.toString()}`)
                .then(confirmResult => {
                    debugger
                    this.setState({
                        confirmResult: confirmResult,
                    });
                    console.log('Send SMS data =' + JSON.stringify(confirmResult));

                }) // save confirm result to use with the manual verification code)
                .catch(error => {
                    debugger
                    console.log('Send SMS data error =' + error);
                });


            // confirmResult.confirm('123654')
            //     .then(confirmResult => {
            //         debugger
            //         console.log("Result data =" + JSON.stringify(confirmResult));
            //     }) // save confirm result to use with the manual verification code)
            //     .catch(error => {
            //         console.log("Result Error =" + error);
            //     });
        } else {

            var rancode = Math.floor(Math.random() * 999999) + 1;
            this.setState({
                rancode: rancode,
            }, () => {
                let DataObj = {
                    to: signupdata.poe.toLowerCase(),
                    subject: 'Verification Code',
                    body: this.state.rancode.toString(),
                };

                this.props.FireBaseSendEmail(DataObj)
                    .then(res => {
                        debugger
                        alert('Verification code has been sent to your mail.');
                    })
                    .catch(err => {
                        debugger
                        alert(err);
                    });
            });


        }
    };

    checkcodeforemail = () => {
        // this.state.code === this.state.rancode.toString() ?

        this.setState({
            buttonenable: this.state.code === this.state.rancode.toString() ? true : false,
        });
    };

    checkcodeforphone = () => {
        // return this.state.code === this.state.rancode.toString()
        // debugger
        this.state.confirmResult !== null && this.state.code.toString().length === 6 &&
        this.state.confirmResult.confirm(this.state.code.toString())
            .then(confirmResult => {
                debugger
                this.setState({
                    buttonenable: true,
                });
                return true;
                // console.log("Result data =" + JSON.stringify(confirmResult));
            }) // save confirm result to use with the manual verification code)
            .catch(error => {
                debugger
                return false;
                // console.log("Result Error =" + error);
            });
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
                        code={this.state.code}
                        keyboardType={'number-pad'}
                        onChangeText={text => this.setState({code: text},() => {
                            this.state.signupdata.type === 'Phone' ?
                                this.checkcodeforphone() :
                                this.checkcodeforemail()
                        })}
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
                    // buttonpress={}
                />
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

