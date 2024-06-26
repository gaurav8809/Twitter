import React,{Component} from 'react';
import {Platform} from 'react-native';
import {FlatList, Modal, SafeAreaView, StyleSheet, View} from "react-native";
import {ProfileInfoBadge} from "../../Global/TwitterBadges";
import {safearea, swidth} from "../../Global/ScreenSetting";
import {IOSIndicator} from "../../Global/Indicators";
import {FollowUser, GetLoginUserData, UnFollowUser} from "../../Actions/UserAction";
import {SelectAll} from "../../Actions/FireBaseDBAction";
import {GetFollowingList} from "../../Actions/GeneralAction";
import {connect} from "react-redux";
import {TopHeader} from "./TopHeader";

class FollowingListPage extends Component{

    static navigationOptions = ({ navigation }) => ({
        headerShown: false,
    });

    constructor(props) {
        super(props);

        let NavData = props.navigation.state.params.NavUser;
        let FinalNavData = NavData.id === props.LogedInUserData.id ? props.LogedInUserData : NavData;

        this.state = {
            loader: false,
            LogedInUser: this.props.LogedInUserData,
            NavUser: FinalNavData,
            requestedList: this.props.LogedInUserData.following,
            allFollowing: [],
        };

    }

    componentDidMount(){

        let STD = this.state;

        this.props.GetFollowingList('users', STD.NavUser.following)
            .then(response => {

                this.setState({
                    refreshLoader:false,
                    allFollowing: response.data
                });

            })
            .catch(error => {
                console.log(error)
            });

    }

    renderFollowingList = (item,index) => {

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
                            official: item.official && item.official,
                        }
                    }
                    btnFlag={item.id !== this.props.LogedInUserData.id}
                    btnStatus={item.followers.includes(this.props.LogedInUserData.id)}
                    btnText={"Follow"}
                    btnActiveText={"Following"}
                    BtnPress={() => item.followers.includes(this.props.LogedInUserData.id)
                        ? this.unfollowButtonPress(item, index)
                        : this.followButtonPress(item, index)
                    }
                    imagePress={() => this.props.navigation.push('ProfilePage',{
                        NavUser: item
                    })}
                />
            </View>
        );
    };

    followButtonPress = (item, index) => {

        let loggedInUser = this.props.LogedInUserData;

        let Obj = {
            UserId: loggedInUser.id,
            Username: loggedInUser.username,
            OpUserId: item.id,
            OpUsername: item.username,
        };

        this.props.FollowUser('users', Obj,  loggedInUser)
            .then(res => {
                let allFollowing = this.state.allFollowing;
                allFollowing[index]['followers'].push(loggedInUser.id);
                this.setState({allFollowing});
            })
            .catch(error => {
                console.log(error)
            });

    };

    unfollowButtonPress = (item, index) => {

        let loggedInUser = this.props.LogedInUserData;

        let Obj = {
            UserId:  loggedInUser.id,
            Username:  loggedInUser.username,
            OpUserId: item.id,
            OpUsername: item.username,
        };

        this.props.UnFollowUser('users', Obj,  loggedInUser)
            .then(res => {
                let allFollowing = this.state.allFollowing;
                let uIndex = allFollowing[index].followers.indexOf(loggedInUser.id);
                allFollowing[index]['followers'].splice(uIndex, 1);
                this.setState({allFollowing});
            })
            .catch(error => {
                console.log(error)
            });

    };

    render(){

        let {
            allFollowing
        } = this.state;

        return(
            <SafeAreaView style={[safearea]}>

                <View style={{...Styles.mainview}}>
                    <TopHeader text={"Following"} nav={this.props.navigation}/>

                    <FlatList
                        data={allFollowing !== [] && allFollowing}
                        keyExtractor={item => item.username}
                        renderItem={({item,index}) => this.renderFollowingList(item,index)}
                    />
                </View>

                <Modal visible={this.state.loader} transparent={true} onRequestClose={false}>
                    <IOSIndicator />
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
    followingText:{
        fontSize: swidth * 0.045,
        fontWeight: Platform.OS === 'ios' ? "500" : 'bold'
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
    GetLoginUserData,
    FollowUser,
    SelectAll,
    UnFollowUser,
    GetFollowingList
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowingListPage);
