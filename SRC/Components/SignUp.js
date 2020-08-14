import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
} from 'react-native';
import {swidth, centertext} from '../Global/ScreenSetting';
import {AntDesign} from '../Global/VectorIcons';
import {SystemBlue} from '../Global/ColorPalate';
import {safearea,mainview} from '../Global/ScreenSetting';
import {emailValidation} from '../Global/validationHelper';
import TwitterBottomPanel from '../Global/TwitterBottomPanel'
import TwitterTopPanel from '../Global/TwitterTopPanel';

class SignUp extends Component{

    constructor(props) {
        super(props);

        this.state = {
            name:'',
            phoneoremail:'',
            currenttextinput:0,
            totalnumber:50,
            correctsign:false,
            poecorrectsign:false,
            placeholder:'Phone number or email',
            dynamiclabel:'Use email instead',
            currentplace:true,
            nextopacity:0.5,
            pemsg:''
        };

        this.a = React.createRef();
        this.b = React.createRef();

    }

    namechange = (text) => {

        this.setState({
            name:text,
            totalnumber:50 - text.length,
            correctsign: false,
        });

        setTimeout(() => this.setState({
            correctsign: (this.state.totalnumber >= 0 && (50 - text.length) < 50),
            nextopacity: (this.state.totalnumber >= 0 && (50 - text.length) < 50) ? 1 : 0.5
        }),500);

    };

    nextbuttonclick = () => {

        if(this.state.currenttextinput === 0)
        {
            this.b.current.focus()
        }
        else
        {
            if(!this.state.correctsign || this.state.nextopacity === 0.5)
            {
                this.a.current.focus()
            }
            else
            {
                this.props.navigation.navigate('SignUpFinalPage',{
                    name: this.state.name,
                    type: this.state.currentplace ? 'Phone' : 'Email',
                    poe: this.state.phoneoremail
                });
            }
        }
    };

    successmark = () => {

        this.setState({
            pemsg:'',
            nextopacity: 1
        });
        if(this.state.phoneoremail !== '')
        {
            this.setState({
                poecorrectsign:true
            });
        }

    };

    setpelabel = (text) => {
        this.setState({phoneoremail:text},() => {

            if(this.state.currentplace)
            {
                if((this.state.phoneoremail !== '' && this.state.phoneoremail.length !== 10 || isNaN(this.state.phoneoremail)) || this.state.phoneoremail.includes('.') === true)
                {
                    this.setState({
                        pemsg:'Please enter a valid phone number.',
                        nextopacity: 0.5,
                        poecorrectsign:false
                    });
                }
                else
                {
                    this.successmark();
                }
            }
            else
            {
                if(this.state.phoneoremail !== '' && !emailValidation(this.state.phoneoremail))
                {
                    this.setState({
                        pemsg:'Please enter a valid email.',
                        nextopacity: 0.5,
                        poecorrectsign:false
                    });
                }
                else
                {
                    this.successmark();
                }
            }

        }) ;

    };



