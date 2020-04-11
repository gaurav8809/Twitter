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
    KeyboardAvoidingView,
    Linking,
} from 'react-native';
import {swidth,sheight,centertext} from '../Global/ScreenSetting';
import {AntDesign} from '../Global/VectorIcons';
import {SystemBlue} from '../Global/ColorPalate';
import {SystemButton} from '../Global/TwitterButton';
import {safearea,mainview} from '../Global/ScreenSetting';
import {emailValidation} from '../Global/validationHelper';
import TwitterTopPanel from '../Global/TwitterTopPanel';

class SignUPFinalPage extends Component{

    constructor(props) {
        super(props);

        this.state = {
            name:'',
            phoneoremail:'',
        };


    }


    render(){

        let {
            inputtextview,
            nametextview,
            poetextview,
            totalnumberview,
            totalnumbertext,
            namemsg
        } = Styles;

        const btnstyles = {
            view:{
                marginTop: swidth * 0.04,
                alignItems: 'center',
                // position: 'relative'
                // justifySelf: this.state.currenttextinput == 1 && 'flex-end'
            },
            button:{
                backgroundColor: SystemBlue,
                borderRadius: 50,
                width: swidth * 0.85,
                height: swidth * 0.1,
                ...centertext
            },
            text:{
                fontSize: swidth * 0.05,
                fontFamily: 'Roboto-Bold',
                color:'white',
                // fontWeight:"500"
            }
        };

        let signupdata = this.props.navigation.state.params;

        return(
            <SafeAreaView style={{...safearea}}>
                <View style={{...mainview}}>

                    <TwitterTopPanel
                        onBackPress={() => this.props.navigation.goBack()}
                    />

                    <ScrollView contentContainerStyle={{paddingBottom: swidth * 0.08}} showsVerticalScrollIndicator={false}>

                        <View style={[Styles.createtextview]}>
                            <Text style={[Styles.hellotext]}>
                                {"Create your account"}
                            </Text>
                        </View>

                        <View style={{...inputtextview}}>
                            <View style={[Styles.nametextview]}>

                                <TextInput
                                    style={[Styles.nametext]}
                                    value={signupdata.name}
                                    // onPress={() => this.props.navigation.navigate('SignUp')}
                                    onFocus={() => this.props.navigation.navigate('SignUp')}
                                />
                            </View>

                            <View style={[Styles.poetextview]}>

                                <TextInput
                                    style={[Styles.nametext]}
                                    value={signupdata.poe}
                                    // onPress={() => this.props.navigation.navigate('SignUp')}
                                    onFocus={() => this.props.navigation.navigate('SignUp')}
                                />
                            </View>

                            <View style={[Styles.questionview]}>
                                <Text style={[Styles.questiontext]}>
                                    {"By signing up, you agree to the "}
                                    <Text style={[Styles.logintext]} onPress={() => Linking.openURL('https://twitter.com/en/tos')}>
                                        {"Terms of Service"}
                                    </Text>
                                    {" and "}
                                    <Text style={[Styles.logintext]} onPress={() => Linking.openURL('https://twitter.com/en/privacy')}>
                                        {"Privacy Policy, "}
                                    </Text>
                                    {"including"}
                                    <Text style={[Styles.logintext]} onPress={() => Linking.openURL('https://help.twitter.com/en/rules-and-policies/twitter-cookies')}>
                                        {" Cookie Use"}
                                    </Text>
                                    {". Others will be able to find you by email or phone number when provided"}
                                    <Text style={[Styles.logintext]} onPress={() => Linking.openURL('https://twitter.com/en/privacy')}>
                                        {" Privacy Options"}
                                    </Text>
                                </Text>
                            </View>

                            <SystemButton
                                text={"Sign Up"}
                                styles={btnstyles}
                                onPress={() =>
                                    this.props.navigation.navigate('CodeVerification', {
                                        name: signupdata.name,
                                        type: signupdata.type,
                                        poe: signupdata.poe
                                    })
                                }
                            />
                        </View>
                    </ScrollView>

                </View>


            </SafeAreaView>
        )
    }
}


let Styles = StyleSheet.create({

    //             Container              //

    createtextview:{
        marginTop: swidth * 0.13,
        alignItems: 'center'
    },
    inputtextview:{
        marginTop: swidth * 0.3,
    },
    nametextview:{
        // backgroundColor:'pink',
        width: swidth * 0.85,
        borderBottomWidth: 2,
        borderColor: 'lightgray',
        fontSize: swidth * 0.06,
        height: swidth * 0.095
    },
    poetextview:{
        width: swidth * 0.85,
        marginTop: swidth * 0.1,
        borderBottomWidth: 2,
        borderColor: 'lightgray',
        fontSize: swidth * 0.06,
        height: swidth * 0.095
    },
    totalnumberview:{
        flexDirection: 'row',
        marginTop: swidth * 0.02,
        justifyContent: 'space-between'
    },
    correctsigncircle:{
        alignSelf: 'flex-end',
        position:'absolute',

    },
    questionview:{
        marginTop: swidth * (Platform.OS === 'ios' ? 0.13 : 0.13),
        // flexDirection:'row'
    },

    //             Text              //


    hellotext:{
        fontSize: swidth * 0.06,
        fontFamily: 'Roboto-Bold',
        // flexWrap:'wrap-reverse'
    },
    totalnumbertext:{
        alignSelf:'flex-end',
        fontSize: swidth * 0.055,
        color:'gray',
    },
    nametext:{
        // height: swidth * 0.05,
        width: swidth * 0.77,
        fontSize: swidth * 0.04,
        // backgroundColor: 'pink',
        padding: 0,
    },
    namemsg:{
        fontSize: swidth * 0.04,
        color:'red'
    },
    dynamiclabeltext:{
        marginLeft: swidth * 0.03,
        color: SystemBlue,
        fontSize: swidth * 0.05
    },
    questiontext:{
        fontSize: swidth * 0.03,
        fontFamily: 'Roboto',
        color:'gray',
        width: swidth * 0.85
    },
    logintext:{
        fontSize: swidth * 0.03,
        fontFamily: 'Roboto',
        color:SystemBlue
    },

});

export default SignUPFinalPage;

