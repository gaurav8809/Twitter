import React, {Component} from 'react';
import {TouchableOpacity, Animated,} from 'react-native';
import {OfficialSymbol, PreviewImageView, IS_IOS, parseDate} from "../../Global/Helper";
import {FlatList, Modal, SafeAreaView, StyleSheet, Text, View, Image} from "react-native";
import {TweetBadge} from "../../Global/TwitterBadges";
import {safearea, swidth} from "../../Global/ScreenSetting";
import {LinerButton} from "../../Global/TwitterButton";
import {GetTweets, GetUserTweets} from "../../Actions/GeneralAction";
import {connect} from "react-redux";
import {SystemBlue, SlateGray, BackGrayColor} from "../../Global/ColorPalate";
import Icon from "react-native-dynamic-vector-icons/lib/components/Icon";
import {SHW, RHW, SH, SW, centertext} from '../../Global/ScreenSetting'
import {ScrollView} from "react-navigation";
import {ScrollableTabView} from '@valdio/react-native-scrollable-tabview'
import {DotIndicator, UIActivityIndicator, WaveIndicator} from "react-native-indicators";
import {WaveLoader} from "../../Global/Indicators";

const Months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

class ProfilePage extends Component {

    static navigationOptions = ({navigation}) => ({
        headerShown: false,
    });

    constructor(props) {
        super(props);

        let NavData = props.navigation.state.params.NavUser[0] === undefined ? props.navigation.state.params.NavUser : props.navigation.state.params.NavUser[0];
        let FinalNavData = NavData.id === props.LogedInUserData.id ? props.LogedInUserData : NavData;

        this.state = {
            loader: true,
            tabIndex: 0,
            LogedInUserData:{},
            NavUser: FinalNavData,
            tweetList:'load',
            tweetLoader:false,
            preview: false,
            PreviewImage: null,
            scrollY: new Animated.Value(0),
        };

        // console.log(parseDate(this.state.NavUser.timestamp.seconds));

    }

    componentDidMount(){
        this.getTweetList();
    }


    static getDerivedStateFromProps(nextProps, prevState){

        if(nextProps.LogedInUserData.id === prevState.NavUser.id)
        {
            if(nextProps.LogedInUserData !== prevState.NavUser)
            {
                return{
                    NavUser : nextProps.LogedInUserData
                }
            }
            return null;
        }
    }

    componentDidUpdate(prevProps, prevState) {

        if(prevProps.LogedInUserData.id === prevState.NavUser.id)
        {
            if(prevState.NavUser !== this.state.NavUser){
                //Perform some operation here
                this.setState({NavUser: prevState.NavUser});
            }
        }
    }

    dateCheck = (date) => {
        return !isNaN(parseDate(date).DATE)
    };

    setLoader = (flag) => {
        this.setState({loader:flag});
    };

    openImage = (url) => {

        Image.getSize(url, (width, height) => {
            this.setState({
                preview: true,
                PreviewImage:{
                    pImageHeight: height,
                    pImageWidth: width,
                    pImagePath: url
                }
            })
        });


    };

    closePreviewImage = () => {
        this.setState({
            preview: false,
            PreviewImage: null,
        })
    };

    getTweetList = () => {

        let STD = this.state;

        this.setState({tweetLoader:true});

        this.props.GetUserTweets('tweets', STD.NavUser)
            .then(response => {

                if(response.data.length)
                {
                    this.setState({
                        tweetLoader:false,
                        tweetList: response.data
                    });
                }
                else
                    this.setState({tweetList: []});


            })
            .catch(error => {
                this.setState({tweetLoader:false});
                console.log(error)
            });
    };

    renderTweetList = (item,index) => {

        return (
            <View key={index} style={{marginTop: swidth * 0.02}}>
                <TweetBadge
                    JSONData={item}
                    imagePress={(url) => this.openImage(url)}
                    profilePress={(url) => item.profileImage && this.openImage(url)}
                />
            </View>
        );
    };

    _LOADER = () => {
        return(
            <UIActivityIndicator
                color={SystemBlue}
                size={swidth * 0.05}
                style={{marginTop: SW(0.1),marginBottom: SW(1), }}
            />
        );
    };

