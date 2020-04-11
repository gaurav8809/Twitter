import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Platform
} from 'react-native';
import {swidth,sheight,centertext} from '../Global/ScreenSetting';
import {AntDesign} from '../Global/VectorIcons';
import {SystemBlue} from '../Global/ColorPalate'
import {SystemButton} from '../Global/TwitterButton'
import {safearea,mainview} from '../Global/ScreenSetting';
import {MaterialIndicator} from 'react-native-indicators';
import {DefaultIndicator} from '../Global/Indicators';
import HELPER from '../Global/Helper';
import {NavigationActions, StackActions} from 'react-navigation';

class HelloScreen extends Component{

    constructor(props) {
        super(props);

    }

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
                // fontWeight:"500"
            }
        };

        return(
            <SafeAreaView style={{...safearea}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{...mainview}}>

                        <View style={[Styles.twittericonview]}>
                            <AntDesign name={'twitter'} color={SystemBlue} size={swidth * 0.12}/>
                        </View>

                        <View style={[Styles.hellotextview]}>
                            <Text style={[Styles.hellotext]}>
                                {"See what’s happening in the world right now."}
                            </Text>
                        </View>

                        {/*<View style={[Styles.createbtnview]}>*/}
                        {/*    <TouchableOpacity style={[Styles.createbtn]} onPress={() => navigation.navigate('SignUp')}>*/}
                        {/*        <Text style={[Styles.craetebtntext]}>*/}
                        {/*            {"Create account"}*/}
                        {/*        </Text>*/}
                        {/*    </TouchableOpacity>*/}
                        {/*</View>*/}

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
                                <Text style={[Styles.logintext]}>
                                    {"Log in"}
                                </Text>
                            </TouchableOpacity>
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
        marginTop: swidth * (Platform.OS == 'ios' ? 0.5 : 0.3),
        flexDirection:'row'
    },

    //             Text              //


    hellotext:{
        fontSize: swidth * 0.07,
        fontFamily: 'Roboto-Bold',
        // flexWrap:'wrap-reverse'
    },
    craetebtntext:{
        fontSize: swidth * 0.065,
        fontFamily: 'Roboto-Bold',
        color:'white',
        // fontWeight:"500"
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

