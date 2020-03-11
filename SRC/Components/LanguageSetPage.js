import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Platform,
    Modal,
    FlatList,
    Text,
    ScrollView
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
import firebase from 'react-native-firebase';
import {DefaultIndicator} from '../Global/Indicators';
import CheckBox from 'react-native-check-box'
import GLOBAL from '../Global/Initialization';
import {UpdateWhere,SelectUserById} from '../Actions/FireBaseDBAction';
import { StackActions, NavigationActions } from 'react-navigation';

const ITEM = [
    {title:'English'},
    {title:'Gujarati'},
    {title:'Hindi'},
    {title:'Bengali'},
    {title:'Marathi'},
];

class LanguageSetPage extends Component {

    static navigationOptions = ({navigation}) => {
        return {gestureEnabled: false}
    };

    constructor(props) {
        super(props);

        this.state = {
            signupdata: this.props.navigation.state.params,
            loader: false,
            isChecked: false,
            lans: [],
            languages:[],
            // ref:
        };
        // signupdata = this.props.navigation.state.params;



    }

    componentDidMount(){

        if(GLOBAL.LangListFetch)
        {
            this.setLoader(true);
            this.props.SelectAll('languages')
                .then(response => {
                    // console.log("Response",response.data);
                    this.setLoader(false);
                    // alert("Success");
                    this.setState({
                        languages: response.data
                    })
                })
                .catch(error => {
                    // console.log("Error",error);
                    this.setLoader(false);
                    alert("Fail");
                })
        }
    }

    setLoader = (flag) => {
        this.setState({loader:flag});
    };

    languages = (item,index) => {
        return(
            <View style={{ width: swidth * 0.85, alignSelf: 'center'}}>
                <View style={{paddingTop: 15,paddingBottom: 15}}>
                    <CheckBox
                        checkBoxColor={SystemBlue}
                        onClick={()=>{
                            if(this.state.lans.includes(item.title))
                            {
                                this.setState({
                                    lans : this.state.lans.filter(value => value !== item.title)
                                });
                            }
                            else
                            {
                                let lans = [...this.state.lans];
                                lans.push(item.title);
                                this.setState({
                                    isChecked:!this.state.isChecked,
                                    lans
                                })
                            }
                        }}
                        isChecked={this.state.lans.includes(item.title)}
                        leftText={item.title}
                        leftTextStyle={{color:'dimgray', fontSize: swidth * 0.05}}
                        checkboxStyle={{width: swidth * 0.07, height: swidth * 0.07}}
                    />
                </View>
            </View>
        )
    };

    exlanguages = (item,index) => {
        return(
            <View style={{ width: swidth * 0.85, alignSelf:'center'}}>
                <View style={{paddingTop: 15,paddingBottom: 15}}>
                    <CheckBox
                        checkBoxColor={SystemBlue}
                        onClick={()=>{
                            if(this.state.lans.includes(item.id))
                            {
                                this.setState({
                                    lans : this.state.lans.filter(value => value !== item.id)
                                });
                            }
                            else
                            {
                                let lans = [...this.state.lans];
                                lans.push(item.id);
                                this.setState({
                                    isChecked:!this.state.isChecked,
                                    lans
                                })
                            }
                        }}
                        isChecked={this.state.lans.includes(item.id)}
                        leftText={`${item.id} ${item.native ? '-' : ''} ${item.native}`}
                        leftTextStyle={{color:'dimgray', fontSize: swidth * 0.05}}
                        checkboxStyle={{width: swidth * 0.07, height: swidth * 0.07}}
                    />
                </View>
            </View>
        )
    };

    setLanguages = () => {

        if(GLOBAL.LangsSet)
        {
            let FinalLangs = this.state.lans.sort();
            this.setLoader(true);
            this.props.UpdateWhere(`users`,this.state.signupdata.id,{'languages':FinalLangs})
                .then(response => {

                    this.setLoader(false);
                    this.props.SelectUserById('users',this.state.signupdata.id)
                        .then(response => {

                            const resetAction = StackActions.reset({
                                index: 0,
                                actions: [
                                    NavigationActions.navigate({routeName:'coreDrawerNavigator',params:this.state.signupdata})
                                ],
                            });

                            this.props.navigation.dispatch(resetAction);
                        })
                        .catch(error => {
                            this.setLoader(false);
                            // alert("Fail");
                            console.log(error);
                        })
                })
                .catch(error => {
                    this.setLoader(false);
                    // alert("Fail");
                    console.log(error);
                })
        }
        else{
            // this.props.navigation.navigate('LanguageSetPage',this.state.signupdata);
        }

    };

    render() {

        return (
            <SafeAreaView style={{...safearea}}>
                <View style={{...mainview}}>

                    <TwitterTopPanel
                        onBackPress={() => this.props.navigation.goBack()}
                        backenable={true}
                    />

                    <FlatList
                        ListHeaderComponent={
                            <View>
                                <BlackBigText
                                    style={{alignSelf:'center'}}
                                    text={'Which languages do you speak?'}
                                />

                                <GrayText
                                    viewstyle={{alignSelf:'center', }}
                                    text={'You\'ll be able to see Tweets,people and trends in any languages you choose.'}
                                />
                            </View>
                        }
                        style={{marginTop: swidth * 0.03}}
                        // keyExtractor={item => item.title}
                        keyExtractor={item => GLOBAL.LangListFetch ? item.id : item.title}
                        data={ GLOBAL.LangListFetch ? (this.state.languages.length > 0 && this.state.languages) : ITEM}
                        // data={ITEM}
                        renderItem={({item,index}) => GLOBAL.LangListFetch ? this.exlanguages(item,index) : this.languages(item,index)}
                        // renderItem={({item,index}) => this.languages(item,index)}
                        showsVerticalScrollIndicator={false}
                    />
                </View>

                <TwitterBottomPanel
                    buttonopacity={1}
                    buttontext={'Next'}
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


});

const mapStateToProps = state => {
    return {
        SystemData: state.SystemState.SystemData,
    };
};

const mapDispatchToProps = {

    SelectAll,
    UpdateWhere,
    SelectUserById
};

// export default CodeVerification;
export default connect(null, mapDispatchToProps)(LanguageSetPage);

