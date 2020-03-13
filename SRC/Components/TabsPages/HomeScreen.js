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
    KeyboardAvoidingView,
    FlatList
} from 'react-native';
import GLOBAL from '../../Global/Initialization';
import {safearea, mainview, swidth} from '../../Global/ScreenSetting';
import {connect} from 'react-redux';
import AppHeader from '../../Global/AppHeader';
import COLOR, {SystemBlue} from '../../Global/ColorPalate';
import Icon from 'react-native-dynamic-vector-icons/lib/components/Icon';
import {BlackBigText, BlueText} from '../../Global/TwitterText';
import {ProfileInfoBadge} from '../../Global/TwitterBadges';
import HELPER from '../../Global/Helper';
import {NavigationActions, StackActions} from 'react-navigation';
import {
    FollowUser,
    UnFollowUser
} from '../../Actions/UserAction';
import {SelectAll} from '../../Actions/FireBaseDBAction';
import {BubbleButton} from '../../Global/TwitterButton';

const MENULIST = [
    {
        profileImage:'https://pbs.twimg.com/profile_images/1166471091663122433/5ULjGFJS_400x400.jpg',
        text:'Profile',
        username:'@iHrithik',
        profilename:'Hrithik Roshan',
        bioDetails:'Man on mission- to live the best life possible come what may.',
    },
    {
        text:'Profile',
        profileImage:'https://pbs.twimg.com/profile_images/1134082549041393672/QbihPzrL_400x400.png',
        username:'@narendramodi',
        profilename:'Narendra Modi',
        bioDetails:'Prime Minister of India',
    },
    {
        profileImage:'https://pbs.twimg.com/profile_images/418848443881119744/uV7dEImQ_400x400.png',
        text:'Profile',
        username:'@pinkvilla',
        profilename:'Pinkvilla',
        bioDetails:'Your daily dose of Bollywood gossip and fashion. Instagram : https://Instagram.com/pinkvilla YouTube: https://youtube.com/pinkvilla',
    },
];

class HomeScreen extends Component{

    constructor(props) {
        super(props);

        this.state = {
            currentUser:{},
            wtfList:[],
        };

    }

    componentDidMount(){
        this.getCurrentLogedInData();
    }

    getCurrentLogedInData = () => {

        HELPER.AsyncFetch('AsyncLogedInUserData')
            .then(response => {
                this.setState({currentUser:response},() => this.getWhoToFollowList())
            })
            .catch(error => {
                console.log(error)
            });

    };

    getWhoToFollowList = () => {
        this.props.SelectAll('users')
            .then(response => {

                let wtfList = [];
                for(let item of response.data)
                {
                    if(!item.followers.includes(this.state.currentUser.username))
                    {
                        if(item.username === this.state.currentUser.username)
                            continue;
                        if(wtfList.length === 3)
                            break;
                        else
                            wtfList.push(item);
                    }
                }
                this.setState({wtfList});

            })
            .catch(error => {
                console.log(error)
            });

    };

    followButtonPress = (item) => {

        // alert(item.id + " / " + item.username);

        let Obj = {
            UserId: this.state.currentUser.id,
            Username: this.state.currentUser.username,
            OpUserId: item.id,
            OpUsername: item.username,
        };

        // let final = this.state.currentUser;
        // debugger
        // final['following'].push(item.username);

        this.props.FollowUser('users', Obj, this.state.currentUser)
            .then(response => {

            })
            .catch(error => {
                console.log(error)
            });

    };

    unfollowButtonPress = (item) => {

        // alert(item.id + " / " + item.username);

        let Obj = {
            UserId: this.state.currentUser.id,
            Username: this.state.currentUser.username,
            OpUserId: item.id,
            OpUsername: item.username,
        };

        // let final = this.state.currentUser;
        // debugger
        // final['following'].push(item.username);

        this.props.UnFollowUser('users', Obj, this.state.currentUser)
            .then(response => {

            })
            .catch(error => {
                console.log(error)
            });

    };

    renderWhoToFollowList = (item,index) => {

        let {
            wholabelcontainer,
            wholabeltext
        } = Styles;

        return (
            <View key={index}>
                <ProfileInfoBadge
                    imageurl={
                        item.profileImage
                    }
                    PROFILE_INFO={
                        {
                            username:item.username,
                            profilename:item.profilename,
                            bio:item.bioDetails,
                        }
                    }
                    BtnPress={(flag) => flag
                        ? this.followButtonPress(item)
                        : this.unfollowButtonPress(item)
                    }
                    // BtnPress={(flag) => this.followButtonPress(item)}
                />
            </View>
        );
    };

    render(){

        let {
            wholabelcontainer,
            wholabeltext,
            seemorecontainer
        } = Styles;

        return(
            <SafeAreaView style={[safearea]}>
                {/*<AppHeader navigation={this.props.navigation}/>*/}
                <View style={{...Styles.mainview}}>

                    <FlatList
                        data={this.state.wtfList !== [] && this.state.wtfList}
                        keyExtractor={item => item.username}
                        ListHeaderComponent={
                            <View style={wholabelcontainer}>
                                <Text style={wholabeltext}>
                                    {"Who to follow"}
                                </Text>
                            </View>
                        }
                        renderItem={({item,index}) => this.renderWhoToFollowList(item,index)}
                        ListFooterComponent={
                            <View style={seemorecontainer}>
                                <BlueText
                                    text={'See more'}
                                    onPress={() => alert("See more")}
                                />
                            </View>
                        }
                    />


                    <BubbleButton
                        IconDetails={
                            {
                                type: 'Ionicons',
                                name: 'ios-eye',
                                color: 'white',
                                size: swidth * 0.08,
                            }
                        }
                        uri={require('../../Assets/Images/FeatherWhite.png')}
                    />

                </View>
            </SafeAreaView>
        )
    }
}


let Styles = StyleSheet.create({

    mainview:{
        flex:1,
        width: swidth,
        backgroundColor: COLOR.BackGrayColor
    },
    wholabelcontainer:{
        padding: swidth * 0.027,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: 'lightgray',
    },
    wholabeltext:{
        fontSize: swidth * 0.055,
        fontWeight: "bold",
    },
    seemorecontainer:{
        height: swidth * 0.13,
        padding: swidth * 0.030,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        justifyContent:'center'
    },

});

const mapStateToProps = state => {
    return {
        SystemData: state.SystemState.SystemData,
    };
};

const mapDispatchToProps = {
    FollowUser,
    SelectAll,
    UnFollowUser
};

// export default CodeVerification;
export default connect(null, mapDispatchToProps)(HomeScreen);