    render(){

        let {
            inputtextview,
            nametextview,
            poetextview,
            totalnumberview,
            totalnumbertext,
            namemsg
        } = Styles;

        return(
            <SafeAreaView style={{...safearea}}>
                <View style={{...mainview}}>

                    <TwitterTopPanel
                        onBackPress={() => this.props.navigation.goBack()}
                    />

                    <ScrollView contentContainerStyle={{paddingBottom: 150}} showsVerticalScrollIndicator={false}>
                        <View style={[Styles.createtextview]}>
                            <Text style={[Styles.hellotext]}>
                                {"Create your account"}
                            </Text>
                        </View>

                        <View style={{...inputtextview}}>
                            <View
                                style={[
                                    nametextview,
                                    this.state.totalnumber < 0
                                        ? {borderColor: 'red'}
                                        : {borderColor: this.state.currenttextinput === 0 ? SystemBlue : 'lightgray'}
                                ]}>
                                <TextInput
                                    autoCorrect={false}
                                    onFocus={() => this.setState({currenttextinput:0})}
                                    style={[Styles.inputText]}
                                    value={this.state.name}
                                    onChangeText={text => {
                                        if(text[0]!==' '){
                                            this.namechange(text)
                                        }
                                    }}
                                    placeholder={'Name'}
                                    placeholderTextColor={"gray"}
                                    selectionColor={SystemBlue}
                                    autoFocus={true}
                                    ref={this.a}
                                    returnKeyType={'next'}
                                    onSubmitEditing={() => this.b.current.focus()}
                                />
                                {
                                    this.state.correctsign &&
                                    <View style={[Styles.correctsigncircle]}>
                                        <AntDesign name={'checkcircleo'} color={'green'} size={swidth * 0.05}/>
                                    </View>
                                }
                            </View>

                            <View style={{...totalnumberview}}>

                                {this.state.totalnumber < 0 ?
                                    <Text style={{...namemsg}}>
                                        {"Must be 50 characters or fewer."}
                                    </Text>
                                    :
                                    <Text style={{...namemsg}}>
                                        {""}
                                    </Text>
                                }
                                <Text style={[totalnumbertext , { color: this.state.totalnumber < 0 ? 'red' : 'gray'}]}>
                                    {this.state.totalnumber}
                                </Text>
                            </View>

                            <View
                                style={[
                                    poetextview,
                                    this.state.pemsg !== ''
                                        ? {borderColor: 'red'}
                                        : {borderColor: this.state.currenttextinput === 1 ? SystemBlue : 'lightgray'}
                            ]}>
                                <TextInput
                                    autoCorrect={false}
                                    style={[Styles.inputText,{borderColor: this.state.currenttextinput === 1 ? SystemBlue : 'lightgray'}]}
                                    value={this.state.phoneoremail}
                                    onChangeText={text => this.setpelabel(text)}
                                    placeholder={this.state.placeholder}
                                    placeholderTextColor={"gray"}
                                    keyboardType={
                                        this.state.currentplace ? 'phone-pad' : 'email-address'
                                    }
                                    selectionColor={SystemBlue}
                                    ref={this.b}
                                    onFocus={() => this.setState({
                                        nextopacity : this.state.phoneoremail === '' ? 0.5 : 1,
                                        currenttextinput:1,
                                        placeholder: this.state.currentplace ? 'Phone' : 'Email'
                                    })}
                                    onBlur={() => this.setState({
                                        placeholder: `Phone number or email`
                                    })}
                                />

                                {
                                    this.state.poecorrectsign &&
                                    <View style={[Styles.correctsigncircle]}>
                                        <AntDesign name={'checkcircleo'} color={'green'} size={swidth * 0.05}/>
                                    </View>
                                }

                                <View style={[Styles.poemsgview]}>

                                    { this.setpelabel &&
                                        <Text style={{...namemsg}}>
                                            {this.state.pemsg}
                                        </Text>
                                    }

                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>

                <TwitterBottomPanel
                    textenable={this.state.currenttextinput === 1}
                    textpress={() => this.setState(
                        {
                            currentplace:!this.state.currentplace,
                            placeholder: this.state.currentplace ? 'Email' : 'Phone',
                            phoneoremail: '',
                        })}
                    text={this.state.currentplace ? 'Use email instead' : 'Use phone instead'}
                    buttonopacity={this.state.nextopacity}
                    buttontext={"Next"}
                    buttonpress={() => this.nextbuttonclick()}
                />

                {/*<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : null}  >*/}
                {/*    <View style={[Styles.bottombarview, Platform.OS === 'ios' && {padding: swidth * 0.03 }]}>*/}
                {/*        <View style={[Styles.bottomcontainer, {justifyContent: this.state.currenttextinput === 1 ? 'space-between' : 'flex-end',}]}>*/}

                {/*            { this.state.currenttextinput === 1 &&*/}
                {/*                <TouchableOpacity*/}
                {/*                    onPress={() => this.setState(*/}
                {/*                        {*/}
                {/*                            // dynamiclabel: ,*/}
                {/*                            currentplace:!this.state.currentplace,*/}
                {/*                            placeholder: this.state.currentplace ? 'Email' : 'Phone'*/}
                {/*                        })}*/}
                {/*                >*/}
                {/*                    <Text style={[Styles.dynamiclabeltext]}>*/}
                {/*                        {this.state.currentplace ? 'Use email instead' : 'Use phone instead'}*/}
                {/*                    </Text>*/}
                {/*                </TouchableOpacity>*/}
                {/*            }*/}

                {/*            <SystemButton*/}
                {/*                opacity={this.state.nextopacity}*/}
                {/*                text={"Next"}*/}
                {/*                styles={btnstyles}*/}
                {/*                onPress={() => this.nextbuttonclick()}*/}
                {/*            />*/}
                {/*        </View>*/}
                {/*    </View>*/}
                {/*</KeyboardAvoidingView>*/}



            </SafeAreaView>
        )
    }
}


let Styles = StyleSheet.create({

    //             Container              //

    safearea: {
        flex: 1,
        alignItems:'center'
    },
    mainview:{
        flex: 1,
    },
    createtextview:{
        marginTop: swidth * 0.13,
        alignItems:'center'
    },
    inputtextview:{
        marginTop: swidth * 0.3,
    },
    nametextview:{
        width: swidth * 0.85,
        borderBottomWidth: 2,
        borderColor: 'lightgray',
        fontSize: swidth * 0.06,
        height: swidth * 0.09
    },
    poetextview:{
        width: swidth * 0.85,
        marginTop: swidth * 0.09,
        borderBottomWidth: 2,
        borderColor: 'lightgray',
        fontSize: swidth * 0.06,
        height: swidth * 0.09
    },
    totalnumberview:{
        flexDirection: 'row',
        marginTop: swidth * 0.02,
        justifyContent: 'space-between'
    },
    poemsgview:{
        flexDirection: 'row',
        marginTop: swidth * 0.045,
        justifyContent: 'space-between'
    },
    correctsigncircle:{
        alignSelf: 'flex-end',
        position:'absolute',

    },

    //             Text              //


    hellotext:{
        fontSize: swidth * 0.06,
        fontFamily: 'Roboto-Bold',
        // flexWrap:'wrap-reverse'
    },
    totalnumbertext:{
        alignSelf:'flex-end',
        fontSize: swidth * 0.04,
        color:'gray',
    },
    inputText:{
        width: swidth * 0.77,
        fontSize: swidth * 0.04,
        padding: 0
    },
    namemsg:{
        fontSize: swidth * 0.03,
        color:'red'
    },
    dynamiclabeltext:{
        marginLeft: swidth * 0.03,
        color: SystemBlue,
        fontSize: swidth * 0.05
    },

});

export default SignUp;