    _TWEETS_TAB = (tabLabel) => {

        if(this.state.tweetList === 'load')
        {
            return(
                <View tabLabel={tabLabel}>
                    {this._LOADER()}
                </View>
            );
        }
        else if(this.state.tweetList.length)
        {
            return (
                <View tabLabel={tabLabel} style={{backgroundColor: BackGrayColor}}>
                    <FlatList
                        data={this.state.tweetList !== [] && this.state.tweetList}
                        keyExtractor={item => item.tweetId}
                        renderItem={({item,index}) => this.renderTweetList(item,index)}
                        scrollEnabled={false}
                    />
                    {   this.state.tweetLoader &&
                    <UIActivityIndicator
                        color={SystemBlue}
                        size={swidth * 0.05}
                        style={{marginTop: SW(0.1),marginBottom: SW(1), }}
                    />
                    }
                </View>
            );
        }
        else
            return <View tabLabel={tabLabel} style={{flex:1, backgroundColor: BackGrayColor, alignItems:'center'}}><Text>{"No tweets"}</Text></View>

    };

    _T_R_TAB = (tabLabel) => {
        return(
            <View tabLabel={tabLabel} style={{backgroundColor: BackGrayColor, flex:1, alignItems:'center'}}>
                <Text>{'Coming soon'}</Text>
            </View>
        );
    };

    _MEDIA_TAB = (tabLabel) => {
        return(
            <View tabLabel={tabLabel} style={{backgroundColor: BackGrayColor, flex:1, alignItems:'center'}}>
                <Text>{'Coming soon'}</Text>
            </View>
        );
    };

    _LIKES_TAB = (tabLabel) => {
        return(
            <View tabLabel={tabLabel} style={{backgroundColor: BackGrayColor, flex:1, alignItems:'center'}}>
                <Text>{'Coming soon'}</Text>
            </View>
        );
    };

