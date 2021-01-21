import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Platform,
    Modal,
    Text,
    TouchableOpacity,
    Image,
    PermissionsAndroid
} from 'react-native';
import GLOBAL from '../Global/Initialization';
import {swidth, sheight, centertext, safearea, mainview} from '../Global/ScreenSetting';
import {AntDesign,MCI} from '../Global/VectorIcons';
import {SystemBlue} from '../Global/ColorPalate';
import TwitterTopPanel from '../Global/TwitterTopPanel';
import {BlackBigText, BlueText, GrayText} from '../Global/TwitterText';
import TwitterTextInput from '../Global/TwitterTextInput';
import TwitterBottomPanel from '../Global/TwitterBottomPanel';
import {connect} from 'react-redux';
import {FireBaseStoreData} from '../Actions/SystemAction';
import {UpdateWhere} from '../Actions/FireBaseDBAction';
import {DefaultIndicator} from '../Global/Indicators';
import ImagePicker from 'react-native-image-picker'
import {NavigationActions, StackActions} from 'react-navigation';



class ProfilePictureSetPage extends Component {

    static navigationOptions = ({navigation}) => {
        return {gestureEnabled: false}
    };

    constructor(props) {
        super(props);

        this.state = {
            signupdata: this.props.navigation.state.params,
            loader: false,
            photo:null,
        };

        if(!GLOBAL.ProfileSetMode)
        {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName:'BioSetPage',params:this.state.signupdata})
                ],
            });
            this.props.navigation.dispatch(resetAction);
        }

        // signupdata = this.props.navigation.state.params;

    }

    setLoader = (flag) => {
        this.setState({loader:flag});
    };

    handleChoosePhoto = async () => {

        let flag = false;
        if(Platform.OS === 'android')
        {
            await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)
                .then(async res => {
                    if(res)
                    {
                        flag = true;
                    }
                    else {
                        try {
                            const granted = await PermissionsAndroid.request(
                                PermissionsAndroid.PERMISSIONS.CAMERA,
                            );
                            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                                console.log('You can use the camera');
                                flag = true;
                            } else if(granted === 'never_ask_again') {
                                alert('You have already selected \"Never ask me again\" before');
                            } else {
                                console.log('Camera permission denied');
                            }
                        } catch (err) {
                            console.warn(err);
                        }
                    }
                });
        }
        else {
            flag = true;
        }

        if(flag)
        {
            const options = {
                noData: true,
                // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
                storageOptions: {
                    skipBackup: true,
                    // path: 'images',
                },
            };

            ImagePicker.showImagePicker(options, (response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    alert(response.error);
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    if (response.uri) {
                        this.setState({ photo: response })
                    }
                }
            });
        }
    };

    storeImage = () => {

        this.setLoader(true);
        if(GLOBAL.ProfileSetMode)
        {
            this.props.FireBaseStoreData("UserProfiles",this.state.photo)
                .then(response => {
                    this.props.UpdateWhere(`users`,this.state.signupdata.id,{'profileImage':response.data})
                        .then(response => {
                            this.setLoader(false);
                            const resetAction = StackActions.reset({
                                index: 0,
                                actions: [
                                    NavigationActions.navigate({routeName:'BioSetPage',params:this.state.signupdata})
                                ],
                            });
                            this.props.navigation.dispatch(resetAction);
                        })
                        .catch(error => {
                            this.setLoader(false);
                            alert("Fail");
                        })
                })
                .catch(error => {
                    this.setLoader(false);
                })
        }
        else{
            this.setLoader(false);
            this.props.navigation.navigate('BioSetPage',this.state.signupdata);
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

                    <BlackBigText
                        text={'Pick a profile picture'}
                    />

                    <GrayText
                        text={'Have a favorite selfie? Upload it now.'}
                    />

                    <View style={{marginTop: swidth * 0.16}}>

                        {
                            this.state.photo === null
                                ?
                                <TouchableOpacity
                                    style={[Styles.popupview,{borderColor: this.state.photo === null ? SystemBlue : 'white',}]}
                                    onPress={() => this.handleChoosePhoto()}
                                >
                                    <MCI name={'camera-enhance'} color={SystemBlue} size={sheight * 0.09}/>
                                    <Text style={{fontSize: swidth * 0.06, color: SystemBlue, fontWeight: "700" }}> {"Upload"} </Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => this.handleChoosePhoto()}>
                                    <Image
                                        source={{ uri: this.state.photo.uri }}
                                        style={{ width: swidth * 0.5, height: swidth * 0.5, borderRadius: 100}}
                                    />
                                </TouchableOpacity>
                        }
                    </View>

                </View>

                <TwitterBottomPanel
                    text={'Skip for now'}
                    textenable={true}
                    textpress={() => this.props.navigation.navigate('BioSetPage',this.state.signupdata)}
                    buttonopacity={this.state.photo !== null ? 1 : 0.5}
                    buttontext={'Next'}
                    buttonpress={() => this.storeImage()}
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
    FireBaseStoreData,
    UpdateWhere
};

export default connect(null, mapDispatchToProps)(ProfilePictureSetPage);

