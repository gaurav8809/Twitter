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
    TouchableHighlight
} from 'react-native';
import {swidth, sheight, centertext, safearea, mainview} from '../Global/ScreenSetting';
import {AntDesign,MCI} from '../Global/VectorIcons';
import {SystemBlue} from '../Global/ColorPalate';
import TwitterTopPanel from '../Global/TwitterTopPanel';
import {BlackBigText, BlueText, GrayText} from '../Global/TwitterText';
import TwitterTextInput from '../Global/TwitterTextInput';
import TwitterBottomPanel from '../Global/TwitterBottomPanel';
import {connect} from 'react-redux';
import {SelectAll} from '../Actions/FireBaseDBAction';
import {DefaultIndicator} from '../Global/Indicators';
import CheckBox from 'react-native-check-box'
import GLOBAL from '../Global/Initialization';
import {UpdateWhere} from '../Actions/FireBaseDBAction';
import Icon from 'react-native-dynamic-vector-icons';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuProvider
} from 'react-native-popup-menu';

class LoginPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loader: false,
            // ref:
        };


    }

    setLoader = (flag) => {
        this.setState({loader:flag});
    };

    render() {

        return (
            <SafeAreaView style={{...safearea}}>
                <MenuProvider>
                    <View style={{flex:1,width: swidth * 0.95}}>

                        {/*<TwitterTopPanel*/}
                        {/*    onBackPress={() => this.props.navigation.goBack()}*/}
                        {/*    backenable={true}*/}
                        {/*/>*/}

                        <View style={[Styles.twittericonview ]}>
                            <View style={{flex:1,justifyContent:'flex-end'}}>

                            </View>
                            <View style={{flexDirection: 'row',justifyContent:'space-between',flex:1.15}}>
                                <AntDesign name={'twitter'} color={SystemBlue} size={swidth * 0.07}/>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{color:SystemBlue, fontSize: swidth * 0.045, fontWeight: 'bold'}}>
                                        {"Sign up  "}
                                    </Text>
                                    {/*<Icon type={'Entypo'} size={swidth * 0.06} color={SystemBlue} name={'dots-three-vertical'}/>*/}
                                    <Menu open={true}>
                                        <MenuTrigger>
                                            <Icon type={'Entypo'} size={swidth * 0.06} color={SystemBlue} name={'dots-three-vertical'}/>
                                        </MenuTrigger>
                                        <MenuOptions>
                                            <MenuOption onSelect={() => alert(`Save`)} text='About' />
                                            <MenuOption onSelect={() => alert(`Not called`)} text='Proxy' />
                                        </MenuOptions>
                                    </Menu>
                                </View>
                            </View>
                        </View>

                    </View>
                </MenuProvider>


                <TwitterBottomPanel
                    textenable={false}
                    buttonopacity={1}
                    buttontext={'Log in'}
                    buttonpress={() => this.setLanguages()}
                />

                <Modal visible={this.state.loader} transparent={true} onRequestClose={false}>
                    <DefaultIndicator />
                </Modal>
            </SafeAreaView>
        );
    }
}


let Styles = StyleSheet.create({

    popupview:{
        height: swidth * 0.48,
        width: swidth * 0.48,
        borderWidth: 3,
        borderRadius: 15,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent:'center',
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
    UpdateWhere
};

export default connect(null, mapDispatchToProps)(LoginPage);

