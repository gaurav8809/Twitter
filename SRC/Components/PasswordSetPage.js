import React, {Component} from 'react';
import {Modal, SafeAreaView, StyleSheet, View} from 'react-native';
// import GLOBAL from '../Global/Initialization';
import {mainview, safearea, swidth} from '../Global/ScreenSetting';
import {SystemBlue} from '../Global/ColorPalate';
import TwitterTopPanel from '../Global/TwitterTopPanel';
import {BlackBigText, GrayText} from '../Global/TwitterText';
import TwitterTextInput from '../Global/TwitterTextInput';
import TwitterBottomPanel from '../Global/TwitterBottomPanel';
import {connect} from 'react-redux';
import {FireBaseSendEmail, SendEmail} from '../Actions/SystemAction';
import {CreateUser, GetField} from '../Actions/FireBaseDBAction';
import {DefaultIndicator} from '../Global/Indicators';
import GLOBAL from '../Global/Initialization';
import {NavigationActions, StackActions} from 'react-navigation';
import firebase from 'react-native-firebase';

class PasswordSetPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            txtpassword: '',
            signupdata: this.props.navigation.state.params,
            eye: true,
            buttonenable: false,
            wrongpass: false,
            label:'',
            loader: false,
        };
        // signupdata = this.props.navigation.state.params;

        if(!GLOBAL.PSWSetMode)
        {
            let dataToSend = this.state.signupdata;
            dataToSend['id'] = GLOBAL.defaultUser;

            const resetAction = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName:'ProfilePictureSetPage',params:dataToSend})
                ],
            });
            this.props.navigation.dispatch(resetAction);
        }

    }

    setLoader = (flag) => {
        this.setState({loader:flag});
    };

    onPasswordText = () => {

        this.setState({
            label : (this.state.txtpassword.length < 6 &&
                this.state.txtpassword !== '')
                ? 'Your password must be at least 6 characters.'
                : ''
        })

    };

    createUserName = () => {

        let poe = this.state.signupdata.poe.toLowerCase();
        let fname = this.state.signupdata.name;
        let Obj = [];
        let temp = '';

        if(this.state.signupdata.type === 'Email')
        {
            temp = poe.slice(0,poe.indexOf("@")).trim();
            if(temp.length < 6)
            {
                temp = fname.slice(0,5).trim() + Math.floor(Math.random() * 99999) + 1;
            }
        }
        else
            temp = fname.slice(0,5).trim() + Math.floor(Math.random() * 9999) + 1;

        Obj = [
            'username',
            '==',
            temp
        ];


        return this.props.GetField('users',Obj)
            .then(response => {
                if(response.status === 200)
                    this.createUserName();
                else
                    return '@' + temp.toLowerCase();
            })
            .catch(error => {
                // console.log("Error",error);
                return '@' + temp.toLowerCase();
                // alert("Fail");
            })

    };

    createAccount = () => {

        this.setLoader(true);
        this.createUserName()
            .then(username => {

                let dataObj = {
                    email:  this.state.signupdata.type === 'Email' ? this.state.signupdata.poe.toLowerCase() : '',
                    password: this.state.txtpassword,
                    phone: this.state.signupdata.type === 'Phone' ? this.state.signupdata.poe : '',
                    username: username,
                    profilename: this.state.signupdata.name,
                    followers: [],
                    following: [],
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                };

                if(GLOBAL.CUlivemode)
                {
                    this.props.CreateUser('users',dataObj)
                        .then(response => {

                            let uid = response.data;
                            let dataToSend = this.state.signupdata;
                            dataToSend['id'] = uid;

                            this.setLoader(false);
                            const resetAction = StackActions.reset({
                                index: 0,
                                actions: [
                                    NavigationActions.navigate({routeName:'ProfilePictureSetPage',params:dataToSend})
                                ],
                            });
                            this.props.navigation.dispatch(resetAction);

                        })
                        .catch(error => {
                            this.setLoader(false);
                            alert("Something went wrong");
                            console.log(error)
                        });
                }
                else{
                    let dataToSend = this.state.signupdata;
                    dataToSend['id'] = GLOBAL.defaultUser;

                    this.setLoader(false);
                    this.props.navigation.navigate('ProfilePictureSetPage',dataToSend);
                }
            });



    };

    render() {

        return (
            <SafeAreaView style={{...safearea}}>
                <View style={{...mainview}}>

                    <TwitterTopPanel
                        onBackPress={() => this.props.navigation.goBack()}
                    />

                    <BlackBigText
                        textstyle={{fontSize: swidth * 0.08}}
                        text={'You\'ll need a password'}
                    />

                    <GrayText
                        textstyle={{fontSize: swidth * 0.04}}
                        text={'Make sure it\'s 6 characters or more.'}
                    />

                    <TwitterTextInput
                        placeholder={'Password'}
                        text={this.state.txtpassword}
                        // keyboardType={''}
                        secureTextEntry={this.state.eye}
                        onChangeText={text => this.setState({txtpassword: text},() => this.onPasswordText())}
                        IconDetails={
                            {
                                IconEnable: true,
                                IconType: 'Ionicons',
                                // IconName: this.state.eye ? 'ios-eye' : 'ios-eye-off',
                                IconName: 'ios-eye',
                                IconColor: !this.state.eye ? 'gray' : SystemBlue,
                                IconSize: swidth * 0.07,
                            }
                        }
                        IconPress={() => this.setState({eye:!this.state.eye})}
                        LabelMessage={this.state.label}
                    />

                </View>

                <TwitterBottomPanel
                    textenable={false}
                    buttonopacity={(this.state.txtpassword !== '' && this.state.txtpassword.length > 5) ? 1 : 0.5}
                    buttontext={'Next'}
                    buttonpress={() => this.createAccount()}
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
    FireBaseSendEmail,
    CreateUser,
    GetField
};

// export default CodeVerification;
export default connect(null, mapDispatchToProps)(PasswordSetPage);

