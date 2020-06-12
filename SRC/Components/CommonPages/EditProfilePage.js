import React,{Component} from 'react';
import {IS_IOS, parseDate} from "../../Global/Helper";
import {
    TouchableOpacity,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    YellowBox,
} from "react-native";
import {RHW, safearea, SHW, SW, swidth, centertext} from "../../Global/ScreenSetting";
import {SideLoader} from "../../Global/Indicators";
import {GetLocation} from "../../Actions/GeneralAction";
import {UpdateProfileInfo} from "../../Actions/UserAction";
import {connect} from "react-redux";
import {SlateGray, SystemBlue} from "../../Global/ColorPalate";
import Icon from "react-native-dynamic-vector-icons/lib/components/Icon";
import {TopHeader} from "./TopHeader";
import {ScrollView} from "react-navigation";
import {TextInputWithLabel} from "../../Global/CommonTextInputs";
import TakePhotoPopUp from "../../Global/TakePhotoPopUp";
import DateTimePicker from '@react-native-community/datetimepicker';
import {FireBaseStoreData} from "../../Actions/SystemAction";

const Months = ['January','February','March','April','May','June','July','August','September','October','November','December'];


class EditProfilePage extends Component{

    static navigationOptions = ({ navigation }) => ({
        headerShown: false,
    });

    constructor(props) {
        super(props);

        let Ldata = props.LogedInUserData;

        this.state = {
            loader: false,
            LogedInUser: Ldata,
            profilename: Ldata.profilename ? Ldata.profilename : '' ,
            bioDetails: Ldata.bioDetails ? Ldata.bioDetails : '' ,
            location: Ldata.location ? Ldata.location : '' ,
            birthDate: Ldata.birthDate ? parseDate(Ldata.birthDate.seconds).TIMESTAMP : '' ,
            selTimeStamp: Ldata.birthDate ? Ldata.birthDate : '' ,
            takeProfilePhoto: false,
            takeCoverPhoto: false,
            profilePhoto: null,
            coverPhoto: null,
            coverDet:null,
            locationList: null,
            mainScroll: true,
            datePopUp:false,
            dateState: new Date(),
            tmpBirthDate: '',
            tmpTimeStamp: '',
        };
    }

    componentDidMount(){
        YellowBox.ignoreWarnings([
            'VirtualizedLists should never be nested', // TODO: Remove when fixed
        ])
    }

    setLoader = (flag) => {
        this.setState({loader:flag});
    };

    getImageSize = (photo) => {
        Image.getSize(photo.uri, (width, height) => {
            this.setState({
                coverDet:{height:height,width:width},
                coverPhoto: photo,
                takeCoverPhoto: false
            })
        });
    };

    getLocationList = (text) => {

        this.setState({location:text},
            () => {
                text !== '' ?
                    this.props.GetLocation('autosuggest',text)
                        .then(response => {

                            this.setState({locationList:response})
                        })
                        .catch(error => {
                            this.setState({tweetLoader:false});
                            console.log(error)
                        })
                :  this.setState({locationList:null})
            }
        );
    };

    renderLocation = (item,index) => {

        return (
            <TouchableOpacity style={{padding: 10}} key={item.title} onPress={() => this.setState({location: item.title.length > 25 ? item.title.split(",")[0] : item.title, locationList: null})}>
                <Text>
                    {item.title}
                </Text>
            </TouchableOpacity>
        );
    };

    dateCheck = (date) => {
        return !isNaN(parseDate(IS_IOS() ? date.timeStamp : date).DATE)
    };

