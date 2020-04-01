import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Platform,
    Modal,
    FlatList,
    Text,
    ScrollView,
    TouchableHighlight, TextInput,
    ToastAndroid,
} from 'react-native';
import {swidth, sheight, centertext, safearea, mainview} from '../Global/ScreenSetting';
import {AntDesign, MCI} from '../Global/VectorIcons';
import {SystemBlue} from '../Global/ColorPalate';
import TwitterTopPanel from '../Global/TwitterTopPanel';
import {BlackBigText, BlueText, GrayText} from '../Global/TwitterText';
import TwitterTextInput from '../Global/TwitterTextInput';
import TwitterBottomPanel from '../Global/TwitterBottomPanel';
import {connect} from 'react-redux';
import {DefaultIndicator} from '../Global/Indicators';
import CheckBox from 'react-native-check-box';
import GLOBAL from '../Global/Initialization';
import Icon from 'react-native-dynamic-vector-icons';
import {SelectAll} from '../Actions/FireBaseDBAction';
import {GetUserInfo, SetLoginUserData} from '../Actions/UserAction';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuProvider,
} from 'react-native-popup-menu';
import {NavigationActions, StackActions} from 'react-navigation';
import HELPER from '../Global/Helper';
import Toast, {DURATION} from 'react-native-easy-toast'

class LoginPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loader: false,
            eye: true,
            txtemail: '',
            txtpassword: '',
            current: 0,
            LoginBtn: 0.5,
        };

        this.a = React.createRef();
        this.b = React.createRef();

    }

    setLoader = (flag) => {
        this.setState({loader: flag})
    };

    LoginBtnEnable = () => {
        this.setState({
            LoginBtn: (this.state.txtemail !== '' && this.state.txtpassword !== '') ? 1 : 0.5,
        });
    };

    gotoLogin = () => {

        let username = this.state.txtemail.toLowerCase();
        let password = this.state.txtpassword;
        this.setLoader(true);
        this.props.SelectAll('users')
            .then(response => {

                let flag = false;
                let User = {};
                for (let item of response.data) {
                    // console.log(item);
                    if ((item.email === username || item.phone === username || item.username.substr(1) === username) && item.password === password) {
                        flag = true;
                        User = item;
                        break;
                    }
                }

                if (flag) {

                    HELPER.AsyncStore('AsyncLogedInUserData', User);

                    this.setLoader(false);
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({routeName: 'coreDrawerNavigator'}),
                        ],
                    });

                    this.props.navigation && this.props.navigation.dispatch(resetAction);

                } else {
                    this.setLoader(false);
                    setTimeout(() => this.refs.toast.show('Username or Password is wrong',1000),500)
                }

            })
            .catch(error => {
                this.setLoader(false,"catch");
                // if(error.status === 400)
                alert(error.message);
                // alert("Fail");
                console.log(error);
            });
    };

    render() {

        return (
            <SafeAreaView style={{...safearea}}>
                <ScrollView>
                    <MenuProvider>
                        <View style={{flex: 1, width: swidth, padding: 10}}>

                            {/*<TwitterTopPanel*/}
                            {/*    onBackPress={() => this.props.navigation.goBack()}*/}
                            {/*    backenable={true}*/}
                            {/*/>*/}

                            <View style={[Styles.twittericonview]}>
                                <View style={{flex: 1, justifyContent: 'flex-end'}}>

                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1.15}}>
                                    <AntDesign name={'twitter'} color={SystemBlue} size={swidth * 0.07}/>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text onPress={() => this.props.navigation.navigate('SignUp')}
                                              style={{color: SystemBlue, fontSize: swidth * 0.045, fontWeight: 'bold'}}>
                                            {'Sign up  '}
                                        </Text>
                                        {/*<Icon type={'Entypo'} size={swidth * 0.06} color={SystemBlue} name={'dots-three-vertical'}/>*/}
                                        <Menu open={true}>
                                            <MenuTrigger>
                                                <Icon type={'Entypo'} size={swidth * 0.06} color={SystemBlue}
                                                      name={'dots-three-vertical'}/>
                                            </MenuTrigger>
                                            <MenuOptions>
                                                <MenuOption onSelect={() => alert(`Save`)}>
                                                    <View style={{height: swidth * 0.1, padding: 10}}>
                                                        <Text style={{fontSize: swidth * 0.04}}>
                                                            {'About'}
                                                        </Text>
                                                    </View>
                                                </MenuOption>
                                                <MenuOption onSelect={() => alert(`Not called`)}>
                                                    <View style={{height: swidth * 0.1, padding: 10}}>
                                                        <Text style={{fontSize: swidth * 0.04}}>
                                                            {'Proxy'}
                                                        </Text>
                                                    </View>
                                                </MenuOption>
                                            </MenuOptions>
                                        </Menu>
                                    </View>
                                </View>
                            </View>

                            <BlackBigText text={'Log in to Twitter.'} textstyle={{fontSize: swidth * 0.07}}/>

                            <GrayText text={'Phone number or email address'}/>

                            <TwitterTextInput
                                // text={this.state.txtemail}
                                autoCorrect={false}
                                viewstyle={{
                                    marginTop: swidth * 0.02,
                                    width: swidth * 0.95,
                                    borderColor: this.state.current === 1 ? SystemBlue : 'lightgray',
                                }}
                                // ref={this.a}
                                returnKeyType={'next'}
                                onChangeText={text => this.setState({txtemail: text.trim().toLowerCase()}, () => this.LoginBtnEnable())}
                                onFocus={() => this.setState({current: 1})}
                            />

                            <GrayText text={'Password'} viewstyle={{marginTop: swidth * 0.07}}/>

                            <TwitterTextInput
                                // ref={this.b}
                                returnKeyType={'next'}
                                // onSubmitEditing={() => this.a.current.focus()}

                                viewstyle={{
                                    marginTop: swidth * 0.02,
                                    width: swidth * 0.95,
                                    borderColor: this.state.current === 2 ? SystemBlue : 'lightgray',
                                }}
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
                                IconPress={() => this.setState({eye: !this.state.eye})}
                                secureTextEntry={this.state.eye}
                                onChangeText={text => this.setState({txtpassword: text.trim()}, () => this.LoginBtnEnable())}
                                onFocus={() => this.setState({current: 2})}
                            />

                            <GrayText text={'Forgotten your password?'}
                                      viewstyle={{marginTop: swidth * 0.06, alignSelf: 'center'}}
                                      textstyle={{fontSize: swidth * 0.038}}/>


                        </View>
                    </MenuProvider>
                </ScrollView>



                <TwitterBottomPanel
                    textenable={false}
                    buttonopacity={this.state.LoginBtn}
                    buttontext={'Log in'}
                    buttonpress={() => this.gotoLogin()}
                />

                <Modal visible={this.state.loader} transparent={true} onRequestClose={false}>
                    <DefaultIndicator/>
                </Modal>
                <Toast ref="toast"/>
            </SafeAreaView>
        );
    }
}


let Styles = StyleSheet.create({

    popupview: {
        height: swidth * 0.48,
        width: swidth * 0.48,
        borderWidth: 3,
        borderRadius: 15,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
    },
    twittericonview: {
        flexDirection: 'row',
        marginTop: swidth * 0.02,
        // backgroundColor: 'red',
        // justifyContent: 'center',
    },


});

const mapStateToProps = state => {
    return {
        SystemData: state.SystemState.SystemData,
    };
};

const mapDispatchToProps = {
    SelectAll,
    SetLoginUserData,
    GetUserInfo,
};

export default connect(null, mapDispatchToProps)(LoginPage);