    render() {

        let STY = Styles;

        let STD = this.state;
        let {NavUser} = STD;

        // let joined = NavUser.timestamp && parseDate(NavUser.timestamp.seconds);
        //

        const nav = this.props.navigation;

        const headerHeight = STD.scrollY.interpolate({
            inputRange: [0, 75],
            outputRange: ['rgba(0,0,0,0)', 'black'],
            // outputRange: [0, 70],
            extrapolate: 'clamp',
        });

        const imageScale = STD.scrollY.interpolate({
            inputRange: [0, 50],
            outputRange: [1,0.65],
            extrapolate: 'clamp',
        });

        const viewTop = STD.scrollY.interpolate({
            inputRange: [0, 70],
            outputRange: [0,25],
        });

        const headerFontColor = STD.scrollY.interpolate({
            inputRange: [0, 150],
            outputRange: ['rgba(0,0,0,0)', 'white'],
        });

        return (
            <SafeAreaView style={[safearea]}>

                <View style={STY.mainview}>

                    <ScrollView
                        onScroll={Animated.event(
                            [{nativeEvent: {contentOffset: {y: STD.scrollY}}}]
                        )}
                        contentContainerStyle={{alignItems: 'center', flexGrow: 1}}
                        scrollEventThrottle={1}
                    >
                        {
                            NavUser.coverImage ?
                                <TouchableOpacity onPress={() => this.openImage(NavUser.coverImage)}>
                                    {
                                        STD.loader &&
                                        <View style={{...SHW(0.3, SW(1)),}}>
                                            <DotIndicator
                                                count={5}
                                                color={SystemBlue}
                                                size={swidth * 0.009}
                                            />
                                        </View>
                                    }
                                    <Image
                                        onLoadStart={() => this.setLoader(true)}
                                        onLoadEnd={() => this.setLoader(false)}
                                        source={{uri: NavUser.coverImage}}
                                        style={{height: SW(0.3), width: swidth, position: STD.loader ? 'absolute' : 'relative'}}
                                    />
                                </TouchableOpacity>
                                :
                                <View style={STY.coverView}/>
                        }
                        <View style={[STY.InfoView,]}>
                            <View style={STY.prfileImageView}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => NavUser.profileImage && this.openImage(NavUser.profileImage)}
                                >
                                    <Animated.Image
                                        resizeMode={'cover'}
                                        source={
                                            NavUser.profileImage
                                                ? {uri: NavUser.profileImage}
                                                : require('../../Assets/Images/usergray.png')
                                        }
                                        style={[STY.profileImageStyle,{overflow: 'hidden'},{transform:[{scale:imageScale},{translateY: viewTop}]}]}
                                    />
                                </TouchableOpacity>
                                {
                                    this.props.LogedInUserData.id === NavUser.id &&
                                    <LinerButton
                                        text={'Edit profile'}
                                        onPress={() => nav.navigate('EditProfilePage')}
                                        activeOpacity={0.8}
                                        btnStyle={{padding:5}}
                                        useColor={SlateGray}
                                    />
                                }
                            </View>

                            <View style={{width: SW(0.93),alignSelf: 'center'}}>
                                {
                                    NavUser &&
                                    <View style={STY.profilenameview}>
                                        <Text style={STY.profilenametext}>
                                            {`${NavUser.profilename} `}
                                            {NavUser.official && <OfficialSymbol/>}
                                        </Text>
                                    </View>
                                }
                                {
                                    NavUser &&
                                    <View style={STY.usernameview}>
                                        <Text style={STY.usernametext}>
                                            {NavUser.username}
                                        </Text>
                                    </View>
                                }
                                {
                                    NavUser.bioDetails &&
                                    <View style={STY.biotextview}>
                                        <Text style={STY.biotext}>
                                            {NavUser.bioDetails}
                                        </Text>
                                    </View>
                                }
                                <View style={{marginTop: SW(0.025), flexDirection: NavUser.location !== undefined && NavUser.location !== '' && NavUser.location.length > 30 ? 'column' : 'row'}}>
                                    {
                                        NavUser.location !== undefined && NavUser.location !== '' &&
                                        <Text style={STY.otherInfoText}>
                                            <Icon name={"marker"} type={"Foundation"} size={swidth * 0.04} color={SlateGray}/>
                                            {` ${NavUser.location} `}
                                        </Text>
                                    }
                                    {
                                        NavUser.birthDate && NavUser.birthDate !== '' &&
                                        <Text style={STY.otherInfoText}>
                                            <Icon name={"birthday-cake"} type={"FontAwesome"} size={swidth * 0.03} color={SlateGray}/>
                                            {/*{"  Born 27 March 1998\n"}*/}
                                            {` Born ${NavUser.birthDate.toDate().getDate()} ${Months[NavUser.birthDate.toDate().getMonth()]} ${NavUser.birthDate.toDate().getFullYear()}`}
                                        </Text>
                                    }

                                </View>
                                <Text style={STY.otherInfoText}>
                                    <Icon name={"calendar"} type={"MaterialCommunityIcons"} size={swidth * 0.04} color={SlateGray}/>
                                    {/*{NavUser.timestamp && ` Joined ${joined.M_IN_W} ${joined.YEAR}`}*/}
                                    {NavUser.timestamp && ` Joined ${Months[NavUser.timestamp.toDate().getMonth()]} ${NavUser.timestamp.toDate().getFullYear()}`}
                                </Text>
                                <View style={STY.followView}>
                                    <TouchableOpacity onPress={() =>
                                        this.props.navigation.navigate('FollowingListPage',{
                                        NavUser: NavUser
                                    })}
                                    >
                                        <Text style={STY.fValueText}>
                                            {`${NavUser.following.length} `}
                                            <Text style={STY.fText}>
                                                {"Following   "}
                                            </Text>
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() =>
                                        this.props.navigation.navigate('FollowersListPage',{
                                            NavUser: NavUser
                                        })}
                                    >
                                        <Text style={STY.fValueText}>
                                            {`${NavUser.followers.length} `}
                                            <Text style={STY.fText}>
                                                {"Followers   "}
                                            </Text>
                                        </Text>
                                    </TouchableOpacity>

                                </View>
                            </View>

                            <ScrollableTabView
                                tabBarUnderlineStyle={{backgroundColor:SystemBlue}}
                                tabBarActiveTextColor={SystemBlue}
                                tabBarInactiveTextColor={SlateGray}
                                tabBarTextStyle={{fontSize: SW(IS_IOS() ? 0.03 : 0.031)}}
                                style={{marginTop:SW(0.04) , flex:1}}
                                showsHorizontalScrollIndicator={false}
                                // renderTabBar={() => <View style={{...RHW(0.1), backgroundColor:'red'}}/>}
                            >
                                {this._TWEETS_TAB('Tweets')}
                                {this._T_R_TAB('Tweets & replies')}
                                {this._MEDIA_TAB('Media')}
                                {this._LIKES_TAB('Likes')}
                            </ScrollableTabView>
                        </View>


