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
    KeyboardAvoidingView
} from 'react-native';
import {swidth,sheight,centertext} from '../Global/ScreenSetting';
import {AntDesign} from '../Global/VectorIcons';
import {SystemBlue} from '../Global/ColorPalate'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SystemButton} from './TwitterButton';

class SignUp extends Component{

    constructor(props) {
        super(props);

        this.state = {
            name:'',
            phoneoremail:'',
            currenttextinput:0,
            totalnumber:50,
            correctsign:false,
            placeholder:'Phone number or email address',
            dynamiclabel:'Use email instead',
            currentplace:true,
            nextopacity:0.5,
        };

        this.a = React.createRef();
        this.b = React.createRef();

    }

    componentDidMount(): void {
        // this.a.current.focus()
    }

    namechange = (text) => {


        this.setState({
            name:text,
            totalnumber:50 - text.length,
            correctsign: false,
        });


        setTimeout(() => this.setState({
            correctsign: (this.state.totalnumber >= 0 && (50 - text.length) < 50),
            nextopacity: 1
        }),500);


        // alert(this.state.totalnumber);
        // alert(text.length)
    };

    nextbuttonclick = () => {

        if(this.state.currenttextinput === 0)
        {

        }
        else
        {

        }

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

        const btnstyles = {
            view:{
                // marginTop: swidth * 0.15,
                alignItems: 'center',
                marginRight: swidth * 0.03,
                // position: 'relative'
                // justifySelf: this.state.currenttextinput == 1 && 'flex-end'
            },
            button:{
                backgroundColor: SystemBlue,
                borderRadius: 50,
                width: swidth * 0.14,
                height: swidth * 0.08,
                ...centertext
            },
            text:{
                fontSize: swidth * 0.04,
                fontFamily: 'Roboto-Bold',
                color:'white',
                // fontWeight:"500"
            }
        };

        return(
            <SafeAreaView style={[Styles.safearea]}>
                    <View style={[Styles.mainview]}>

                        <View style={[Styles.twittericonview]}>
                            <View style={{flex:1}}>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                                    <AntDesign name={'arrowleft'} color={SystemBlue} size={swidth * 0.07}/>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex:1.1}}>
                                <AntDesign name={'twitter'} color={SystemBlue} size={swidth * 0.07}/>
                            </View>
                        </View>

                        <ScrollView scrollEnabled={Platform.OS === 'android'} showsVerticalScrollIndicator={false}>
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
                                        style={[Styles.nametext]}
                                        value={this.state.name}
                                        onChangeText={text => this.namechange(text)}
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
                                            <AntDesign name={'checkcircleo'} color={'green'} size={swidth * 0.07}/>
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

                                <TextInput
                                    autoCorrect={false}
                                    style={[poetextview,{borderColor: this.state.currenttextinput === 1 ? SystemBlue : 'lightgray'}]}
                                    value={this.state.phoneoremail}
                                    onChangeText={text => this.setState({phoneoremail:text})}
                                    placeholder={this.state.placeholder}
                                    placeholderTextColor={"gray"}
                                    keyboardType={
                                        this.state.currentplace ? 'phone-pad' : 'email-address'
                                    }
                                    selectionColor={SystemBlue}
                                    ref={this.b}
                                    onFocus={() => this.setState({
                                        currenttextinput:1,
                                        placeholder: this.state.currentplace ? 'Phone' : 'Email'
                                    })}
                                    onBlur={() => this.setState({
                                        placeholder: `Phone number or email address`
                                    })}
                                />
                            </View>
                        </ScrollView>
                    </View>

                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : null}  >
                    <View style={[Styles.bottombarview, Platform.OS === 'ios' && {padding: swidth * 0.03 }]}>
                        <View style={[Styles.bottomcontainer, {justifyContent: this.state.currenttextinput === 1 ? 'space-between' : 'flex-end',}]}>

                            { this.state.currenttextinput === 1 && <TouchableOpacity>
                                <Text style={[Styles.dynamiclabeltext]}>
                                    {this.state.dynamiclabel}
                                </Text>
                            </TouchableOpacity>}


                            <SystemButton
                                opacity={this.state.nextopacity}
                                text={"Next"}
                                styles={btnstyles}
                                onPress={() => this.nextbuttonclick()}
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>



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
        // backgroundColor:'red',
        flex: 1,
    },
    twittericonview:{
        flexDirection: 'row',
        marginTop: swidth * 0.02,
        // backgroundColor: 'red',
        justifyContent:'center'
    },
    createtextview:{
        marginTop: swidth * 0.13,
    },
    inputtextview:{
        marginTop: swidth * 0.4,
    },
    nametextview:{
        width: swidth * 0.85,
        borderBottomWidth: 2,
        borderColor: 'lightgray',
        fontSize: swidth * 0.06,
        height: swidth * 0.095
    },
    poetextview:{
        width: swidth * 0.85,
        marginTop: swidth * 0.11,
        borderBottomWidth: 2,
        borderColor: 'lightgray',
        fontSize: swidth * 0.06
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
    bottombarview:{
        borderTopWidth:1,
        borderColor:'lightgray',
        height: swidth * 0.12,
        width:swidth,
        justifyContent: 'center',
        // backgroundColor:'red',
    },
    bottomcontainer:{
        flexDirection:'row',
        // alignItems: 'center',
        // backgroundColor: 'pink'
    },

    //             Text              //


    hellotext:{
        fontSize: swidth * 0.095,
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
        fontSize: swidth * 0.06,
        // backgroundColor: 'pink',
        padding: 0
    },
    namemsg:{
        fontSize: swidth * 0.02,
        color:'red'
    },
    dynamiclabeltext:{
        marginLeft: swidth * 0.03,
        color: SystemBlue,
        fontSize: swidth * 0.05
    },

});

export default SignUp;

