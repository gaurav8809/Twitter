import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    TouchableOpacity,
    Platform,
    Image,
    TextInput,
    PermissionsAndroid,
    FlatList, Modal,
} from 'react-native';
import {
    swidth,
    sheight,
    centertext,
    SHW,
    RHW
} from '../Global/ScreenSetting';
import {AntDesign} from '../Global/VectorIcons';
import {SystemBlue} from '../Global/ColorPalate'
import {SystemButton} from '../Global/TwitterButton'
import {safearea} from '../Global/ScreenSetting';
import {UIActivityIndicator} from 'react-native-indicators';
import {IOSIndicator} from '../Global/Indicators';
import {DismissKeyboardView,DynamicBottomBar} from '../Global/Helper';
import Icon from "react-native-dynamic-vector-icons/lib/components/Icon";
import {connect} from "react-redux";
import CameraRoll from "@react-native-community/cameraroll";
import ProgressCircle from 'react-native-progress-circle'
import ImagePicker from "react-native-image-picker";
import {PostTweet} from '../Actions/UserAction';
import firebase from "react-native-firebase";
import {FireBaseStoreData} from "../Actions/SystemAction";
import {UpdateWhere} from '../Actions/FireBaseDBAction';
import {GifCategoryView} from "./CommonPages/GifPage";

class CreateTweetPage extends Component{

    static navigationOptions = ({ navigation }) => ({
        headerShown: false,
        drawerLockMode: 'locked-closed',
    });

    constructor(props) {
        super(props);

        this.state = {
            // profileImage:'',
            loader: false,
            LogedInUser: props.LogedInUserData,
            photos:[],
            photosListEnable: true,
            selectedPhoto: null,
            selectdGif: null,
            selHeight:0,
            selWidth:0,
            tweet:'',
            gifPreview: false.valueOf(),
            imageloader: false
        };

    }

    componentDidMount(){
        this.getPhotos();
    }

    setLoader = (flag) => {
        this.setState({loader:flag});
    };

