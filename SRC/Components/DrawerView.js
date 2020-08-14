import React, {Component,useEffect} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text,
    StatusBar,
    TouchableOpacity,
    Platform,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';
import GLOBAL from '../Global/Initialization';
import {safearea,mainview} from '../Global/ScreenSetting'
import {connect} from 'react-redux';
import AppHeader from '../Global/AppHeader';
import {swidth} from '../Global/ScreenSetting';
import Icon from 'react-native-dynamic-vector-icons/lib/components/Icon';
import {SystemBlue, SlateGray} from '../Global/ColorPalate';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import styles from 'react-native-webview/lib/WebView.styles';
import {SystemButton} from '../Global/TwitterButton';
import HELPER, {OfficialSymbol} from '../Global/Helper';
import {NavigationActions, StackActions,withNavigation} from 'react-navigation';
import {GetUserInfo,GetLoginUserData} from '../Actions/UserAction';
import {UIActivityIndicator} from 'react-native-indicators';
import { EventRegister } from 'react-native-event-listeners'


const MENULIST = [
    {
        IconDetails:{
            Name:'user',
            Type:'AntDesign',
        },
        text:'Profile',
    },
    {
        IconDetails:{
            Name:'file-document-box-outline',
            Type:'MaterialCommunityIcons',
        },
        text:'Lists',
    },
    // {
    //     IconDetails:{
    //         Name:'chat-bubble-outline',
    //         Type:'MaterialIcons',
    //     },
    //     text:'Topics',
    // },
    {
        IconDetails:{
            Name:'bookmark-border',
            Type:'MaterialIcons',
        },
        text:'Bookmarks',
    },
    {
        IconDetails:{
            Name:'weather-lightning',
            Type:'MaterialCommunityIcons',
        },
        text:'Moments',
    }
];

const SETTINGLIST = [
    {
        text:'Settings and privacy',
    },
    {
        text:'Help Center',
    }
];

class DrawerView extends Component{

    constructor(props) {
        super(props);

        this.state = {
            LogedInUserData:{},
        };
    }

    componentDidMount(){

        this.listener = EventRegister.addEventListener('UpdateUserListener',
            () => this.InitializeView());

        // const unsubscribe = this.props.navigation.addListener('focus', () => {
        //     // The screen is focused
        //     // Call any action
        //     alert("Open");
        // });

    }