                    </ScrollView>

                    <Animated.View style={[STY.topHeader,{backgroundColor: headerHeight}, ]}>

                        <View style={{marginLeft: SW(0.015), flexDirection:'row', alignItems:'center'}}>
                            <View style={{backgroundColor:'black', ...RHW(0.075), ...centertext}}>
                                <Icon
                                    onPress={() => nav.goBack()}
                                    name={"arrowleft"}
                                    type={"AntDesign"}
                                    color={'white'}
                                    size={swidth * 0.055}
                                    style={{ marginTop: IS_IOS() ? SW(0.005) : 0 }}
                                />
                            </View>
                            <View style={{marginLeft: SW(0.05),}}>
                                <Animated.Text style={[STY.headerProfileName, {color: headerFontColor}]}>{NavUser.profilename}</Animated.Text>
                                {STD.tweetList !== [] &&
                                <Animated.Text style={[STY.headerInfo, {color: headerFontColor}]}>{`${STD.tweetList.length} Tweets`}</Animated.Text>}
                            </View>
                        </View>
                        <View style={{marginRight: SW(0.015)}}>
                            <View style={{backgroundColor:'black', ...RHW(0.075), ...centertext}}>
                                <Icon
                                    name={"dots-three-vertical"}
                                    type={"Entypo"}
                                    color={'white'}
                                    size={swidth * 0.045}
                                    style={{ marginTop: IS_IOS() ? SW(0.005) : 0 }}
                                />
                            </View>
                        </View>
                    </Animated.View>
                </View>

                <PreviewImageView
                    preview={STD.preview}
                    PreviewImage={STD.PreviewImage}
                    backPress={() => this.closePreviewImage()}
                />

                {/*<Modal visible={this.state.loader} transparent={true} onRequestClose={false}>*/}
                {/*    <IOSIndicator/>*/}
                {/*</Modal>*/}
            </SafeAreaView>
        )
    }

}

let Styles = StyleSheet.create({

    mainview: {
        flex: 1,
        width: swidth,
        // backgroundColor: 'red',
    },
    topHeader: {
        top: 0,
        padding:5,
        height: swidth * 0.12,
        width: swidth,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
    },
    coverView: {
        ...SHW(0.3, SW(1)),
        backgroundColor: 'lightgray',
    },
    InfoView: {
        // position: 'absolute',
        marginTop: SW(-0.08),
        // backgroundColor:'pink'
    },
    prfileImageView: {
        flexDirection: 'row',
        width: SW(0.95),
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        // backgroundColor: SlateGray,
        alignSelf: 'center'
    },
    profileImageStyle: {
        ...RHW(0.22),
        borderColor: 'white',
        borderWidth: SW(0.009),
        backgroundColor: SlateGray,
        // height: SW(0.08),
        // width: SW(0.04),
        // borderRadius: 100,
    },
    profilenameview: {
        flexDirection: 'row',
        marginTop: swidth * 0.01,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    profilenametext: {
        fontSize: swidth * 0.05,
        fontWeight: "bold"
    },
    usernameview: {
        marginTop: swidth * 0.007,
        fontWeight: "500",
    },
    usernametext: {
        fontSize: swidth * 0.045,
        color: SlateGray
    },
    biotextview: {
        marginTop: swidth * 0.025
    },
    otherInfoView: {
        marginTop: swidth * 0.02,
        fontWeight: "500",
    },
    otherInfoText: {
        fontSize: swidth * 0.037,
        color: SlateGray
    },
    biotext: {
        fontSize: swidth * 0.038,
    },
    followView: {
        marginTop: swidth * 0.025,
        flexDirection: 'row'
    },
    fValueText: {
        fontSize: swidth * 0.04,
        fontWeight: 'bold'
    },
    fText: {
        fontSize: swidth * 0.043,
        fontWeight: 'normal',
        color: 'slategray'
    },
    headerProfileName:{
        fontSize: SW(0.04),
        fontFamily: 'Roboto-Bold'
    },
    headerInfo:{
        fontSize: SW(0.035),
        fontFamily: 'Roboto-Medium'
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
    GetTweets,
    GetUserTweets
};

// export default CodeVerification;
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