    getPhotos = async () => {
        let flag = false;
        if(Platform.OS === 'android')
        {
            await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
                .then(async res => {
                    if(res)
                    {
                        flag = true;
                    }
                    else {
                        try {
                            const granted = await PermissionsAndroid.request(
                                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
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
            CameraRoll.getPhotos({
                first: 20,
                assetType: 'All',
            })
                .then(r => this.setState({ photos: r.edges }))
                .catch(error => console.log(error))
        }


    };

    renderTakePhotoView = () => {
        return(
            <TouchableOpacity
                onPress={() => this.handleChoosePhoto()}
                style={[Styles.gallaryimageview, {marginRight: swidth * 0.02}]}
            >
                <Icon
                    name={"camera-enhance"}
                    type={"MaterialCommunityIconsGlyphs"}
                    color={SystemBlue}
                    size={swidth * 0.08}
                />
            </TouchableOpacity>
        );
    };

    renderGalleryPhotos = (item,index) => {
        return(
            <TouchableOpacity key={index} onPress={() => this.setState({ selectedPhoto: item.node.image, selectdGif: null })}>
                <Image
                    source={{uri:item.node.image.uri}}
                    style={Styles.gallaryimageview}
                />
            </TouchableOpacity>
        );
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

            ImagePicker.launchCamera(options, (response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                    alert(response.customButton);
                } else {
                    if (response.uri) {
                        this.setState({ selectedPhoto: response, selectdGif: null })
                    }
                }
            });
        }
    };

    openPhotoGallery = async () => {
        let flag = false;
        if(Platform.OS === 'android')
        {
            await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
                .then(async res => {
                    if(res)
                    {
                        flag = true;
                    }
                    else {
                        try {
                            const granted = await PermissionsAndroid.request(
                                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
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

            ImagePicker.launchImageLibrary(options, (response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                    alert(response.customButton);
                } else {
                    if (response.uri) {
                        this.setState({ selectedPhoto: response })
                    }
                }
            });
        }
    };

    makeTweet = () => {

        let STD = this.state;
        let dataObj = {
            userID: STD.LogedInUser.id,
            tweetValue: STD.tweet,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            comments: [],
            likes: [],
            imagePath: STD.selectdGif !== null && STD.selectdGif.gif.url
        };

        this.setLoader(true);
        this.props.PostTweet('tweets', dataObj)
            .then(tweetResponse => {

                if(STD.selectedPhoto !== null)
                {
                    console.log("There is photo");
                    this.props.FireBaseStoreData('TweetResources',STD.selectedPhoto)
                        .then(firestoreResponse => {

                            this.props.UpdateWhere(`tweets`,tweetResponse.data.id,{'imagePath':firestoreResponse.data})
                                .then(updateResponse => {

                                    this.setLoader(false);
                                    this.props.navigation.goBack();

                                })
                                .catch(error => {
                                    this.setLoader(false);
                                    console.log("Update Error = ",error)
                                })
                        })
                        .catch(error => {
                            this.setLoader(false);
                            console.log("Firestore Error = ",error)
                        });
                }
                this.setLoader(false);
                this.props.navigation.goBack();

            })
            .catch(error => {
                this.setLoader(false);
                console.log("Tweet Error = ",error)
            });

    };

    toggleGifPage = (gifPreview) => {
        this.setState({gifPreview})
    };

    render(){

        const {navigation} = this.props;

        const btnstyles = {
            view:{
                alignItems: 'center',
                marginRight: swidth * 0.03,
            },
            button:{
                backgroundColor: SystemBlue,
                borderRadius: 100,
                width: swidth * 0.19,
                height: swidth * 0.075,
                ...centertext
            },
            text:{
                fontSize: swidth * 0.04,
                color:'white',
                fontWeight:"bold"
            }
        };

        let {
            LogedInUser,
            selectedPhoto,
            tweet,
            photosListEnable,
            gifPreview,
            selectdGif,
            selHeight
        } = this.state;

        let {
            toppanelview,
            inputview,
            profileimage,
            imagecommentpanel,
            tweetinput,
            imageliststyle,
            selectedimageview,
            closebutton,
            bottomOptionView,
            bottomActionView,
            gifView,
            imageLoaderStyle
        } = Styles;

        (selectedPhoto !== null || selectdGif !== null) &&
        Image.getSize(selectdGif !== null ? selectdGif.gif.url : selectedPhoto.uri, (width, height) => {
            this.setState({
                selHeight: height,
                selWidth: width,
            })
        });

        return(
            <SafeAreaView style={{...safearea}}>

                <DismissKeyboardView>
                    <View style={{alignItems: 'center',flex:1}}>

                        <View style={toppanelview}>
                            <Icon
                                onPress={() => navigation.goBack()}
                                style={{marginLeft: swidth * 0.03}}
                                type={'AntDesign'}
                                name={'close'}
                                size={swidth * 0.06}
                                color={SystemBlue} />

                            <SystemButton
                                aOpacity={0.8}
                                opacity={(selectedPhoto || tweet || selectdGif) ? 1 : 0.5 }
                                text={"Tweet"}
                                styles={btnstyles}
                                onPress={() => this.makeTweet()}
                            />
                        </View>

                        <View style={inputview}>
                            <View style={imagecommentpanel}>
                                <Image
                                    source={
                                        LogedInUser && LogedInUser.profileImage && LogedInUser.profileImage
                                            ? {uri: LogedInUser.profileImage}
                                            : require('../Assets/Images/usergray.png')
                                    }
                                    style={Styles.profileimage}
                                />

                                <ScrollView
                                    alwaysBounceVertical={true}
                                    contentContainerStyle={{marginBottom: swidth * 3}}
                                >
                                    <TextInput
                                        placeholder={
                                            tweet === ''
                                                ? selectedPhoto == null ? "What's happening?" : "Add a comment..."
                                                : "What's happening?"
                                        }
                                        value={tweet}
                                        placeholderTextColor={'slategray'}
                                        selectionColor={SystemBlue}
                                        style={tweetinput}
                                        multiline={true}
                                        autoCorrect={false}
                                        maxLength={280}
                                        onChangeText={text => this.setState({tweet: text})}
                                    />

                                    {
                                        (selectedPhoto !== null || selectdGif !== null) &&
                                        <View style={{alignSelf:'flex-end'}}>
                                            <Image
                                                style={[
                                                    selectedimageview,
                                                    // selectdGif !== null && {height: (sheight * (selHeight && selHeight)) / 1000}
                                                ]}
                                                resizeMode="cover"
                                                source={{uri: selectdGif !== null ? selectdGif.gif.url : selectedPhoto.uri}}
                                                onLoadStart={() => this.setState({imageloader:true})}
                                                onLoadEnd={() => this.setState({imageloader:false})}
                                            />
                                            {
                                                this.state.imageloader &&
                                                <UIActivityIndicator
                                                    color={'gray'}
                                                    size={swidth * 0.06}
                                                    style={[imageLoaderStyle,]}
                                                />
                                            }
                                            <View style={closebutton}
                                            >
                                                <Icon
                                                    onPress={() => this.setState({selectedPhoto:null, selectdGif: null})}
                                                    name={"ios-close"}
                                                    type={"Ionicons"}
                                                    size={swidth * 0.08}
                                                    color={'white'}
                                                />
                                            </View>
                                        </View>
                                    }
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </DismissKeyboardView>

                {
                    photosListEnable && (selectedPhoto === null && selectdGif === null) &&
                    <FlatList
                        horizontal={true}
                        style={imageliststyle}
                        data={this.state.photos !== [] && this.state.photos}
                        keyExtractor={(item, index) => index.toString()}
                        ListHeaderComponent={() => this.renderTakePhotoView()}
                        ItemSeparatorComponent={() => <View style={{width: swidth * 0.02}}/>}
                        renderItem={({item,index}) => this.renderGalleryPhotos(item,index)}
                        showsHorizontalScrollIndicator={false}
                    />
                }

                <DynamicBottomBar>
                    <View style={[Styles.bottombarview,]}>
                        <View style={bottomOptionView}>
                            <Icon
                                name={"photo"}
                                type={"Foundation"}
                                size={swidth * 0.065}
                                color={SystemBlue}
                                onPress={() => this.openPhotoGallery()}
                            />
                            <View style={gifView}>
                                <Icon
                                    name={"gif"}
                                    type={"MaterialCommunityIcons"}
                                    size={swidth * 0.045}
                                    color={SystemBlue}
                                    onPress={() => this.toggleGifPage(!gifPreview)}
                                />
                            </View>
                            <Icon name={"marker"} type={"Foundation"} size={swidth * 0.065} color={SystemBlue} />
                        </View>
                        <View style={bottomActionView}>
                            <ProgressCircle
                                percent={(tweet.length * 100 / 280)}
                                radius={13}
                                borderWidth={2}
                                color={SystemBlue}
                                shadowColor="lightgray"
                                bgColor="#fff"
                            />
                        </View>
                    </View>
                </DynamicBottomBar>

                <GifCategoryView
                    gifPreview={gifPreview}
                    backPress={() => this.toggleGifPage(!gifPreview)}
                    setGifState={(Obj) => this.setState({selectedPhoto:null,selectdGif: Obj})}
                />

                <Modal visible={this.state.loader} transparent={true} onRequestClose={false}>
                    <IOSIndicator />
                </Modal>

            </SafeAreaView>
        )
    }
}


let Styles = StyleSheet.create({

    toppanelview:{
        justifyContent: 'space-between' ,
        flexDirection:'row',
        width: swidth * 1,
        marginTop: swidth * 0.04,
    },
    inputview:{
        flex:1,
        marginTop: swidth * 0.03,
        marginBottom: swidth * 0.03
    },
    profileimage:{
        height: swidth * 0.09,
        width : swidth * 0.09,
        borderRadius: 100,
    },
    tweetinput:{
        marginLeft: swidth * 0.01,
        fontSize: swidth * 0.05,
        width: swidth * 0.85,
        padding: 4
    },
    imagecommentpanel:{
        flexDirection: 'row',
    },
    imageliststyle:{
        position:'absolute',
        bottom: sheight * ( Platform.OS === 'ios' ? 0.1 : 0.09),
        marginLeft: swidth * 0.02,
        alignSelf: 'flex-start',
        flex: 1
    },
    selectedimageview:{
        height: swidth * 0.83,
        width: swidth * 0.85,
        borderRadius: 10,
        overlayColor: 'white',
    },
    closebutton:{
        height: swidth * 0.08,
        width: swidth * 0.08,
        backgroundColor: 'black',
        borderRadius: 100,
        alignItems: 'center',
        position: 'absolute',
        right: swidth * 0.03,
        top: swidth * 0.03
    },
    gallaryimageview:{
        ...RHW(0.19),
        borderRadius: 10,
        borderColor: 'lightgray',
        borderWidth: 1,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    bottombarview:{
        flexDirection:'row',
        borderTopWidth:0.8,
        borderColor:'lightgray',
        height: swidth * 0.12,
        width:swidth,
        backgroundColor:'white',
    },
    bottomOptionView:{
        width: swidth * 0.35,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection:'row',
    },
    bottomActionView:{
        width: swidth * 0.62,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection:'row',
    },
    gifView:{
        ...SHW(Platform.OS === 'ios' ? 0.05 : 0.05,0.055 ),
        backgroundColor: 'white',
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: SystemBlue
    },
    imageLoaderStyle:{
        borderRadius: 10,
        borderWidth: 1,
        position: 'absolute',
        height: swidth * 0.83,
        width : swidth * 0.85,
        borderColor: 'lightgray'
    }

});

const mapStateToProps = state => {
    const {
        LogedInUserData
    } = state.UserReducer;

    return {
        LogedInUserData
    };
};

const mapDispatchToProps = {
    PostTweet,
    FireBaseStoreData,
    UpdateWhere
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTweetPage);