    componentWillUnmount(){
        EventRegister.removeEventListener(this.listener)
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.LogedInUserData !== prevState.LogedInUserData)
        {
            return{
                LogedInUserData : nextProps.LogedInUserData
            }
        }
        return null;
   }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.LogedInUserData !== this.state.LogedInUserData){
            //Perform some operation here
            this.setState({LogedInUserData:prevState.LogedInUserData});
        }
    }

    InitializeView = () => {

        HELPER.AsyncFetch('AsyncLogedInUserData')
            .then(response => {
                if(response !== null)
                {
                    this.props.GetLoginUserData('users',response.id)
                        .then(response => {
                            this.setState({
                                LogedInUserData: response.data
                            });
                        })
                        .catch(error => {
                            console.log(error);
                            alert(error);
                        });
                }
                else
                {
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({routeName:'HelloScreen'})
                        ],
                    });

                    setTimeout(() => this.props.navigation.dispatch(resetAction),1500);
                }
            })
            .catch(error => {
                console.log(error)
            });

    };

    renderMenuItem = (item,index) => {

        let {
            lisouterview,
            listtext,
        } = Styles;
        return (
            <View style={lisouterview} key={index}>
                <View>
                    <Icon name={item.IconDetails.Name} color={'slategray'} type={item.IconDetails.Type} size={swidth * 0.07} />
                </View>
                <View style={{marginLeft: swidth * 0.04}}>
                    <Text style={listtext} >
                        {item.text}
                    </Text>
                </View>
            </View>
        );
    };

    renderSettingMenuItem = (item,index) => {
        let {
            lisouterview,
            listtext,
        } = Styles;
        return (
            <View style={lisouterview} key={index}>
                <View style={{marginLeft: swidth * 0.02}}>
                    <Text style={listtext} >
                        {item.text}
                    </Text>
                </View>
            </View>
        );
    };

    LogOut = () => {

        if(HELPER.AsyncRemove('AsyncLogedInUserData'))
        {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName:'StartUpLoader'})
                ],
            });

            this.props.navigation.dispatch(resetAction);
        }
        else
        {
            alert("Problem to Logout");
        }

    };

    render(){

        let {
            profileimage,
            profilenameview,
            profilenametext,
            usernameview,
            usernametext,
            fValueText,
            fText
        } = Styles;

        let {
            LogedInUserData
        } = this.state;

        let nav = this.props.navigation;

        return(
            <SafeAreaView style={{flex:1}}>
                {/*<AppHeader text={'Home'}/>*/}
                <View style={[Platform.OS === 'android' && {marginTop: swidth * 0.04}]}>

                    <View style={[Styles.profileview]}>
                        <View style={{ width: swidth * 0.7}}>

                            <TouchableOpacity
                                onPress={() => nav.navigate('ProfilePage',{
                                    NavUser: LogedInUserData
                                })}
                                style={{ justifyContent:'center'}}>
                                {
                                    this.state.imageloader &&
                                    <UIActivityIndicator
                                        color={SystemBlue}
                                        size={swidth * 0.06}
                                        style={{position: 'absolute', justifySelf:'center',height: swidth * 0.15, width : swidth * 0.15,}}
                                    />
                                }
                                <Image
                                    // source={
                                    //     LogedInUserData.profileImage ?
                                    //         {uri:LogedInUserData.profilImage} :
                                    //     require('../Assets/Images/user.png')
                                    // }
                                    source={
                                        LogedInUserData && LogedInUserData.profileImage && LogedInUserData.profileImage
                                            ? {uri: LogedInUserData.profileImage}
                                            : require('../Assets/Images/usergray.png')
                                    }
                                    style={profileimage}
                                    onLoadStart={() => this.setState({imageloader:true})}
                                    onLoadEnd={() => this.setState({imageloader:false})}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => nav.navigate('ProfilePage',{
                                    NavUser: LogedInUserData
                                })}
                                style={profilenameview}>
                                <Text style={profilenametext}>
                                    {
                                        LogedInUserData &&
                                        `${LogedInUserData.profilename} `
                                    }
                                    {LogedInUserData.official &&
                                    <OfficialSymbol/>}
                                </Text>
                                <Icon name={'chevron-small-down'} type={'Entypo'} size={swidth * 0.06} color={SystemBlue}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => nav.navigate('ProfilePage',{
                                    NavUser: LogedInUserData
                                })}
                                style={usernameview}>
                                <Text style={usernametext}>
                                    {
                                        LogedInUserData &&
                                        LogedInUserData.username
                                    }
                                </Text>
                            </TouchableOpacity>
                            <View style={{marginTop: swidth * 0.04, flexDirection: 'row'}}>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('FollowingListPage',{
                                        NavUser: LogedInUserData
                                    })}
                                >
                                    <Text style={fValueText}>
                                        {LogedInUserData.following &&
                                        `${LogedInUserData.following.length} `}
                                        <Text style={fText}>
                                            {"Following   "}
                                        </Text>
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('FollowersListPage',{
                                        NavUser: LogedInUserData
                                    })}
                                >
                                    <Text style={fValueText}>
                                        {LogedInUserData.followers &&
                                        `${LogedInUserData.followers.length} `}
                                        <Text style={fText}>
                                            {"Followers"}
                                        </Text>
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>

                    <View style={[Styles.menulistview]}>
                        <View style={{ width: swidth * 0.7}}>
                            {/*<FlatList*/}
                            {
                                MENULIST.map((item,index) => this.renderMenuItem(item,index))
                            }
                        </View>
                    </View>

                    <View style={[Styles.settinglistview]}>
                        <View style={{ width: swidth * 0.7}}>
                            {/*<FlatList*/}
                            {
                                SETTINGLIST.map((item,index) => this.renderSettingMenuItem(item,index))
                            }
                        </View>
                    </View>

                </View>
                <View style={[Styles.bottombarview]}>
                    <View style={[Styles.bottomcontainer]}>
                        <Icon name={'lightbulb-on-outline'} type={'MaterialCommunityIcons'} color={SystemBlue} size={swidth * 0.08} />
                        <Icon name={'power-settings'} type={'MaterialCommunityIcons'} color={SystemBlue} size={swidth * 0.08} onPress={() => this.LogOut()}/>
                    </View>
                </View>


            </SafeAreaView>
        )
    }
}


let Styles = StyleSheet.create({

    profileview:{
        // width: swidth * 0.1,
        // backgroundColor:'pink',
        alignItems:'center',
        borderBottomWidth:0.8,
        borderColor: 'lightgrey',
        paddingBottom: 20
    },
    profileimage:{
        height: swidth * 0.15,
        width : swidth * 0.15,
        borderRadius: 100,
    },
    profilenameview:{
        flexDirection:'row',
        marginTop: swidth * 0.03,
        justifyContent:'space-between',
        alignItems:'center'
    },
    profilenametext:{
        fontSize: swidth * 0.05,
        fontWeight: "bold"
    },
    usernameview:{
        marginTop: swidth * 0.01,
        fontWeight: "500",
    },
    usernametext:{
        fontSize: swidth * 0.045,
        color:SlateGray
    },
    menulistview:{
        // marginTop: swidth * 0.04,
        alignItems:'center',
        borderBottomWidth:0.8,
        borderColor: 'lightgrey',
        paddingBottom: 20
    },
    settinglistview:{
        // marginTop: swidth * 0.04,
        alignItems:'center',
    },
    lisouterview:{
        flexDirection:'row', marginTop: swidth * 0.05,
    },
    listtext:{
        fontSize: swidth * 0.05, fontWeight: "400"
    },
    bottombarview:{
        position: 'absolute',
        bottom: 0,
        borderTopWidth:1,
        borderColor:'lightgray',
        height: swidth * 0.15,
        width:swidth * 0.8,
        justifyContent: 'center',
        // alignSelf:'flex-end',
        // backgroundColor:'rgb(242,242,242)',
    },
    bottomcontainer:{
        flexDirection:'row',
        padding: 10,
        justifyContent:'space-between'
        // alignItems: 'center',
        // backgroundColor: 'pink'
    },
    fValueText:{
        fontSize: swidth * 0.04,
        fontWeight: 'bold'
    },
    fText:{
        fontSize: swidth * 0.04,
        fontWeight:'normal',
        color:'slategray'
    },
});

const mapStateToProps = state => {
    const {
        UserInfo,
        LogedInUserData
    } = state.UserReducer;

    return {
        UserInfo,
        LogedInUserData
    };
};

const mapDispatchToProps = {
    GetUserInfo,
    GetLoginUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(DrawerView));

