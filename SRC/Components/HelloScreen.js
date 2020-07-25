import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Platform
} from 'react-native';
import {swidth, centertext, SW, SH} from '../Global/ScreenSetting';
import {AntDesign} from '../Global/VectorIcons';
import {SystemBlue, FB_BLUE} from '../Global/ColorPalate'
import {SystemButton} from '../Global/TwitterButton'
import {safearea,mainview} from '../Global/ScreenSetting';
import { LoginButton, LoginManager, AccessToken } from 'react-native-fbsdk';
import Icon from "react-native-dynamic-vector-icons/lib/components/Icon";

class HelloScreen extends Component{

    constructor(props) {
        super(props);


    }

    loginWithFacebook = () => {
        LoginManager.logInWithPermissions(['public_profile']).then(
            function(result) {
                debugger
                if (result.isCancelled) {
                    alert('Login was cancelled');
                } else {
                    // alert('Login was successful with permissions: '
                    //     + result.grantedPermissions.toString());
                    // debugger
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            debugger
                            console.log(data.accessToken.toString())
                        }
                    )
                }
            },
            (error) => {
                debugger
                alert('Login failed with error: ' + error);
            }
        );
    };

    render(){

        const {navigation} = this.props;

        const btnstyles = {
            view:{
                marginTop: swidth * 0.15,
                alignItems: 'center'
            },
            button:{
                backgroundColor: SystemBlue,
                borderRadius: 50,
                width: swidth * 0.75,
                height: swidth * 0.13,
                ...centertext
            },
            text:{
                fontSize: swidth * 0.06,
                fontFamily: 'Roboto-Bold',
                color:'white',
            }
        };

        return(
            <SafeAreaView style={safearea}>
                <ScrollView  contentContainerStyle={{flex: 1}} showsVerticalScrollIndicator={false}>
                    <View style={mainview}>

                        <View style={[Styles.twittericonview]}>
                            <AntDesign name={'twitter'} color={SystemBlue} size={swidth * 0.12}/>
                        </View>

                        <View style={[Styles.hellotextview]}>
                            <Text style={[Styles.hellotext]}>
                                {"See what’s happening in the world right now."}
                            </Text>
                        </View>

                        <SystemButton
                            aOpacity={0.8}
                            text={"Create account"}
                            styles={btnstyles}
                            onPress={() => navigation.navigate('SignUp')}
                        />

                        <View style={[Styles.questionview]}>
                            <Text style={[Styles.questiontext]}>
                                {"Have an account already? "}
                            </Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginPage')}>
                                <Text style={Styles.logintext}>
                                    {"Log in"}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{flexDirection: 'row', alignItems: 'center', top: SH(0.02)}}>
                            <Text style={Styles.logintext}>
                                {"Login With  "}
                            </Text>
                            <Icon
                                onPress={this.loginWithFacebook}
                                name={"facebook-with-circle"}
                                type={"Entypo"}
                                size={swidth * 0.1}
                                color={FB_BLUE}
                            />
                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}


let Styles = StyleSheet.create({

    //             Container              //

    twittericonview:{
        marginTop: swidth * 0.14,
        height: swidth * 0.15
    },
    hellotextview:{
        marginTop: swidth * 0.2,
        alignItems:'center'
    },
    createbtnview:{
        marginTop: swidth * 0.15,
        alignItems: 'center'
    },
    createbtn:{
        backgroundColor: SystemBlue,
        borderRadius: 50,
        width: swidth * 0.75,
        height: swidth * 0.15,
        ...centertext
    },
    questionview:{
        marginTop: swidth * (Platform.OS === 'ios' ? 0.5 : 0.3),
        flexDirection:'row'
    },

    //             Text              //


    hellotext:{
        fontSize: swidth * 0.07,
        fontFamily: 'Roboto-Bold',
    },
    craetebtntext:{
        fontSize: swidth * 0.065,
        fontFamily: 'Roboto-Bold',
        color:'white',
    },
    questiontext:{
        fontSize: swidth * 0.04,
        fontFamily: 'Roboto',
        color:'gray',
    },
    logintext:{
        fontSize: swidth * 0.04,
        fontFamily: 'Roboto',
        color:SystemBlue
    },

});

export default HelloScreen;