    updateAction = () => {

        let STD = this.state;

        let upObj = {
            profilename: STD.profilename,
            bioDetails: STD.bioDetails,
            location: STD.location,
            birthDate: STD.birthDate,
        };

        this.setLoader(true);
        this.props.UpdateProfileInfo('users',STD.LogedInUser.id,upObj)
            .then(response => {

                if(STD.profilePhoto !== null || STD.coverPhoto !== null)
                {
                    if(STD.profilePhoto !== null)
                    {
                        // STD.profilePhoto.uri = 'file://' + STD.profilePhoto.path;
                        !IS_IOS() ? STD.profilePhoto.uri = 'file://' + STD.profilePhoto.path : null;
                        this.props.FireBaseStoreData('UserProfiles',STD.profilePhoto)
                            .then(firestoreResponse => {

                                this.props.UpdateProfileInfo(`users`,STD.LogedInUser.id,{'profileImage':firestoreResponse.data})
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

                    if(STD.coverPhoto !== null)
                    {
                        !IS_IOS() ? STD.coverPhoto.uri = 'file://' + STD.coverPhoto.path : null;
                        this.props.FireBaseStoreData('CoverPhotos',STD.coverPhoto)
                            .then(firestoreResponse => {

                                this.props.UpdateProfileInfo(`users`,STD.LogedInUser.id,{'coverImage':firestoreResponse.data})
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
                }
                else{
                    this.setLoader(false);
                    this.props.navigation.goBack();
                }

            })
            .catch(error => {
                this.setLoader(false);
                console.log(error)
            })

    };

    render(){

        let STY = Styles;

        let STD = this.state;

        return(
            <SafeAreaView style={[safearea]}>

                <View style={{...Styles.mainview}}>
                    <TopHeader
                        text={"Edit profile"}
                        nav={this.props.navigation}
                        rightView={
                            this.state.loader ? <SideLoader />
                            : <Text style={{color:STD.profilename.length > 0 ? SystemBlue : SlateGray}}>{ "SAVE"}</Text>
                        }
                        rightViewPress={() => STD.profilename.length > 0 && this.updateAction()}
                        rightPressEnable={!STD.profilename.length > 0}
                    />

                    <ScrollView
                        scrollEnabled={this.state.mainScroll}
                        contentContainerStyle={{alignItems: 'center', flexGrow: 1}}
                        scrollEventThrottle={1}
                    >
                        <TouchableOpacity onPress={() => this.setState({takeCoverPhoto: true})}>
                            {
                                STD.coverPhoto !== null ?
                                    <Image
                                        source={{uri: STD.coverPhoto.uri}}
                                        style={{height: SW(0.3), width: swidth}}
                                    />
                                    :
                                    STD.LogedInUser.coverImage ?
                                        <Image
                                            source={{uri: STD.LogedInUser.coverImage}}
                                            style={{height: SW(0.3), width: swidth}}
                                        />
                                        :
                                        <View style={[{
                                            backgroundColor: 'rgba(0,0,0,0)',
                                            // position:'absolute',
                                            ...centertext,
                                            height: SW(0.3), width: swidth
                                        }]}/>
                            }
                            <View style={[{
                                backgroundColor: 'rgba(0,0,0,0.3)',
                                position:'absolute',
                                ...centertext,
                                height: SW(0.3), width: swidth
                            }]}>
                                <Icon
                                    name={'camera-enhance'}
                                    type={'MaterialCommunityIcons'}
                                    color={'white'}
                                    size={SW(0.075)}/>
                            </View>
                        </TouchableOpacity>
                        <View style={[STY.InfoView,]}>
                            <View style={STY.prfileImageView}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => this.setState({takeProfilePhoto: true})}
                                >
                                    {
                                        STD.profilePhoto !== null ?
                                            <Image
                                                source={{uri: STD.profilePhoto.uri}}
                                                style={[STY.profileImageStyle]}
                                            />
                                            :
                                            <Image
                                                source={STD.LogedInUser.profileImage
                                                    ? {uri: STD.LogedInUser.profileImage}
                                                    : require('../../Assets/Images/usergray.png')}

                                                style={[STY.profileImageStyle]}
                                            />
                                    }
                                    <View style={{
                                        ...RHW(0.22),
                                        borderColor: 'white',
                                        borderWidth: SW(0.009),
                                        backgroundColor: 'rgba(0,0,0,0.5)',
                                        position:'absolute',
                                        ...centertext,
                                    }}>
                                        <Icon
                                            name={'camera-enhance'}
                                            type={'MaterialCommunityIcons'}
                                            color={'white'}
                                            size={SW(0.075)}/>
                                        {/*<MCI name={'camera-enhance'} color={SystemBlue} size={sheight * 0.09}/>*/}
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <TextInputWithLabel
                                label={'Name'}
                                placeholder={'Name can not be blank'}
                                text={STD.profilename}
                                onChangeText={text => this.setState({profilename:text})}
                                returnKeyType={'next'}
                                mainViewStyle={{marginTop: SW(0.04)}}
                                maxLength={50}
                            />

                            <TextInputWithLabel
                                label={'Bio'}
                                text={STD.bioDetails}
                                onChangeText={text => this.setState({bioDetails:text})}
                                returnKeyType={'next'}
                                mainViewStyle={{marginTop: SW(IS_IOS() ? 0.04 : 0.03)}}
                                multiline={true}
                                maxLength={160}
                            />

                            <View>
                                <TextInputWithLabel
                                    label={'Location'}
                                    text={STD.location}
                                    onChangeText={text =>
                                    {

                                        this.getLocationList(text)
                                    }}
                                    returnKeyType={'next'}
                                    mainViewStyle={{marginTop: SW(IS_IOS() ? 0.04 : 0.03)}}
                                />

                                {
                                    STD.locationList &&
                                        <View style={{...SHW(0.4,0.93), borderColor: 'lightgray', borderWidth: 1,}}>
                                            {/*<ScrollView>*/}
                                            {/*    {*/}
                                            {/*        STD.locationList.map((item,index) => this.renderLocation(item,index))*/}
                                            {/*    }*/}
                                            {/*</ScrollView>*/}
                                            <FlatList
                                                onTouchStart={() => {
                                                    this.setState( {mainScroll:false} );
                                                }}
                                                onMomentumScrollEnd={() => {
                                                    this.setState( {mainScroll:true} );
                                                }}
                                                data={STD.locationList}
                                                renderItem={({item,index}) => this.renderLocation(item,index)}
                                                keyExtractor={(item,index) => (item.title)}
                                            />
                                        </View>
                                }

                            </View>

                            <View style={{marginTop: SW(IS_IOS() ? 0.04 : 0.03), width: SW(0.93),}}>
                                <Text style={{color: SlateGray,fontSize: SW(0.04)}}>
                                    {"Birth Date"}
                                </Text>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={STY.inputBox}
                                    onPress={() => this.setState({datePopUp:true})}>
                                    <Text style={{ fontSize: SW(0.04), color: "black",}}>
                                        {
                                            STD.birthDate !== '' &&
                                            // STD.birthDate
                                            `${Months[STD.birthDate.getMonth()]} ${STD.birthDate.getDate()}, ${STD.birthDate.getFullYear()}`
                                            // `${Months[STD.birthDate.toDate().getMonth()]} ${STD.birthDate.toDate().getDate()} , ${STD.birthDate.toDate().getFullYear()}`
                                            // `${STD.birthDate.M_IN_W} ${STD.birthDate.DATE} , ${STD.birthDate.YEAR}`
                                        }
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {

                                    IS_IOS() ?
                                        STD.datePopUp &&
                                            <Modal
                                                visible={STD.datePopUp}
                                                onDismiss={() => this.setState({ datePopUp: false })}
                                            >
                                                <View style={{flex:1, ...centertext, }}>
                                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignSelf:'flex-start', width: SW(1)}}>
                                                        <TouchableOpacity onPress={() => this.setState({ birthDate: STD.birthDate,  datePopUp: false})}><Text>{"Cancel"}</Text></TouchableOpacity>
                                                        <TouchableOpacity onPress={() => this.setState({ birthDate: STD.tmpBirthDate, datePopUp: false})}><Text>{"Set"}</Text></TouchableOpacity>
                                                    </View>
                                                    <DateTimePicker
                                                        style={{ width: '100%', backgroundColor: 'white', borderWidth: 1, borderRadius: 10}}
                                                        value={STD.dateState}
                                                        onChange={ (eve,date) => {
                                                            this.setState({

                                                                dateState: date,
                                                                tmpTimeStamp: parseDate(date).TIMESTAMP,
                                                                tmpBirthDate: date,
                                                            })}
                                                        }
                                                        maximumDate={new Date()}
                                                    />
                                                </View>
                                            </Modal>
                                    :
                                        STD.datePopUp &&
                                        <DateTimePicker
                                            value={new Date()}
                                            mode='date'
                                            display='default'
                                            onChange={ (eve,date) => {
                                                this.setState({
                                                    birthDate: date || STD.birthDate,
                                                    datePopUp:false
                                                })}
                                            }
                                            maximumDate={new Date()}
                                        />
                                        // <DateTimePicker
                                        //     value={STD.selTimeStamp}
                                        //     mode='date'
                                        //     display='default'
                                        //     onChange={ date => {
                                        //         debugger
                                        //         console.log(parseDate(date.nativeEvent.timestamp));
                                        //         this.setState({
                                        //             birthDate: this.dateCheck(date) ? parseDate(date.nativeEvent.timestamp) : STD.birthDate,
                                        //             selTimeStamp: this.dateCheck(date) ? date.nativeEvent.timestamp : STD.birthDate,
                                        //             datePopUp:false
                                        //         })}
                                        //     }
                                        //     // maximumDate={new Date()}
                                        // />
                            }

                        </View>
                    </ScrollView>


                </View>

                <TakePhotoPopUp
                    visible={STD.takeProfilePhoto}
                    onPhotoSelect={(photo) => this.setState({profilePhoto: photo,takeProfilePhoto: false})}
                    onRequestClose={() => this.setState({takeProfilePhoto: false})}
                />

                <TakePhotoPopUp
                    visible={STD.takeCoverPhoto}
                    onPhotoSelect={(photo) => this.getImageSize(photo) }
                    onRequestClose={() => this.setState({takeCoverPhoto: false})}
                />

                <Modal visible={this.state.loader} transparent={true} onRequestClose={false}>
                    {/*<View style={{flex:1}}>*/}
                    {/*    <SideLoader />*/}
                    {/*</View>*/}
                </Modal>
            </SafeAreaView>
        )
    }

}

let Styles = StyleSheet.create({

    mainview:{
        flex:1,
        width: swidth,
    },
    coverView: {
        ...SHW(0.3, SW(1)),
        backgroundColor: 'lightgray',
    },
    InfoView: {
        // position: 'absolute',
        marginTop: SW(-0.08),
        alignItems:'center',
    },
    prfileImageView: {
        flexDirection: 'row',
        width: SW(0.95),
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        alignSelf: 'center'
    },
    profileImageStyle: {
        ...RHW(0.22),
        borderColor: 'white',
        borderWidth: SW(0.009),
        backgroundColor: SlateGray,
    },
    inputBox:{
        borderBottomWidth:0.5,
        borderColor: SlateGray,
        width: SW(0.93),
        marginTop: SW(0.03),
        height: SW(0.08),
    },

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
    GetLocation,
    UpdateProfileInfo,
    FireBaseStoreData
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage);
